/**
 * Created by michao on 16/7/31.
 */
var should = require('should');
var Dingtalk = require('../lib/dingtalk').default;
var corpId = process.env.corpId;
var corpSecret = process.env.corpSecret;
var dt = new Dingtalk(corpId, corpSecret);
before(function () {
  return dt.run().then((data)=> {
    dt.watch();
  });
});
/**
 * Created by michao on 16/7/31.
 */
describe('聊天接口', function () {
  var dept = dt.createDepartment();
  var user = dt.createUser();
  var chat = dt.createChat();
  var userlist;
  var chatid;
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
    // this.skip();
    var options = {
      "name": "测试群",
      "owner": userlist[0].userid,
      "useridlist": [userlist[0].userid, userlist[2].userid]
    };
    return chat.create(options)
      .then((data)=> {
        chatid = data.chatid;
        console.log(chatid);
        return data.errcode.should.equal(0);
      });
  });
  it('修改会话', function () {
    // this.skip();
    return chat.update({chatid, name: '新测试群'})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('发送文本消息', function () {
    chatid = process.env.chatId;
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
    chatid = process.env.chatId;
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
    chatid = process.env.chatId;
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

/**
 * Created by michao on 16/7/30.
 */
describe('部门接口', function () {
  var dept = dt.createDepartment();
  var id;
  var list;
  before('配置测试', function () {
    // TODO:Setup
  });
  it('获取部门列表 getLit', function () {
    return dept.getList()
      .then((data)=> {
        list = data.department;
        return data.errcode.should.equal(0);
      });
  });

  it('获取部门详情 getDetail', function () {
    return dept.getDetail({id: list[1].id})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('创建部门 create', function () {
    return dept.create({parentid: list[0].id, 'name': '测试'})
      .then((data)=> {
        id = data.id;
        return data.errcode.should.equal(0);
      });
  });

  it('更新部门 update', function () {
    return dept.update({id: id, name: '新测试'})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('删除部门 delete', function () {
    return dept.remove({id})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('获取部门ID', function () {
    return dept.getId({name: '青年创客西安小组'})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('获取子部门列表', function () {
    return dept.getId({name: '青年创客西安小组'})
      .then(dept.getBranches.bind(dept))
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });
});

/**
 * Created by michao on 16/8/2.
 */
describe('钉盘接口', function () {
  var file = dt.createFile();
  var uploadid;
  var fileid;
  before('配置测试', function () {
    // TODO: setup
  });
  it('预创建文件', function () {
    var filepath = process.env.filepath;
    return file.getFileSize(filepath)
      .then(file.getUploadId.bind(file))
      .then((data)=> {
        uploadid = data.uploadid;
        console.log(`uploadid:${uploadid}`);
        data.code.should.equal('0');
      });
  });

  it('上传文件', function () {
    // this.skip();
    var filepath = process.env.filepath;
    return file.upload(filepath)
      .then((data)=> {
        fileid = data.filepath;
        console.log(`fileid:${fileid}`);
        data.code.should.equal('0');
      });
  });
});
/**
 * Created by michao on 16/7/31.
 */
describe('多媒体接口', function () {
  var media = dt.createMedia();
  var path = require('path');
  var media_id;
  before('配置测试', function () {
    // TODO: setup
  });
  it('上传媒体', function () {
    var filepath = process.env.filepath;
    return media.upload(filepath)
      .then((data)=> {
        media_id = data.media_id;
        console.log(media_id);
        return data.errcode.should.equal(0);
      });
  });

  it('下载媒体', function () {
    // var media_id = process.env.mediaid;
    var dir = path.dirname(process.env.filepath);
    return media.download(media_id, dir)
      .then((data)=> {
        data.errcode.should.equal(0);
      })
  });
});
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
/**
 * Created by michao on 16/7/26.
 */
describe('凭证接口', function () {
  var options;
  before('获取口令 access_token', function () {
    return dt.token.getAccessToken().then((data)=> {
      options = data;
    });
  });

  it('获取凭证 getTicket', function () {
    return dt.ticket.getTicket(options).then((data)=> {
      return data.jsapi_ticket.should.exist;
    });
  });

});

/**
 * Created by michao on 16/7/26.
 */
describe('口令接口', function () {
  it('获取口令 getAccessToken', function () {
    return dt.token.getAccessToken().then((data) => {
      return data.access_token.should.exist;
    })
  });
});

/**
 * Created by michao on 16/7/30.
 */
describe('用户接口', function () {
  var dept = dt.createDepartment();
  var user = dt.createUser();
  var id;
  var userlist;
  var userid;
  var name;
  before('获取部门ID', function () {
    return dept.getList()
      .then((data)=> {
        return id = data.department[1].id;
      });
  });
  it('获取部门成员列表', function () {
    return user.getSimpleList({department_id: id})
      .then((data)=> {
        userlist = data.userlist;
        return data.errcode.should.equal(0);
      });
  });

  it('获取部门成员列表详情', function () {
    return user.getList({department_id: id})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('获取成员详情', function () {
    return user.getDetail({userid: userlist[0].userid})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('通过name获取成员详情', function () {
    return user.getDetail({name: '米超'})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('创建成员', function () {
    var options = {
      "name": "张三",
      "mobile": "15913215421",
      "department": [id]
    };
    return user.create(options)
      .then((data)=> {
        userid = data.userid;
        console.log(userid);
        return {userid};
      })
      .then(user.getDetail.bind(user))
      .then((data)=> {
        name = data.name;
        return data.errcode.should.equal(0);
      })
  });

  it('更新成员', function () {
    return user.update({userid, name, position: '测试'})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('删除成员', function () {
    return user.remove({userid})
      .then((data)=> {
        return data.errcode.should.equal(0);
      });
  });

  it('批量删除成员', function () {
    var options = {
      "name": "张三",
      "mobile": "15913215421",
      department: [id]
    };
    return user.create(options)
      .then((data)=> {
        console.log(data.userid);
        return {useridlist: [data.userid]};
      })
      .then(user.removeAll.bind(user))
      .then((data)=> {
        return data.errcode.should.equal(0);
      })
  })
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHVwLmpzIiwidGVzdENoYXQuanMiLCJ0ZXN0RGVwYXJ0bWVudC5qcyIsInRlc3RGaWxlLmpzIiwidGVzdE1lZGlhLmpzIiwidGVzdFNlcnZpY2UuanMiLCJ0ZXN0U3BhY2UuanMiLCJ0ZXN0VGlja2V0LmpzIiwidGVzdFRva2VuLmpzIiwidGVzdFVzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG52YXIgc2hvdWxkID0gcmVxdWlyZSgnc2hvdWxkJyk7XG52YXIgRGluZ3RhbGsgPSByZXF1aXJlKCcuLi9saWIvZGluZ3RhbGsnKS5kZWZhdWx0O1xudmFyIGNvcnBJZCA9IHByb2Nlc3MuZW52LmNvcnBJZDtcbnZhciBjb3JwU2VjcmV0ID0gcHJvY2Vzcy5lbnYuY29ycFNlY3JldDtcbnZhciBkdCA9IG5ldyBEaW5ndGFsayhjb3JwSWQsIGNvcnBTZWNyZXQpO1xuYmVmb3JlKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGR0LnJ1bigpLnRoZW4oKGRhdGEpPT4ge1xuICAgIGR0LndhdGNoKCk7XG4gIH0pO1xufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5kZXNjcmliZSgn6IGK5aSp5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgZGVwdCA9IGR0LmNyZWF0ZURlcGFydG1lbnQoKTtcbiAgdmFyIHVzZXIgPSBkdC5jcmVhdGVVc2VyKCk7XG4gIHZhciBjaGF0ID0gZHQuY3JlYXRlQ2hhdCgpO1xuICB2YXIgdXNlcmxpc3Q7XG4gIHZhciBjaGF0aWQ7XG4gIGJlZm9yZSgn6YWN572u5rWL6K+VJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4ge2RlcGFydG1lbnRfaWQ6IGRhdGEuZGVwYXJ0bWVudFsxXS5pZH07XG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlci5nZXRTaW1wbGVMaXN0LmJpbmQodXNlcikpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHVzZXJsaXN0ID0gZGF0YS51c2VybGlzdDtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ+WIm+W7uuS8muivnScsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyB0aGlzLnNraXAoKTtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIFwibmFtZVwiOiBcIua1i+ivlee+pFwiLFxuICAgICAgXCJvd25lclwiOiB1c2VybGlzdFswXS51c2VyaWQsXG4gICAgICBcInVzZXJpZGxpc3RcIjogW3VzZXJsaXN0WzBdLnVzZXJpZCwgdXNlcmxpc3RbMl0udXNlcmlkXVxuICAgIH07XG4gICAgcmV0dXJuIGNoYXQuY3JlYXRlKG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIGNoYXRpZCA9IGRhdGEuY2hhdGlkO1xuICAgICAgICBjb25zb2xlLmxvZyhjaGF0aWQpO1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ+S/ruaUueS8muivnScsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyB0aGlzLnNraXAoKTtcbiAgICByZXR1cm4gY2hhdC51cGRhdGUoe2NoYXRpZCwgbmFtZTogJ+aWsOa1i+ivlee+pCd9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5Y+R6YCB5paH5pys5raI5oGvJywgZnVuY3Rpb24gKCkge1xuICAgIGNoYXRpZCA9IHByb2Nlc3MuZW52LmNoYXRJZDtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIFwiY2hhdGlkXCI6IGNoYXRpZCxcbiAgICAgIFwic2VuZGVyXCI6IHVzZXJsaXN0WzBdLnVzZXJpZCxcbiAgICAgIFwibXNndHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwidGV4dFwiOiB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIui/meaYr+S4gOadoeiHquWKqOa1i+ivlea2iOaBryzkuI3pnIDopoHlm57lpI0hXCJcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjaGF0LnNlbmQob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WPkemAgemTvuaOpea2iOaBrycsIGZ1bmN0aW9uICgpIHtcbiAgICBjaGF0aWQgPSBwcm9jZXNzLmVudi5jaGF0SWQ7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcImNoYXRpZFwiOiBjaGF0aWQsXG4gICAgICBcInNlbmRlclwiOiB1c2VybGlzdFswXS51c2VyaWQsXG4gICAgICBcIm1zZ3R5cGVcIjogXCJsaW5rXCIsXG4gICAgICBcImxpbmtcIjoge1xuICAgICAgICBcInRpdGxlXCI6IFwi5rWL6K+VXCIsXG4gICAgICAgIFwidGV4dFwiOiBcIua1i+ivlVwiLFxuICAgICAgICBcInBpY1VybFwiOiBcImh0dHA6Ly9hLmhpcGhvdG9zLmJhaWR1LmNvbS9uZXdzL2Nyb3AlM0QzMSUyQzMlMkMxMzI5JTJDNzk4JTNCdyUzRDYzOC9zaWduPWYxOGM5ZDU3Mzg0ZTI1MWZmNmI4YmViODlhYjVmODNiLzcxY2YzYmM3OWYzZGY4ZGM2MWI4YjBmY2M1MTE3MjhiNDYxMDI4ZDEuanBnXCIsXG4gICAgICAgIFwibWVzc2FnZVVybFwiOiBcImh0dHA6Ly9sdW9jaGFvLmJhaWppYS5iYWlkdS5jb20vYXJ0aWNsZS81NjM2MjlcIlxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGNoYXQuc2VuZChvcHRpb25zKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5Y+R6YCBT0Hmtojmga8nLCBmdW5jdGlvbiAoKSB7XG4gICAgY2hhdGlkID0gcHJvY2Vzcy5lbnYuY2hhdElkO1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgXCJjaGF0aWRcIjogY2hhdGlkLFxuICAgICAgXCJzZW5kZXJcIjogdXNlcmxpc3RbMF0udXNlcmlkLFxuICAgICAgXCJtc2d0eXBlXCI6IFwib2FcIixcbiAgICAgIFwib2FcIjoge1xuICAgICAgICBcImhlYWRcIjoge1xuICAgICAgICAgIFwiYmdjb2xvclwiOiBcIkZGQkJCQkJCXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwi5aS06YOo5qCH6aKYXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJtZXNzYWdlX3VybFwiOiBcImh0dHA6Ly9sdW9jaGFvLmJhaWppYS5iYWlkdS5jb20vYXJ0aWNsZS81NjM2MjlcIixcbiAgICAgICAgXCJwY19tZXNzYWdlX3VybFwiOiBcImh0dHA6Ly9sdW9jaGFvLmJhaWppYS5iYWlkdS5jb20vYXJ0aWNsZS81NjM2MjlcIixcbiAgICAgICAgXCJib2R5XCI6IHtcbiAgICAgICAgICBcInRpdGxlXCI6IFwi5q2j5paH5qCH6aKYXCIsXG4gICAgICAgICAgXCJmb3JtXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJrZXlcIjogXCLlp5PlkI06XCIsXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogdXNlcmxpc3RbMl0ubmFtZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJrZXlcIjogXCLnvJblj7c6XCIsXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogdXNlcmxpc3RbMl0udXNlcmlkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImtleVwiOiBcIui6q+mrmDpcIixcbiAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjEuOOexs1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImtleVwiOiBcIuS9k+mHjTpcIixcbiAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjEzMOaWpFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImtleVwiOiBcIueIseWlvTpcIixcbiAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaJk+eQg+OAgeWQrOmfs+S5kFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInJpY2hcIjoge1xuICAgICAgICAgICAgXCJudW1cIjogXCIxNS42XCIsXG4gICAgICAgICAgICBcInVuaXRcIjogXCLnqbrnrqHluIFcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjb250ZW50XCI6IFwi5rWL6K+V5paH5pys5rWL6K+V5paH5pys5rWL6K+V5paH5pys5rWL6K+V5paH5pys5rWL6K+V5paH5pys5rWL6K+V5paH5pys5rWL6K+V5paH5pys5rWL6K+V5paH5pys5rWL6K+V5paH5pys5rWL6K+V5paH5pys5rWL6K+V5paH5pysXCIsXG4gICAgICAgICAgXCJpbWFnZVwiOiBcIkBsQURPQURtYVdNemF6UUtBXCIsXG4gICAgICAgICAgXCJmaWxlX2NvdW50XCI6IFwiM1wiLFxuICAgICAgICAgIFwiYXV0aG9yXCI6IFwi5p2O5ZubIFwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjaGF0LnNlbmQob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMC5cbiAqL1xuZGVzY3JpYmUoJ+mDqOmXqOaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRlcHQgPSBkdC5jcmVhdGVEZXBhcnRtZW50KCk7XG4gIHZhciBpZDtcbiAgdmFyIGxpc3Q7XG4gIGJlZm9yZSgn6YWN572u5rWL6K+VJywgZnVuY3Rpb24gKCkge1xuICAgIC8vIFRPRE86U2V0dXBcbiAgfSk7XG4gIGl0KCfojrflj5bpg6jpl6jliJfooaggZ2V0TGl0JywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBsaXN0ID0gZGF0YS5kZXBhcnRtZW50O1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W6YOo6Zeo6K+m5oOFIGdldERldGFpbCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXREZXRhaWwoe2lkOiBsaXN0WzFdLmlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WIm+W7uumDqOmXqCBjcmVhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuY3JlYXRlKHtwYXJlbnRpZDogbGlzdFswXS5pZCwgJ25hbWUnOiAn5rWL6K+VJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIGlkID0gZGF0YS5pZDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+abtOaWsOmDqOmXqCB1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQudXBkYXRlKHtpZDogaWQsIG5hbWU6ICfmlrDmtYvor5UnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WIoOmZpOmDqOmXqCBkZWxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQucmVtb3ZlKHtpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bpg6jpl6hJRCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRJZCh7bmFtZTogJ+mdkuW5tOWIm+Wuouilv+WuieWwj+e7hCd9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W5a2Q6YOo6Zeo5YiX6KGoJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmdldElkKHtuYW1lOiAn6Z2S5bm05Yib5a6i6KW/5a6J5bCP57uEJ30pXG4gICAgICAudGhlbihkZXB0LmdldEJyYW5jaGVzLmJpbmQoZGVwdCkpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzgvMi5cbiAqL1xuZGVzY3JpYmUoJ+mSieebmOaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZpbGUgPSBkdC5jcmVhdGVGaWxlKCk7XG4gIHZhciB1cGxvYWRpZDtcbiAgdmFyIGZpbGVpZDtcbiAgYmVmb3JlKCfphY3nva7mtYvor5UnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETzogc2V0dXBcbiAgfSk7XG4gIGl0KCfpooTliJvlu7rmlofku7YnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGVwYXRoID0gcHJvY2Vzcy5lbnYuZmlsZXBhdGg7XG4gICAgcmV0dXJuIGZpbGUuZ2V0RmlsZVNpemUoZmlsZXBhdGgpXG4gICAgICAudGhlbihmaWxlLmdldFVwbG9hZElkLmJpbmQoZmlsZSkpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHVwbG9hZGlkID0gZGF0YS51cGxvYWRpZDtcbiAgICAgICAgY29uc29sZS5sb2coYHVwbG9hZGlkOiR7dXBsb2FkaWR9YCk7XG4gICAgICAgIGRhdGEuY29kZS5zaG91bGQuZXF1YWwoJzAnKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5LiK5Lyg5paH5Lu2JywgZnVuY3Rpb24gKCkge1xuICAgIC8vIHRoaXMuc2tpcCgpO1xuICAgIHZhciBmaWxlcGF0aCA9IHByb2Nlc3MuZW52LmZpbGVwYXRoO1xuICAgIHJldHVybiBmaWxlLnVwbG9hZChmaWxlcGF0aClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgZmlsZWlkID0gZGF0YS5maWxlcGF0aDtcbiAgICAgICAgY29uc29sZS5sb2coYGZpbGVpZDoke2ZpbGVpZH1gKTtcbiAgICAgICAgZGF0YS5jb2RlLnNob3VsZC5lcXVhbCgnMCcpO1xuICAgICAgfSk7XG4gIH0pO1xufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5kZXNjcmliZSgn5aSa5aqS5L2T5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgbWVkaWEgPSBkdC5jcmVhdGVNZWRpYSgpO1xuICB2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgdmFyIG1lZGlhX2lkO1xuICBiZWZvcmUoJ+mFjee9rua1i+ivlScsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUT0RPOiBzZXR1cFxuICB9KTtcbiAgaXQoJ+S4iuS8oOWqkuS9kycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmlsZXBhdGggPSBwcm9jZXNzLmVudi5maWxlcGF0aDtcbiAgICByZXR1cm4gbWVkaWEudXBsb2FkKGZpbGVwYXRoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBtZWRpYV9pZCA9IGRhdGEubWVkaWFfaWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKG1lZGlhX2lkKTtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+S4i+i9veWqkuS9kycsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyB2YXIgbWVkaWFfaWQgPSBwcm9jZXNzLmVudi5tZWRpYWlkO1xuICAgIHZhciBkaXIgPSBwYXRoLmRpcm5hbWUocHJvY2Vzcy5lbnYuZmlsZXBhdGgpO1xuICAgIHJldHVybiBtZWRpYS5kb3dubG9hZChtZWRpYV9pZCwgZGlyKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSlcbiAgfSk7XG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjguXG4gKi9cbmRlc2NyaWJlKCfmnI3liqHmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBTZXJ2aWNlID0gZHQuU2VydmljZTtcbiAgYmVmb3JlKCfphY3nva7mtYvor5UnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETzogc2V0dXBcbiAgfSk7XG4gIGl0KCfojrflj5bpmo/mnLrkuLIgZ2V0Tm9uY2VTdHJpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0ciA9IFNlcnZpY2UuZ2V0Tm9uY2VTdHJpbmcoKTtcbiAgICByZXR1cm4gc3RyLnNob3VsZC5ub3QuYmUuZW1wdHk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bpmo/mnLrlrZfnrKbkuLIgZ2V0Tm9uY2VTZWN1cml0eVN0cmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RyID0gU2VydmljZS5nZXROb25jZVNlY3VyaXR5U3RyaW5nKCk7XG4gICAgcmV0dXJuIHN0ci5zaG91bGQubm90LmJlLmVtcHR5O1xuICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi84LzIuXG4gKi9cbmRlc2NyaWJlKCfnqbrpl7TmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBzcGFjZWlkO1xuICBpdCgn6I635Y+WSUQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGR0LmNyZWF0ZVNwYWNlKCkuZ2V0U3BhY2VJZCgpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHNwYWNlaWQgPSBkYXRhLnNwYWNlaWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHNwYWNlaWQpO1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5Y+R6YCB5paH5Lu25Yiw5Lya6K+dJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBzcGFjZSA9IGR0LmNyZWF0ZVNwYWNlKCk7XG4gICAgcmV0dXJuIGR0LmNyZWF0ZVVzZXIoKS5nZXREZXRhaWwoe25hbWU6ICflgKrmmJXotoUnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZ2VudF9pZDogcHJvY2Vzcy5lbnYuYWdlbnRpZCxcbiAgICAgICAgICBtZWRpYV9pZDogcHJvY2Vzcy5lbnYuZmlsZWlkLFxuICAgICAgICAgIHVzZXJpZDogZGF0YVswXS51c2VyaWQsXG4gICAgICAgICAgZmlsZV9uYW1lOiAndGVzdC5qcGcnXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLnRoZW4oc3BhY2Uuc2VuZFRvQ2hhdC5iaW5kKHNwYWNlKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjYuXG4gKi9cbmRlc2NyaWJlKCflh63or4HmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBvcHRpb25zO1xuICBiZWZvcmUoJ+iOt+WPluWPo+S7pCBhY2Nlc3NfdG9rZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGR0LnRva2VuLmdldEFjY2Vzc1Rva2VuKCkudGhlbigoZGF0YSk9PiB7XG4gICAgICBvcHRpb25zID0gZGF0YTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPluWHreivgSBnZXRUaWNrZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGR0LnRpY2tldC5nZXRUaWNrZXQob3B0aW9ucykudGhlbigoZGF0YSk9PiB7XG4gICAgICByZXR1cm4gZGF0YS5qc2FwaV90aWNrZXQuc2hvdWxkLmV4aXN0O1xuICAgIH0pO1xuICB9KTtcblxufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjYuXG4gKi9cbmRlc2NyaWJlKCflj6Pku6TmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIGl0KCfojrflj5blj6Pku6QgZ2V0QWNjZXNzVG9rZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGR0LnRva2VuLmdldEFjY2Vzc1Rva2VuKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGRhdGEuYWNjZXNzX3Rva2VuLnNob3VsZC5leGlzdDtcbiAgICB9KVxuICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMwLlxuICovXG5kZXNjcmliZSgn55So5oi35o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgZGVwdCA9IGR0LmNyZWF0ZURlcGFydG1lbnQoKTtcbiAgdmFyIHVzZXIgPSBkdC5jcmVhdGVVc2VyKCk7XG4gIHZhciBpZDtcbiAgdmFyIHVzZXJsaXN0O1xuICB2YXIgdXNlcmlkO1xuICB2YXIgbmFtZTtcbiAgYmVmb3JlKCfojrflj5bpg6jpl6hJRCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGlkID0gZGF0YS5kZXBhcnRtZW50WzFdLmlkO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgn6I635Y+W6YOo6Zeo5oiQ5ZGY5YiX6KGoJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1c2VyLmdldFNpbXBsZUxpc3Qoe2RlcGFydG1lbnRfaWQ6IGlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgdXNlcmxpc3QgPSBkYXRhLnVzZXJsaXN0O1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W6YOo6Zeo5oiQ5ZGY5YiX6KGo6K+m5oOFJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1c2VyLmdldExpc3Qoe2RlcGFydG1lbnRfaWQ6IGlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPluaIkOWRmOivpuaDhScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci5nZXREZXRhaWwoe3VzZXJpZDogdXNlcmxpc3RbMF0udXNlcmlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+mAmui/h25hbWXojrflj5bmiJDlkZjor6bmg4UnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIuZ2V0RGV0YWlsKHtuYW1lOiAn57Gz6LaFJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliJvlu7rmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcIm5hbWVcIjogXCLlvKDkuIlcIixcbiAgICAgIFwibW9iaWxlXCI6IFwiMTU5MTMyMTU0MjFcIixcbiAgICAgIFwiZGVwYXJ0bWVudFwiOiBbaWRdXG4gICAgfTtcbiAgICByZXR1cm4gdXNlci5jcmVhdGUob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgdXNlcmlkID0gZGF0YS51c2VyaWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHVzZXJpZCk7XG4gICAgICAgIHJldHVybiB7dXNlcmlkfTtcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyLmdldERldGFpbC5iaW5kKHVzZXIpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBuYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pXG4gIH0pO1xuXG4gIGl0KCfmm7TmlrDmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIudXBkYXRlKHt1c2VyaWQsIG5hbWUsIHBvc2l0aW9uOiAn5rWL6K+VJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliKDpmaTmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIucmVtb3ZlKHt1c2VyaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5om56YeP5Yig6Zmk5oiQ5ZGYJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgXCJuYW1lXCI6IFwi5byg5LiJXCIsXG4gICAgICBcIm1vYmlsZVwiOiBcIjE1OTEzMjE1NDIxXCIsXG4gICAgICBkZXBhcnRtZW50OiBbaWRdXG4gICAgfTtcbiAgICByZXR1cm4gdXNlci5jcmVhdGUob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS51c2VyaWQpO1xuICAgICAgICByZXR1cm4ge3VzZXJpZGxpc3Q6IFtkYXRhLnVzZXJpZF19O1xuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIucmVtb3ZlQWxsLmJpbmQodXNlcikpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSlcbiAgfSlcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
