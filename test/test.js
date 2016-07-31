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
    it('', function () {
        var options = {
            "name": "测试群",
            "owner": "zhangsan",
            "useridlist": ["zhangsan", "lisi"]
        };
        return dept.getList()
            .then((data)=> {
                return data.department[0].id;
            });
    });
});

/**
 * Created by michao on 16/7/30.
 */
describe('部门接口', function () {
    var id;
    it('获取部门列表 getLit', function () {
        return dept.getList()
            .then((data)=> {
                return data.errcode.should.equal(0);
            });
    });

    it('获取部门详情 getDetail', function () {
        return dept.getList()
            .then((data)=> {
                return {id: data.department[0].id};
            })
            .then(dept.getDetail.bind(dept))
            .then((data)=> {
                return data.errcode.should.equal(0);
            });
    });

    it('创建部门 create', function () {
        var options = {
            "name": '测试',
        };
        return dept.getList()
            .then((data)=> {
                options.parentid = data.department[0].id;
                return options
            }).then(dept.create.bind(dept))
            .then((data)=> {
                id = data.id;
                return data.errcode.should.equal(0);
            });
    });

    it('更新部门 update', function () {
        return dept.getDetail({id})
            .then((data)=> {
                return {id: id, name: '新' + data.name};
            })
            .then(dept.update.bind(dept))
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
    var userid;
    it('获取部门成员列表', function () {
        return dept.getList()
            .then((data)=> {
                return {department_id: data.department[1].id};
            })
            .then(user.getSimpleList.bind(user))
            .then((data)=> {
                return data.errcode.should.equal(0);
            })
    });

    it('获取部门成员列表详情', function () {
        return dept.getList()
            .then((data)=> {
                return {department_id: data.department[1].id};
            })
            .then(user.getList.bind(user))
            .then((data)=> {
                return data.errcode.should.equal(0);
            })
    });

    it('获取成员详情', function () {
        return dept.getList()
            .then((data)=> {
                return {'department_id': data.department[1].id};
            })
            .then(user.getSimpleList.bind(user))
            .then((data)=> {
                return {userid: data.userlist[0].userid};
            })
            .then(user.getDetail.bind(user))
            .then((data)=> {
                return data.errcode.should.equal(0);
            })
    });

    it('创建成员', function () {
        // this.skip();
        var options = {
            "name": "张三",
            "mobile": "15913215421"
        };
        return dept.getList()
            .then((data)=> {
                options.department = [data.department[1].id];
                return options;
            })
            .then(user.create.bind(user))
            .then((data)=> {
                userid = data.userid;
                return data.errcode.should.equal(0);
            })
    });

    it('更新成员', function () {
        // this.skip();
        return user.getDetail({userid})
            .then((data)=> {
                return {
                    userid: data.userid,
                    name: data.name,
                    position: '主任'
                }
            })
            .then(user.update.bind(user))
            .then((data)=> {
                return data.errcode.should.equal(0);
            })
    });

    it('删除成员', function () {
        return user.remove({userid})
            .then((data)=> {
                return data.errcode.should.equal(0);
            })
    });

    it('批量删除成员', function () {
        // this.skip();
        var options = {
            "name": "张三",
            "mobile": "15913215421"
        };
        return dept.getList()
            .then((data)=> {
                options.department = [data.department[1].id];
                return options;
            })
            .then(user.create.bind(user))
            .then((data)=> {
                return {useridlist: [data.userid]};
            })
            .then(user.removeAll.bind(user))
            .then((data)=> {
                return data.errcode.should.equal(0);
            })
    })
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHVwLmpzIiwidGVzdENoYXQuanMiLCJ0ZXN0RGVwYXJ0bWVudC5qcyIsInRlc3RTZXJ2aWNlLmpzIiwidGVzdFRpY2tldC5qcyIsInRlc3RUb2tlbi5qcyIsInRlc3RVc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMS5cbiAqL1xudmFyIHNob3VsZCA9IHJlcXVpcmUoJ3Nob3VsZCcpO1xudmFyIERpbmd0YWxrID0gcmVxdWlyZSgnLi4vbGliL2Rpbmd0YWxrJykuZGVmYXVsdDtcbnZhciBjb3JwSWQgPSBwcm9jZXNzLmVudi5jb3JwSWQ7XG52YXIgY29ycFNlY3JldCA9IHByb2Nlc3MuZW52LmNvcnBTZWNyZXQ7XG52YXIgU2VydmljZSA9IHJlcXVpcmUoJy4uL2xpYi9zZXJ2aWNlJykuZGVmYXVsdDtcbnZhciBkdDtcbnZhciB0b2tlbjtcbnZhciB0aWNrZXQ7XG52YXIgZGVwdDtcbnZhciB1c2VyO1xudmFyIGNoYXQ7XG5iZWZvcmUoZnVuY3Rpb24gKCkge1xuICAgIGR0ID0gbmV3IERpbmd0YWxrKGNvcnBJZCwgY29ycFNlY3JldCk7XG4gICAgcmV0dXJuIGR0LnJ1bigpLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBkdC53YXRjaCgpO1xuICAgICAgICB0b2tlbiA9IGR0LnRva2VuO1xuICAgICAgICB0aWNrZXQgPSBkdC50aWNrZXQ7XG4gICAgICAgIGRlcHQgPSBkdC5kZXBhcnRtZW50O1xuICAgICAgICB1c2VyID0gZHQudXNlcjtcbiAgICAgICAgY2hhdCA9IGR0LmNoYXQ7XG4gICAgfSk7XG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzEuXG4gKi9cbmRlc2NyaWJlKCfogYrlpKnmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCLmtYvor5XnvqRcIixcbiAgICAgICAgICAgIFwib3duZXJcIjogXCJ6aGFuZ3NhblwiLFxuICAgICAgICAgICAgXCJ1c2VyaWRsaXN0XCI6IFtcInpoYW5nc2FuXCIsIFwibGlzaVwiXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5kZXBhcnRtZW50WzBdLmlkO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8zMC5cbiAqL1xuZGVzY3JpYmUoJ+mDqOmXqOaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWQ7XG4gICAgaXQoJ+iOt+WPlumDqOmXqOWIl+ihqCBnZXRMaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgn6I635Y+W6YOo6Zeo6K+m5oOFIGdldERldGFpbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRlcHQuZ2V0TGlzdCgpXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtpZDogZGF0YS5kZXBhcnRtZW50WzBdLmlkfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihkZXB0LmdldERldGFpbC5iaW5kKGRlcHQpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgn5Yib5bu66YOo6ZeoIGNyZWF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjogJ+a1i+ivlScsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucGFyZW50aWQgPSBkYXRhLmRlcGFydG1lbnRbMF0uaWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnNcbiAgICAgICAgICAgIH0pLnRoZW4oZGVwdC5jcmVhdGUuYmluZChkZXB0KSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICBpZCA9IGRhdGEuaWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCfmm7TmlrDpg6jpl6ggdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGVwdC5nZXREZXRhaWwoe2lkfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2lkOiBpZCwgbmFtZTogJ+aWsCcgKyBkYXRhLm5hbWV9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGRlcHQudXBkYXRlLmJpbmQoZGVwdCkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCfliKDpmaTpg6jpl6ggZGVsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGVwdC5yZW1vdmUoe2lkfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjguXG4gKi9cbmRlc2NyaWJlKCfmnI3liqHmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ+iOt+WPlumaj+acuuS4siBnZXROb25jZVN0cmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFNlcnZpY2UuZ2V0Tm9uY2VTdHJpbmcoKS5zaG91bGQubm90LmJlLmVtcHR5O1xuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjYuXG4gKi9cbmRlc2NyaWJlKCflh63or4HmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnM7XG4gICAgYmVmb3JlKCfojrflj5blj6Pku6QgYWNjZXNzX3Rva2VuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdG9rZW4uZ2V0QWNjZXNzVG9rZW4oKS50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCfojrflj5blh63or4EgZ2V0VGlja2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGlja2V0LmdldFRpY2tldChvcHRpb25zKS50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmpzYXBpX3RpY2tldC5zaG91bGQuZXhpc3Q7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8yNi5cbiAqL1xuZGVzY3JpYmUoJ+WPo+S7pOaOpeWPoycsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgn6I635Y+W5Y+j5LukIGdldEFjY2Vzc1Rva2VuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdG9rZW4uZ2V0QWNjZXNzVG9rZW4oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YS5hY2Nlc3NfdG9rZW4uc2hvdWxkLmV4aXN0O1xuICAgICAgICB9KVxuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzAuXG4gKi9cbmRlc2NyaWJlKCfnlKjmiLfmjqXlj6MnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHVzZXJpZDtcbiAgICBpdCgn6I635Y+W6YOo6Zeo5oiQ5ZGY5YiX6KGoJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2RlcGFydG1lbnRfaWQ6IGRhdGEuZGVwYXJ0bWVudFsxXS5pZH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlci5nZXRTaW1wbGVMaXN0LmJpbmQodXNlcikpXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgaXQoJ+iOt+WPlumDqOmXqOaIkOWRmOWIl+ihqOivpuaDhScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRlcHQuZ2V0TGlzdCgpXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtkZXBhcnRtZW50X2lkOiBkYXRhLmRlcGFydG1lbnRbMV0uaWR9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIuZ2V0TGlzdC5iaW5kKHVzZXIpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGl0KCfojrflj5bmiJDlkZjor6bmg4UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZXB0LmdldExpc3QoKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7J2RlcGFydG1lbnRfaWQnOiBkYXRhLmRlcGFydG1lbnRbMV0uaWR9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIuZ2V0U2ltcGxlTGlzdC5iaW5kKHVzZXIpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7dXNlcmlkOiBkYXRhLnVzZXJsaXN0WzBdLnVzZXJpZH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlci5nZXREZXRhaWwuYmluZCh1c2VyKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBpdCgn5Yib5bu65oiQ5ZGYJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB0aGlzLnNraXAoKTtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCLlvKDkuIlcIixcbiAgICAgICAgICAgIFwibW9iaWxlXCI6IFwiMTU5MTMyMTU0MjFcIlxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGVwdC5nZXRMaXN0KClcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRlcGFydG1lbnQgPSBbZGF0YS5kZXBhcnRtZW50WzFdLmlkXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyLmNyZWF0ZS5iaW5kKHVzZXIpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHVzZXJpZCA9IGRhdGEudXNlcmlkO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmVycmNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGl0KCfmm7TmlrDmiJDlkZgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHRoaXMuc2tpcCgpO1xuICAgICAgICByZXR1cm4gdXNlci5nZXREZXRhaWwoe3VzZXJpZH0pXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiBkYXRhLnVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ+S4u+S7uydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlci51cGRhdGUuYmluZCh1c2VyKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5lcnJjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBpdCgn5Yig6Zmk5oiQ5ZGYJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdXNlci5yZW1vdmUoe3VzZXJpZH0pXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgaXQoJ+aJuemHj+WIoOmZpOaIkOWRmCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdGhpcy5za2lwKCk7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwi5byg5LiJXCIsXG4gICAgICAgICAgICBcIm1vYmlsZVwiOiBcIjE1OTEzMjE1NDIxXCJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRlcHQuZ2V0TGlzdCgpXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kZXBhcnRtZW50ID0gW2RhdGEuZGVwYXJ0bWVudFsxXS5pZF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlci5jcmVhdGUuYmluZCh1c2VyKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3VzZXJpZGxpc3Q6IFtkYXRhLnVzZXJpZF19O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIucmVtb3ZlQWxsLmJpbmQodXNlcikpXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXJyY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgICB9KVxuICAgIH0pXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
