/**
 * Created by michao on 16/7/31.
 */
import Base from './base';
import fs from 'fs';
class Media extends Base {
  createMedia(filepath) {
    return new Promise((resolve, reject)=> {
      fs.readFile(filepath, function (err, data) {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
}
export default Media;