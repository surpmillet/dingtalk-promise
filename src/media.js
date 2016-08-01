/**
 * Created by michao on 16/7/31.
 */
import Base from './base';
import fs from 'fs';
import path from 'path';
import Service from './service';
class Media extends Base {
  getMediaData(filepath) {
    return new Promise((resolve, reject)=> {
      fs.readFile(filepath, function (err, data) {
        if (err) {
          return reject(err);
        }
        return resolve({filepath, data});
      });
    });
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
    var header = `--${boundary}\r\nContent-Disposition:form-data;name=\"media\";filename=\"${path.basename(filepath)}\"\r\nContent-Type:application/octet-stream\r\n\r\n`;
    var headerBuffer = new Buffer(header, 'utf8');
    var endBuffer = new Buffer(`\r\n--${boundary}--\r\n`, 'utf8');
    var buffer = Buffer.concat([headerBuffer, data, endBuffer]);
    return {
      query: {type: mime.has(path.extname(filepath)) ? mime[path.extname(filepath)] : 'file', 'media': header},
      contentType,
      buffer
    };
  }
}
export default Media;