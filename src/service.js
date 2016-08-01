/**
 * Created by michao on 16/7/28.
 */
import crypto from 'crypto';
import _ from 'lodash';
class Service {
  static getNonceString(num = 16) {
    return crypto.pseudoRandomBytes(num).toString();
  }

  static getNonceSecurityString(num = 16) {
    var pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    var results = [];
    for (let i = 0; i < num; i++) {
      results[i] = pool.charAt(Math.floor(Math.random() * pool.length));
    }
    return results.join('');
  }

  static getSignature(noncestr, timestamp, jsapi_ticket, url) {
    var arr = _.map({noncestr, timestamp, jsapi_ticket, url}, (value, key)=> {
      return {key: key, value: value};
    });
    var data = _.sortBy(arr, 'key').map((o)=> {
      return o.key + '=' + o.value;
    }).join('&');
    var hash = crypto.createHash('sha1');
    return hash.update(data).digest('hex');
  }
}

export default Service;
