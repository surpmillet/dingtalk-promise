/**
 * Created by michao on 16/7/28.
 */
import request from 'superagent';
class Token {
  createdAt;
  content;

  constructor(corpId, corpSecret, expireIn = 7200, req = request) {
    this.corpId = corpId;
    this.corpSecret = corpSecret;
    this.expireIn = expireIn;
    this.request = req;
  }

  isExpired(timestamp) {
    return timestamp - this.createdAt >= this.expireIn;
  }

  valueOf() {
    return {'access_token': this.content}
  }

  getAccessToken(options = {'corpId': this.corpId, 'corpSecret': this.corpSecret}) {
    if (this.content && !this.isExpired(Date.now())) {
      return Promise.resolve(this.valueOf());
    }
    return this.request('https://oapi.dingtalk.com/gettoken?corpid=' + options.corpId + '&corpsecret=' + options.corpSecret)
      .then((data)=> {
        this.createdAt = Date.now();
        this.content = data.body.access_token;
        return this.valueOf();
      });
  };
}

export default Token;
