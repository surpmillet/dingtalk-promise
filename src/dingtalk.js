/**
 * Created by michao on 16/7/25.
 */
import Token from './token';
import Ticket from './ticket';
import User from './user';
import Department from './department';
import Service from './service';
class DingTalk {

  constructor(corpId, corpSecret, expireIn = 7200 * 1000, request) {
    this.timeout = expireIn;
    this.token = new Token(corpId, corpSecret, expireIn, request);
    this.ticket = new Ticket(null, expireIn, request);
    this.user = new User({service: this, name: 'user'});
    this.department = new Department({service: this, name: 'department'});
    this.Service = Service;
  }

  getAccessToken() {
    return this.token.content;
  };

  getTicket() {
    return this.ticket.content;
  }

  getSignature(nonce, timestamp, url) {
    return this.Service.getSignature(nonce, timestamp, this.getTicket(), url);
  }

  run() {
    return this.token.getAccessToken()
      .then(this.ticket.getTicket.bind(this.ticket));
  }

  watch() {
    setInterval(()=> {
      this.token.getAccessToken()
        .then(this.ticket.getTicket.bind(this.ticket));
    }, this.timeout);
  }
}

export default DingTalk;
