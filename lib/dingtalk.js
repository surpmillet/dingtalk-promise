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

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

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
  }, {
    key: 'createUser',
    value: function createUser() {
      return new _user2.default({ service: this, basePath: 'user' });
    }
  }, {
    key: 'createDepartment',
    value: function createDepartment() {
      return new _department2.default({ service: this, basePath: 'department' });
    }
  }, {
    key: 'createChat',
    value: function createChat() {
      return new _chat2.default({ service: this, basePath: 'chat' });
    }
  }, {
    key: 'createMedia',
    value: function createMedia() {
      return new _media2.default({ service: this, basePath: 'media' });
    }
  }, {
    key: 'createFile',
    value: function createFile() {
      return new _file2.default({ service: this, basePath: 'file' });
    }
  }]);

  return DingTalk;
}();

exports.default = DingTalk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpbmd0YWxrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFDTSxRO0FBRUosb0JBQVksTUFBWixFQUFvQixVQUFwQixFQUFpRTtBQUFBLFFBQWpDLFFBQWlDLHlEQUF0QixPQUFPLElBQWU7QUFBQSxRQUFULE9BQVM7O0FBQUE7O0FBQy9ELFNBQUssT0FBTCxHQUFlLFFBQWY7QUFDQSxTQUFLLEtBQUwsR0FBYSxvQkFBVSxNQUFWLEVBQWtCLFVBQWxCLEVBQThCLFFBQTlCLEVBQXdDLE9BQXhDLENBQWI7QUFDQSxTQUFLLE1BQUwsR0FBYyxxQkFBVyxJQUFYLEVBQWlCLFFBQWpCLEVBQTJCLE9BQTNCLENBQWQ7QUFDQSxTQUFLLE9BQUw7QUFDRDs7OztxQ0FFZ0I7QUFDZixhQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBSyxNQUFMLENBQVksT0FBbkI7QUFDRDs7O2lDQUVZLEssRUFBTyxTLEVBQVcsRyxFQUFLO0FBQ2xDLGFBQU8sS0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUExQixFQUFpQyxTQUFqQyxFQUE0QyxLQUFLLFNBQUwsRUFBNUMsRUFBOEQsR0FBOUQsQ0FBUDtBQUNEOzs7MEJBRUs7QUFDSixhQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsR0FDSixJQURJLENBQ0MsS0FBSyxNQUFMLENBQVksU0FBWixDQUFzQixJQUF0QixDQUEyQixLQUFLLE1BQWhDLENBREQsQ0FBUDtBQUVEOzs7NEJBRU87QUFBQTs7QUFDTixrQkFBWSxZQUFLO0FBQ2YsY0FBSyxLQUFMLENBQVcsY0FBWCxHQUNHLElBREgsQ0FDUSxNQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLElBQXRCLENBQTJCLE1BQUssTUFBaEMsQ0FEUjtBQUVELE9BSEQsRUFHRyxLQUFLLE9BSFI7QUFJRDs7O2lDQUVZO0FBQ1gsYUFBTyxtQkFBUyxFQUFDLFNBQVMsSUFBVixFQUFnQixVQUFVLE1BQTFCLEVBQVQsQ0FBUDtBQUNEOzs7dUNBRWtCO0FBQ2pCLGFBQU8seUJBQWUsRUFBQyxTQUFTLElBQVYsRUFBZ0IsVUFBVSxZQUExQixFQUFmLENBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsYUFBTyxtQkFBUyxFQUFDLFNBQVMsSUFBVixFQUFnQixVQUFVLE1BQTFCLEVBQVQsQ0FBUDtBQUNEOzs7a0NBRWE7QUFDWixhQUFPLG9CQUFVLEVBQUMsU0FBUyxJQUFWLEVBQWdCLFVBQVUsT0FBMUIsRUFBVixDQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLGFBQU8sbUJBQVMsRUFBQyxTQUFTLElBQVYsRUFBZ0IsVUFBVSxNQUExQixFQUFULENBQVA7QUFDRDs7Ozs7O2tCQUdZLFEiLCJmaWxlIjoiZGluZ3RhbGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjUuXG4gKi9cbmltcG9ydCBUb2tlbiBmcm9tICcuL3Rva2VuJztcbmltcG9ydCBUaWNrZXQgZnJvbSAnLi90aWNrZXQnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJztcbmltcG9ydCBEZXBhcnRtZW50IGZyb20gJy4vZGVwYXJ0bWVudCc7XG5pbXBvcnQgQ2hhdCBmcm9tICcuL2NoYXQnO1xuaW1wb3J0IE1lZGlhIGZyb20gJy4vbWVkaWEnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vc2VydmljZSc7XG5jbGFzcyBEaW5nVGFsayB7XG5cbiAgY29uc3RydWN0b3IoY29ycElkLCBjb3JwU2VjcmV0LCBleHBpcmVJbiA9IDcyMDAgKiAxMDAwLCByZXF1ZXN0KSB7XG4gICAgdGhpcy50aW1lb3V0ID0gZXhwaXJlSW47XG4gICAgdGhpcy50b2tlbiA9IG5ldyBUb2tlbihjb3JwSWQsIGNvcnBTZWNyZXQsIGV4cGlyZUluLCByZXF1ZXN0KTtcbiAgICB0aGlzLnRpY2tldCA9IG5ldyBUaWNrZXQobnVsbCwgZXhwaXJlSW4sIHJlcXVlc3QpO1xuICAgIHRoaXMuU2VydmljZSA9IFNlcnZpY2U7XG4gIH1cblxuICBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbi5jb250ZW50O1xuICB9O1xuXG4gIGdldFRpY2tldCgpIHtcbiAgICByZXR1cm4gdGhpcy50aWNrZXQuY29udGVudDtcbiAgfVxuXG4gIGdldFNpZ25hdHVyZShub25jZSwgdGltZXN0YW1wLCB1cmwpIHtcbiAgICByZXR1cm4gdGhpcy5TZXJ2aWNlLmdldFNpZ25hdHVyZShub25jZSwgdGltZXN0YW1wLCB0aGlzLmdldFRpY2tldCgpLCB1cmwpO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIHJldHVybiB0aGlzLnRva2VuLmdldEFjY2Vzc1Rva2VuKClcbiAgICAgIC50aGVuKHRoaXMudGlja2V0LmdldFRpY2tldC5iaW5kKHRoaXMudGlja2V0KSk7XG4gIH1cblxuICB3YXRjaCgpIHtcbiAgICBzZXRJbnRlcnZhbCgoKT0+IHtcbiAgICAgIHRoaXMudG9rZW4uZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgICAudGhlbih0aGlzLnRpY2tldC5nZXRUaWNrZXQuYmluZCh0aGlzLnRpY2tldCkpO1xuICAgIH0sIHRoaXMudGltZW91dCk7XG4gIH1cblxuICBjcmVhdGVVc2VyKCkge1xuICAgIHJldHVybiBuZXcgVXNlcih7c2VydmljZTogdGhpcywgYmFzZVBhdGg6ICd1c2VyJ30pO1xuICB9XG5cbiAgY3JlYXRlRGVwYXJ0bWVudCgpIHtcbiAgICByZXR1cm4gbmV3IERlcGFydG1lbnQoe3NlcnZpY2U6IHRoaXMsIGJhc2VQYXRoOiAnZGVwYXJ0bWVudCd9KTtcbiAgfVxuXG4gIGNyZWF0ZUNoYXQoKSB7XG4gICAgcmV0dXJuIG5ldyBDaGF0KHtzZXJ2aWNlOiB0aGlzLCBiYXNlUGF0aDogJ2NoYXQnfSk7XG4gIH1cblxuICBjcmVhdGVNZWRpYSgpIHtcbiAgICByZXR1cm4gbmV3IE1lZGlhKHtzZXJ2aWNlOiB0aGlzLCBiYXNlUGF0aDogJ21lZGlhJ30pO1xuICB9XG5cbiAgY3JlYXRlRmlsZSgpIHtcbiAgICByZXR1cm4gbmV3IEZpbGUoe3NlcnZpY2U6IHRoaXMsIGJhc2VQYXRoOiAnZmlsZSd9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaW5nVGFsaztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
