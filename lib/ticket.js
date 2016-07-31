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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpY2tldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7cWpCQUFBOzs7OztBQUdBOzs7Ozs7OztJQUNNLE07QUFJSixrQkFBWSxZQUFaLEVBQTBEO0FBQUEsUUFBaEMsUUFBZ0MseURBQXJCLElBQXFCO0FBQUEsUUFBZixHQUFlOztBQUFBOztBQUN4RCxTQUFLLFlBQUwsR0FBb0IsWUFBcEI7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxTQUFLLE9BQUwsR0FBZSxHQUFmO0FBQ0Q7Ozs7OEJBRVMsUyxFQUFXO0FBQ25CLGFBQU8sWUFBWSxLQUFLLFNBQWpCLElBQThCLEtBQUssUUFBMUM7QUFDRDs7OzhCQUVTO0FBQ1IsYUFBTyxFQUFDLGdCQUFnQixLQUFLLE9BQXRCLEVBQVA7QUFDRDs7OzhCQUVTLE8sRUFBUztBQUFBOztBQUNqQixVQUFJLEtBQUssT0FBTCxJQUFnQixDQUFDLEtBQUssU0FBTCxDQUFlLEtBQUssR0FBTCxFQUFmLENBQXJCLEVBQWlEO0FBQy9DLGVBQU8sUUFBUSxPQUFSLENBQWdCLEtBQUssT0FBTCxFQUFoQixDQUFQO0FBQ0Q7QUFDRCxhQUFPLEtBQUssT0FBTCxDQUFhLHdFQUF3RSxRQUFRLFlBQTdGLEVBQ0osSUFESSxDQUNDLFVBQUMsSUFBRCxFQUFTO0FBQ2IsY0FBSyxTQUFMLEdBQWlCLEtBQUssR0FBTCxFQUFqQjtBQUNBLGNBQUssT0FBTCxHQUFlLEtBQUssSUFBTCxDQUFVLE1BQXpCO0FBQ0EsZUFBTyxNQUFLLE9BQUwsRUFBUDtBQUNELE9BTEksQ0FBUDtBQU1EOzs7Ozs7a0JBRVksTSIsImZpbGUiOiJ0aWNrZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjguXG4gKi9cbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnO1xuY2xhc3MgVGlja2V0IHtcbiAgY3JlYXRlZEF0O1xuICBjb250ZW50O1xuXG4gIGNvbnN0cnVjdG9yKGFjY2Vzc190b2tlbiwgZXhwaXJlSW4gPSA3MjAwLCByZXEgPSByZXF1ZXN0KSB7XG4gICAgdGhpcy5hY2Nlc3NfdG9rZW4gPSBhY2Nlc3NfdG9rZW47XG4gICAgdGhpcy5leHBpcmVJbiA9IGV4cGlyZUluO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcTtcbiAgfVxuXG4gIGlzRXhwaXJlZCh0aW1lc3RhbXApIHtcbiAgICByZXR1cm4gdGltZXN0YW1wIC0gdGhpcy5jcmVhdGVkQXQgPj0gdGhpcy5leHBpcmVJbjtcbiAgfVxuXG4gIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHsnanNhcGlfdGlja2V0JzogdGhpcy5jb250ZW50fTtcbiAgfVxuXG4gIGdldFRpY2tldChvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuY29udGVudCAmJiAhdGhpcy5pc0V4cGlyZWQoRGF0ZS5ub3coKSkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy52YWx1ZU9mKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdodHRwczovL29hcGkuZGluZ3RhbGsuY29tL2dldF9qc2FwaV90aWNrZXQ/dHlwZT1qc2FwaSZhY2Nlc3NfdG9rZW49JyArIG9wdGlvbnMuYWNjZXNzX3Rva2VuKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZWRBdCA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGRhdGEuYm9keS50aWNrZXQ7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgICAgIH0pO1xuICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgVGlja2V0O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
