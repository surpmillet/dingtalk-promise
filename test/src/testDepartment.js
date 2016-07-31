/**
 * Created by michao on 16/7/30.
 */
describe('部门接口', function () {
    var id;
    var list;
    var detail;
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
                detail = data;
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
        detail.name = '新' + detail.name;
        return dept.update(detail)
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
