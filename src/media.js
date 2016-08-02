/**
 * Created by michao on 16/7/31.
 */
import Base from './base';
import fs from 'fs';
import path from 'path';
class Media extends Base {

  toMedia(options) {
    let {dir, data}=options;
    var filepath = path.join(dir, path.basename(data.redirects[0]));
    return new Promise((resolve, reject)=> {
      fs.writeFile(filepath, data.body, (err)=> {
        if (err) {
          return reject(err);
        }
        return resolve({filepath});
      });
    });
  }

  upload(filepath) {
    return this.fromMedia(filepath)
      .then((data)=> {
        Object.assign(data, {filepath});
        return data;
      })
      .then(this.buildFormData.bind(this))
      .then(super.upload.bind(this));
  }

  download(media_id, dir) {
    return super.download({media_id})
      .then((data)=> {
        return {dir, data};
      })
      .then(this.toMedia.bind(this))
      .then(this.assemble.bind(this));
  }
}
export default Media;