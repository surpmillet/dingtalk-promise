/**
 * Created by michao on 16/8/2.
 */
describe.only('空间接口', function () {
  var spaceid;
  it('获取ID', function () {
    return dt.createSpace().getSpaceId()
      .then((data)=> {
        spaceid = data.spaceid;
        console.log(spaceid);
        return data.errcode.should.equal(0);
      });
  });
});