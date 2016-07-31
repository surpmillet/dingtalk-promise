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
      return _crypto2.default.pseudoRandomBytes(16).toString();
    }
  }, {
    key: 'getSignature',
    value: function getSignature(noncestr, timestamp, jsapi_ticket, url) {
      var arr = _lodash2.default.map({ noncestr: noncestr, timestamp: timestamp, jsapi_ticket: jsapi_ticket, url: url }, function (value, key) {
        return { key: key, value: value };
      });
      var data = _lodash2.default.sortBy(arr, 'key').map(function (o) {
        return o.key + '=' + o.value;
      }).join('&');
      var hash = _crypto2.default.createHash('sha1');
      return hash.update(data).digest('hex');
    }
  }]);

  return Service;
}();

exports.default = Service;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FqQkFBQTs7Ozs7QUFHQTs7OztBQUNBOzs7Ozs7OztJQUNNLE87Ozs7Ozs7cUNBQ29CO0FBQ3RCLGFBQU8saUJBQU8saUJBQVAsQ0FBeUIsRUFBekIsRUFBNkIsUUFBN0IsRUFBUDtBQUNEOzs7aUNBRW1CLFEsRUFBVSxTLEVBQVcsWSxFQUFjLEcsRUFBSztBQUMxRCxVQUFJLE1BQU0saUJBQUUsR0FBRixDQUFNLEVBQUMsa0JBQUQsRUFBVyxvQkFBWCxFQUFzQiwwQkFBdEIsRUFBb0MsUUFBcEMsRUFBTixFQUFnRCxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWU7QUFDdkUsZUFBTyxFQUFDLEtBQUssR0FBTixFQUFXLE9BQU8sS0FBbEIsRUFBUDtBQUNELE9BRlMsQ0FBVjtBQUdBLFVBQUksT0FBTyxpQkFBRSxNQUFGLENBQVMsR0FBVCxFQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBeUIsVUFBQyxDQUFELEVBQU07QUFDeEMsZUFBTyxFQUFFLEdBQUYsR0FBUSxHQUFSLEdBQWMsRUFBRSxLQUF2QjtBQUNELE9BRlUsRUFFUixJQUZRLENBRUgsR0FGRyxDQUFYO0FBR0EsVUFBSSxPQUFPLGlCQUFPLFVBQVAsQ0FBa0IsTUFBbEIsQ0FBWDtBQUNBLGFBQU8sS0FBSyxNQUFMLENBQVksSUFBWixFQUFrQixNQUFsQixDQUF5QixLQUF6QixDQUFQO0FBQ0Q7Ozs7OztrQkFHWSxPIiwiZmlsZSI6InNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMjguXG4gKi9cbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5jbGFzcyBTZXJ2aWNlIHtcbiAgc3RhdGljIGdldE5vbmNlU3RyaW5nKCkge1xuICAgIHJldHVybiBjcnlwdG8ucHNldWRvUmFuZG9tQnl0ZXMoMTYpLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0U2lnbmF0dXJlKG5vbmNlc3RyLCB0aW1lc3RhbXAsIGpzYXBpX3RpY2tldCwgdXJsKSB7XG4gICAgdmFyIGFyciA9IF8ubWFwKHtub25jZXN0ciwgdGltZXN0YW1wLCBqc2FwaV90aWNrZXQsIHVybH0sICh2YWx1ZSwga2V5KT0+IHtcbiAgICAgIHJldHVybiB7a2V5OiBrZXksIHZhbHVlOiB2YWx1ZX07XG4gICAgfSk7XG4gICAgdmFyIGRhdGEgPSBfLnNvcnRCeShhcnIsICdrZXknKS5tYXAoKG8pPT4ge1xuICAgICAgcmV0dXJuIG8ua2V5ICsgJz0nICsgby52YWx1ZTtcbiAgICB9KS5qb2luKCcmJyk7XG4gICAgdmFyIGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMScpO1xuICAgIHJldHVybiBoYXNoLnVwZGF0ZShkYXRhKS5kaWdlc3QoJ2hleCcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2U7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
