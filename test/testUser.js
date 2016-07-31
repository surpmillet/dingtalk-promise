/**
 * Created by michao on 16/7/30.
 */
var should = require('should');
var Dingtalk = require('../lib/dingtalk').default;
var corpId = process.env.corpId;
var corpSecret = process.env.corpSecret;
describe('用户接口', function () {
  var user;
  var dept;
  var userid;
  before('注入底层接口', function () {
    var dt = new Dingtalk(corpId, corpSecret);
    return dt.run().then((data)=> {
      dt.watch();
      user = dt.user;
      dept = dt.department;
    });
  });

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
