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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpbmd0YWxrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUNNLFE7QUFFRixzQkFBWSxNQUFaLEVBQW9CLFVBQXBCLEVBQWlFO0FBQUEsWUFBakMsUUFBaUMseURBQXRCLE9BQU8sSUFBZTtBQUFBLFlBQVQsT0FBUzs7QUFBQTs7QUFDN0QsYUFBSyxPQUFMLEdBQWUsUUFBZjtBQUNBLGFBQUssS0FBTCxHQUFhLG9CQUFVLE1BQVYsRUFBa0IsVUFBbEIsRUFBOEIsUUFBOUIsRUFBd0MsT0FBeEMsQ0FBYjtBQUNBLGFBQUssTUFBTCxHQUFjLHFCQUFXLElBQVgsRUFBaUIsUUFBakIsRUFBMkIsT0FBM0IsQ0FBZDtBQUNBLGFBQUssSUFBTCxHQUFZLG1CQUFTLEVBQUMsU0FBUyxJQUFWLEVBQWdCLE1BQU0sTUFBdEIsRUFBVCxDQUFaO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLHlCQUFlLEVBQUMsU0FBUyxJQUFWLEVBQWdCLE1BQU0sWUFBdEIsRUFBZixDQUFsQjtBQUNBLGFBQUssSUFBTCxHQUFZLG1CQUFTLEVBQUMsU0FBUyxJQUFWLEVBQWdCLE1BQU0sTUFBdEIsRUFBVCxDQUFaO0FBQ0EsYUFBSyxPQUFMO0FBQ0g7Ozs7eUNBRWdCO0FBQ2IsbUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBbEI7QUFDSDs7O29DQUVXO0FBQ1IsbUJBQU8sS0FBSyxNQUFMLENBQVksT0FBbkI7QUFDSDs7O3FDQUVZLEssRUFBTyxTLEVBQVcsRyxFQUFLO0FBQ2hDLG1CQUFPLEtBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsS0FBMUIsRUFBaUMsU0FBakMsRUFBNEMsS0FBSyxTQUFMLEVBQTVDLEVBQThELEdBQTlELENBQVA7QUFDSDs7OzhCQUVLO0FBQ0YsbUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxHQUNGLElBREUsQ0FDRyxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLElBQXRCLENBQTJCLEtBQUssTUFBaEMsQ0FESCxDQUFQO0FBRUg7OztnQ0FFTztBQUFBOztBQUNKLHdCQUFZLFlBQUs7QUFDYixzQkFBSyxLQUFMLENBQVcsY0FBWCxHQUNLLElBREwsQ0FDVSxNQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLElBQXRCLENBQTJCLE1BQUssTUFBaEMsQ0FEVjtBQUVILGFBSEQsRUFHRyxLQUFLLE9BSFI7QUFJSDs7Ozs7O2tCQUdVLFEiLCJmaWxlIjoiZGluZ3RhbGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjUuXG4gKi9cbmltcG9ydCBUb2tlbiBmcm9tICcuL3Rva2VuJztcbmltcG9ydCBUaWNrZXQgZnJvbSAnLi90aWNrZXQnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJztcbmltcG9ydCBEZXBhcnRtZW50IGZyb20gJy4vZGVwYXJ0bWVudCc7XG5pbXBvcnQgQ2hhdCBmcm9tICcuL2NoYXQnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcbmNsYXNzIERpbmdUYWxrIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvcnBJZCwgY29ycFNlY3JldCwgZXhwaXJlSW4gPSA3MjAwICogMTAwMCwgcmVxdWVzdCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBleHBpcmVJbjtcbiAgICAgICAgdGhpcy50b2tlbiA9IG5ldyBUb2tlbihjb3JwSWQsIGNvcnBTZWNyZXQsIGV4cGlyZUluLCByZXF1ZXN0KTtcbiAgICAgICAgdGhpcy50aWNrZXQgPSBuZXcgVGlja2V0KG51bGwsIGV4cGlyZUluLCByZXF1ZXN0KTtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoe3NlcnZpY2U6IHRoaXMsIG5hbWU6ICd1c2VyJ30pO1xuICAgICAgICB0aGlzLmRlcGFydG1lbnQgPSBuZXcgRGVwYXJ0bWVudCh7c2VydmljZTogdGhpcywgbmFtZTogJ2RlcGFydG1lbnQnfSk7XG4gICAgICAgIHRoaXMuY2hhdCA9IG5ldyBDaGF0KHtzZXJ2aWNlOiB0aGlzLCBuYW1lOiAnY2hhdCd9KTtcbiAgICAgICAgdGhpcy5TZXJ2aWNlID0gU2VydmljZTtcbiAgICB9XG5cbiAgICBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW4uY29udGVudDtcbiAgICB9O1xuXG4gICAgZ2V0VGlja2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50aWNrZXQuY29udGVudDtcbiAgICB9XG5cbiAgICBnZXRTaWduYXR1cmUobm9uY2UsIHRpbWVzdGFtcCwgdXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlNlcnZpY2UuZ2V0U2lnbmF0dXJlKG5vbmNlLCB0aW1lc3RhbXAsIHRoaXMuZ2V0VGlja2V0KCksIHVybCk7XG4gICAgfVxuXG4gICAgcnVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b2tlbi5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICAgICAgICAudGhlbih0aGlzLnRpY2tldC5nZXRUaWNrZXQuYmluZCh0aGlzLnRpY2tldCkpO1xuICAgIH1cblxuICAgIHdhdGNoKCkge1xuICAgICAgICBzZXRJbnRlcnZhbCgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4uZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgICAgICAgICAgIC50aGVuKHRoaXMudGlja2V0LmdldFRpY2tldC5iaW5kKHRoaXMudGlja2V0KSk7XG4gICAgICAgIH0sIHRoaXMudGltZW91dCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaW5nVGFsaztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
