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

var Ticket = function () {
  function Ticket(access_token) {
    var expireIn = arguments.length <= 1 || arguments[1] === undefined ? 7200 : arguments[1];
    var req = arguments.length <= 2 || arguments[2] === undefined ? _superagent2.default : arguments[2];

    _classCallCheck(this, Ticket);

    this.access_token = access_token;
    this.expireIn = expireIn;
    this.request = req;
  }

  _createClass(Ticket, [{
    key: 'isExpired',
    value: function isExpired(timestamp) {
      return timestamp - this.createdAt >= this.expireIn;
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {
      return { 'jsapi_ticket': this.content };
    }
  }, {
    key: 'getTicket',
    value: function getTicket(options) {
      var _this = this;

      if (this.content && !this.isExpired(Date.now())) {
        return Promise.resolve(this.cache);
      }
      return this.request('https://oapi.dingtalk.com/get_jsapi_ticket?type=jsapi&access_token=' + options.access_token).then(function (data) {
        _this.createdAt = Date.now();
        _this.content = data.body.ticket;
        return _this.valueOf();
      });
    }
  }]);

  return Ticket;
}();

exports.default = Ticket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpY2tldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7cWpCQUFBOzs7OztBQUdBOzs7Ozs7OztJQUNNLE07QUFJSixrQkFBWSxZQUFaLEVBQTBEO0FBQUEsUUFBaEMsUUFBZ0MseURBQXJCLElBQXFCO0FBQUEsUUFBZixHQUFlOztBQUFBOztBQUN4RCxTQUFLLFlBQUwsR0FBb0IsWUFBcEI7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxTQUFLLE9BQUwsR0FBZSxHQUFmO0FBQ0Q7Ozs7OEJBRVMsUyxFQUFXO0FBQ25CLGFBQU8sWUFBWSxLQUFLLFNBQWpCLElBQThCLEtBQUssUUFBMUM7QUFDRDs7OzhCQUVTO0FBQ1IsYUFBTyxFQUFDLGdCQUFnQixLQUFLLE9BQXRCLEVBQVA7QUFDRDs7OzhCQUVTLE8sRUFBUztBQUFBOztBQUNqQixVQUFJLEtBQUssT0FBTCxJQUFnQixDQUFDLEtBQUssU0FBTCxDQUFlLEtBQUssR0FBTCxFQUFmLENBQXJCLEVBQWlEO0FBQy9DLGVBQU8sUUFBUSxPQUFSLENBQWdCLEtBQUssS0FBckIsQ0FBUDtBQUNEO0FBQ0QsYUFBTyxLQUFLLE9BQUwsQ0FBYSx3RUFBd0UsUUFBUSxZQUE3RixFQUNKLElBREksQ0FDQyxVQUFDLElBQUQsRUFBUztBQUNiLGNBQUssU0FBTCxHQUFpQixLQUFLLEdBQUwsRUFBakI7QUFDQSxjQUFLLE9BQUwsR0FBZSxLQUFLLElBQUwsQ0FBVSxNQUF6QjtBQUNBLGVBQU8sTUFBSyxPQUFMLEVBQVA7QUFDRCxPQUxJLENBQVA7QUFNRDs7Ozs7O2tCQUVZLE0iLCJmaWxlIjoidGlja2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI4LlxuICovXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50JztcbmNsYXNzIFRpY2tldCB7XG4gIGNyZWF0ZWRBdDtcbiAgY29udGVudDtcblxuICBjb25zdHJ1Y3RvcihhY2Nlc3NfdG9rZW4sIGV4cGlyZUluID0gNzIwMCwgcmVxID0gcmVxdWVzdCkge1xuICAgIHRoaXMuYWNjZXNzX3Rva2VuID0gYWNjZXNzX3Rva2VuO1xuICAgIHRoaXMuZXhwaXJlSW4gPSBleHBpcmVJbjtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXE7XG4gIH1cblxuICBpc0V4cGlyZWQodGltZXN0YW1wKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcCAtIHRoaXMuY3JlYXRlZEF0ID49IHRoaXMuZXhwaXJlSW47XG4gIH1cblxuICB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB7J2pzYXBpX3RpY2tldCc6IHRoaXMuY29udGVudH07XG4gIH1cblxuICBnZXRUaWNrZXQob3B0aW9ucykge1xuICAgIGlmICh0aGlzLmNvbnRlbnQgJiYgIXRoaXMuaXNFeHBpcmVkKERhdGUubm93KCkpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuY2FjaGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdodHRwczovL29hcGkuZGluZ3RhbGsuY29tL2dldF9qc2FwaV90aWNrZXQ/dHlwZT1qc2FwaSZhY2Nlc3NfdG9rZW49JyArIG9wdGlvbnMuYWNjZXNzX3Rva2VuKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZWRBdCA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGRhdGEuYm9keS50aWNrZXQ7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgICAgIH0pO1xuICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgVGlja2V0O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
