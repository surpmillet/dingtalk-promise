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
