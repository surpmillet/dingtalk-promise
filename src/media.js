/**
 * Created by michao on 16/7/31.
 */
import Base from './base';
import fs from 'fs';
import path from 'path';
class Media extends Base {

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
}
export default Media;