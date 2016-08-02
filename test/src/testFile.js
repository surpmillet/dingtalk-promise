/**
 * Created by michao on 16/8/2.
 */
describe('钉盘接口', function () {
  var file = dt.createFile();
  var uploadid;
  before('配置测试', function () {
    // TODO: setup
  });
  it('预创建文件', function () {
    var filepath = process.env.filepath;
    return file.getMediaSize(filepath)
      .then(file.uploadCreate.bind(file))
      .then((data)=> {
        uploadid = data.uploadid;
        data.code.should.equal('0');
      })
  });
});