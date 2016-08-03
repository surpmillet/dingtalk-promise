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
    // return dept.getList()
    //   .then((data)=> {
    //     return id = data.department[1].id;
    //   });
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

  it.only('通过name获取成员详情', function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHVwLmpzIiwidGVzdENoYXQuanMiLCJ0ZXN0RGVwYXJ0bWVudC5qcyIsInRlc3RGaWxlLmpzIiwidGVzdE1lZGlhLmpzIiwidGVzdFNlcnZpY2UuanMiLCJ0ZXN0U3BhY2UuanMiLCJ0ZXN0VGlja2V0LmpzIiwidGVzdFRva2VuLmpzIiwidGVzdFVzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMS5cbiAqL1xudmFyIHNob3VsZCA9IHJlcXVpcmUoJ3Nob3VsZCcpO1xudmFyIERpbmd0YWxrID0gcmVxdWlyZSgnLi4vbGliL2Rpbmd0YWxrJykuZGVmYXVsdDtcbnZhciBjb3JwSWQgPSBwcm9jZXNzLmVudi5jb3JwSWQ7XG52YXIgY29ycFNlY3JldCA9IHByb2Nlc3MuZW52LmNvcnBTZWNyZXQ7XG52YXIgZHQgPSBuZXcgRGluZ3RhbGsoY29ycElkLCBjb3JwU2VjcmV0KTtcbmJlZm9yZShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBkdC5ydW4oKS50aGVuKChkYXRhKT0+IHtcbiAgICBkdC53YXRjaCgpO1xuICB9KTtcbn0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMS5cbiAqL1xuZGVzY3JpYmUoJ+iBiuWkqeaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRlcHQgPSBkdC5jcmVhdGVEZXBhcnRtZW50KCk7XG4gIHZhciB1c2VyID0gZHQuY3JlYXRlVXNlcigpO1xuICB2YXIgY2hhdCA9IGR0LmNyZWF0ZUNoYXQoKTtcbiAgdmFyIHVzZXJsaXN0O1xuICB2YXIgY2hhdGlkO1xuICBiZWZvcmUoJ+mFjee9rua1i+ivlScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIHtkZXBhcnRtZW50X2lkOiBkYXRhLmRlcGFydG1lbnRbMV0uaWR9O1xuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIuZ2V0U2ltcGxlTGlzdC5iaW5kKHVzZXIpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB1c2VybGlzdCA9IGRhdGEudXNlcmxpc3Q7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCfliJvlu7rkvJror50nLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gdGhpcy5za2lwKCk7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcIm5hbWVcIjogXCLmtYvor5XnvqRcIixcbiAgICAgIFwib3duZXJcIjogdXNlcmxpc3RbMF0udXNlcmlkLFxuICAgICAgXCJ1c2VyaWRsaXN0XCI6IFt1c2VybGlzdFswXS51c2VyaWQsIHVzZXJsaXN0WzJdLnVzZXJpZF1cbiAgICB9O1xuICAgIHJldHVybiBjaGF0LmNyZWF0ZShvcHRpb25zKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBjaGF0aWQgPSBkYXRhLmNoYXRpZDtcbiAgICAgICAgY29uc29sZS5sb2coY2hhdGlkKTtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCfkv67mlLnkvJror50nLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gdGhpcy5za2lwKCk7XG4gICAgcmV0dXJuIGNoYXQudXBkYXRlKHtjaGF0aWQsIG5hbWU6ICfmlrDmtYvor5XnvqQnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WPkemAgeaWh+acrOa2iOaBrycsIGZ1bmN0aW9uICgpIHtcbiAgICBjaGF0aWQgPSBwcm9jZXNzLmVudi5jaGF0SWQ7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcImNoYXRpZFwiOiBjaGF0aWQsXG4gICAgICBcInNlbmRlclwiOiB1c2VybGlzdFswXS51c2VyaWQsXG4gICAgICBcIm1zZ3R5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICBcInRleHRcIjoge1xuICAgICAgICBcImNvbnRlbnRcIjogXCLov5nmmK/kuIDmnaHoh6rliqjmtYvor5Xmtojmga8s5LiN6ZyA6KaB5Zue5aSNIVwiXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gY2hhdC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCflj5HpgIHpk77mjqXmtojmga8nLCBmdW5jdGlvbiAoKSB7XG4gICAgY2hhdGlkID0gcHJvY2Vzcy5lbnYuY2hhdElkO1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgXCJjaGF0aWRcIjogY2hhdGlkLFxuICAgICAgXCJzZW5kZXJcIjogdXNlcmxpc3RbMF0udXNlcmlkLFxuICAgICAgXCJtc2d0eXBlXCI6IFwibGlua1wiLFxuICAgICAgXCJsaW5rXCI6IHtcbiAgICAgICAgXCJ0aXRsZVwiOiBcIua1i+ivlVwiLFxuICAgICAgICBcInRleHRcIjogXCLmtYvor5VcIixcbiAgICAgICAgXCJwaWNVcmxcIjogXCJodHRwOi8vYS5oaXBob3Rvcy5iYWlkdS5jb20vbmV3cy9jcm9wJTNEMzElMkMzJTJDMTMyOSUyQzc5OCUzQnclM0Q2Mzgvc2lnbj1mMThjOWQ1NzM4NGUyNTFmZjZiOGJlYjg5YWI1ZjgzYi83MWNmM2JjNzlmM2RmOGRjNjFiOGIwZmNjNTExNzI4YjQ2MTAyOGQxLmpwZ1wiLFxuICAgICAgICBcIm1lc3NhZ2VVcmxcIjogXCJodHRwOi8vbHVvY2hhby5iYWlqaWEuYmFpZHUuY29tL2FydGljbGUvNTYzNjI5XCJcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjaGF0LnNlbmQob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WPkemAgU9B5raI5oGvJywgZnVuY3Rpb24gKCkge1xuICAgIGNoYXRpZCA9IHByb2Nlc3MuZW52LmNoYXRJZDtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIFwiY2hhdGlkXCI6IGNoYXRpZCxcbiAgICAgIFwic2VuZGVyXCI6IHVzZXJsaXN0WzBdLnVzZXJpZCxcbiAgICAgIFwibXNndHlwZVwiOiBcIm9hXCIsXG4gICAgICBcIm9hXCI6IHtcbiAgICAgICAgXCJoZWFkXCI6IHtcbiAgICAgICAgICBcImJnY29sb3JcIjogXCJGRkJCQkJCQlwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIuWktOmDqOagh+mimFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibWVzc2FnZV91cmxcIjogXCJodHRwOi8vbHVvY2hhby5iYWlqaWEuYmFpZHUuY29tL2FydGljbGUvNTYzNjI5XCIsXG4gICAgICAgIFwicGNfbWVzc2FnZV91cmxcIjogXCJodHRwOi8vbHVvY2hhby5iYWlqaWEuYmFpZHUuY29tL2FydGljbGUvNTYzNjI5XCIsXG4gICAgICAgIFwiYm9keVwiOiB7XG4gICAgICAgICAgXCJ0aXRsZVwiOiBcIuato+aWh+agh+mimFwiLFxuICAgICAgICAgIFwiZm9ybVwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwia2V5XCI6IFwi5aeT5ZCNOlwiLFxuICAgICAgICAgICAgICBcInZhbHVlXCI6IHVzZXJsaXN0WzJdLm5hbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwia2V5XCI6IFwi57yW5Y+3OlwiLFxuICAgICAgICAgICAgICBcInZhbHVlXCI6IHVzZXJsaXN0WzJdLnVzZXJpZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJrZXlcIjogXCLouqvpq5g6XCIsXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogXCIxLjjnsbNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJrZXlcIjogXCLkvZPph406XCIsXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogXCIxMzDmlqRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJrZXlcIjogXCLniLHlpb06XCIsXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmiZPnkIPjgIHlkKzpn7PkuZBcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJyaWNoXCI6IHtcbiAgICAgICAgICAgIFwibnVtXCI6IFwiMTUuNlwiLFxuICAgICAgICAgICAgXCJ1bml0XCI6IFwi56m6566h5biBXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY29udGVudFwiOiBcIua1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrFwiLFxuICAgICAgICAgIFwiaW1hZ2VcIjogXCJAbEFET0FEbWFXTXphelFLQVwiLFxuICAgICAgICAgIFwiZmlsZV9jb3VudFwiOiBcIjNcIixcbiAgICAgICAgICBcImF1dGhvclwiOiBcIuadjuWbmyBcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gY2hhdC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzAuXG4gKi9cbmRlc2NyaWJlKCfpg6jpl6jmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBkZXB0ID0gZHQuY3JlYXRlRGVwYXJ0bWVudCgpO1xuICB2YXIgaWQ7XG4gIHZhciBsaXN0O1xuICBiZWZvcmUoJ+mFjee9rua1i+ivlScsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUT0RPOlNldHVwXG4gIH0pO1xuICBpdCgn6I635Y+W6YOo6Zeo5YiX6KGoIGdldExpdCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgbGlzdCA9IGRhdGEuZGVwYXJ0bWVudDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPlumDqOmXqOivpuaDhSBnZXREZXRhaWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuZ2V0RGV0YWlsKHtpZDogbGlzdFsxXS5pZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliJvlu7rpg6jpl6ggY3JlYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmNyZWF0ZSh7cGFyZW50aWQ6IGxpc3RbMF0uaWQsICduYW1lJzogJ+a1i+ivlSd9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBpZCA9IGRhdGEuaWQ7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfmm7TmlrDpg6jpl6ggdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LnVwZGF0ZSh7aWQ6IGlkLCBuYW1lOiAn5paw5rWL6K+VJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliKDpmaTpg6jpl6ggZGVsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LnJlbW92ZSh7aWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W6YOo6ZeoSUQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuZ2V0SWQoe25hbWU6ICfpnZLlubTliJvlrqLopb/lronlsI/nu4QnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPluWtkOmDqOmXqOWIl+ihqCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRJZCh7bmFtZTogJ+mdkuW5tOWIm+Wuouilv+WuieWwj+e7hCd9KVxuICAgICAgLnRoZW4oZGVwdC5nZXRCcmFuY2hlcy5iaW5kKGRlcHQpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi84LzIuXG4gKi9cbmRlc2NyaWJlKCfpkonnm5jmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBmaWxlID0gZHQuY3JlYXRlRmlsZSgpO1xuICB2YXIgdXBsb2FkaWQ7XG4gIHZhciBmaWxlaWQ7XG4gIGJlZm9yZSgn6YWN572u5rWL6K+VJywgZnVuY3Rpb24gKCkge1xuICAgIC8vIFRPRE86IHNldHVwXG4gIH0pO1xuICBpdCgn6aKE5Yib5bu65paH5Lu2JywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBmaWxlcGF0aCA9IHByb2Nlc3MuZW52LmZpbGVwYXRoO1xuICAgIHJldHVybiBmaWxlLmdldEZpbGVTaXplKGZpbGVwYXRoKVxuICAgICAgLnRoZW4oZmlsZS5nZXRVcGxvYWRJZC5iaW5kKGZpbGUpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB1cGxvYWRpZCA9IGRhdGEudXBsb2FkaWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKGB1cGxvYWRpZDoke3VwbG9hZGlkfWApO1xuICAgICAgICBkYXRhLmNvZGUuc2hvdWxkLmVxdWFsKCcwJyk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+S4iuS8oOaWh+S7ticsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyB0aGlzLnNraXAoKTtcbiAgICB2YXIgZmlsZXBhdGggPSBwcm9jZXNzLmVudi5maWxlcGF0aDtcbiAgICByZXR1cm4gZmlsZS51cGxvYWQoZmlsZXBhdGgpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIGZpbGVpZCA9IGRhdGEuZmlsZXBhdGg7XG4gICAgICAgIGNvbnNvbGUubG9nKGBmaWxlaWQ6JHtmaWxlaWR9YCk7XG4gICAgICAgIGRhdGEuY29kZS5zaG91bGQuZXF1YWwoJzAnKTtcbiAgICAgIH0pO1xuICB9KTtcbn0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMS5cbiAqL1xuZGVzY3JpYmUoJ+WkmuWqkuS9k+aOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lZGlhID0gZHQuY3JlYXRlTWVkaWEoKTtcbiAgdmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gIHZhciBtZWRpYV9pZDtcbiAgYmVmb3JlKCfphY3nva7mtYvor5UnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETzogc2V0dXBcbiAgfSk7XG4gIGl0KCfkuIrkvKDlqpLkvZMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGVwYXRoID0gcHJvY2Vzcy5lbnYuZmlsZXBhdGg7XG4gICAgcmV0dXJuIG1lZGlhLnVwbG9hZChmaWxlcGF0aClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgbWVkaWFfaWQgPSBkYXRhLm1lZGlhX2lkO1xuICAgICAgICBjb25zb2xlLmxvZyhtZWRpYV9pZCk7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfkuIvovb3lqpLkvZMnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gdmFyIG1lZGlhX2lkID0gcHJvY2Vzcy5lbnYubWVkaWFpZDtcbiAgICB2YXIgZGlyID0gcGF0aC5kaXJuYW1lKHByb2Nlc3MuZW52LmZpbGVwYXRoKTtcbiAgICByZXR1cm4gbWVkaWEuZG93bmxvYWQobWVkaWFfaWQsIGRpcilcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pXG4gIH0pO1xufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI4LlxuICovXG5kZXNjcmliZSgn5pyN5Yqh5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgU2VydmljZSA9IGR0LlNlcnZpY2U7XG4gIGJlZm9yZSgn6YWN572u5rWL6K+VJywgZnVuY3Rpb24gKCkge1xuICAgIC8vIFRPRE86IHNldHVwXG4gIH0pO1xuICBpdCgn6I635Y+W6ZqP5py65LiyIGdldE5vbmNlU3RyaW5nJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHIgPSBTZXJ2aWNlLmdldE5vbmNlU3RyaW5nKCk7XG4gICAgcmV0dXJuIHN0ci5zaG91bGQubm90LmJlLmVtcHR5O1xuICB9KTtcblxuICBpdCgn6I635Y+W6ZqP5py65a2X56ym5LiyIGdldE5vbmNlU2VjdXJpdHlTdHJpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0ciA9IFNlcnZpY2UuZ2V0Tm9uY2VTZWN1cml0eVN0cmluZygpO1xuICAgIHJldHVybiBzdHIuc2hvdWxkLm5vdC5iZS5lbXB0eTtcbiAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvOC8yLlxuICovXG5kZXNjcmliZSgn56m66Ze05o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgc3BhY2VpZDtcbiAgaXQoJ+iOt+WPlklEJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkdC5jcmVhdGVTcGFjZSgpLmdldFNwYWNlSWQoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBzcGFjZWlkID0gZGF0YS5zcGFjZWlkO1xuICAgICAgICBjb25zb2xlLmxvZyhzcGFjZWlkKTtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WPkemAgeaWh+S7tuWIsOS8muivnScsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIGFnZW50X2lkOiBwcm9jZXNzLmVudi5hZ2VudGlkLFxuICAgICAgdXNlcmlkOiBwcm9jZXNzLmVudi51c2VyaWQsXG4gICAgICBtZWRpYV9pZDogcHJvY2Vzcy5lbnYuZmlsZWlkLFxuICAgICAgZmlsZV9uYW1lOiAndGVzdC5qcGcnXG4gICAgfTtcbiAgICByZXR1cm4gZHQuY3JlYXRlU3BhY2UoKS5zZW5kVG9DaGF0KG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI2LlxuICovXG5kZXNjcmliZSgn5Yet6K+B5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgb3B0aW9ucztcbiAgYmVmb3JlKCfojrflj5blj6Pku6QgYWNjZXNzX3Rva2VuJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkdC50b2tlbi5nZXRBY2Nlc3NUb2tlbigpLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgb3B0aW9ucyA9IGRhdGE7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5blh63or4EgZ2V0VGlja2V0JywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkdC50aWNrZXQuZ2V0VGlja2V0KG9wdGlvbnMpLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgcmV0dXJuIGRhdGEuanNhcGlfdGlja2V0LnNob3VsZC5leGlzdDtcbiAgICB9KTtcbiAgfSk7XG5cbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI2LlxuICovXG5kZXNjcmliZSgn5Y+j5Luk5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICBpdCgn6I635Y+W5Y+j5LukIGdldEFjY2Vzc1Rva2VuJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkdC50b2tlbi5nZXRBY2Nlc3NUb2tlbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBkYXRhLmFjY2Vzc190b2tlbi5zaG91bGQuZXhpc3Q7XG4gICAgfSlcbiAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMC5cbiAqL1xuZGVzY3JpYmUoJ+eUqOaIt+aOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRlcHQgPSBkdC5jcmVhdGVEZXBhcnRtZW50KCk7XG4gIHZhciB1c2VyID0gZHQuY3JlYXRlVXNlcigpO1xuICB2YXIgaWQ7XG4gIHZhciB1c2VybGlzdDtcbiAgdmFyIHVzZXJpZDtcbiAgdmFyIG5hbWU7XG4gIGJlZm9yZSgn6I635Y+W6YOo6ZeoSUQnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gcmV0dXJuIGRlcHQuZ2V0TGlzdCgpXG4gICAgLy8gICAudGhlbigoZGF0YSk9PiB7XG4gICAgLy8gICAgIHJldHVybiBpZCA9IGRhdGEuZGVwYXJ0bWVudFsxXS5pZDtcbiAgICAvLyAgIH0pO1xuICB9KTtcbiAgaXQoJ+iOt+WPlumDqOmXqOaIkOWRmOWIl+ihqCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci5nZXRTaW1wbGVMaXN0KHtkZXBhcnRtZW50X2lkOiBpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHVzZXJsaXN0ID0gZGF0YS51c2VybGlzdDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPlumDqOmXqOaIkOWRmOWIl+ihqOivpuaDhScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci5nZXRMaXN0KHtkZXBhcnRtZW50X2lkOiBpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bmiJDlkZjor6bmg4UnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIuZ2V0RGV0YWlsKHt1c2VyaWQ6IHVzZXJsaXN0WzBdLnVzZXJpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0Lm9ubHkoJ+mAmui/h25hbWXojrflj5bmiJDlkZjor6bmg4UnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIuZ2V0RGV0YWlsKHtuYW1lOiAn57Gz6LaFJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliJvlu7rmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcIm5hbWVcIjogXCLlvKDkuIlcIixcbiAgICAgIFwibW9iaWxlXCI6IFwiMTU5MTMyMTU0MjFcIixcbiAgICAgIFwiZGVwYXJ0bWVudFwiOiBbaWRdXG4gICAgfTtcbiAgICByZXR1cm4gdXNlci5jcmVhdGUob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgdXNlcmlkID0gZGF0YS51c2VyaWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHVzZXJpZCk7XG4gICAgICAgIHJldHVybiB7dXNlcmlkfTtcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyLmdldERldGFpbC5iaW5kKHVzZXIpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBuYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pXG4gIH0pO1xuXG4gIGl0KCfmm7TmlrDmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIudXBkYXRlKHt1c2VyaWQsIG5hbWUsIHBvc2l0aW9uOiAn5rWL6K+VJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliKDpmaTmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIucmVtb3ZlKHt1c2VyaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5om56YeP5Yig6Zmk5oiQ5ZGYJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgXCJuYW1lXCI6IFwi5byg5LiJXCIsXG4gICAgICBcIm1vYmlsZVwiOiBcIjE1OTEzMjE1NDIxXCIsXG4gICAgICBkZXBhcnRtZW50OiBbaWRdXG4gICAgfTtcbiAgICByZXR1cm4gdXNlci5jcmVhdGUob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS51c2VyaWQpO1xuICAgICAgICByZXR1cm4ge3VzZXJpZGxpc3Q6IFtkYXRhLnVzZXJpZF19O1xuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIucmVtb3ZlQWxsLmJpbmQodXNlcikpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSlcbiAgfSlcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
