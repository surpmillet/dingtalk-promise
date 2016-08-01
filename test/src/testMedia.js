/**
 * Created by michao on 16/7/31.
 */
var fs = require('fs');
describe('多媒体接口', function () {
  var media_id;
  it('上传媒体', function () {
    var filepath = '/Users/michao/Downloads/1.jpg';
    return media.fromMedia(filepath)
      .then(media.buildFormData.bind(media))
      .then(media.upload.bind(media))
      .then((data)=> {
        media_id = data.media_id;
        return data.errcode.should.equal(0);
      });
  });

  it.only('下载媒体', function () {
    var media_id = '@lADOY5VLTc0CZc0Cig';
    return media.download({media_id}, '/Users/michao/Downloads/')
      .then(media.toMedia.bind(media))
      .then((data)=> {
        data.errcode.should.equal(0);
      })
  });
});