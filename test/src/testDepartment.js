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
