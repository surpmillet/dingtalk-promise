/**
 * Created by michao on 16/7/31.
 */
var should = require('should');
var Dingtalk = require('../lib/dingtalk').default;
var corpId = process.env.corpId;
var corpSecret = process.env.corpSecret;
var Service = require('../lib/service').default;
var dt;
var token;
var ticket;
var dept;
var user;
var chat;
var media;
before(function () {
  dt = new Dingtalk(corpId, corpSecret);
  return dt.run().then((data)=> {
    dt.watch();
    token = dt.token;
    ticket = dt.ticket;
    dept = dt.department;
    user = dt.user;
    chat = dt.chat;
    media = dt.media;
  });
});
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

/**
 * Created by michao on 16/7/30.
 */
describe('部门接口', function () {
  var id;
  var list;
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
 * Created by michao on 16/7/31.
 */
var path = require('path');
describe.only('多媒体接口', function () {
  var media_id;
  it('上传媒体', function () {
    var filepath = '/Users/michao/Downloads/1.jpg';
    var type = 'image';
    return media.createMedia(filepath)
      .then((data)=> {
        var boundary = Service.getNonceSecurityString();
        var contentType = 'multipart/form-data; boundary=' + boundary;
        var header = `--${boundary}\r\nContent-Disposition:form-data;name=\"media\";filename=\"${path.basename(filepath)}\"\r\nContent-Type:application/octet-stream\r\n\r\n`;
        var headerBuffer = new Buffer(header, 'utf8');
        // var beginBuffer = new Buffer(`--${boundary}\r\n`, 'utf8');
        var endBuffer = new Buffer(`\r\n--${boundary}--\r\n`, 'utf8');
        var buffer = Buffer.concat([headerBuffer, data, endBuffer]);
        return {query: {type, 'media': header}, contentType, buffer};
      })
      .then(media.upload.bind(media))
      .then((data)=> {
        media_id = data.media_id;
        return data.errcode.should.equal(0);
      });
  })
});
/**
 * Created by michao on 16/7/28.
 */
describe('服务接口', function () {
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
 * Created by michao on 16/7/26.
 */
describe('凭证接口', function () {
  var options;
  before('获取口令 access_token', function () {
    return token.getAccessToken().then((data)=> {
      options = data;
    });
  });

  it('获取凭证 getTicket', function () {
    return ticket.getTicket(options).then((data)=> {
      return data.jsapi_ticket.should.exist;
    });
  });

});

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

/**
 * Created by michao on 16/7/30.
 */
describe.skip('用户接口', function () {
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

  it('创建成员', function () {
    var options = {
      "name": "张三",
      "mobile": "15913215421",
      "department": [id]
    };
    return user.create(options)
      .then((data)=> {
        userid = data.userid;
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
        return {useridlist: [data.userid]};
      })
      .then(user.removeAll.bind(user))
      .then((data)=> {
        return data.errcode.should.equal(0);
      })
  })
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHVwLmpzIiwidGVzdENoYXQuanMiLCJ0ZXN0RGVwYXJ0bWVudC5qcyIsInRlc3RNZWRpYS5qcyIsInRlc3RTZXJ2aWNlLmpzIiwidGVzdFRpY2tldC5qcyIsInRlc3RUb2tlbi5qcyIsInRlc3RVc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMS5cbiAqL1xudmFyIHNob3VsZCA9IHJlcXVpcmUoJ3Nob3VsZCcpO1xudmFyIERpbmd0YWxrID0gcmVxdWlyZSgnLi4vbGliL2Rpbmd0YWxrJykuZGVmYXVsdDtcbnZhciBjb3JwSWQgPSBwcm9jZXNzLmVudi5jb3JwSWQ7XG52YXIgY29ycFNlY3JldCA9IHByb2Nlc3MuZW52LmNvcnBTZWNyZXQ7XG52YXIgU2VydmljZSA9IHJlcXVpcmUoJy4uL2xpYi9zZXJ2aWNlJykuZGVmYXVsdDtcbnZhciBkdDtcbnZhciB0b2tlbjtcbnZhciB0aWNrZXQ7XG52YXIgZGVwdDtcbnZhciB1c2VyO1xudmFyIGNoYXQ7XG52YXIgbWVkaWE7XG5iZWZvcmUoZnVuY3Rpb24gKCkge1xuICBkdCA9IG5ldyBEaW5ndGFsayhjb3JwSWQsIGNvcnBTZWNyZXQpO1xuICByZXR1cm4gZHQucnVuKCkudGhlbigoZGF0YSk9PiB7XG4gICAgZHQud2F0Y2goKTtcbiAgICB0b2tlbiA9IGR0LnRva2VuO1xuICAgIHRpY2tldCA9IGR0LnRpY2tldDtcbiAgICBkZXB0ID0gZHQuZGVwYXJ0bWVudDtcbiAgICB1c2VyID0gZHQudXNlcjtcbiAgICBjaGF0ID0gZHQuY2hhdDtcbiAgICBtZWRpYSA9IGR0Lm1lZGlhO1xuICB9KTtcbn0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMS5cbiAqL1xuZGVzY3JpYmUoJ+iBiuWkqeaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHVzZXJsaXN0O1xuICB2YXIgY2hhdGlkID0gcHJvY2Vzcy5lbnYuY2hhdElkO1xuICBiZWZvcmUoJ+mFjee9rua1i+ivlScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIHtkZXBhcnRtZW50X2lkOiBkYXRhLmRlcGFydG1lbnRbMV0uaWR9O1xuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIuZ2V0U2ltcGxlTGlzdC5iaW5kKHVzZXIpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB1c2VybGlzdCA9IGRhdGEudXNlcmxpc3Q7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCfliJvlu7rkvJror50nLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5za2lwKCk7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcIm5hbWVcIjogXCLmtYvor5XnvqRcIixcbiAgICAgIFwib3duZXJcIjogdXNlcmxpc3RbMF0udXNlcmlkLFxuICAgICAgXCJ1c2VyaWRsaXN0XCI6IFt1c2VybGlzdFswXS51c2VyaWQsIHVzZXJsaXN0WzJdLnVzZXJpZF1cbiAgICB9O1xuICAgIHJldHVybiBjaGF0LmNyZWF0ZShvcHRpb25zKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBjaGF0aWQgPSBkYXRhLmNoYXRpZDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCfkv67mlLnkvJror50nLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5za2lwKCk7XG4gICAgcmV0dXJuIGNoYXQudXBkYXRlKHtjaGF0aWQsIG5hbWU6ICfmlrDmtYvor5XnvqQnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WPkemAgeaWh+acrOa2iOaBrycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIFwiY2hhdGlkXCI6IGNoYXRpZCxcbiAgICAgIFwic2VuZGVyXCI6IHVzZXJsaXN0WzBdLnVzZXJpZCxcbiAgICAgIFwibXNndHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwidGV4dFwiOiB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIui/meaYr+S4gOadoeiHquWKqOa1i+ivlea2iOaBryzkuI3pnIDopoHlm57lpI0hXCJcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjaGF0LnNlbmQob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WPkemAgemTvuaOpea2iOaBrycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIFwiY2hhdGlkXCI6IGNoYXRpZCxcbiAgICAgIFwic2VuZGVyXCI6IHVzZXJsaXN0WzBdLnVzZXJpZCxcbiAgICAgIFwibXNndHlwZVwiOiBcImxpbmtcIixcbiAgICAgIFwibGlua1wiOiB7XG4gICAgICAgIFwidGl0bGVcIjogXCLmtYvor5VcIixcbiAgICAgICAgXCJ0ZXh0XCI6IFwi5rWL6K+VXCIsXG4gICAgICAgIFwicGljVXJsXCI6IFwiaHR0cDovL2EuaGlwaG90b3MuYmFpZHUuY29tL25ld3MvY3JvcCUzRDMxJTJDMyUyQzEzMjklMkM3OTglM0J3JTNENjM4L3NpZ249ZjE4YzlkNTczODRlMjUxZmY2YjhiZWI4OWFiNWY4M2IvNzFjZjNiYzc5ZjNkZjhkYzYxYjhiMGZjYzUxMTcyOGI0NjEwMjhkMS5qcGdcIixcbiAgICAgICAgXCJtZXNzYWdlVXJsXCI6IFwiaHR0cDovL2x1b2NoYW8uYmFpamlhLmJhaWR1LmNvbS9hcnRpY2xlLzU2MzYyOVwiXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gY2hhdC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCflj5HpgIFPQea2iOaBrycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIFwiY2hhdGlkXCI6IGNoYXRpZCxcbiAgICAgIFwic2VuZGVyXCI6IHVzZXJsaXN0WzBdLnVzZXJpZCxcbiAgICAgIFwibXNndHlwZVwiOiBcIm9hXCIsXG4gICAgICBcIm9hXCI6IHtcbiAgICAgICAgXCJoZWFkXCI6IHtcbiAgICAgICAgICBcImJnY29sb3JcIjogXCJGRkJCQkJCQlwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIuWktOmDqOagh+mimFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibWVzc2FnZV91cmxcIjogXCJodHRwOi8vbHVvY2hhby5iYWlqaWEuYmFpZHUuY29tL2FydGljbGUvNTYzNjI5XCIsXG4gICAgICAgIFwicGNfbWVzc2FnZV91cmxcIjogXCJodHRwOi8vbHVvY2hhby5iYWlqaWEuYmFpZHUuY29tL2FydGljbGUvNTYzNjI5XCIsXG4gICAgICAgIFwiYm9keVwiOiB7XG4gICAgICAgICAgXCJ0aXRsZVwiOiBcIuato+aWh+agh+mimFwiLFxuICAgICAgICAgIFwiZm9ybVwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwia2V5XCI6IFwi5aeT5ZCNOlwiLFxuICAgICAgICAgICAgICBcInZhbHVlXCI6IHVzZXJsaXN0WzJdLm5hbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwia2V5XCI6IFwi57yW5Y+3OlwiLFxuICAgICAgICAgICAgICBcInZhbHVlXCI6IHVzZXJsaXN0WzJdLnVzZXJpZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJrZXlcIjogXCLouqvpq5g6XCIsXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogXCIxLjjnsbNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJrZXlcIjogXCLkvZPph406XCIsXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogXCIxMzDmlqRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJrZXlcIjogXCLniLHlpb06XCIsXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmiZPnkIPjgIHlkKzpn7PkuZBcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJyaWNoXCI6IHtcbiAgICAgICAgICAgIFwibnVtXCI6IFwiMTUuNlwiLFxuICAgICAgICAgICAgXCJ1bml0XCI6IFwi56m6566h5biBXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY29udGVudFwiOiBcIua1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrOa1i+ivleaWh+acrFwiLFxuICAgICAgICAgIFwiaW1hZ2VcIjogXCJAbEFET0FEbWFXTXphelFLQVwiLFxuICAgICAgICAgIFwiZmlsZV9jb3VudFwiOiBcIjNcIixcbiAgICAgICAgICBcImF1dGhvclwiOiBcIuadjuWbmyBcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gY2hhdC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzAuXG4gKi9cbmRlc2NyaWJlKCfpg6jpl6jmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZDtcbiAgdmFyIGxpc3Q7XG4gIGl0KCfojrflj5bpg6jpl6jliJfooaggZ2V0TGl0JywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBsaXN0ID0gZGF0YS5kZXBhcnRtZW50O1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W6YOo6Zeo6K+m5oOFIGdldERldGFpbCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXREZXRhaWwoe2lkOiBsaXN0WzFdLmlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WIm+W7uumDqOmXqCBjcmVhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuY3JlYXRlKHtwYXJlbnRpZDogbGlzdFswXS5pZCwgJ25hbWUnOiAn5rWL6K+VJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIGlkID0gZGF0YS5pZDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+abtOaWsOmDqOmXqCB1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQudXBkYXRlKHtpZDogaWQsIG5hbWU6ICfmlrDmtYvor5UnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WIoOmZpOmDqOmXqCBkZWxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQucmVtb3ZlKHtpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bpg6jpl6hJRCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRJZCh7bmFtZTogJ+mdkuW5tOWIm+Wuouilv+WuieWwj+e7hCd9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W5a2Q6YOo6Zeo5YiX6KGoJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmdldElkKHtuYW1lOiAn6Z2S5bm05Yib5a6i6KW/5a6J5bCP57uEJ30pXG4gICAgICAudGhlbihkZXB0LmdldEJyYW5jaGVzLmJpbmQoZGVwdCkpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzEuXG4gKi9cbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuZGVzY3JpYmUub25seSgn5aSa5aqS5L2T5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgbWVkaWFfaWQ7XG4gIGl0KCfkuIrkvKDlqpLkvZMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGVwYXRoID0gJy9Vc2Vycy9taWNoYW8vRG93bmxvYWRzLzEuanBnJztcbiAgICB2YXIgdHlwZSA9ICdpbWFnZSc7XG4gICAgcmV0dXJuIG1lZGlhLmNyZWF0ZU1lZGlhKGZpbGVwYXRoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB2YXIgYm91bmRhcnkgPSBTZXJ2aWNlLmdldE5vbmNlU2VjdXJpdHlTdHJpbmcoKTtcbiAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGE7IGJvdW5kYXJ5PScgKyBib3VuZGFyeTtcbiAgICAgICAgdmFyIGhlYWRlciA9IGAtLSR7Ym91bmRhcnl9XFxyXFxuQ29udGVudC1EaXNwb3NpdGlvbjpmb3JtLWRhdGE7bmFtZT1cXFwibWVkaWFcXFwiO2ZpbGVuYW1lPVxcXCIke3BhdGguYmFzZW5hbWUoZmlsZXBhdGgpfVxcXCJcXHJcXG5Db250ZW50LVR5cGU6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXFxyXFxuXFxyXFxuYDtcbiAgICAgICAgdmFyIGhlYWRlckJ1ZmZlciA9IG5ldyBCdWZmZXIoaGVhZGVyLCAndXRmOCcpO1xuICAgICAgICAvLyB2YXIgYmVnaW5CdWZmZXIgPSBuZXcgQnVmZmVyKGAtLSR7Ym91bmRhcnl9XFxyXFxuYCwgJ3V0ZjgnKTtcbiAgICAgICAgdmFyIGVuZEJ1ZmZlciA9IG5ldyBCdWZmZXIoYFxcclxcbi0tJHtib3VuZGFyeX0tLVxcclxcbmAsICd1dGY4Jyk7XG4gICAgICAgIHZhciBidWZmZXIgPSBCdWZmZXIuY29uY2F0KFtoZWFkZXJCdWZmZXIsIGRhdGEsIGVuZEJ1ZmZlcl0pO1xuICAgICAgICByZXR1cm4ge3F1ZXJ5OiB7dHlwZSwgJ21lZGlhJzogaGVhZGVyfSwgY29udGVudFR5cGUsIGJ1ZmZlcn07XG4gICAgICB9KVxuICAgICAgLnRoZW4obWVkaWEudXBsb2FkLmJpbmQobWVkaWEpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBtZWRpYV9pZCA9IGRhdGEubWVkaWFfaWQ7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pXG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjguXG4gKi9cbmRlc2NyaWJlKCfmnI3liqHmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIGl0KCfojrflj5bpmo/mnLrkuLIgZ2V0Tm9uY2VTdHJpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0ciA9IFNlcnZpY2UuZ2V0Tm9uY2VTdHJpbmcoKTtcbiAgICByZXR1cm4gc3RyLnNob3VsZC5ub3QuYmUuZW1wdHk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bpmo/mnLrlrZfnrKbkuLIgZ2V0Tm9uY2VTZWN1cml0eVN0cmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RyID0gU2VydmljZS5nZXROb25jZVNlY3VyaXR5U3RyaW5nKCk7XG4gICAgcmV0dXJuIHN0ci5zaG91bGQubm90LmJlLmVtcHR5O1xuICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI2LlxuICovXG5kZXNjcmliZSgn5Yet6K+B5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgb3B0aW9ucztcbiAgYmVmb3JlKCfojrflj5blj6Pku6QgYWNjZXNzX3Rva2VuJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0b2tlbi5nZXRBY2Nlc3NUb2tlbigpLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgb3B0aW9ucyA9IGRhdGE7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5blh63or4EgZ2V0VGlja2V0JywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aWNrZXQuZ2V0VGlja2V0KG9wdGlvbnMpLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgcmV0dXJuIGRhdGEuanNhcGlfdGlja2V0LnNob3VsZC5leGlzdDtcbiAgICB9KTtcbiAgfSk7XG5cbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI2LlxuICovXG5kZXNjcmliZSgn5Y+j5Luk5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICBpdCgn6I635Y+W5Y+j5LukIGdldEFjY2Vzc1Rva2VuJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0b2tlbi5nZXRBY2Nlc3NUb2tlbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBkYXRhLmFjY2Vzc190b2tlbi5zaG91bGQuZXhpc3Q7XG4gICAgfSlcbiAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMC5cbiAqL1xuZGVzY3JpYmUuc2tpcCgn55So5oi35o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgaWQ7XG4gIHZhciB1c2VybGlzdDtcbiAgdmFyIHVzZXJpZDtcbiAgdmFyIG5hbWU7XG4gIGJlZm9yZSgn6I635Y+W6YOo6ZeoSUQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuZ2V0TGlzdCgpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBpZCA9IGRhdGEuZGVwYXJ0bWVudFsxXS5pZDtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ+iOt+WPlumDqOmXqOaIkOWRmOWIl+ihqCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci5nZXRTaW1wbGVMaXN0KHtkZXBhcnRtZW50X2lkOiBpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHVzZXJsaXN0ID0gZGF0YS51c2VybGlzdDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPlumDqOmXqOaIkOWRmOWIl+ihqOivpuaDhScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci5nZXRMaXN0KHtkZXBhcnRtZW50X2lkOiBpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bmiJDlkZjor6bmg4UnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIuZ2V0RGV0YWlsKHt1c2VyaWQ6IHVzZXJsaXN0WzBdLnVzZXJpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliJvlu7rmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcIm5hbWVcIjogXCLlvKDkuIlcIixcbiAgICAgIFwibW9iaWxlXCI6IFwiMTU5MTMyMTU0MjFcIixcbiAgICAgIFwiZGVwYXJ0bWVudFwiOiBbaWRdXG4gICAgfTtcbiAgICByZXR1cm4gdXNlci5jcmVhdGUob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgdXNlcmlkID0gZGF0YS51c2VyaWQ7XG4gICAgICAgIHJldHVybiB7dXNlcmlkfTtcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyLmdldERldGFpbC5iaW5kKHVzZXIpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBuYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pXG4gIH0pO1xuXG4gIGl0KCfmm7TmlrDmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIudXBkYXRlKHt1c2VyaWQsIG5hbWUsIHBvc2l0aW9uOiAn5rWL6K+VJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliKDpmaTmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIucmVtb3ZlKHt1c2VyaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5om56YeP5Yig6Zmk5oiQ5ZGYJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgXCJuYW1lXCI6IFwi5byg5LiJXCIsXG4gICAgICBcIm1vYmlsZVwiOiBcIjE1OTEzMjE1NDIxXCIsXG4gICAgICBkZXBhcnRtZW50OiBbaWRdXG4gICAgfTtcbiAgICByZXR1cm4gdXNlci5jcmVhdGUob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIHt1c2VyaWRsaXN0OiBbZGF0YS51c2VyaWRdfTtcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyLnJlbW92ZUFsbC5iaW5kKHVzZXIpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pXG4gIH0pXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
