'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dingtalk = require('../vendor/dingtalk');

var _dingtalk2 = _interopRequireDefault(_dingtalk);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by michao on 16/8/2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Client = function (_Base) {
  _inherits(Client, _Base);

  function Client() {
    _classCallCheck(this, Client);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Client).apply(this, arguments));
  }

  _createClass(Client, [{
    key: 'getAccess',
    value: function getAccess(url, apiList) {
      var noncestr = _service2.default.getNonceSecurityString();
      var timestamp = Date.now();
      _dingtalk2.default.config({
        agentId: process.env.agentId, // 必填，微应用ID
        corpId: process.env.corpId, //必填，企业ID
        timeStamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: _service2.default.getSignature(noncestr, timestamp, this.service.getTicket(), url), // 必填，签名
        jsApiList: apiList // 必填，需要使用的jsapi列表
      });

      return new Promise(function (resolve, reject) {
        _dingtalk2.default.error(function (err) {
          return reject(err);
        });
        _dingtalk2.default.ready(function () {
          return resolve(_dingtalk2.default);
        });
      });
    }
  }]);

  return Client;
}(_base2.default);

exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFMQTs7Ozs7SUFNTSxNOzs7Ozs7Ozs7Ozs4QkFDTSxHLEVBQUssTyxFQUFTO0FBQ3RCLFVBQUksV0FBVyxrQkFBUSxzQkFBUixFQUFmO0FBQ0EsVUFBSSxZQUFZLEtBQUssR0FBTCxFQUFoQjtBQUNBLHlCQUFHLE1BQUgsQ0FBVTtBQUNSLGlCQUFTLFFBQVEsR0FBUixDQUFZLE9BRGIsRUFDc0I7QUFDOUIsZ0JBQVEsUUFBUSxHQUFSLENBQVksTUFGWixFQUVtQjtBQUMzQixtQkFBVyxTQUhILEVBR2M7QUFDdEIsa0JBQVUsUUFKRixFQUlZO0FBQ3BCLG1CQUFXLGtCQUFRLFlBQVIsQ0FBcUIsUUFBckIsRUFBK0IsU0FBL0IsRUFBMEMsS0FBSyxPQUFMLENBQWEsU0FBYixFQUExQyxFQUFvRSxHQUFwRSxDQUxILEVBSzZFO0FBQ3JGLG1CQUFXLE9BTkgsQ0FNVztBQU5YLE9BQVY7O0FBU0EsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQW9CO0FBQ3JDLDJCQUFHLEtBQUgsQ0FBVSxVQUFVLEdBQVYsRUFBZTtBQUN2QixpQkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUNELFNBRkQ7QUFHQSwyQkFBRyxLQUFILENBQVMsWUFBWTtBQUNuQixpQkFBTywyQkFBUDtBQUNELFNBRkQ7QUFHRCxPQVBNLENBQVA7QUFRRDs7Ozs7O2tCQUVZLE0iLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi84LzIuXG4gKi9cbmltcG9ydCBkZCBmcm9tICcuLi92ZW5kb3IvZGluZ3RhbGsnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5jbGFzcyBDbGllbnQgZXh0ZW5kcyBCYXNlIHtcbiAgZ2V0QWNjZXNzKHVybCwgYXBpTGlzdCkge1xuICAgIHZhciBub25jZXN0ciA9IFNlcnZpY2UuZ2V0Tm9uY2VTZWN1cml0eVN0cmluZygpO1xuICAgIHZhciB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIGRkLmNvbmZpZyh7XG4gICAgICBhZ2VudElkOiBwcm9jZXNzLmVudi5hZ2VudElkLCAvLyDlv4XloavvvIzlvq7lupTnlKhJRFxuICAgICAgY29ycElkOiBwcm9jZXNzLmVudi5jb3JwSWQsLy/lv4XloavvvIzkvIHkuJpJRFxuICAgICAgdGltZVN0YW1wOiB0aW1lc3RhbXAsIC8vIOW/heWhq++8jOeUn+aIkOetvuWQjeeahOaXtumXtOaIs1xuICAgICAgbm9uY2VTdHI6IG5vbmNlc3RyLCAvLyDlv4XloavvvIznlJ/miJDnrb7lkI3nmoTpmo/mnLrkuLJcbiAgICAgIHNpZ25hdHVyZTogU2VydmljZS5nZXRTaWduYXR1cmUobm9uY2VzdHIsIHRpbWVzdGFtcCwgdGhpcy5zZXJ2aWNlLmdldFRpY2tldCgpLCB1cmwpLCAvLyDlv4XloavvvIznrb7lkI1cbiAgICAgIGpzQXBpTGlzdDogYXBpTGlzdCAvLyDlv4XloavvvIzpnIDopoHkvb/nlKjnmoRqc2FwaeWIl+ihqFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgZGQuZXJyb3IoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgfSkpO1xuICAgICAgZGQucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShkZCk7XG4gICAgICB9KTtcbiAgICB9KVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDbGllbnQ7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
