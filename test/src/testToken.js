/**
 * Created by michao on 16/7/26.
 */
describe('口令接口', function () {
    it('获取口令 getAccessToken', function () {
        return token.getAccessToken().then((data) => {
            return data.access_token.should.exist;
        })
    });
});
