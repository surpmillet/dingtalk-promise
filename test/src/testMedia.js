/**
 * Created by michao on 16/7/31.
 */
describe('多媒体接口', function () {
  var media = dt.createMedia();
  var path = require('path');
  var media_id;
  before('配置测试', function () {
    // TODO: setup
  });
  it('上传媒体', function () {
    var filepath = process.env.filepath;
    return media.fromMedia(filepath)
      .then(media.buildFormData.bind(media))
      .then(media.upload.bind(media))
      .then((data)=> {
        media_id = data.media_id;
        return data.errcode.should.equal(0);
      });
  });

  it('下载媒体', function () {
    var media_id = process.env.mediaid;
    var dir = path.dirname(process.env.filepath);
    return media.download({media_id}, dir)
      .then(media.toMedia.bind(media))
      .then((data)=> {
        data.errcode.should.equal(0);
      })
  });
});