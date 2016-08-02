/**
 * Created by michao on 16/7/19.
 */
import Base from './base';
import request from 'superagent';
class User extends Base {
  getSimpleList(query = {}) {
    return request
      .get(this.getUrl('simplelist'))
      .query(this.getQuery(query))
      .then(this.parse.bind(this));
  }

  removeAll(options) {
    return request
      .post(this.getUrl('batchdelete'))
      .query(this.getQuery())
      .send(options)
      .then(this.parse.bind(this));
  }
}
export default User;
