/**
 * Created by michao on 16/7/31.
 */
describe.only('多媒体接口', function () {
  var media_id;
  it('上传媒体', function () {
    this.skip();
    var filepath = '/Users/michao/Downloads/1.jpg';
    return media.getMediaData(filepath)
      .then(media.buildFormData.bind(media))
      .then(media.upload.bind(media))
      .then((data)=> {
        media_id = data.media_id;
        return data.errcode.should.equal(0);
      });
  })
});