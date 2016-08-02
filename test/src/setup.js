/**
 * Created by michao on 16/7/31.
 */
var should = require('should');
var Dingtalk = require('../lib/dingtalk').default;
var corpId = process.env.corpId;
var corpSecret = process.env.corpSecret;
var dt = new Dingtalk(corpId, corpSecret);
before(function () {
  return dt.run().then((data)=> {
    dt.watch();
  });
});