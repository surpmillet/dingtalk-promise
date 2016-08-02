/**
 * Created by michao on 16/8/2.
 */
import Base from './base';
import request from 'superagent';
import fs from 'fs';
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

  parse(data) {
    return JSON.parse(data.text);
  }
}
export default File;