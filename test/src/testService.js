/**
 * Created by michao on 16/7/28.
 */
describe('服务接口', function () {
    it('获取随机串 getNonceString', function () {
        return Service.getNonceString().should.not.be.empty;
    });
});
