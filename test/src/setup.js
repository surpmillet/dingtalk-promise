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