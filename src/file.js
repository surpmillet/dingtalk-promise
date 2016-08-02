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
  getMediaSize(filepath) {
    return new Promise((resolve, reject)=> {
      fs.stat(filepath, function (err, stat) {
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
      .then(this.parse.bind(this));
  }

  toBlocks(options) {
    let {data, size = 512 * 1024} = options;
    var count = Math.ceil(data.length / size);
    var blocks = _(data).chunk(count).map((item, index)=> {
      var start = index * size;
      var end = index == count - 1 ? data.length - 1 : (index + 1) * size;
      return {data: item, start, end};
    });
    return blocks;
  }

  asyncUpload(filepath) {
    return this.fromMedia(filepath)
      .then(this.toBlocks.bind(this))
      .then((data)=> {
        return data.map((item)=> {
          return _(item).assign({filepath});
        });
      })
      .then((coll)=> {
        return new Promise((resolve, reject)=> {
          var options;
          async.reduce(coll, null, (memo, item, cb)=> {
            let {data, start, end} = item;
            options = {filepath, data, 'NDPartition': urlencode(`bytes=${start}-${end}`)};
            this.buildFormData(options)
              .then(this.upload.bind(this))
              .then((data)=> {
                if (data.code) {
                  return cb(new Error(data.msg));
                }
                return data.filepath;
              });
          }, (err, data)=> {
            if (err) {
              return reject(err);
            }
            return resolve(data);
          });
        });
      });
  }

  parse(data) {
    return JSON.parse(data.text);
  }
}
export default File;