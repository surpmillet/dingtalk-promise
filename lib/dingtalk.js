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
    this.media = new _chat2.default({ service: this, name: 'media' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpbmd0YWxrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUNNLFE7QUFFSixvQkFBWSxNQUFaLEVBQW9CLFVBQXBCLEVBQWlFO0FBQUEsUUFBakMsUUFBaUMseURBQXRCLE9BQU8sSUFBZTtBQUFBLFFBQVQsT0FBUzs7QUFBQTs7QUFDL0QsU0FBSyxPQUFMLEdBQWUsUUFBZjtBQUNBLFNBQUssS0FBTCxHQUFhLG9CQUFVLE1BQVYsRUFBa0IsVUFBbEIsRUFBOEIsUUFBOUIsRUFBd0MsT0FBeEMsQ0FBYjtBQUNBLFNBQUssTUFBTCxHQUFjLHFCQUFXLElBQVgsRUFBaUIsUUFBakIsRUFBMkIsT0FBM0IsQ0FBZDtBQUNBLFNBQUssSUFBTCxHQUFZLG1CQUFTLEVBQUMsU0FBUyxJQUFWLEVBQWdCLE1BQU0sTUFBdEIsRUFBVCxDQUFaO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLHlCQUFlLEVBQUMsU0FBUyxJQUFWLEVBQWdCLE1BQU0sWUFBdEIsRUFBZixDQUFsQjtBQUNBLFNBQUssSUFBTCxHQUFZLG1CQUFTLEVBQUMsU0FBUyxJQUFWLEVBQWdCLE1BQU0sTUFBdEIsRUFBVCxDQUFaO0FBQ0EsU0FBSyxLQUFMLEdBQWEsbUJBQVMsRUFBQyxTQUFTLElBQVYsRUFBZ0IsTUFBTSxPQUF0QixFQUFULENBQWI7QUFDQSxTQUFLLE9BQUw7QUFDRDs7OztxQ0FFZ0I7QUFDZixhQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBSyxNQUFMLENBQVksT0FBbkI7QUFDRDs7O2lDQUVZLEssRUFBTyxTLEVBQVcsRyxFQUFLO0FBQ2xDLGFBQU8sS0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUExQixFQUFpQyxTQUFqQyxFQUE0QyxLQUFLLFNBQUwsRUFBNUMsRUFBOEQsR0FBOUQsQ0FBUDtBQUNEOzs7MEJBRUs7QUFDSixhQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsR0FDSixJQURJLENBQ0MsS0FBSyxNQUFMLENBQVksU0FBWixDQUFzQixJQUF0QixDQUEyQixLQUFLLE1BQWhDLENBREQsQ0FBUDtBQUVEOzs7NEJBRU87QUFBQTs7QUFDTixrQkFBWSxZQUFLO0FBQ2YsY0FBSyxLQUFMLENBQVcsY0FBWCxHQUNHLElBREgsQ0FDUSxNQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLElBQXRCLENBQTJCLE1BQUssTUFBaEMsQ0FEUjtBQUVELE9BSEQsRUFHRyxLQUFLLE9BSFI7QUFJRDs7Ozs7O2tCQUdZLFEiLCJmaWxlIjoiZGluZ3RhbGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjUuXG4gKi9cbmltcG9ydCBUb2tlbiBmcm9tICcuL3Rva2VuJztcbmltcG9ydCBUaWNrZXQgZnJvbSAnLi90aWNrZXQnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJztcbmltcG9ydCBEZXBhcnRtZW50IGZyb20gJy4vZGVwYXJ0bWVudCc7XG5pbXBvcnQgQ2hhdCBmcm9tICcuL2NoYXQnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcbmNsYXNzIERpbmdUYWxrIHtcblxuICBjb25zdHJ1Y3Rvcihjb3JwSWQsIGNvcnBTZWNyZXQsIGV4cGlyZUluID0gNzIwMCAqIDEwMDAsIHJlcXVlc3QpIHtcbiAgICB0aGlzLnRpbWVvdXQgPSBleHBpcmVJbjtcbiAgICB0aGlzLnRva2VuID0gbmV3IFRva2VuKGNvcnBJZCwgY29ycFNlY3JldCwgZXhwaXJlSW4sIHJlcXVlc3QpO1xuICAgIHRoaXMudGlja2V0ID0gbmV3IFRpY2tldChudWxsLCBleHBpcmVJbiwgcmVxdWVzdCk7XG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoe3NlcnZpY2U6IHRoaXMsIG5hbWU6ICd1c2VyJ30pO1xuICAgIHRoaXMuZGVwYXJ0bWVudCA9IG5ldyBEZXBhcnRtZW50KHtzZXJ2aWNlOiB0aGlzLCBuYW1lOiAnZGVwYXJ0bWVudCd9KTtcbiAgICB0aGlzLmNoYXQgPSBuZXcgQ2hhdCh7c2VydmljZTogdGhpcywgbmFtZTogJ2NoYXQnfSk7XG4gICAgdGhpcy5tZWRpYSA9IG5ldyBDaGF0KHtzZXJ2aWNlOiB0aGlzLCBuYW1lOiAnbWVkaWEnfSk7XG4gICAgdGhpcy5TZXJ2aWNlID0gU2VydmljZTtcbiAgfVxuXG4gIGdldEFjY2Vzc1Rva2VuKCkge1xuICAgIHJldHVybiB0aGlzLnRva2VuLmNvbnRlbnQ7XG4gIH07XG5cbiAgZ2V0VGlja2V0KCkge1xuICAgIHJldHVybiB0aGlzLnRpY2tldC5jb250ZW50O1xuICB9XG5cbiAgZ2V0U2lnbmF0dXJlKG5vbmNlLCB0aW1lc3RhbXAsIHVybCkge1xuICAgIHJldHVybiB0aGlzLlNlcnZpY2UuZ2V0U2lnbmF0dXJlKG5vbmNlLCB0aW1lc3RhbXAsIHRoaXMuZ2V0VGlja2V0KCksIHVybCk7XG4gIH1cblxuICBydW4oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW4uZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgLnRoZW4odGhpcy50aWNrZXQuZ2V0VGlja2V0LmJpbmQodGhpcy50aWNrZXQpKTtcbiAgfVxuXG4gIHdhdGNoKCkge1xuICAgIHNldEludGVydmFsKCgpPT4ge1xuICAgICAgdGhpcy50b2tlbi5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICAgIC50aGVuKHRoaXMudGlja2V0LmdldFRpY2tldC5iaW5kKHRoaXMudGlja2V0KSk7XG4gICAgfSwgdGhpcy50aW1lb3V0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaW5nVGFsaztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
