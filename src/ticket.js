/**
 * Created by michao on 16/7/28.
 */
import request from 'superagent';
class Ticket {
  createdAt;
  content;

  constructor(access_token, expireIn = 7200, req = request) {
    this.access_token = access_token;
    this.expireIn = expireIn;
    this.request = req;
  }

  isExpired(timestamp) {
    return timestamp - this.createdAt >= this.expireIn;
  }

  valueOf() {
    return {'jsapi_ticket': this.content};
  }

  getTicket(options) {
    if (this.content && !this.isExpired(Date.now())) {
      return Promise.resolve(this.valueOf());
    }
    return this.request('https://oapi.dingtalk.com/get_jsapi_ticket?type=jsapi&access_token=' + options.access_token)
      .then((data)=> {
        this.createdAt = Date.now();
        this.content = data.body.ticket;
        return this.valueOf();
      });
  };
}
export default Ticket;
