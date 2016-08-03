/**
 * Created by michao on 16/8/2.
 */
describe('空间接口', function () {
  var spaceid;
  it('获取ID', function () {
    return dt.createSpace().getSpaceId()
      .then((data)=> {
        spaceid = data.spaceid;
        console.log(spaceid);
        return data.errcode.should.equal(0);
      });
  });

  it('发送文件到会话', function () {
    var space = dt.createSpace();
    return dt.createUser().getDetail({name: '倪昕超'})
      .then((data)=> {
        return {
          agent_id: process.env.agentid,
          media_id: process.env.fileid,
          userid: data[0].userid,
          file_name: 'test.jpg'
        };
      })
      .then(space.sendToChat.bind(space))
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });
});