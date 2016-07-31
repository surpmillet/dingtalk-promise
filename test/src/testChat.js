/**
 * Created by michao on 16/7/31.
 */
describe('聊天接口', function () {
  var userlist;
  var chatid = process.env.chatId;
  before('配置测试', function () {
    return dept.getList()
      .then((data)=> {
        return {department_id: data.department[1].id};
      })
      .then(user.getSimpleList.bind(user))
      .then((data)=> {
        userlist = data.userlist;
      });
  });
  it('创建会话', function () {
    this.skip();
    var options = {
      "name": "测试群",
      "owner": userlist[0].userid,
      "useridlist": [userlist[0].userid, userlist[2].userid]
    };
    return chat.create(options)
      .then((data)=> {
        chatid = data.chatid;
        return data.errcode.should.equal(0);
      });
  });
  it('修改会话', function () {
    this.skip();
    return chat.update({chatid, name: '新测试群'})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it.only('发送文本消息', function () {
    var options = {
      "chatid": chatid,
      "sender": userlist[0].userid,
      "msgtype": "text",
      "text": {
        "content": "这是一条自动测试消息,不需要回复!"
      }
    };
    return chat.send(options)
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it.only('发送文本消息', function () {
    var options = {
      "chatid": chatid,
      "sender": userlist[0].userid,
      "msgtype": "text",
      "text": {
        "content": "这是一条自动测试消息,不需要回复!"
      }
    };
    return chat.send(options)
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });
});
