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

var _media = require('./media');

var _media2 = _interopRequireDefault(_media);

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
    this.media = new _media2.default({ service: this, name: 'media' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpbmd0YWxrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBQ00sUTtBQUVKLG9CQUFZLE1BQVosRUFBb0IsVUFBcEIsRUFBaUU7QUFBQSxRQUFqQyxRQUFpQyx5REFBdEIsT0FBTyxJQUFlO0FBQUEsUUFBVCxPQUFTOztBQUFBOztBQUMvRCxTQUFLLE9BQUwsR0FBZSxRQUFmO0FBQ0EsU0FBSyxLQUFMLEdBQWEsb0JBQVUsTUFBVixFQUFrQixVQUFsQixFQUE4QixRQUE5QixFQUF3QyxPQUF4QyxDQUFiO0FBQ0EsU0FBSyxNQUFMLEdBQWMscUJBQVcsSUFBWCxFQUFpQixRQUFqQixFQUEyQixPQUEzQixDQUFkO0FBQ0EsU0FBSyxJQUFMLEdBQVksbUJBQVMsRUFBQyxTQUFTLElBQVYsRUFBZ0IsTUFBTSxNQUF0QixFQUFULENBQVo7QUFDQSxTQUFLLFVBQUwsR0FBa0IseUJBQWUsRUFBQyxTQUFTLElBQVYsRUFBZ0IsTUFBTSxZQUF0QixFQUFmLENBQWxCO0FBQ0EsU0FBSyxJQUFMLEdBQVksbUJBQVMsRUFBQyxTQUFTLElBQVYsRUFBZ0IsTUFBTSxNQUF0QixFQUFULENBQVo7QUFDQSxTQUFLLEtBQUwsR0FBYSxvQkFBVSxFQUFDLFNBQVMsSUFBVixFQUFnQixNQUFNLE9BQXRCLEVBQVYsQ0FBYjtBQUNBLFNBQUssT0FBTDtBQUNEOzs7O3FDQUVnQjtBQUNmLGFBQU8sS0FBSyxLQUFMLENBQVcsT0FBbEI7QUFDRDs7O2dDQUVXO0FBQ1YsYUFBTyxLQUFLLE1BQUwsQ0FBWSxPQUFuQjtBQUNEOzs7aUNBRVksSyxFQUFPLFMsRUFBVyxHLEVBQUs7QUFDbEMsYUFBTyxLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLEtBQTFCLEVBQWlDLFNBQWpDLEVBQTRDLEtBQUssU0FBTCxFQUE1QyxFQUE4RCxHQUE5RCxDQUFQO0FBQ0Q7OzswQkFFSztBQUNKLGFBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxHQUNKLElBREksQ0FDQyxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLElBQXRCLENBQTJCLEtBQUssTUFBaEMsQ0FERCxDQUFQO0FBRUQ7Ozs0QkFFTztBQUFBOztBQUNOLGtCQUFZLFlBQUs7QUFDZixjQUFLLEtBQUwsQ0FBVyxjQUFYLEdBQ0csSUFESCxDQUNRLE1BQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsSUFBdEIsQ0FBMkIsTUFBSyxNQUFoQyxDQURSO0FBRUQsT0FIRCxFQUdHLEtBQUssT0FIUjtBQUlEOzs7Ozs7a0JBR1ksUSIsImZpbGUiOiJkaW5ndGFsay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8yNS5cbiAqL1xuaW1wb3J0IFRva2VuIGZyb20gJy4vdG9rZW4nO1xuaW1wb3J0IFRpY2tldCBmcm9tICcuL3RpY2tldCc7XG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInO1xuaW1wb3J0IERlcGFydG1lbnQgZnJvbSAnLi9kZXBhcnRtZW50JztcbmltcG9ydCBDaGF0IGZyb20gJy4vY2hhdCc7XG5pbXBvcnQgTWVkaWEgZnJvbSAnLi9tZWRpYSc7XG5pbXBvcnQgU2VydmljZSBmcm9tICcuL3NlcnZpY2UnO1xuY2xhc3MgRGluZ1RhbGsge1xuXG4gIGNvbnN0cnVjdG9yKGNvcnBJZCwgY29ycFNlY3JldCwgZXhwaXJlSW4gPSA3MjAwICogMTAwMCwgcmVxdWVzdCkge1xuICAgIHRoaXMudGltZW91dCA9IGV4cGlyZUluO1xuICAgIHRoaXMudG9rZW4gPSBuZXcgVG9rZW4oY29ycElkLCBjb3JwU2VjcmV0LCBleHBpcmVJbiwgcmVxdWVzdCk7XG4gICAgdGhpcy50aWNrZXQgPSBuZXcgVGlja2V0KG51bGwsIGV4cGlyZUluLCByZXF1ZXN0KTtcbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcih7c2VydmljZTogdGhpcywgbmFtZTogJ3VzZXInfSk7XG4gICAgdGhpcy5kZXBhcnRtZW50ID0gbmV3IERlcGFydG1lbnQoe3NlcnZpY2U6IHRoaXMsIG5hbWU6ICdkZXBhcnRtZW50J30pO1xuICAgIHRoaXMuY2hhdCA9IG5ldyBDaGF0KHtzZXJ2aWNlOiB0aGlzLCBuYW1lOiAnY2hhdCd9KTtcbiAgICB0aGlzLm1lZGlhID0gbmV3IE1lZGlhKHtzZXJ2aWNlOiB0aGlzLCBuYW1lOiAnbWVkaWEnfSk7XG4gICAgdGhpcy5TZXJ2aWNlID0gU2VydmljZTtcbiAgfVxuXG4gIGdldEFjY2Vzc1Rva2VuKCkge1xuICAgIHJldHVybiB0aGlzLnRva2VuLmNvbnRlbnQ7XG4gIH07XG5cbiAgZ2V0VGlja2V0KCkge1xuICAgIHJldHVybiB0aGlzLnRpY2tldC5jb250ZW50O1xuICB9XG5cbiAgZ2V0U2lnbmF0dXJlKG5vbmNlLCB0aW1lc3RhbXAsIHVybCkge1xuICAgIHJldHVybiB0aGlzLlNlcnZpY2UuZ2V0U2lnbmF0dXJlKG5vbmNlLCB0aW1lc3RhbXAsIHRoaXMuZ2V0VGlja2V0KCksIHVybCk7XG4gIH1cblxuICBydW4oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW4uZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgLnRoZW4odGhpcy50aWNrZXQuZ2V0VGlja2V0LmJpbmQodGhpcy50aWNrZXQpKTtcbiAgfVxuXG4gIHdhdGNoKCkge1xuICAgIHNldEludGVydmFsKCgpPT4ge1xuICAgICAgdGhpcy50b2tlbi5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICAgIC50aGVuKHRoaXMudGlja2V0LmdldFRpY2tldC5iaW5kKHRoaXMudGlja2V0KSk7XG4gICAgfSwgdGhpcy50aW1lb3V0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaW5nVGFsaztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
