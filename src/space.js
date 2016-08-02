/**
 * Created by michao on 16/8/2.
 */
import Base from './base';
import request from 'superagent';
class Space extends Base {
  domain = 'nwatmb';

  getSpaceId() {
    return request
      .get(this.getUrl('get_custom_space'))
      .query(this.getQuery({domain: this.domain}))
      .then(this.parse.bind(this));
  }
}
export default Space;