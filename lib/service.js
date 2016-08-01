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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FqQkFBQTs7Ozs7QUFHQTs7OztBQUNBOzs7Ozs7OztJQUNNLE87Ozs7Ozs7cUNBQzRCO0FBQUEsVUFBVixHQUFVLHlEQUFKLEVBQUk7O0FBQzlCLGFBQU8saUJBQU8saUJBQVAsQ0FBeUIsR0FBekIsRUFBOEIsUUFBOUIsRUFBUDtBQUNEOzs7NkNBRXVDO0FBQUEsVUFBVixHQUFVLHlEQUFKLEVBQUk7O0FBQ3RDLFVBQUksT0FBTyxnRUFBWDtBQUNBLFVBQUksVUFBVSxFQUFkO0FBQ0EsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCO0FBQzVCLGdCQUFRLENBQVIsSUFBYSxLQUFLLE1BQUwsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsS0FBSyxNQUFoQyxDQUFaLENBQWI7QUFDRDtBQUNELGFBQU8sUUFBUSxJQUFSLENBQWEsRUFBYixDQUFQO0FBQ0Q7OztpQ0FFbUIsUSxFQUFVLFMsRUFBVyxZLEVBQWMsRyxFQUFLO0FBQzFELFVBQUksTUFBTSxpQkFBRSxHQUFGLENBQU0sRUFBQyxrQkFBRCxFQUFXLG9CQUFYLEVBQXNCLDBCQUF0QixFQUFvQyxRQUFwQyxFQUFOLEVBQWdELFVBQUMsS0FBRCxFQUFRLEdBQVIsRUFBZTtBQUN2RSxlQUFPLEVBQUMsS0FBSyxHQUFOLEVBQVcsT0FBTyxLQUFsQixFQUFQO0FBQ0QsT0FGUyxDQUFWO0FBR0EsVUFBSSxPQUFPLGlCQUFFLE1BQUYsQ0FBUyxHQUFULEVBQWMsS0FBZCxFQUFxQixHQUFyQixDQUF5QixVQUFDLENBQUQsRUFBTTtBQUN4QyxlQUFPLEVBQUUsR0FBRixHQUFRLEdBQVIsR0FBYyxFQUFFLEtBQXZCO0FBQ0QsT0FGVSxFQUVSLElBRlEsQ0FFSCxHQUZHLENBQVg7QUFHQSxVQUFJLE9BQU8saUJBQU8sVUFBUCxDQUFrQixNQUFsQixDQUFYO0FBQ0EsYUFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLE1BQWxCLENBQXlCLEtBQXpCLENBQVA7QUFDRDs7Ozs7O2tCQUdZLE8iLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8yOC5cbiAqL1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmNsYXNzIFNlcnZpY2Uge1xuICBzdGF0aWMgZ2V0Tm9uY2VTdHJpbmcobnVtID0gMTYpIHtcbiAgICByZXR1cm4gY3J5cHRvLnBzZXVkb1JhbmRvbUJ5dGVzKG51bSkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROb25jZVNlY3VyaXR5U3RyaW5nKG51bSA9IDE2KSB7XG4gICAgdmFyIHBvb2wgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVowMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgcmVzdWx0c1tpXSA9IHBvb2wuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvb2wubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzLmpvaW4oJycpO1xuICB9XG5cbiAgc3RhdGljIGdldFNpZ25hdHVyZShub25jZXN0ciwgdGltZXN0YW1wLCBqc2FwaV90aWNrZXQsIHVybCkge1xuICAgIHZhciBhcnIgPSBfLm1hcCh7bm9uY2VzdHIsIHRpbWVzdGFtcCwganNhcGlfdGlja2V0LCB1cmx9LCAodmFsdWUsIGtleSk9PiB7XG4gICAgICByZXR1cm4ge2tleToga2V5LCB2YWx1ZTogdmFsdWV9O1xuICAgIH0pO1xuICAgIHZhciBkYXRhID0gXy5zb3J0QnkoYXJyLCAna2V5JykubWFwKChvKT0+IHtcbiAgICAgIHJldHVybiBvLmtleSArICc9JyArIG8udmFsdWU7XG4gICAgfSkuam9pbignJicpO1xuICAgIHZhciBoYXNoID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTEnKTtcbiAgICByZXR1cm4gaGFzaC51cGRhdGUoZGF0YSkuZGlnZXN0KCdoZXgnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
