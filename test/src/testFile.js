/**
 * Created by michao on 16/8/2.
 */
describe.only('钉盘接口', function () {
  var file = dt.createFile();
  var uploadid;
  var fileid;
  before('配置测试', function () {
    // TODO: setup
  });
  it('预创建文件', function () {
    var filepath = process.env.filepath;
    return file.getFileSize(filepath)
      .then(file.getUploadId.bind(file))
      .then((data)=> {
        uploadid = data.uploadid;
        console.log(uploadid);
        data.code.should.equal('0');
      });
  });

  it('上传文件', function () {
    // this.skip();
    var filepath = process.env.filepath;
    return file.upload(filepath)
      .then((data)=> {
        fileid = data.filepath;
        data.code.should.equal('0');
      });
  });
});