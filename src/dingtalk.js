/**
 * Created by michao on 16/7/25.
 */
import Token from './token';
import Ticket from './ticket';
import User from './user';
import Department from './department';
import Chat from './chat';
import Media from './media';
import File from './file';
import Space from './space';
import Service from './service';
class DingTalk {

  constructor(corpId, corpSecret, expireIn = 7200 * 1000, request) {
    this.timeout = expireIn;
    this.token = new Token(corpId, corpSecret, expireIn, request);
    this.ticket = new Ticket(null, expireIn, request);
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

  createUser() {
    return new User({service: this, basePath: 'user'});
  }

  createDepartment() {
    return new Department({service: this, basePath: 'department'});
  }

  createChat() {
    return new Chat({service: this, basePath: 'chat'});
  }

  createMedia() {
    return new Media({service: this, basePath: 'media'});
  }

  createFile() {
    return new File({service: this, basePath: 'file'});
  }

  createSpace() {
    return new Space({service: this, basePath: 'cspace'});
  }
}

export default DingTalk;
