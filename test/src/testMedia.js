/**
 * Created by michao on 16/7/31.
 */
describe('多媒体接口', function () {
  var media_id;
  it('上传媒体', function () {
    var options = {
      type: 'image',
      name: 'uploadfile',
      path: '/Users/michao/Downloads/1.jpg'
    };
    return media.upload(options)
      .then((data)=> {
        media_id = data.media_id;
        return data.errcode.should.equal(0);
      })
  })
})
;