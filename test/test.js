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

  // it('发送文本消息', function () {
  //   // this.skip();
  //   return chat.update({chatid, name: '新测试群'})
  //     .then((data)=> {
  //       return data.errcode.should.equal(0);
  //     });
  // });
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

  it.only('获取子部门列表', function () {
    return dept.getId({name: '青年创客西安小组'})
      .then(dept.getBranches.bind(dept))
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHVwLmpzIiwidGVzdENoYXQuanMiLCJ0ZXN0RGVwYXJ0bWVudC5qcyIsInRlc3RTZXJ2aWNlLmpzIiwidGVzdFRpY2tldC5qcyIsInRlc3RUb2tlbi5qcyIsInRlc3RVc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzEuXG4gKi9cbnZhciBzaG91bGQgPSByZXF1aXJlKCdzaG91bGQnKTtcbnZhciBEaW5ndGFsayA9IHJlcXVpcmUoJy4uL2xpYi9kaW5ndGFsaycpLmRlZmF1bHQ7XG52YXIgY29ycElkID0gcHJvY2Vzcy5lbnYuY29ycElkO1xudmFyIGNvcnBTZWNyZXQgPSBwcm9jZXNzLmVudi5jb3JwU2VjcmV0O1xudmFyIFNlcnZpY2UgPSByZXF1aXJlKCcuLi9saWIvc2VydmljZScpLmRlZmF1bHQ7XG52YXIgZHQ7XG52YXIgdG9rZW47XG52YXIgdGlja2V0O1xudmFyIGRlcHQ7XG52YXIgdXNlcjtcbnZhciBjaGF0O1xuYmVmb3JlKGZ1bmN0aW9uICgpIHtcbiAgZHQgPSBuZXcgRGluZ3RhbGsoY29ycElkLCBjb3JwU2VjcmV0KTtcbiAgcmV0dXJuIGR0LnJ1bigpLnRoZW4oKGRhdGEpPT4ge1xuICAgIGR0LndhdGNoKCk7XG4gICAgdG9rZW4gPSBkdC50b2tlbjtcbiAgICB0aWNrZXQgPSBkdC50aWNrZXQ7XG4gICAgZGVwdCA9IGR0LmRlcGFydG1lbnQ7XG4gICAgdXNlciA9IGR0LnVzZXI7XG4gICAgY2hhdCA9IGR0LmNoYXQ7XG4gIH0pO1xufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5kZXNjcmliZSgn6IGK5aSp5o6l5Y+jJywgZnVuY3Rpb24gKCkge1xuICB2YXIgdXNlcmxpc3Q7XG4gIHZhciBjaGF0aWQgPSBwcm9jZXNzLmVudi5jaGF0SWQ7XG4gIGJlZm9yZSgn6YWN572u5rWL6K+VJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4ge2RlcGFydG1lbnRfaWQ6IGRhdGEuZGVwYXJ0bWVudFsxXS5pZH07XG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlci5nZXRTaW1wbGVMaXN0LmJpbmQodXNlcikpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHVzZXJsaXN0ID0gZGF0YS51c2VybGlzdDtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ+WIm+W7uuS8muivnScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNraXAoKTtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIFwibmFtZVwiOiBcIua1i+ivlee+pFwiLFxuICAgICAgXCJvd25lclwiOiB1c2VybGlzdFswXS51c2VyaWQsXG4gICAgICBcInVzZXJpZGxpc3RcIjogW3VzZXJsaXN0WzBdLnVzZXJpZCwgdXNlcmxpc3RbMl0udXNlcmlkXVxuICAgIH07XG4gICAgcmV0dXJuIGNoYXQuY3JlYXRlKG9wdGlvbnMpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIGNoYXRpZCA9IGRhdGEuY2hhdGlkO1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgaXQoJ+S/ruaUueS8muivnScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNraXAoKTtcbiAgICByZXR1cm4gY2hhdC51cGRhdGUoe2NoYXRpZCwgbmFtZTogJ+aWsOa1i+ivlee+pCd9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICAvLyBpdCgn5Y+R6YCB5paH5pys5raI5oGvJywgZnVuY3Rpb24gKCkge1xuICAvLyAgIC8vIHRoaXMuc2tpcCgpO1xuICAvLyAgIHJldHVybiBjaGF0LnVwZGF0ZSh7Y2hhdGlkLCBuYW1lOiAn5paw5rWL6K+V576kJ30pXG4gIC8vICAgICAudGhlbigoZGF0YSk9PiB7XG4gIC8vICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAvLyAgICAgfSk7XG4gIC8vIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzAuXG4gKi9cbmRlc2NyaWJlKCfpg6jpl6jmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZDtcbiAgdmFyIGxpc3Q7XG4gIGl0KCfojrflj5bpg6jpl6jliJfooaggZ2V0TGl0JywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBsaXN0ID0gZGF0YS5kZXBhcnRtZW50O1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W6YOo6Zeo6K+m5oOFIGdldERldGFpbCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXREZXRhaWwoe2lkOiBsaXN0WzFdLmlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WIm+W7uumDqOmXqCBjcmVhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuY3JlYXRlKHtwYXJlbnRpZDogbGlzdFswXS5pZCwgJ25hbWUnOiAn5rWL6K+VJ30pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIGlkID0gZGF0YS5pZDtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+abtOaWsOmDqOmXqCB1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQudXBkYXRlKHtpZDogaWQsIG5hbWU6ICfmlrDmtYvor5UnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WIoOmZpOmDqOmXqCBkZWxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQucmVtb3ZlKHtpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfojrflj5bpg6jpl6hJRCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRJZCh7bmFtZTogJ+mdkuW5tOWIm+Wuouilv+WuieWwj+e7hCd9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdC5vbmx5KCfojrflj5blrZDpg6jpl6jliJfooagnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlcHQuZ2V0SWQoe25hbWU6ICfpnZLlubTliJvlrqLopb/lronlsI/nu4QnfSlcbiAgICAgIC50aGVuKGRlcHQuZ2V0QnJhbmNoZXMuYmluZChkZXB0KSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8yOC5cbiAqL1xuZGVzY3JpYmUoJ+acjeWKoeaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgaXQoJ+iOt+WPlumaj+acuuS4siBnZXROb25jZVN0cmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gU2VydmljZS5nZXROb25jZVN0cmluZygpLnNob3VsZC5ub3QuYmUuZW1wdHk7XG4gIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjYuXG4gKi9cbmRlc2NyaWJlKCflh63or4HmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBvcHRpb25zO1xuICBiZWZvcmUoJ+iOt+WPluWPo+S7pCBhY2Nlc3NfdG9rZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRva2VuLmdldEFjY2Vzc1Rva2VuKCkudGhlbigoZGF0YSk9PiB7XG4gICAgICBvcHRpb25zID0gZGF0YTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPluWHreivgSBnZXRUaWNrZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRpY2tldC5nZXRUaWNrZXQob3B0aW9ucykudGhlbigoZGF0YSk9PiB7XG4gICAgICByZXR1cm4gZGF0YS5qc2FwaV90aWNrZXQuc2hvdWxkLmV4aXN0O1xuICAgIH0pO1xuICB9KTtcblxufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjYuXG4gKi9cbmRlc2NyaWJlKCflj6Pku6TmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIGl0KCfojrflj5blj6Pku6QgZ2V0QWNjZXNzVG9rZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRva2VuLmdldEFjY2Vzc1Rva2VuKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGRhdGEuYWNjZXNzX3Rva2VuLnNob3VsZC5leGlzdDtcbiAgICB9KVxuICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMwLlxuICovXG5kZXNjcmliZS5za2lwKCfnlKjmiLfmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZDtcbiAgdmFyIHVzZXJsaXN0O1xuICB2YXIgdXNlcmlkO1xuICB2YXIgbmFtZTtcbiAgYmVmb3JlKCfojrflj5bpg6jpl6hJRCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGlkID0gZGF0YS5kZXBhcnRtZW50WzFdLmlkO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgn6I635Y+W6YOo6Zeo5oiQ5ZGY5YiX6KGoJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1c2VyLmdldFNpbXBsZUxpc3Qoe2RlcGFydG1lbnRfaWQ6IGlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgdXNlcmxpc3QgPSBkYXRhLnVzZXJsaXN0O1xuICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIH0pO1xuICB9KTtcblxuICBpdCgn6I635Y+W6YOo6Zeo5oiQ5ZGY5YiX6KGo6K+m5oOFJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1c2VyLmdldExpc3Qoe2RlcGFydG1lbnRfaWQ6IGlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+iOt+WPluaIkOWRmOivpuaDhScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci5nZXREZXRhaWwoe3VzZXJpZDogdXNlcmxpc3RbMF0udXNlcmlkfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WIm+W7uuaIkOWRmCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIFwibmFtZVwiOiBcIuW8oOS4iVwiLFxuICAgICAgXCJtb2JpbGVcIjogXCIxNTkxMzIxNTQyMVwiLFxuICAgICAgXCJkZXBhcnRtZW50XCI6IFtpZF1cbiAgICB9O1xuICAgIHJldHVybiB1c2VyLmNyZWF0ZShvcHRpb25zKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB1c2VyaWQgPSBkYXRhLnVzZXJpZDtcbiAgICAgICAgcmV0dXJuIHt1c2VyaWR9O1xuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIuZ2V0RGV0YWlsLmJpbmQodXNlcikpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIG5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSlcbiAgfSk7XG5cbiAgaXQoJ+abtOaWsOaIkOWRmCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci51cGRhdGUoe3VzZXJpZCwgbmFtZSwgcG9zaXRpb246ICfmtYvor5UnfSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ+WIoOmZpOaIkOWRmCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdXNlci5yZW1vdmUoe3VzZXJpZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCfmibnph4/liKDpmaTmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBcIm5hbWVcIjogXCLlvKDkuIlcIixcbiAgICAgIFwibW9iaWxlXCI6IFwiMTU5MTMyMTU0MjFcIixcbiAgICAgIGRlcGFydG1lbnQ6IFtpZF1cbiAgICB9O1xuICAgIHJldHVybiB1c2VyLmNyZWF0ZShvcHRpb25zKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4ge3VzZXJpZGxpc3Q6IFtkYXRhLnVzZXJpZF19O1xuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIucmVtb3ZlQWxsLmJpbmQodXNlcikpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSlcbiAgfSlcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
