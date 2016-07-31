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
                return Promise.resolve(this.valueOf());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpY2tldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7cWpCQUFBOzs7OztBQUdBOzs7Ozs7OztJQUNNLE07QUFJRixvQkFBWSxZQUFaLEVBQTBEO0FBQUEsWUFBaEMsUUFBZ0MseURBQXJCLElBQXFCO0FBQUEsWUFBZixHQUFlOztBQUFBOztBQUN0RCxhQUFLLFlBQUwsR0FBb0IsWUFBcEI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLE9BQUwsR0FBZSxHQUFmO0FBQ0g7Ozs7a0NBRVMsUyxFQUFXO0FBQ2pCLG1CQUFPLFlBQVksS0FBSyxTQUFqQixJQUE4QixLQUFLLFFBQTFDO0FBQ0g7OztrQ0FFUztBQUNOLG1CQUFPLEVBQUMsZ0JBQWdCLEtBQUssT0FBdEIsRUFBUDtBQUNIOzs7a0NBRVMsTyxFQUFTO0FBQUE7O0FBQ2YsZ0JBQUksS0FBSyxPQUFMLElBQWdCLENBQUMsS0FBSyxTQUFMLENBQWUsS0FBSyxHQUFMLEVBQWYsQ0FBckIsRUFBaUQ7QUFDN0MsdUJBQU8sUUFBUSxPQUFSLENBQWdCLEtBQUssT0FBTCxFQUFoQixDQUFQO0FBQ0g7QUFDRCxtQkFBTyxLQUFLLE9BQUwsQ0FBYSx3RUFBd0UsUUFBUSxZQUE3RixFQUNGLElBREUsQ0FDRyxVQUFDLElBQUQsRUFBUztBQUNYLHNCQUFLLFNBQUwsR0FBaUIsS0FBSyxHQUFMLEVBQWpCO0FBQ0Esc0JBQUssT0FBTCxHQUFlLEtBQUssSUFBTCxDQUFVLE1BQXpCO0FBQ0EsdUJBQU8sTUFBSyxPQUFMLEVBQVA7QUFDSCxhQUxFLENBQVA7QUFNSDs7Ozs7O2tCQUVVLE0iLCJmaWxlIjoidGlja2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI4LlxuICovXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50JztcbmNsYXNzIFRpY2tldCB7XG4gICAgY3JlYXRlZEF0O1xuICAgIGNvbnRlbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihhY2Nlc3NfdG9rZW4sIGV4cGlyZUluID0gNzIwMCwgcmVxID0gcmVxdWVzdCkge1xuICAgICAgICB0aGlzLmFjY2Vzc190b2tlbiA9IGFjY2Vzc190b2tlbjtcbiAgICAgICAgdGhpcy5leHBpcmVJbiA9IGV4cGlyZUluO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXE7XG4gICAgfVxuXG4gICAgaXNFeHBpcmVkKHRpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gdGltZXN0YW1wIC0gdGhpcy5jcmVhdGVkQXQgPj0gdGhpcy5leHBpcmVJbjtcbiAgICB9XG5cbiAgICB2YWx1ZU9mKCkge1xuICAgICAgICByZXR1cm4geydqc2FwaV90aWNrZXQnOiB0aGlzLmNvbnRlbnR9O1xuICAgIH1cblxuICAgIGdldFRpY2tldChvcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQgJiYgIXRoaXMuaXNFeHBpcmVkKERhdGUubm93KCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMudmFsdWVPZigpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdodHRwczovL29hcGkuZGluZ3RhbGsuY29tL2dldF9qc2FwaV90aWNrZXQ/dHlwZT1qc2FwaSZhY2Nlc3NfdG9rZW49JyArIG9wdGlvbnMuYWNjZXNzX3Rva2VuKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlZEF0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBkYXRhLmJvZHkudGlja2V0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59XG5leHBvcnQgZGVmYXVsdCBUaWNrZXQ7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
