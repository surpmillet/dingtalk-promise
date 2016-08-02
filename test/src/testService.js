/**
 * Created by michao on 16/7/28.
 */
describe('服务接口', function () {
  var Service = dt.Service;
  before('配置测试', function () {
    // TODO: setup
  });
  it('获取随机串 getNonceString', function () {
    var str = Service.getNonceString();
    return str.should.not.be.empty;
  });

  it('获取随机字符串 getNonceSecurityString', function () {
    var str = Service.getNonceSecurityString();
    return str.should.not.be.empty;
  });
});
