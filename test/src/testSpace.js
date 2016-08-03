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
    var options = {
      agent_id: process.env.agentid,
      userid: process.env.userid,
      media_id: process.env.fileid,
      file_name: 'test.jpg'
    };
    return dt.createSpace().sendToChat(options)
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });
});