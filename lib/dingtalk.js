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

var _space = require('./space');

var _space2 = _interopRequireDefault(_space);

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
  }, {
    key: 'createSpace',
    value: function createSpace() {
      return new _space2.default({ service: this, basePath: 'cspace' });
    }
  }]);

  return DingTalk;
}();

exports.default = DingTalk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpbmd0YWxrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUNNLFE7QUFFSixvQkFBWSxNQUFaLEVBQW9CLFVBQXBCLEVBQWlFO0FBQUEsUUFBakMsUUFBaUMseURBQXRCLE9BQU8sSUFBZTtBQUFBLFFBQVQsT0FBUzs7QUFBQTs7QUFDL0QsU0FBSyxPQUFMLEdBQWUsUUFBZjtBQUNBLFNBQUssS0FBTCxHQUFhLG9CQUFVLE1BQVYsRUFBa0IsVUFBbEIsRUFBOEIsUUFBOUIsRUFBd0MsT0FBeEMsQ0FBYjtBQUNBLFNBQUssTUFBTCxHQUFjLHFCQUFXLElBQVgsRUFBaUIsUUFBakIsRUFBMkIsT0FBM0IsQ0FBZDtBQUNBLFNBQUssT0FBTDtBQUNEOzs7O3FDQUVnQjtBQUNmLGFBQU8sS0FBSyxLQUFMLENBQVcsT0FBbEI7QUFDRDs7O2dDQUVXO0FBQ1YsYUFBTyxLQUFLLE1BQUwsQ0FBWSxPQUFuQjtBQUNEOzs7aUNBRVksSyxFQUFPLFMsRUFBVyxHLEVBQUs7QUFDbEMsYUFBTyxLQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLEtBQTFCLEVBQWlDLFNBQWpDLEVBQTRDLEtBQUssU0FBTCxFQUE1QyxFQUE4RCxHQUE5RCxDQUFQO0FBQ0Q7OzswQkFFSztBQUNKLGFBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxHQUNKLElBREksQ0FDQyxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLElBQXRCLENBQTJCLEtBQUssTUFBaEMsQ0FERCxDQUFQO0FBRUQ7Ozs0QkFFTztBQUFBOztBQUNOLGtCQUFZLFlBQUs7QUFDZixjQUFLLEtBQUwsQ0FBVyxjQUFYLEdBQ0csSUFESCxDQUNRLE1BQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsSUFBdEIsQ0FBMkIsTUFBSyxNQUFoQyxDQURSO0FBRUQsT0FIRCxFQUdHLEtBQUssT0FIUjtBQUlEOzs7aUNBRVk7QUFDWCxhQUFPLG1CQUFTLEVBQUMsU0FBUyxJQUFWLEVBQWdCLFVBQVUsTUFBMUIsRUFBVCxDQUFQO0FBQ0Q7Ozt1Q0FFa0I7QUFDakIsYUFBTyx5QkFBZSxFQUFDLFNBQVMsSUFBVixFQUFnQixVQUFVLFlBQTFCLEVBQWYsQ0FBUDtBQUNEOzs7aUNBRVk7QUFDWCxhQUFPLG1CQUFTLEVBQUMsU0FBUyxJQUFWLEVBQWdCLFVBQVUsTUFBMUIsRUFBVCxDQUFQO0FBQ0Q7OztrQ0FFYTtBQUNaLGFBQU8sb0JBQVUsRUFBQyxTQUFTLElBQVYsRUFBZ0IsVUFBVSxPQUExQixFQUFWLENBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsYUFBTyxtQkFBUyxFQUFDLFNBQVMsSUFBVixFQUFnQixVQUFVLE1BQTFCLEVBQVQsQ0FBUDtBQUNEOzs7a0NBRWE7QUFDWixhQUFPLG9CQUFVLEVBQUMsU0FBUyxJQUFWLEVBQWdCLFVBQVUsUUFBMUIsRUFBVixDQUFQO0FBQ0Q7Ozs7OztrQkFHWSxRIiwiZmlsZSI6ImRpbmd0YWxrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI1LlxuICovXG5pbXBvcnQgVG9rZW4gZnJvbSAnLi90b2tlbic7XG5pbXBvcnQgVGlja2V0IGZyb20gJy4vdGlja2V0JztcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcic7XG5pbXBvcnQgRGVwYXJ0bWVudCBmcm9tICcuL2RlcGFydG1lbnQnO1xuaW1wb3J0IENoYXQgZnJvbSAnLi9jaGF0JztcbmltcG9ydCBNZWRpYSBmcm9tICcuL21lZGlhJztcbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSc7XG5pbXBvcnQgU3BhY2UgZnJvbSAnLi9zcGFjZSc7XG5pbXBvcnQgU2VydmljZSBmcm9tICcuL3NlcnZpY2UnO1xuY2xhc3MgRGluZ1RhbGsge1xuXG4gIGNvbnN0cnVjdG9yKGNvcnBJZCwgY29ycFNlY3JldCwgZXhwaXJlSW4gPSA3MjAwICogMTAwMCwgcmVxdWVzdCkge1xuICAgIHRoaXMudGltZW91dCA9IGV4cGlyZUluO1xuICAgIHRoaXMudG9rZW4gPSBuZXcgVG9rZW4oY29ycElkLCBjb3JwU2VjcmV0LCBleHBpcmVJbiwgcmVxdWVzdCk7XG4gICAgdGhpcy50aWNrZXQgPSBuZXcgVGlja2V0KG51bGwsIGV4cGlyZUluLCByZXF1ZXN0KTtcbiAgICB0aGlzLlNlcnZpY2UgPSBTZXJ2aWNlO1xuICB9XG5cbiAgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW4uY29udGVudDtcbiAgfTtcblxuICBnZXRUaWNrZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGlja2V0LmNvbnRlbnQ7XG4gIH1cblxuICBnZXRTaWduYXR1cmUobm9uY2UsIHRpbWVzdGFtcCwgdXJsKSB7XG4gICAgcmV0dXJuIHRoaXMuU2VydmljZS5nZXRTaWduYXR1cmUobm9uY2UsIHRpbWVzdGFtcCwgdGhpcy5nZXRUaWNrZXQoKSwgdXJsKTtcbiAgfVxuXG4gIHJ1bigpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbi5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICAudGhlbih0aGlzLnRpY2tldC5nZXRUaWNrZXQuYmluZCh0aGlzLnRpY2tldCkpO1xuICB9XG5cbiAgd2F0Y2goKSB7XG4gICAgc2V0SW50ZXJ2YWwoKCk9PiB7XG4gICAgICB0aGlzLnRva2VuLmdldEFjY2Vzc1Rva2VuKClcbiAgICAgICAgLnRoZW4odGhpcy50aWNrZXQuZ2V0VGlja2V0LmJpbmQodGhpcy50aWNrZXQpKTtcbiAgICB9LCB0aGlzLnRpbWVvdXQpO1xuICB9XG5cbiAgY3JlYXRlVXNlcigpIHtcbiAgICByZXR1cm4gbmV3IFVzZXIoe3NlcnZpY2U6IHRoaXMsIGJhc2VQYXRoOiAndXNlcid9KTtcbiAgfVxuXG4gIGNyZWF0ZURlcGFydG1lbnQoKSB7XG4gICAgcmV0dXJuIG5ldyBEZXBhcnRtZW50KHtzZXJ2aWNlOiB0aGlzLCBiYXNlUGF0aDogJ2RlcGFydG1lbnQnfSk7XG4gIH1cblxuICBjcmVhdGVDaGF0KCkge1xuICAgIHJldHVybiBuZXcgQ2hhdCh7c2VydmljZTogdGhpcywgYmFzZVBhdGg6ICdjaGF0J30pO1xuICB9XG5cbiAgY3JlYXRlTWVkaWEoKSB7XG4gICAgcmV0dXJuIG5ldyBNZWRpYSh7c2VydmljZTogdGhpcywgYmFzZVBhdGg6ICdtZWRpYSd9KTtcbiAgfVxuXG4gIGNyZWF0ZUZpbGUoKSB7XG4gICAgcmV0dXJuIG5ldyBGaWxlKHtzZXJ2aWNlOiB0aGlzLCBiYXNlUGF0aDogJ2ZpbGUnfSk7XG4gIH1cblxuICBjcmVhdGVTcGFjZSgpIHtcbiAgICByZXR1cm4gbmV3IFNwYWNlKHtzZXJ2aWNlOiB0aGlzLCBiYXNlUGF0aDogJ2NzcGFjZSd9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaW5nVGFsaztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
