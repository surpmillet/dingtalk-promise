/**
 * Created by michao on 16/7/31.
 */
import Base from './base';
import fs from 'fs';
import path from 'path';
class Media extends Base {

  toMedia(options) {
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
    return this.fromMedia({filePath})
      .then(this.buildFormData.bind(this))
      .then((data)=> {
        let {type, media}=data;
        data.query = {type, media};
        return data;
      })
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