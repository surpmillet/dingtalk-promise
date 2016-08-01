/**
 * Created by michao on 16/7/31.
 */
import Base from './base';
import fs from 'fs';
import path from 'path';
import Service from './service';
import _ from 'lodash';
class Media extends Base {
  fromMedia(filepath) {
    return new Promise((resolve, reject)=> {
      fs.readFile(filepath, function (err, data) {
        if (err) {
          return reject(err);
        }
        return resolve({filepath, data});
      });
    });
  }

  toMedia(options) {
    var filepath = path.join(options.path, path.basename(options.data.redirects[0]));
    return ((_this)=> {
      return new Promise((resolve, reject)=> {
        fs.writeFile(filepath, options.data.body, (err)=> {
          if (err) {
            return reject(err);
          }
          return resolve(_this.assemble({filepath}));
        });
      });
    })(this);
  }

  buildFormData(options) {
    var mime = {
      '.jpg': 'image',
      '.png': 'image',
      '.amr': 'voice'
    };
    var filepath = options.filepath;
    var data = options.data;
    var boundary = Service.getNonceSecurityString();
    var contentType = 'multipart/form-data; boundary=' + boundary;
    var basename = path.basename(filepath);
    var disposition = `form-data;name=\"media\";filename=\"${basename}\"`;
    var header = `--${boundary}\r\nContent-Disposition:${disposition}\r\nContent-Type:application/octet-stream\r\n\r\n`;
    var headerBuffer = new Buffer(header, 'utf8');
    var endBuffer = new Buffer(`\r\n--${boundary}--\r\n`, 'utf8');
    var buffer = Buffer.concat([headerBuffer, data, endBuffer]);
    return {
      query: {type: _.has(mime, path.extname(filepath)) ? mime[path.extname(filepath)] : 'file', 'media': header},
      contentType,
      disposition,
      buffer
    };
  }
}
export default Media;