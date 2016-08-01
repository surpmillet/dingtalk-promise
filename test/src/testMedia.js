/**
 * Created by michao on 16/7/31.
 */
describe('多媒体接口', function () {
  var media_id;
  it('上传媒体', function () {
    var filepath = '/Users/michao/Downloads/1.jpg';
    return media.getMediaData(filepath)
      .then(media.buildFormData.bind(media))
      .then(media.upload.bind(media))
      .then((data)=> {
        media_id = data.media_id;
        return data.errcode.should.equal(0);
      });
  });

  it.only('下载媒体', function () {
    var media_id = process.env.mediaid;
    return media.download({media_id})
      .then((data)=> {
        var content = Buffer.toString(data);
        return data.errcode.should.equal(0);
      });
  });
});