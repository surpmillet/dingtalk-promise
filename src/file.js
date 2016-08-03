/**
 * Created by michao on 16/8/2.
 */
import Base from './base';
import request from 'superagent';
import fs from 'fs';
import async from 'async';
import urlencode from 'urlencode';
import _ from 'lodash';
class File extends Base {
  getFileSize(filePath) {
    return new Promise((resolve, reject)=> {
      fs.stat(filePath, function (err, stat) {
        if (err) {
          return reject(err);
        }
        return resolve({size: stat.size});
      });
    });
  }

  getUploadId(options) {
    return request
      .get(this.getUrl('upload/create'))
      .query(this.getQuery(options))
      .then(this.parse.bind(this))
  }

  upload(filePath) {
    return this.getFileSize(filePath)
      .then(this.getUploadId.bind(this))
      .then((data)=> {
        return {uploadId: data.uploadid, filePath};
      })
      .then(this.read.bind(this))
      .then((data)=> {
        let {buffer, uploadId, filePath} = data;
        let blockSize = 512 * 1024;
        return new Promise((resolve, reject)=> {
          let blocks = _.chunk(buffer, blockSize);
          async.reduce(blocks, {index: 0}, (memo, item, cb)=> {
            let start = memo.index;
            let end = Math.min(buffer.length, (start + blockSize));
            let options = {
              uploadId,
              filePath,
              buffer: new Buffer(item),
              header: {NDPatition: urlencode(`bytes=${start}-${end}`)}
            };
            Promise.resolve(options)
              .then(this.buildFormData.bind(this))
              .then((data)=> {
                let {uploadId} = data;
                data.query = {uploadid: uploadId};
                return data;
              })
              .then(super.upload.bind(this))
              .then((data)=> {
                if (data.code != 0) {
                  cb(new Error(data.msg));
                }
                cb(null, {index: end, data});
              })
              .catch((err)=> {
                cb(err);
              });
          }, (err, result)=> {
            if (err) {
              return reject(err);
            }
            return resolve(result.data);
          });
        });
      });
  }

  parse(data) {
    return JSON.parse(data.text);
  }
}
export default File;