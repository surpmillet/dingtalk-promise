/**
 * Created by michao on 16/7/31.
 */
describe.skip('聊天接口', function () {
  var dept = dt.createDepartment();
  var user = dt.createUser();
  var chat = dt.createChat();
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

  it('发送文本消息', function () {
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

  it('发送链接消息', function () {
    var options = {
      "chatid": chatid,
      "sender": userlist[0].userid,
      "msgtype": "link",
      "link": {
        "title": "测试",
        "text": "测试",
        "picUrl": "http://a.hiphotos.baidu.com/news/crop%3D31%2C3%2C1329%2C798%3Bw%3D638/sign=f18c9d57384e251ff6b8beb89ab5f83b/71cf3bc79f3df8dc61b8b0fcc511728b461028d1.jpg",
        "messageUrl": "http://luochao.baijia.baidu.com/article/563629"
      }
    };
    return chat.send(options)
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('发送OA消息', function () {
    var options = {
      "chatid": chatid,
      "sender": userlist[0].userid,
      "msgtype": "oa",
      "oa": {
        "head": {
          "bgcolor": "FFBBBBBB",
          "text": "头部标题"
        },
        "message_url": "http://luochao.baijia.baidu.com/article/563629",
        "pc_message_url": "http://luochao.baijia.baidu.com/article/563629",
        "body": {
          "title": "正文标题",
          "form": [
            {
              "key": "姓名:",
              "value": userlist[2].name
            },
            {
              "key": "编号:",
              "value": userlist[2].userid
            },
            {
              "key": "身高:",
              "value": "1.8米"
            },
            {
              "key": "体重:",
              "value": "130斤"
            },
            {
              "key": "爱好:",
              "value": "打球、听音乐"
            }
          ],
          "rich": {
            "num": "15.6",
            "unit": "空管币"
          },
          "content": "测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本",
          "image": "@lADOADmaWMzazQKA",
          "file_count": "3",
          "author": "李四 "
        }
      }
    };
    return chat.send(options)
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });
});
