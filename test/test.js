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
before(function () {
  dt = new Dingtalk(corpId, corpSecret);
  return dt.run().then((data)=> {
    dt.watch();
    token = dt.token;
    ticket = dt.ticket;
    dept = dt.department;
    user = dt.user;
    chat = dt.chat;
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
    // this.skip();
    return chat.update({chatid, name: '新测试群'})
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
});

/**
 * Created by michao on 16/7/28.
 */
describe('服务接口', function () {
  it('获取随机串 getNonceString', function () {
    return Service.getNonceString().should.not.be.empty;
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
describe('用户接口', function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHVwLmpzIiwidGVzdENoYXQuanMiLCJ0ZXN0RGVwYXJ0bWVudC5qcyIsInRlc3RTZXJ2aWNlLmpzIiwidGVzdFRpY2tldC5qcyIsInRlc3RUb2tlbi5qcyIsInRlc3RVc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMS5cbiAqL1xudmFyIHNob3VsZCA9IHJlcXVpcmUoJ3Nob3VsZCcpO1xudmFyIERpbmd0YWxrID0gcmVxdWlyZSgnLi4vbGliL2Rpbmd0YWxrJykuZGVmYXVsdDtcbnZhciBjb3JwSWQgPSBwcm9jZXNzLmVudi5jb3JwSWQ7XG52YXIgY29ycFNlY3JldCA9IHByb2Nlc3MuZW52LmNvcnBTZWNyZXQ7XG52YXIgU2VydmljZSA9IHJlcXVpcmUoJy4uL2xpYi9zZXJ2aWNlJykuZGVmYXVsdDtcbnZhciBkdDtcbnZhciB0b2tlbjtcbnZhciB0aWNrZXQ7XG52YXIgZGVwdDtcbnZhciB1c2VyO1xudmFyIGNoYXQ7XG5iZWZvcmUoZnVuY3Rpb24gKCkge1xuICBkdCA9IG5ldyBEaW5ndGFsayhjb3JwSWQsIGNvcnBTZWNyZXQpO1xuICByZXR1cm4gZHQucnVuKCkudGhlbigoZGF0YSk9PiB7XG4gICAgZHQud2F0Y2goKTtcbiAgICB0b2tlbiA9IGR0LnRva2VuO1xuICAgIHRpY2tldCA9IGR0LnRpY2tldDtcbiAgICBkZXB0ID0gZHQuZGVwYXJ0bWVudDtcbiAgICB1c2VyID0gZHQudXNlcjtcbiAgICBjaGF0ID0gZHQuY2hhdDtcbiAgfSk7XG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzEuXG4gKi9cbmRlc2NyaWJlLm9ubHkoJ+iBiuWkqeaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHVzZXJsaXN0O1xuICB2YXIgY2hhdGlkID0gcHJvY2Vzcy5lbnYuY2hhdElkO1xuICBiZWZvcmUoJ+mFjee9rua1i+ivlScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIHtkZXBhcnRtZW50X2lkOiBkYXRhLmRlcGFydG1lbnRbMV0uaWR9O1xuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIuZ2V0U2ltcGxlTGlzdC5iaW5kKHVzZXIpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB1c2VybGlzdCA9IGRhdGEudXNlcmxpc3Q7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCfliJvlu7rkvJror50nLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5za2lwKCk7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcIm5hbWVcIjogXCLmtYvor5XnvqRcIixcbiAgICAgIFwib3duZXJcIjogdXNlcmxpc3RbMF0udXNlcmlkLFxuICAgICAgXCJ1c2VyaWRsaXN0XCI6IFt1c2VybGlzdFswXS51c2VyaWQsIHVzZXJsaXN0WzJdLnVzZXJpZF1cbiAgICB9O1xuICAgIHJldHVybiBjaGF0LmNyZWF0ZShvcHRpb25zKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBjaGF0aWQgPSBkYXRhLmNoYXRpZDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGl0KCfkv67mlLnkvJror50nLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gdGhpcy5za2lwKCk7XG4gICAgcmV0dXJuIGNoYXQudXBkYXRlKHtjaGF0aWQsIG5hbWU6ICfmlrDmtYvor5XnvqQnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMC5cbiAqL1xuZGVzY3JpYmUoJ+mDqOmXqOaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkO1xuICB2YXIgbGlzdDtcbiAgaXQoJ+iOt+WPlumDqOmXqOWIl+ihqCBnZXRMaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuZ2V0TGlzdCgpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIGxpc3QgPSBkYXRhLmRlcGFydG1lbnQ7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bpg6jpl6jor6bmg4UgZ2V0RGV0YWlsJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmdldERldGFpbCh7aWQ6IGxpc3RbMV0uaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5Yib5bu66YOo6ZeoIGNyZWF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5jcmVhdGUoe3BhcmVudGlkOiBsaXN0WzBdLmlkLCAnbmFtZSc6ICfmtYvor5UnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgaWQgPSBkYXRhLmlkO1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5pu05paw6YOo6ZeoIHVwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC51cGRhdGUoe2lkOiBpZCwgbmFtZTogJ+aWsOa1i+ivlSd9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5Yig6Zmk6YOo6ZeoIGRlbGV0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5yZW1vdmUoe2lkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8yOC5cbiAqL1xuZGVzY3JpYmUoJ+acjeWKoeaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgaXQoJ+iOt+WPlumaj+acuuS4siBnZXROb25jZVN0cmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gU2VydmljZS5nZXROb25jZVN0cmluZygpLnNob3VsZC5ub3QuYmUuZW1wdHk7XG4gIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjYuXG4gKi9cbmRlc2NyaWJlKCflh63or4HmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBvcHRpb25zO1xuICBiZWZvcmUoJ+iOt+WPluWPo+S7pCBhY2Nlc3NfdG9rZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRva2VuLmdldEFjY2Vzc1Rva2VuKCkudGhlbigoZGF0YSk9PiB7XG4gICAgICBvcHRpb25zID0gZGF0YTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPluWHreivgSBnZXRUaWNrZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRpY2tldC5nZXRUaWNrZXQob3B0aW9ucykudGhlbigoZGF0YSk9PiB7XG4gICAgICByZXR1cm4gZGF0YS5qc2FwaV90aWNrZXQuc2hvdWxkLmV4aXN0O1xuICAgIH0pO1xuICB9KTtcblxufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjYuXG4gKi9cbmRlc2NyaWJlKCflj6Pku6TmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIGl0KCfojrflj5blj6Pku6QgZ2V0QWNjZXNzVG9rZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRva2VuLmdldEFjY2Vzc1Rva2VuKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGRhdGEuYWNjZXNzX3Rva2VuLnNob3VsZC5leGlzdDtcbiAgICB9KVxuICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMwLlxuICovXG5kZXNjcmliZSgn55So5oi35o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgaWQ7XG4gIHZhciB1c2VybGlzdDtcbiAgdmFyIHVzZXJpZDtcbiAgdmFyIG5hbWU7XG4gIGJlZm9yZSgn6I635Y+W6YOo6ZeoSUQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuZ2V0TGlzdCgpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBpZCA9IGRhdGEuZGVwYXJ0bWVudFsxXS5pZDtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ+iOt+WPlumDqOmXqOaIkOWRmOWIl+ihqCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci5nZXRTaW1wbGVMaXN0KHtkZXBhcnRtZW50X2lkOiBpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHVzZXJsaXN0ID0gZGF0YS51c2VybGlzdDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPlumDqOmXqOaIkOWRmOWIl+ihqOivpuaDhScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci5nZXRMaXN0KHtkZXBhcnRtZW50X2lkOiBpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bmiJDlkZjor6bmg4UnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIuZ2V0RGV0YWlsKHt1c2VyaWQ6IHVzZXJsaXN0WzBdLnVzZXJpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliJvlu7rmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcIm5hbWVcIjogXCLlvKDkuIlcIixcbiAgICAgIFwibW9iaWxlXCI6IFwiMTU5MTMyMTU0MjFcIixcbiAgICAgIFwiZGVwYXJ0bWVudFwiOiBbaWRdXG4gICAgfTtcbiAgICByZXR1cm4gdXNlci5jcmVhdGUob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgdXNlcmlkID0gZGF0YS51c2VyaWQ7XG4gICAgICAgIHJldHVybiB7dXNlcmlkfTtcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyLmdldERldGFpbC5iaW5kKHVzZXIpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBuYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pXG4gIH0pO1xuXG4gIGl0KCfmm7TmlrDmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIudXBkYXRlKHt1c2VyaWQsIG5hbWUsIHBvc2l0aW9uOiAn5rWL6K+VJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfliKDpmaTmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVzZXIucmVtb3ZlKHt1c2VyaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn5om56YeP5Yig6Zmk5oiQ5ZGYJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgXCJuYW1lXCI6IFwi5byg5LiJXCIsXG4gICAgICBcIm1vYmlsZVwiOiBcIjE1OTEzMjE1NDIxXCIsXG4gICAgICBkZXBhcnRtZW50OiBbaWRdXG4gICAgfTtcbiAgICByZXR1cm4gdXNlci5jcmVhdGUob3B0aW9ucylcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIHt1c2VyaWRsaXN0OiBbZGF0YS51c2VyaWRdfTtcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyLnJlbW92ZUFsbC5iaW5kKHVzZXIpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pXG4gIH0pXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
