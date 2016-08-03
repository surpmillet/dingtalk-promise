/**
 * Created by michao on 16/7/31.
 */
import Base from './base';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
class Media extends Base {
  mime = {
    '.jpg': 'image',
    '.png': 'image',
    '.amr': 'voice'
  };

  getType(filePath) {
    return _.has(this.mime, path.extname(filePath)) ? this.mime[path.extname(filePath)] : 'file';
  }

  write(options) {
    let {dir, data}=options;
    var filePath = path.join(dir, path.basename(data.redirects[0]));
    return new Promise((resolve, reject)=> {
      fs.writeFile(filePath, data.body, (err)=> {
        if (err) {
          return reject(err);
        }
        return resolve({filePath});
      });
    });
  }

  upload(filePath) {
    return this.read({filePath})
      .then(this.buildFormData.bind(this))
      .then((data)=> {
        return _.assign(data, {query: {type: this.getType(filePath), media: data.contentHeader}});
      })
      .then(super.upload.bind(this));
  }

  download(media_id, dir) {
    return super.download({media_id})
      .then((data)=> {
        return {dir, data};
      })
      .then(this.write.bind(this))
      .then(this.assemble.bind(this));
  }
}
export default Media;