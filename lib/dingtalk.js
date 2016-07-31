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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpbmd0YWxrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFDTSxRO0FBRUosb0JBQVksTUFBWixFQUFvQixVQUFwQixFQUFpRTtBQUFBLFFBQWpDLFFBQWlDLHlEQUF0QixPQUFPLElBQWU7QUFBQSxRQUFULE9BQVM7O0FBQUE7O0FBQy9ELFNBQUssT0FBTCxHQUFlLFFBQWY7QUFDQSxTQUFLLEtBQUwsR0FBYSxvQkFBVSxNQUFWLEVBQWtCLFVBQWxCLEVBQThCLFFBQTlCLEVBQXdDLE9BQXhDLENBQWI7QUFDQSxTQUFLLE1BQUwsR0FBYyxxQkFBVyxJQUFYLEVBQWlCLFFBQWpCLEVBQTJCLE9BQTNCLENBQWQ7QUFDQSxTQUFLLElBQUwsR0FBWSxtQkFBUyxFQUFDLFNBQVMsSUFBVixFQUFnQixNQUFNLE1BQXRCLEVBQVQsQ0FBWjtBQUNBLFNBQUssVUFBTCxHQUFrQix5QkFBZSxFQUFDLFNBQVMsSUFBVixFQUFnQixNQUFNLFlBQXRCLEVBQWYsQ0FBbEI7QUFDQSxTQUFLLE9BQUw7QUFDRDs7OztxQ0FFZ0I7QUFDZixhQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBSyxNQUFMLENBQVksT0FBbkI7QUFDRDs7O2lDQUVZLEssRUFBTyxTLEVBQVcsRyxFQUFLO0FBQ2xDLGFBQU8sS0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUExQixFQUFpQyxTQUFqQyxFQUE0QyxLQUFLLFNBQUwsRUFBNUMsRUFBOEQsR0FBOUQsQ0FBUDtBQUNEOzs7MEJBRUs7QUFDSixhQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsR0FDSixJQURJLENBQ0MsS0FBSyxNQUFMLENBQVksU0FBWixDQUFzQixJQUF0QixDQUEyQixLQUFLLE1BQWhDLENBREQsQ0FBUDtBQUVEOzs7NEJBRU87QUFBQTs7QUFDTixrQkFBWSxZQUFLO0FBQ2YsY0FBSyxLQUFMLENBQVcsY0FBWCxHQUNHLElBREgsQ0FDUSxNQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLElBQXRCLENBQTJCLE1BQUssTUFBaEMsQ0FEUjtBQUVELE9BSEQsRUFHRyxLQUFLLE9BSFI7QUFJRDs7Ozs7O2tCQUdZLFEiLCJmaWxlIjoiZGluZ3RhbGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjUuXG4gKi9cbmltcG9ydCBUb2tlbiBmcm9tICcuL3Rva2VuJztcbmltcG9ydCBUaWNrZXQgZnJvbSAnLi90aWNrZXQnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJztcbmltcG9ydCBEZXBhcnRtZW50IGZyb20gJy4vZGVwYXJ0bWVudCc7XG5pbXBvcnQgU2VydmljZSBmcm9tICcuL3NlcnZpY2UnO1xuY2xhc3MgRGluZ1RhbGsge1xuXG4gIGNvbnN0cnVjdG9yKGNvcnBJZCwgY29ycFNlY3JldCwgZXhwaXJlSW4gPSA3MjAwICogMTAwMCwgcmVxdWVzdCkge1xuICAgIHRoaXMudGltZW91dCA9IGV4cGlyZUluO1xuICAgIHRoaXMudG9rZW4gPSBuZXcgVG9rZW4oY29ycElkLCBjb3JwU2VjcmV0LCBleHBpcmVJbiwgcmVxdWVzdCk7XG4gICAgdGhpcy50aWNrZXQgPSBuZXcgVGlja2V0KG51bGwsIGV4cGlyZUluLCByZXF1ZXN0KTtcbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcih7c2VydmljZTogdGhpcywgbmFtZTogJ3VzZXInfSk7XG4gICAgdGhpcy5kZXBhcnRtZW50ID0gbmV3IERlcGFydG1lbnQoe3NlcnZpY2U6IHRoaXMsIG5hbWU6ICdkZXBhcnRtZW50J30pO1xuICAgIHRoaXMuU2VydmljZSA9IFNlcnZpY2U7XG4gIH1cblxuICBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbi5jb250ZW50O1xuICB9O1xuXG4gIGdldFRpY2tldCgpIHtcbiAgICByZXR1cm4gdGhpcy50aWNrZXQuY29udGVudDtcbiAgfVxuXG4gIGdldFNpZ25hdHVyZShub25jZSwgdGltZXN0YW1wLCB1cmwpIHtcbiAgICByZXR1cm4gdGhpcy5TZXJ2aWNlLmdldFNpZ25hdHVyZShub25jZSwgdGltZXN0YW1wLCB0aGlzLmdldFRpY2tldCgpLCB1cmwpO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIHJldHVybiB0aGlzLnRva2VuLmdldEFjY2Vzc1Rva2VuKClcbiAgICAgIC50aGVuKHRoaXMudGlja2V0LmdldFRpY2tldC5iaW5kKHRoaXMudGlja2V0KSk7XG4gIH1cblxuICB3YXRjaCgpIHtcbiAgICBzZXRJbnRlcnZhbCgoKT0+IHtcbiAgICAgIHRoaXMudG9rZW4uZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgICAudGhlbih0aGlzLnRpY2tldC5nZXRUaWNrZXQuYmluZCh0aGlzLnRpY2tldCkpO1xuICAgIH0sIHRoaXMudGltZW91dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGluZ1RhbGs7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
