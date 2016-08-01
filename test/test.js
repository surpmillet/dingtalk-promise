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
describe.only('聊天接口', function () {
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
describe('多媒体接口', function () {
  var media_id;
  it('上传媒体', function () {
    var options = {
      type: 'image',
      name: 'uploadfile',
      path: '/Users/michao/Downloads/1.jpg'
    };
    return media.upload(options)
      .then((data)=> {
        media_id = data.media_id;
        return data.errcode.should.equal(0);
      })
  })
})
;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHVwLmpzIiwidGVzdENoYXQuanMiLCJ0ZXN0RGVwYXJ0bWVudC5qcyIsInRlc3RNZWRpYS5qcyIsInRlc3RTZXJ2aWNlLmpzIiwidGVzdFRpY2tldC5qcyIsInRlc3RUb2tlbi5qcyIsInRlc3RVc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG52YXIgc2hvdWxkID0gcmVxdWlyZSgnc2hvdWxkJyk7XG52YXIgRGluZ3RhbGsgPSByZXF1aXJlKCcuLi9saWIvZGluZ3RhbGsnKS5kZWZhdWx0O1xudmFyIGNvcnBJZCA9IHByb2Nlc3MuZW52LmNvcnBJZDtcbnZhciBjb3JwU2VjcmV0ID0gcHJvY2Vzcy5lbnYuY29ycFNlY3JldDtcbnZhciBTZXJ2aWNlID0gcmVxdWlyZSgnLi4vbGliL3NlcnZpY2UnKS5kZWZhdWx0O1xudmFyIGR0O1xudmFyIHRva2VuO1xudmFyIHRpY2tldDtcbnZhciBkZXB0O1xudmFyIHVzZXI7XG52YXIgY2hhdDtcbnZhciBtZWRpYTtcbmJlZm9yZShmdW5jdGlvbiAoKSB7XG4gIGR0ID0gbmV3IERpbmd0YWxrKGNvcnBJZCwgY29ycFNlY3JldCk7XG4gIHJldHVybiBkdC5ydW4oKS50aGVuKChkYXRhKT0+IHtcbiAgICBkdC53YXRjaCgpO1xuICAgIHRva2VuID0gZHQudG9rZW47XG4gICAgdGlja2V0ID0gZHQudGlja2V0O1xuICAgIGRlcHQgPSBkdC5kZXBhcnRtZW50O1xuICAgIHVzZXIgPSBkdC51c2VyO1xuICAgIGNoYXQgPSBkdC5jaGF0O1xuICAgIG1lZGlhID0gZHQubWVkaWE7XG4gIH0pO1xufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5kZXNjcmliZS5vbmx5KCfogYrlpKnmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciB1c2VybGlzdDtcbiAgdmFyIGNoYXRpZCA9IHByb2Nlc3MuZW52LmNoYXRJZDtcbiAgYmVmb3JlKCfphY3nva7mtYvor5UnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuZ2V0TGlzdCgpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiB7ZGVwYXJ0bWVudF9pZDogZGF0YS5kZXBhcnRtZW50WzFdLmlkfTtcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyLmdldFNpbXBsZUxpc3QuYmluZCh1c2VyKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgdXNlcmxpc3QgPSBkYXRhLnVzZXJsaXN0O1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgn5Yib5bu65Lya6K+dJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2tpcCgpO1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgXCJuYW1lXCI6IFwi5rWL6K+V576kXCIsXG4gICAgICBcIm93bmVyXCI6IHVzZXJsaXN0WzBdLnVzZXJpZCxcbiAgICAgIFwidXNlcmlkbGlzdFwiOiBbdXNlcmxpc3RbMF0udXNlcmlkLCB1c2VybGlzdFsyXS51c2VyaWRdXG4gICAgfTtcbiAgICByZXR1cm4gY2hhdC5jcmVhdGUob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgY2hhdGlkID0gZGF0YS5jaGF0aWQ7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgn5L+u5pS55Lya6K+dJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2tpcCgpO1xuICAgIHJldHVybiBjaGF0LnVwZGF0ZSh7Y2hhdGlkLCBuYW1lOiAn5paw5rWL6K+V576kJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCflj5HpgIHmlofmnKzmtojmga8nLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcImNoYXRpZFwiOiBjaGF0aWQsXG4gICAgICBcInNlbmRlclwiOiB1c2VybGlzdFswXS51c2VyaWQsXG4gICAgICBcIm1zZ3R5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICBcInRleHRcIjoge1xuICAgICAgICBcImNvbnRlbnRcIjogXCLov5nmmK/kuIDmnaHoh6rliqjmtYvor5Xmtojmga8s5LiN6ZyA6KaB5Zue5aSNIVwiXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gY2hhdC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCflj5HpgIHpk77mjqXmtojmga8nLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcImNoYXRpZFwiOiBjaGF0aWQsXG4gICAgICBcInNlbmRlclwiOiB1c2VybGlzdFswXS51c2VyaWQsXG4gICAgICBcIm1zZ3R5cGVcIjogXCJsaW5rXCIsXG4gICAgICBcImxpbmtcIjoge1xuICAgICAgICBcInRpdGxlXCI6IFwi5rWL6K+VXCIsXG4gICAgICAgIFwidGV4dFwiOiBcIua1i+ivlVwiLFxuICAgICAgICBcInBpY1VybFwiOiBcImh0dHA6Ly9hLmhpcGhvdG9zLmJhaWR1LmNvbS9uZXdzL2Nyb3AlM0QzMSUyQzMlMkMxMzI5JTJDNzk4JTNCdyUzRDYzOC9zaWduPWYxOGM5ZDU3Mzg0ZTI1MWZmNmI4YmViODlhYjVmODNiLzcxY2YzYmM3OWYzZGY4ZGM2MWI4YjBmY2M1MTE3MjhiNDYxMDI4ZDEuanBnXCIsXG4gICAgICAgIFwibWVzc2FnZVVybFwiOiBcImh0dHA6Ly9sdW9jaGFvLmJhaWppYS5iYWlkdS5jb20vYXJ0aWNsZS81NjM2MjlcIlxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGNoYXQuc2VuZChvcHRpb25zKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5Y+R6YCBT0Hmtojmga8nLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcImNoYXRpZFwiOiBjaGF0aWQsXG4gICAgICBcInNlbmRlclwiOiB1c2VybGlzdFswXS51c2VyaWQsXG4gICAgICBcIm1zZ3R5cGVcIjogXCJvYVwiLFxuICAgICAgXCJvYVwiOiB7XG4gICAgICAgIFwiaGVhZFwiOiB7XG4gICAgICAgICAgXCJiZ2NvbG9yXCI6IFwiRkZCQkJCQkJcIixcbiAgICAgICAgICBcInRleHRcIjogXCLlpLTpg6jmoIfpophcIlxuICAgICAgICB9LFxuICAgICAgICBcIm1lc3NhZ2VfdXJsXCI6IFwiaHR0cDovL2x1b2NoYW8uYmFpamlhLmJhaWR1LmNvbS9hcnRpY2xlLzU2MzYyOVwiLFxuICAgICAgICBcInBjX21lc3NhZ2VfdXJsXCI6IFwiaHR0cDovL2x1b2NoYW8uYmFpamlhLmJhaWR1LmNvbS9hcnRpY2xlLzU2MzYyOVwiLFxuICAgICAgICBcImJvZHlcIjoge1xuICAgICAgICAgIFwidGl0bGVcIjogXCLmraPmlofmoIfpophcIixcbiAgICAgICAgICBcImZvcm1cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImtleVwiOiBcIuWnk+WQjTpcIixcbiAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB1c2VybGlzdFsyXS5uYW1lXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImtleVwiOiBcIue8luWPtzpcIixcbiAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB1c2VybGlzdFsyXS51c2VyaWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwia2V5XCI6IFwi6Lqr6auYOlwiLFxuICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMS4457GzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwia2V5XCI6IFwi5L2T6YeNOlwiLFxuICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMTMw5pakXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwia2V5XCI6IFwi54ix5aW9OlwiLFxuICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5omT55CD44CB5ZCs6Z+z5LmQXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwicmljaFwiOiB7XG4gICAgICAgICAgICBcIm51bVwiOiBcIjE1LjZcIixcbiAgICAgICAgICAgIFwidW5pdFwiOiBcIuepuueuoeW4gVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCLmtYvor5XmlofmnKzmtYvor5XmlofmnKzmtYvor5XmlofmnKzmtYvor5XmlofmnKzmtYvor5XmlofmnKzmtYvor5XmlofmnKzmtYvor5XmlofmnKzmtYvor5XmlofmnKzmtYvor5XmlofmnKzmtYvor5XmlofmnKzmtYvor5XmlofmnKxcIixcbiAgICAgICAgICBcImltYWdlXCI6IFwiQGxBRE9BRG1hV016YXpRS0FcIixcbiAgICAgICAgICBcImZpbGVfY291bnRcIjogXCIzXCIsXG4gICAgICAgICAgXCJhdXRob3JcIjogXCLmnY7lm5sgXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGNoYXQuc2VuZChvcHRpb25zKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMwLlxuICovXG5kZXNjcmliZSgn6YOo6Zeo5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgaWQ7XG4gIHZhciBsaXN0O1xuICBpdCgn6I635Y+W6YOo6Zeo5YiX6KGoIGdldExpdCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgbGlzdCA9IGRhdGEuZGVwYXJ0bWVudDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPlumDqOmXqOivpuaDhSBnZXREZXRhaWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuZ2V0RGV0YWlsKHtpZDogbGlzdFsxXS5pZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliJvlu7rpg6jpl6ggY3JlYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmNyZWF0ZSh7cGFyZW50aWQ6IGxpc3RbMF0uaWQsICduYW1lJzogJ+a1i+ivlSd9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBpZCA9IGRhdGEuaWQ7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfmm7TmlrDpg6jpl6ggdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LnVwZGF0ZSh7aWQ6IGlkLCBuYW1lOiAn5paw5rWL6K+VJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliKDpmaTpg6jpl6ggZGVsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LnJlbW92ZSh7aWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W6YOo6ZeoSUQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuZ2V0SWQoe25hbWU6ICfpnZLlubTliJvlrqLopb/lronlsI/nu4QnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPluWtkOmDqOmXqOWIl+ihqCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRJZCh7bmFtZTogJ+mdkuW5tOWIm+Wuouilv+WuieWwj+e7hCd9KVxuICAgICAgLnRoZW4oZGVwdC5nZXRCcmFuY2hlcy5iaW5kKGRlcHQpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5kZXNjcmliZSgn5aSa5aqS5L2T5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgbWVkaWFfaWQ7XG4gIGl0KCfkuIrkvKDlqpLkvZMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgbmFtZTogJ3VwbG9hZGZpbGUnLFxuICAgICAgcGF0aDogJy9Vc2Vycy9taWNoYW8vRG93bmxvYWRzLzEuanBnJ1xuICAgIH07XG4gICAgcmV0dXJuIG1lZGlhLnVwbG9hZChvcHRpb25zKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBtZWRpYV9pZCA9IGRhdGEubWVkaWFfaWQ7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSlcbiAgfSlcbn0pXG47IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI4LlxuICovXG5kZXNjcmliZSgn5pyN5Yqh5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICBpdCgn6I635Y+W6ZqP5py65LiyIGdldE5vbmNlU3RyaW5nJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHIgPSBTZXJ2aWNlLmdldE5vbmNlU3RyaW5nKCk7XG4gICAgcmV0dXJuIHN0ci5zaG91bGQubm90LmJlLmVtcHR5O1xuICB9KTtcblxuICBpdCgn6I635Y+W6ZqP5py65a2X56ym5LiyIGdldE5vbmNlU2VjdXJpdHlTdHJpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0ciA9IFNlcnZpY2UuZ2V0Tm9uY2VTZWN1cml0eVN0cmluZygpO1xuICAgIHJldHVybiBzdHIuc2hvdWxkLm5vdC5iZS5lbXB0eTtcbiAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8yNi5cbiAqL1xuZGVzY3JpYmUoJ+WHreivgeaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIG9wdGlvbnM7XG4gIGJlZm9yZSgn6I635Y+W5Y+j5LukIGFjY2Vzc190b2tlbicsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdG9rZW4uZ2V0QWNjZXNzVG9rZW4oKS50aGVuKChkYXRhKT0+IHtcbiAgICAgIG9wdGlvbnMgPSBkYXRhO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W5Yet6K+BIGdldFRpY2tldCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGlja2V0LmdldFRpY2tldChvcHRpb25zKS50aGVuKChkYXRhKT0+IHtcbiAgICAgIHJldHVybiBkYXRhLmpzYXBpX3RpY2tldC5zaG91bGQuZXhpc3Q7XG4gICAgfSk7XG4gIH0pO1xuXG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8yNi5cbiAqL1xuZGVzY3JpYmUoJ+WPo+S7pOaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgaXQoJ+iOt+WPluWPo+S7pCBnZXRBY2Nlc3NUb2tlbicsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdG9rZW4uZ2V0QWNjZXNzVG9rZW4oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICByZXR1cm4gZGF0YS5hY2Nlc3NfdG9rZW4uc2hvdWxkLmV4aXN0O1xuICAgIH0pXG4gIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzAuXG4gKi9cbmRlc2NyaWJlLnNraXAoJ+eUqOaIt+aOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkO1xuICB2YXIgdXNlcmxpc3Q7XG4gIHZhciB1c2VyaWQ7XG4gIHZhciBuYW1lO1xuICBiZWZvcmUoJ+iOt+WPlumDqOmXqElEJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gaWQgPSBkYXRhLmRlcGFydG1lbnRbMV0uaWQ7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCfojrflj5bpg6jpl6jmiJDlkZjliJfooagnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIuZ2V0U2ltcGxlTGlzdCh7ZGVwYXJ0bWVudF9pZDogaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB1c2VybGlzdCA9IGRhdGEudXNlcmxpc3Q7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bpg6jpl6jmiJDlkZjliJfooajor6bmg4UnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIuZ2V0TGlzdCh7ZGVwYXJ0bWVudF9pZDogaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W5oiQ5ZGY6K+m5oOFJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1c2VyLmdldERldGFpbCh7dXNlcmlkOiB1c2VybGlzdFswXS51c2VyaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5Yib5bu65oiQ5ZGYJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgXCJuYW1lXCI6IFwi5byg5LiJXCIsXG4gICAgICBcIm1vYmlsZVwiOiBcIjE1OTEzMjE1NDIxXCIsXG4gICAgICBcImRlcGFydG1lbnRcIjogW2lkXVxuICAgIH07XG4gICAgcmV0dXJuIHVzZXIuY3JlYXRlKG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHVzZXJpZCA9IGRhdGEudXNlcmlkO1xuICAgICAgICByZXR1cm4ge3VzZXJpZH07XG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlci5nZXREZXRhaWwuYmluZCh1c2VyKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgbmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KVxuICB9KTtcblxuICBpdCgn5pu05paw5oiQ5ZGYJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1c2VyLnVwZGF0ZSh7dXNlcmlkLCBuYW1lLCBwb3NpdGlvbjogJ+a1i+ivlSd9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5Yig6Zmk5oiQ5ZGYJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1c2VyLnJlbW92ZSh7dXNlcmlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+aJuemHj+WIoOmZpOaIkOWRmCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIFwibmFtZVwiOiBcIuW8oOS4iVwiLFxuICAgICAgXCJtb2JpbGVcIjogXCIxNTkxMzIxNTQyMVwiLFxuICAgICAgZGVwYXJ0bWVudDogW2lkXVxuICAgIH07XG4gICAgcmV0dXJuIHVzZXIuY3JlYXRlKG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiB7dXNlcmlkbGlzdDogW2RhdGEudXNlcmlkXX07XG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlci5yZW1vdmVBbGwuYmluZCh1c2VyKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KVxuICB9KVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
