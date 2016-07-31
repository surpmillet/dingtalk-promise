/**
 * Created by michao on 16/7/28.
 */
import crypto from 'crypto';
import _ from 'lodash';
class Service {
  static getNonceString() {
    return crypto.pseudoRandomBytes(16).toString();
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
