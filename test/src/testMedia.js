/**
 * Created by michao on 16/7/31.
 */
var path = require('path');
describe.only('多媒体接口', function () {
  var media_id;
  it('上传媒体', function () {
    var filepath = '/Users/michao/Downloads/1.jpg';
    var type = 'image';
    return media.createMedia(filepath)
      .then((data)=> {
        var boundary = Service.getNonceSecurityString();
        var contentType = 'multipart/form-data; boundary=' + boundary;
        var header = `--${boundary}\r\nContent-Disposition:form-data;name=\"media\";filename=\"${path.basename(filepath)}\"\r\nContent-Type:application/octet-stream\r\n\r\n`;
        var headerBuffer = new Buffer(header, 'utf8');
        // var beginBuffer = new Buffer(`--${boundary}\r\n`, 'utf8');
        var endBuffer = new Buffer(`\r\n--${boundary}--\r\n`, 'utf8');
        var buffer = Buffer.concat([headerBuffer, data, endBuffer]);
        return {query: {type, 'media': header}, contentType, buffer};
      })
      .then(media.upload.bind(media))
      .then((data)=> {
        media_id = data.media_id;
        return data.errcode.should.equal(0);
      });
  })
});