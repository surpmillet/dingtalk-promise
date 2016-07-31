/**
 * Created by michao on 16/7/26.
 */
var Token = require('../lib/token').default;
var should = require('should');

describe('口令接口', function () {
  var corpId = process.env.corpId;
  var corpSecret = process.env.corpSecret;
  var token = new Token(corpId, corpSecret);

  it('获取口令 getAccessToken', function () {
    return token.getAccessToken().then((data) => {
      return data.access_token.should.exist;
    })
  });
});
