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
