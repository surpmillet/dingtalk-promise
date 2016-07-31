/**
 * Created by michao on 16/7/26.
 */
var Token = require('../lib/token').default;
var Ticket = require('../lib/ticket').default;
var should = require('should');
var corpId = process.env.corpId;
var corpSecret = process.env.corpSecret;

describe('凭证接口', function () {
  var ticket = new Ticket();
  var options;
  before('获取口令 access_token', function () {
    var token = new Token(corpId, corpSecret);
    return token.getAccessToken().then((data)=> {
      options = data;
    });
  });

  it('获取凭证 getTicket', function () {
    return ticket.getTicket(options).then((data)=> {
      return data.jsapi_ticket.should.exist;
    });
  });

});
