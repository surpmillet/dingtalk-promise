/**
 * Created by michao on 16/8/2.
 */
import Base from './base';
import request from 'superagent';
import fs from 'fs';
import _ from 'lodash';
import async from 'async';
import urlencode from 'urlencode';
class File extends Base {
  getMediaSize(filePath) {
    return new Promise((resolve, reject)=> {
      fs.stat(filePath, function (err, stat) {
        if (err) {
          return reject(err);
        }
        return resolve({size: stat.size});
      });
    });
  }

  uploadCreate(options) {
    return request
      .get(this.getUrl('upload/create'))
      .query(this.getQuery(options))
      .then(this.parse.bind(this))
  }

  toBlocks(options) {
    let {fileBuffer, size = 512 * 1024} = options;
    var count = Math.ceil(fileBuffer.length / size);
    var blocks = _(fileBuffer).chunk(size).map((item, index)=> {
      var start = index * size;
      var end = index == count - 1 ? fileBuffer.length - 1 : (index + 1) * size;
      return {block: new Buffer(item), start, end};
    }).value();
    return _(options).assign({blocks}).value();
  }

  asyncUpload(filePath) {
    return this.getMediaSize(filePath)
      .then(this.uploadCreate.bind(this))
      .then((data)=> {
        return {uploadid: data.uploadid, filePath};
      })
      .then(this.fromMedia.bind(this))
      .then(this.toBlocks.bind(this))
      .then((coll)=> {
        let {uploadid, blocks}=coll;
        let {block, start, end} = blocks[0];
        var options = {filePath, fileBuffer: block, partition: {NDPartition: urlencode(`bytes=${start}-${end}`)}};
        return Promise.resolve(options)
          .then(this.buildFormData.bind(this))
          .then((data)=> {
            data.query = {uploadid};
            return data;
          })
          .then(this.upload.bind(this));
        // .then((data)=> {
        //   if (data.code) {
        //     return cb(new Error(data.msg));
        //   }
        //   return cb(null, data.filepath);
        // });
        // return new Promise((resolve, reject)=> {
        //   var options;
        //   async.reduce(blocks, {}, (memo, item, cb)=> {
        //
        //   }, (err, data)=> {
        //     if (err) {
        //       return reject(err);
        //     }
        //     return resolve(data);
        //   });
        // });
      });
  }

  parse(data) {
    return JSON.parse(data.text);
  }
}
export default File;