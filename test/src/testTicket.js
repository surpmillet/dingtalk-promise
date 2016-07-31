/**
 * Created by michao on 16/7/26.
 */
describe('凭证接口', function () {
  var options;
  before('获取口令 access_token', function () {
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
