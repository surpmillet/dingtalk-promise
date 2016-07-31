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
    before('配置测试', function () {
        return dept.getList()
            .then((data)=> {
                console.log(data);
            });
    });
    it('创建会话', function () {
        // var options = {
        //     "name": "测试群",
        //     "owner": "zhangsan",
        //     "useridlist": ["zhangsan", "lisi"]
        // };
        // return dept.getList()
        //     .then((data)=> {
        //         return data.department[0].id;
        //     });
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
describe.only('用户接口', function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHVwLmpzIiwidGVzdENoYXQuanMiLCJ0ZXN0RGVwYXJ0bWVudC5qcyIsInRlc3RTZXJ2aWNlLmpzIiwidGVzdFRpY2tldC5qcyIsInRlc3RUb2tlbi5qcyIsInRlc3RVc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMS5cbiAqL1xudmFyIHNob3VsZCA9IHJlcXVpcmUoJ3Nob3VsZCcpO1xudmFyIERpbmd0YWxrID0gcmVxdWlyZSgnLi4vbGliL2Rpbmd0YWxrJykuZGVmYXVsdDtcbnZhciBjb3JwSWQgPSBwcm9jZXNzLmVudi5jb3JwSWQ7XG52YXIgY29ycFNlY3JldCA9IHByb2Nlc3MuZW52LmNvcnBTZWNyZXQ7XG52YXIgU2VydmljZSA9IHJlcXVpcmUoJy4uL2xpYi9zZXJ2aWNlJykuZGVmYXVsdDtcbnZhciBkdDtcbnZhciB0b2tlbjtcbnZhciB0aWNrZXQ7XG52YXIgZGVwdDtcbnZhciB1c2VyO1xudmFyIGNoYXQ7XG5iZWZvcmUoZnVuY3Rpb24gKCkge1xuICAgIGR0ID0gbmV3IERpbmd0YWxrKGNvcnBJZCwgY29ycFNlY3JldCk7XG4gICAgcmV0dXJuIGR0LnJ1bigpLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBkdC53YXRjaCgpO1xuICAgICAgICB0b2tlbiA9IGR0LnRva2VuO1xuICAgICAgICB0aWNrZXQgPSBkdC50aWNrZXQ7XG4gICAgICAgIGRlcHQgPSBkdC5kZXBhcnRtZW50O1xuICAgICAgICB1c2VyID0gZHQudXNlcjtcbiAgICAgICAgY2hhdCA9IGR0LmNoYXQ7XG4gICAgfSk7XG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzEuXG4gKi9cbmRlc2NyaWJlKCfogYrlpKnmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gICAgYmVmb3JlKCfphY3nva7mtYvor5UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgaXQoJ+WIm+W7uuS8muivnScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIC8vICAgICBcIm5hbWVcIjogXCLmtYvor5XnvqRcIixcbiAgICAgICAgLy8gICAgIFwib3duZXJcIjogXCJ6aGFuZ3NhblwiLFxuICAgICAgICAvLyAgICAgXCJ1c2VyaWRsaXN0XCI6IFtcInpoYW5nc2FuXCIsIFwibGlzaVwiXVxuICAgICAgICAvLyB9O1xuICAgICAgICAvLyByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgICAgLy8gICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gZGF0YS5kZXBhcnRtZW50WzBdLmlkO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMC5cbiAqL1xuZGVzY3JpYmUoJ+mDqOmXqOaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIGxpc3Q7XG4gICAgaXQoJ+iOt+WPlumDqOmXqOWIl+ihqCBnZXRMaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIGxpc3QgPSBkYXRhLmRlcGFydG1lbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCfojrflj5bpg6jpl6jor6bmg4UgZ2V0RGV0YWlsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGVwdC5nZXREZXRhaWwoe2lkOiBsaXN0WzFdLmlkfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ+WIm+W7uumDqOmXqCBjcmVhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZXB0LmNyZWF0ZSh7cGFyZW50aWQ6IGxpc3RbMF0uaWQsICduYW1lJzogJ+a1i+ivlSd9KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIGlkID0gZGF0YS5pZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ+abtOaWsOmDqOmXqCB1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZXB0LnVwZGF0ZSh7aWQ6IGlkLCBuYW1lOiAn5paw5rWL6K+VJ30pXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCfliKDpmaTpg6jpl6ggZGVsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGVwdC5yZW1vdmUoe2lkfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjguXG4gKi9cbmRlc2NyaWJlKCfmnI3liqHmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ+iOt+WPlumaj+acuuS4siBnZXROb25jZVN0cmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFNlcnZpY2UuZ2V0Tm9uY2VTdHJpbmcoKS5zaG91bGQubm90LmJlLmVtcHR5O1xuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjYuXG4gKi9cbmRlc2NyaWJlKCflh63or4HmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnM7XG4gICAgYmVmb3JlKCfojrflj5blj6Pku6QgYWNjZXNzX3Rva2VuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdG9rZW4uZ2V0QWNjZXNzVG9rZW4oKS50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCfojrflj5blh63or4EgZ2V0VGlja2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGlja2V0LmdldFRpY2tldChvcHRpb25zKS50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmpzYXBpX3RpY2tldC5zaG91bGQuZXhpc3Q7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8yNi5cbiAqL1xuZGVzY3JpYmUoJ+WPo+S7pOaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgn6I635Y+W5Y+j5LukIGdldEFjY2Vzc1Rva2VuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdG9rZW4uZ2V0QWNjZXNzVG9rZW4oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YS5hY2Nlc3NfdG9rZW4uc2hvdWxkLmV4aXN0O1xuICAgICAgICB9KVxuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzAuXG4gKi9cbmRlc2NyaWJlLm9ubHkoJ+eUqOaIt+aOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIHVzZXJsaXN0O1xuICAgIHZhciB1c2VyaWQ7XG4gICAgdmFyIG5hbWU7XG4gICAgYmVmb3JlKCfojrflj5bpg6jpl6hJRCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRlcHQuZ2V0TGlzdCgpXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkID0gZGF0YS5kZXBhcnRtZW50WzFdLmlkO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgaXQoJ+iOt+WPlumDqOmXqOaIkOWRmOWIl+ihqCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHVzZXIuZ2V0U2ltcGxlTGlzdCh7ZGVwYXJ0bWVudF9pZDogaWR9KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHVzZXJsaXN0ID0gZGF0YS51c2VybGlzdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ+iOt+WPlumDqOmXqOaIkOWRmOWIl+ihqOivpuaDhScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHVzZXIuZ2V0TGlzdCh7ZGVwYXJ0bWVudF9pZDogaWR9KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgn6I635Y+W5oiQ5ZGY6K+m5oOFJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdXNlci5nZXREZXRhaWwoe3VzZXJpZDogdXNlcmxpc3RbMF0udXNlcmlkfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ+WIm+W7uuaIkOWRmCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCLlvKDkuIlcIixcbiAgICAgICAgICAgIFwibW9iaWxlXCI6IFwiMTU5MTMyMTU0MjFcIixcbiAgICAgICAgICAgIFwiZGVwYXJ0bWVudFwiOiBbaWRdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB1c2VyLmNyZWF0ZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHVzZXJpZCA9IGRhdGEudXNlcmlkO1xuICAgICAgICAgICAgICAgIHJldHVybiB7dXNlcmlkfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyLmdldERldGFpbC5iaW5kKHVzZXIpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgaXQoJ+abtOaWsOaIkOWRmCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHVzZXIudXBkYXRlKHt1c2VyaWQsIG5hbWUsIHBvc2l0aW9uOiAn5rWL6K+VJ30pXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCfliKDpmaTmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB1c2VyLnJlbW92ZSh7dXNlcmlkfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ+aJuemHj+WIoOmZpOaIkOWRmCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCLlvKDkuIlcIixcbiAgICAgICAgICAgIFwibW9iaWxlXCI6IFwiMTU5MTMyMTU0MjFcIixcbiAgICAgICAgICAgIGRlcGFydG1lbnQ6IFtpZF1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHVzZXIuY3JlYXRlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt1c2VyaWRsaXN0OiBbZGF0YS51c2VyaWRdfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyLnJlbW92ZUFsbC5iaW5kKHVzZXIpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICAgICAgfSlcbiAgICB9KVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
