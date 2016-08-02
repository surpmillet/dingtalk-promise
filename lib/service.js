'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by michao on 16/7/28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
  function Service() {
    _classCallCheck(this, Service);
  }

  _createClass(Service, null, [{
    key: 'getNonceString',
    value: function getNonceString() {
      var num = arguments.length <= 0 || arguments[0] === undefined ? 16 : arguments[0];

      return _crypto2.default.pseudoRandomBytes(num).toString();
    }
  }, {
    key: 'getNonceSecurityString',
    value: function getNonceSecurityString() {
      var num = arguments.length <= 0 || arguments[0] === undefined ? 16 : arguments[0];

      var pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
      var results = [];
      for (var i = 0; i < num; i++) {
        results[i] = pool.charAt(Math.floor(Math.random() * pool.length));
      }
      return results.join('');
    }
  }, {
    key: 'getSignature',
    value: function getSignature(noncestr, timestamp, jsapi_ticket, url) {
      var arr = (0, _lodash2.default)({ noncestr: noncestr, timestamp: timestamp, jsapi_ticket: jsapi_ticket, url: url }).map(function (value, key) {
        return { key: key, value: value };
      });
      var data = (0, _lodash2.default)(arr).sortBy('key').map(function (o) {
        return o.key + '=' + o.value;
      }).join('&');
      var hash = _crypto2.default.createHash('sha1');
      return hash.update(data).digest('hex');
    }
  }]);

  return Service;
}();

exports.default = Service;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FqQkFBQTs7Ozs7QUFHQTs7OztBQUNBOzs7Ozs7OztJQUNNLE87Ozs7Ozs7cUNBQzRCO0FBQUEsVUFBVixHQUFVLHlEQUFKLEVBQUk7O0FBQzlCLGFBQU8saUJBQU8saUJBQVAsQ0FBeUIsR0FBekIsRUFBOEIsUUFBOUIsRUFBUDtBQUNEOzs7NkNBRXVDO0FBQUEsVUFBVixHQUFVLHlEQUFKLEVBQUk7O0FBQ3RDLFVBQUksT0FBTyxnRUFBWDtBQUNBLFVBQUksVUFBVSxFQUFkO0FBQ0EsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCO0FBQzVCLGdCQUFRLENBQVIsSUFBYSxLQUFLLE1BQUwsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsS0FBSyxNQUFoQyxDQUFaLENBQWI7QUFDRDtBQUNELGFBQU8sUUFBUSxJQUFSLENBQWEsRUFBYixDQUFQO0FBQ0Q7OztpQ0FFbUIsUSxFQUFVLFMsRUFBVyxZLEVBQWMsRyxFQUFLO0FBQzFELFVBQUksTUFBTSxzQkFBRSxFQUFDLGtCQUFELEVBQVcsb0JBQVgsRUFBc0IsMEJBQXRCLEVBQW9DLFFBQXBDLEVBQUYsRUFBNEMsR0FBNUMsQ0FBZ0QsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFlO0FBQ3ZFLGVBQU8sRUFBQyxLQUFLLEdBQU4sRUFBVyxPQUFPLEtBQWxCLEVBQVA7QUFDRCxPQUZTLENBQVY7QUFHQSxVQUFJLE9BQU8sc0JBQUUsR0FBRixFQUFPLE1BQVAsQ0FBYyxLQUFkLEVBQXFCLEdBQXJCLENBQXlCLFVBQUMsQ0FBRCxFQUFNO0FBQ3hDLGVBQU8sRUFBRSxHQUFGLEdBQVEsR0FBUixHQUFjLEVBQUUsS0FBdkI7QUFDRCxPQUZVLEVBRVIsSUFGUSxDQUVILEdBRkcsQ0FBWDtBQUdBLFVBQUksT0FBTyxpQkFBTyxVQUFQLENBQWtCLE1BQWxCLENBQVg7QUFDQSxhQUFPLEtBQUssTUFBTCxDQUFZLElBQVosRUFBa0IsTUFBbEIsQ0FBeUIsS0FBekIsQ0FBUDtBQUNEOzs7Ozs7a0JBR1ksTyIsImZpbGUiOiJzZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzI4LlxuICovXG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuY2xhc3MgU2VydmljZSB7XG4gIHN0YXRpYyBnZXROb25jZVN0cmluZyhudW0gPSAxNikge1xuICAgIHJldHVybiBjcnlwdG8ucHNldWRvUmFuZG9tQnl0ZXMobnVtKS50b1N0cmluZygpO1xuICB9XG5cbiAgc3RhdGljIGdldE5vbmNlU2VjdXJpdHlTdHJpbmcobnVtID0gMTYpIHtcbiAgICB2YXIgcG9vbCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICByZXN1bHRzW2ldID0gcG9vbC5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9vbC5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHMuam9pbignJyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0U2lnbmF0dXJlKG5vbmNlc3RyLCB0aW1lc3RhbXAsIGpzYXBpX3RpY2tldCwgdXJsKSB7XG4gICAgdmFyIGFyciA9IF8oe25vbmNlc3RyLCB0aW1lc3RhbXAsIGpzYXBpX3RpY2tldCwgdXJsfSkubWFwKCh2YWx1ZSwga2V5KT0+IHtcbiAgICAgIHJldHVybiB7a2V5OiBrZXksIHZhbHVlOiB2YWx1ZX07XG4gICAgfSk7XG4gICAgdmFyIGRhdGEgPSBfKGFycikuc29ydEJ5KCdrZXknKS5tYXAoKG8pPT4ge1xuICAgICAgcmV0dXJuIG8ua2V5ICsgJz0nICsgby52YWx1ZTtcbiAgICB9KS5qb2luKCcmJyk7XG4gICAgdmFyIGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMScpO1xuICAgIHJldHVybiBoYXNoLnVwZGF0ZShkYXRhKS5kaWdlc3QoJ2hleCcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2U7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
