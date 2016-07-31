/**
 * Created by michao on 16/7/31.
 */
var should = require('should');
var Dingtalk = require('../lib/dingtalk').default;
var corpId = process.env.corpId;
var corpSecret = process.env.corpSecret;
describe.only('聊天接口', function () {
    var chat;
    var dept;
    before('注入底层接口', function () {
        var dt = new Dingtalk(corpId, corpSecret);
        return dt.run().then((data)=> {
            dt.watch();
            chat = dt.chat;
            dept = dt.department;
        });
    });
    it('', function () {
        var options = {
            "name": "测试群",
            "owner": "zhangsan",
            "useridlist": ["zhangsan", "lisi"]
        };
        return dept.getList()
            .then((data)=> {
                return data.department[0].id
            });
    });
});
