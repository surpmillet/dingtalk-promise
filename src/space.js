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

  sendToChat(query) {
    return request
      .post(this.getUrl('add_to_single_chat'))
      .query(this.getQuery(query))
      .then(this.parse.bind(this));
  }
}
export default Space;