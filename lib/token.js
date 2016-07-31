'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by michao on 16/7/28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function () {
  function Token(corpId, corpSecret) {
    var expireIn = arguments.length <= 2 || arguments[2] === undefined ? 7200 : arguments[2];
    var req = arguments.length <= 3 || arguments[3] === undefined ? _superagent2.default : arguments[3];

    _classCallCheck(this, Token);

    this.corpId = corpId;
    this.corpSecret = corpSecret;
    this.expireIn = expireIn;
    this.request = req;
  }

  _createClass(Token, [{
    key: 'isExpired',
    value: function isExpired(timestamp) {
      return timestamp - this.createdAt >= this.expireIn;
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {
      return { 'access_token': this.content };
    }
  }, {
    key: 'getAccessToken',
    value: function getAccessToken() {
      var _this = this;

      var options = arguments.length <= 0 || arguments[0] === undefined ? { 'corpId': this.corpId, 'corpSecret': this.corpSecret } : arguments[0];

      if (this.content && !this.isExpired(Date.now())) {
        return Promise.resolve(this.valueOf());
      }
      return this.request('https://oapi.dingtalk.com/gettoken?corpid=' + options.corpId + '&corpsecret=' + options.corpSecret).then(function (data) {
        _this.createdAt = Date.now();
        _this.content = data.body.access_token;
        return _this.valueOf();
      });
    }
  }]);

  return Token;
}();

exports.default = Token;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7O0FBR0E7Ozs7Ozs7O0lBQ00sSztBQUlKLGlCQUFZLE1BQVosRUFBb0IsVUFBcEIsRUFBZ0U7QUFBQSxRQUFoQyxRQUFnQyx5REFBckIsSUFBcUI7QUFBQSxRQUFmLEdBQWU7O0FBQUE7O0FBQzlELFNBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxTQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxTQUFLLE9BQUwsR0FBZSxHQUFmO0FBQ0Q7Ozs7OEJBRVMsUyxFQUFXO0FBQ25CLGFBQU8sWUFBWSxLQUFLLFNBQWpCLElBQThCLEtBQUssUUFBMUM7QUFDRDs7OzhCQUVTO0FBQ1IsYUFBTyxFQUFDLGdCQUFnQixLQUFLLE9BQXRCLEVBQVA7QUFDRDs7O3FDQUVnRjtBQUFBOztBQUFBLFVBQWxFLE9BQWtFLHlEQUF4RCxFQUFDLFVBQVUsS0FBSyxNQUFoQixFQUF3QixjQUFjLEtBQUssVUFBM0MsRUFBd0Q7O0FBQy9FLFVBQUksS0FBSyxPQUFMLElBQWdCLENBQUMsS0FBSyxTQUFMLENBQWUsS0FBSyxHQUFMLEVBQWYsQ0FBckIsRUFBaUQ7QUFDL0MsZUFBTyxRQUFRLE9BQVIsQ0FBZ0IsS0FBSyxPQUFMLEVBQWhCLENBQVA7QUFDRDtBQUNELGFBQU8sS0FBSyxPQUFMLENBQWEsK0NBQStDLFFBQVEsTUFBdkQsR0FBZ0UsY0FBaEUsR0FBaUYsUUFBUSxVQUF0RyxFQUNKLElBREksQ0FDQyxVQUFDLElBQUQsRUFBUztBQUNiLGNBQUssU0FBTCxHQUFpQixLQUFLLEdBQUwsRUFBakI7QUFDQSxjQUFLLE9BQUwsR0FBZSxLQUFLLElBQUwsQ0FBVSxZQUF6QjtBQUNBLGVBQU8sTUFBSyxPQUFMLEVBQVA7QUFDRCxPQUxJLENBQVA7QUFNRDs7Ozs7O2tCQUdZLEsiLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjguXG4gKi9cbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnO1xuY2xhc3MgVG9rZW4ge1xuICBjcmVhdGVkQXQ7XG4gIGNvbnRlbnQ7XG5cbiAgY29uc3RydWN0b3IoY29ycElkLCBjb3JwU2VjcmV0LCBleHBpcmVJbiA9IDcyMDAsIHJlcSA9IHJlcXVlc3QpIHtcbiAgICB0aGlzLmNvcnBJZCA9IGNvcnBJZDtcbiAgICB0aGlzLmNvcnBTZWNyZXQgPSBjb3JwU2VjcmV0O1xuICAgIHRoaXMuZXhwaXJlSW4gPSBleHBpcmVJbjtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXE7XG4gIH1cblxuICBpc0V4cGlyZWQodGltZXN0YW1wKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcCAtIHRoaXMuY3JlYXRlZEF0ID49IHRoaXMuZXhwaXJlSW47XG4gIH1cblxuICB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB7J2FjY2Vzc190b2tlbic6IHRoaXMuY29udGVudH1cbiAgfVxuXG4gIGdldEFjY2Vzc1Rva2VuKG9wdGlvbnMgPSB7J2NvcnBJZCc6IHRoaXMuY29ycElkLCAnY29ycFNlY3JldCc6IHRoaXMuY29ycFNlY3JldH0pIHtcbiAgICBpZiAodGhpcy5jb250ZW50ICYmICF0aGlzLmlzRXhwaXJlZChEYXRlLm5vdygpKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnZhbHVlT2YoKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2h0dHBzOi8vb2FwaS5kaW5ndGFsay5jb20vZ2V0dG9rZW4/Y29ycGlkPScgKyBvcHRpb25zLmNvcnBJZCArICcmY29ycHNlY3JldD0nICsgb3B0aW9ucy5jb3JwU2VjcmV0KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZWRBdCA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGRhdGEuYm9keS5hY2Nlc3NfdG9rZW47XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBUb2tlbjtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
