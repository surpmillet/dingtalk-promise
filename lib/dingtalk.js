'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by michao on 16/7/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _ticket = require('./ticket');

var _ticket2 = _interopRequireDefault(_ticket);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _department = require('./department');

var _department2 = _interopRequireDefault(_department);

var _chat = require('./chat');

var _chat2 = _interopRequireDefault(_chat);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DingTalk = function () {
  function DingTalk(corpId, corpSecret) {
    var expireIn = arguments.length <= 2 || arguments[2] === undefined ? 7200 * 1000 : arguments[2];
    var request = arguments[3];

    _classCallCheck(this, DingTalk);

    this.timeout = expireIn;
    this.token = new _token2.default(corpId, corpSecret, expireIn, request);
    this.ticket = new _ticket2.default(null, expireIn, request);
    this.user = new _user2.default({ service: this, name: 'user' });
    this.department = new _department2.default({ service: this, name: 'department' });
    this.chat = new _chat2.default({ service: this, name: 'chat' });
    this.Service = _service2.default;
  }

  _createClass(DingTalk, [{
    key: 'getAccessToken',
    value: function getAccessToken() {
      return this.token.content;
    }
  }, {
    key: 'getTicket',
    value: function getTicket() {
      return this.ticket.content;
    }
  }, {
    key: 'getSignature',
    value: function getSignature(nonce, timestamp, url) {
      return this.Service.getSignature(nonce, timestamp, this.getTicket(), url);
    }
  }, {
    key: 'run',
    value: function run() {
      return this.token.getAccessToken().then(this.ticket.getTicket.bind(this.ticket));
    }
  }, {
    key: 'watch',
    value: function watch() {
      var _this = this;

      setInterval(function () {
        _this.token.getAccessToken().then(_this.ticket.getTicket.bind(_this.ticket));
      }, this.timeout);
    }
  }]);

  return DingTalk;
}();

exports.default = DingTalk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpbmd0YWxrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUNNLFE7QUFFSixvQkFBWSxNQUFaLEVBQW9CLFVBQXBCLEVBQWlFO0FBQUEsUUFBakMsUUFBaUMseURBQXRCLE9BQU8sSUFBZTtBQUFBLFFBQVQsT0FBUzs7QUFBQTs7QUFDL0QsU0FBSyxPQUFMLEdBQWUsUUFBZjtBQUNBLFNBQUssS0FBTCxHQUFhLG9CQUFVLE1BQVYsRUFBa0IsVUFBbEIsRUFBOEIsUUFBOUIsRUFBd0MsT0FBeEMsQ0FBYjtBQUNBLFNBQUssTUFBTCxHQUFjLHFCQUFXLElBQVgsRUFBaUIsUUFBakIsRUFBMkIsT0FBM0IsQ0FBZDtBQUNBLFNBQUssSUFBTCxHQUFZLG1CQUFTLEVBQUMsU0FBUyxJQUFWLEVBQWdCLE1BQU0sTUFBdEIsRUFBVCxDQUFaO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLHlCQUFlLEVBQUMsU0FBUyxJQUFWLEVBQWdCLE1BQU0sWUFBdEIsRUFBZixDQUFsQjtBQUNBLFNBQUssSUFBTCxHQUFZLG1CQUFTLEVBQUMsU0FBUyxJQUFWLEVBQWdCLE1BQU0sTUFBdEIsRUFBVCxDQUFaO0FBQ0EsU0FBSyxPQUFMO0FBQ0Q7Ozs7cUNBRWdCO0FBQ2YsYUFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFsQjtBQUNEOzs7Z0NBRVc7QUFDVixhQUFPLEtBQUssTUFBTCxDQUFZLE9BQW5CO0FBQ0Q7OztpQ0FFWSxLLEVBQU8sUyxFQUFXLEcsRUFBSztBQUNsQyxhQUFPLEtBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsS0FBMUIsRUFBaUMsU0FBakMsRUFBNEMsS0FBSyxTQUFMLEVBQTVDLEVBQThELEdBQTlELENBQVA7QUFDRDs7OzBCQUVLO0FBQ0osYUFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFYLEdBQ0osSUFESSxDQUNDLEtBQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsSUFBdEIsQ0FBMkIsS0FBSyxNQUFoQyxDQURELENBQVA7QUFFRDs7OzRCQUVPO0FBQUE7O0FBQ04sa0JBQVksWUFBSztBQUNmLGNBQUssS0FBTCxDQUFXLGNBQVgsR0FDRyxJQURILENBQ1EsTUFBSyxNQUFMLENBQVksU0FBWixDQUFzQixJQUF0QixDQUEyQixNQUFLLE1BQWhDLENBRFI7QUFFRCxPQUhELEVBR0csS0FBSyxPQUhSO0FBSUQ7Ozs7OztrQkFHWSxRIiwiZmlsZSI6ImRpbmd0YWxrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI1LlxuICovXG5pbXBvcnQgVG9rZW4gZnJvbSAnLi90b2tlbic7XG5pbXBvcnQgVGlja2V0IGZyb20gJy4vdGlja2V0JztcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcic7XG5pbXBvcnQgRGVwYXJ0bWVudCBmcm9tICcuL2RlcGFydG1lbnQnO1xuaW1wb3J0IENoYXQgZnJvbSAnLi9jaGF0JztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vc2VydmljZSc7XG5jbGFzcyBEaW5nVGFsayB7XG5cbiAgY29uc3RydWN0b3IoY29ycElkLCBjb3JwU2VjcmV0LCBleHBpcmVJbiA9IDcyMDAgKiAxMDAwLCByZXF1ZXN0KSB7XG4gICAgdGhpcy50aW1lb3V0ID0gZXhwaXJlSW47XG4gICAgdGhpcy50b2tlbiA9IG5ldyBUb2tlbihjb3JwSWQsIGNvcnBTZWNyZXQsIGV4cGlyZUluLCByZXF1ZXN0KTtcbiAgICB0aGlzLnRpY2tldCA9IG5ldyBUaWNrZXQobnVsbCwgZXhwaXJlSW4sIHJlcXVlc3QpO1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKHtzZXJ2aWNlOiB0aGlzLCBuYW1lOiAndXNlcid9KTtcbiAgICB0aGlzLmRlcGFydG1lbnQgPSBuZXcgRGVwYXJ0bWVudCh7c2VydmljZTogdGhpcywgbmFtZTogJ2RlcGFydG1lbnQnfSk7XG4gICAgdGhpcy5jaGF0ID0gbmV3IENoYXQoe3NlcnZpY2U6IHRoaXMsIG5hbWU6ICdjaGF0J30pO1xuICAgIHRoaXMuU2VydmljZSA9IFNlcnZpY2U7XG4gIH1cblxuICBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbi5jb250ZW50O1xuICB9O1xuXG4gIGdldFRpY2tldCgpIHtcbiAgICByZXR1cm4gdGhpcy50aWNrZXQuY29udGVudDtcbiAgfVxuXG4gIGdldFNpZ25hdHVyZShub25jZSwgdGltZXN0YW1wLCB1cmwpIHtcbiAgICByZXR1cm4gdGhpcy5TZXJ2aWNlLmdldFNpZ25hdHVyZShub25jZSwgdGltZXN0YW1wLCB0aGlzLmdldFRpY2tldCgpLCB1cmwpO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIHJldHVybiB0aGlzLnRva2VuLmdldEFjY2Vzc1Rva2VuKClcbiAgICAgIC50aGVuKHRoaXMudGlja2V0LmdldFRpY2tldC5iaW5kKHRoaXMudGlja2V0KSk7XG4gIH1cblxuICB3YXRjaCgpIHtcbiAgICBzZXRJbnRlcnZhbCgoKT0+IHtcbiAgICAgIHRoaXMudG9rZW4uZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgICAudGhlbih0aGlzLnRpY2tldC5nZXRUaWNrZXQuYmluZCh0aGlzLnRpY2tldCkpO1xuICAgIH0sIHRoaXMudGltZW91dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGluZ1RhbGs7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
