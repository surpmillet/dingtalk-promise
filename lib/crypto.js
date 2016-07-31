'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by michao on 16/7/14.
                                                                                                                                                           */


var PKCS7Encoder = function PKCS7Encoder() {
  _classCallCheck(this, PKCS7Encoder);

  this.getBlockSize = function () {
    return 32;
  };

  this.encode = function (data) {
    var amountToPad = this.getBlockSize() - data.length % this.getBlockSize();
    if (amountToPad == 0) {
      amountToPad = this.getBlockSize();
    }
    var padding = Buffer.alloc(amountToPad);
    padding.fill(amountToPad);
    return Buffer.concat([data, padding]);
  };

  this.decode = function (data) {
    var padding = data[data.length - 1];
    if (padding < 1 || padding > this.getBlockSize()) {
      padding = 0;
    }
    return data.slice(0, data.length - padding);
  };
};

var Crypto = function () {
  function Crypto(token, encodingAESKey, key) {
    _classCallCheck(this, Crypto);

    this.token = token;
    this.aesKey = new Buffer(encodingAESKey + '=', 'base64');
    this.iv = this.aesKey.slice(0, 16);
    this.privateKey = key;
    this.encoder = new PKCS7Encoder();
  }

  _createClass(Crypto, [{
    key: 'getSignature',
    value: function getSignature(timestamp, nonce, encrypted) {
      try {
        var hash = _crypto2.default.createHash('sha1');
        hash.update([this.token, timestamp, nonce, encrypted].sort().join(''));
        return hash.digest('hex');
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: 'encrypt',
    value: function encrypt(msg) {
      var cipher = _crypto2.default.createCipheriv('aes-256-cbc', this.aesKey, this.iv).setAutoPadding(false);
      var buf = Buffer.alloc(4);
      buf.writeUInt32BE(msg.length, 0);
      var data = Buffer.concat([_crypto2.default.pseudoRandomBytes(16), buf, Buffer.from(msg), Buffer.from(this.privateKey)]);
      return Buffer.concat([cipher.update(this.encoder.encode(data)), cipher.final()]).toString('base64');
    }
  }, {
    key: 'decrypt',
    value: function decrypt(encrypted) {
      var decipher = _crypto2.default.createDecipheriv('aes-256-cbc', this.aesKey, this.iv).setAutoPadding(false);
      var data = Buffer.concat([decipher.update(encrypted, 'base64'), decipher.final()]);
      var decrypted = this.encoder.decode(data);
      var length = decrypted.slice(16, 20).readUInt32BE(0);
      return {
        message: decrypted.slice(20, 20 + length).toString(),
        privateKey: decrypted.slice(20 + length).toString()
      };
    }
  }]);

  return Crypto;
}();

exports.default = Crypto;
//# sourceMappingURL=data:application/json;base64,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QUssRUFBekQsRUFBNkQsY0FBN0QsQ0FBNEUsS0FBNUUsQ0FBZjtBQUNBLFVBQUksT0FBTyxPQUFPLE1BQVAsQ0FBYyxDQUFDLFNBQVMsTUFBVCxDQUFnQixTQUFoQixFQUEyQixRQUEzQixDQUFELEVBQXVDLFNBQVMsS0FBVCxFQUF2QyxDQUFkLENBQVg7QUFDQSxVQUFJLFlBQVksS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixDQUFoQjtBQUNBLFVBQUksU0FBUyxVQUFVLEtBQVYsQ0FBZ0IsRUFBaEIsRUFBb0IsRUFBcEIsRUFBd0IsWUFBeEIsQ0FBcUMsQ0FBckMsQ0FBYjtBQUNBLGFBQU87QUFDTCxpQkFBUyxVQUFVLEtBQVYsQ0FBZ0IsRUFBaEIsRUFBb0IsS0FBSyxNQUF6QixFQUFpQyxRQUFqQyxFQURKO0FBRUwsb0JBQVksVUFBVSxLQUFWLENBQWdCLEtBQUssTUFBckIsRUFBNkIsUUFBN0I7QUFGUCxPQUFQO0FBSUQ7Ozs7OztrQkFFWSxNIiwiZmlsZSI6ImNyeXB0by5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8xNC5cbiAqL1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuXG5jbGFzcyBQS0NTN0VuY29kZXIge1xuICBnZXRCbG9ja1NpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIDMyO1xuICB9O1xuICBlbmNvZGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBhbW91bnRUb1BhZCA9IHRoaXMuZ2V0QmxvY2tTaXplKCkgLSAoZGF0YS5sZW5ndGggJSB0aGlzLmdldEJsb2NrU2l6ZSgpKTtcbiAgICBpZiAoYW1vdW50VG9QYWQgPT0gMCkge1xuICAgICAgYW1vdW50VG9QYWQgPSB0aGlzLmdldEJsb2NrU2l6ZSgpO1xuICAgIH1cbiAgICB2YXIgcGFkZGluZyA9IEJ1ZmZlci5hbGxvYyhhbW91bnRUb1BhZCk7XG4gICAgcGFkZGluZy5maWxsKGFtb3VudFRvUGFkKTtcbiAgICByZXR1cm4gQnVmZmVyLmNvbmNhdChbZGF0YSwgcGFkZGluZ10pO1xuICB9O1xuXG4gIGRlY29kZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIHBhZGRpbmcgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XG4gICAgaWYgKHBhZGRpbmcgPCAxIHx8IHBhZGRpbmcgPiB0aGlzLmdldEJsb2NrU2l6ZSgpKSB7XG4gICAgICBwYWRkaW5nID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGEuc2xpY2UoMCwgZGF0YS5sZW5ndGggLSBwYWRkaW5nKTtcbiAgfVxufVxuXG5jbGFzcyBDcnlwdG8ge1xuXG4gIGNvbnN0cnVjdG9yKHRva2VuLCBlbmNvZGluZ0FFU0tleSwga2V5KSB7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMuYWVzS2V5ID0gbmV3IEJ1ZmZlcihlbmNvZGluZ0FFU0tleSArICc9JywgJ2Jhc2U2NCcpO1xuICAgIHRoaXMuaXYgPSB0aGlzLmFlc0tleS5zbGljZSgwLCAxNik7XG4gICAgdGhpcy5wcml2YXRlS2V5ID0ga2V5O1xuICAgIHRoaXMuZW5jb2RlciA9IG5ldyBQS0NTN0VuY29kZXIoKTtcbiAgfVxuXG4gIGdldFNpZ25hdHVyZSh0aW1lc3RhbXAsIG5vbmNlLCBlbmNyeXB0ZWQpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMScpO1xuICAgICAgaGFzaC51cGRhdGUoW3RoaXMudG9rZW4sIHRpbWVzdGFtcCwgbm9uY2UsIGVuY3J5cHRlZF0uc29ydCgpLmpvaW4oJycpKTtcbiAgICAgIHJldHVybiBoYXNoLmRpZ2VzdCgnaGV4Jyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgZW5jcnlwdChtc2cpIHtcbiAgICB2YXIgY2lwaGVyID0gY3J5cHRvLmNyZWF0ZUNpcGhlcml2KCdhZXMtMjU2LWNiYycsIHRoaXMuYWVzS2V5LCB0aGlzLml2KS5zZXRBdXRvUGFkZGluZyhmYWxzZSk7XG4gICAgY29uc3QgYnVmID0gQnVmZmVyLmFsbG9jKDQpO1xuICAgIGJ1Zi53cml0ZVVJbnQzMkJFKG1zZy5sZW5ndGgsIDApO1xuICAgIHZhciBkYXRhID0gQnVmZmVyLmNvbmNhdChbY3J5cHRvLnBzZXVkb1JhbmRvbUJ5dGVzKDE2KSwgYnVmLCBCdWZmZXIuZnJvbShtc2cpLCBCdWZmZXIuZnJvbSh0aGlzLnByaXZhdGVLZXkpXSk7XG4gICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoW2NpcGhlci51cGRhdGUodGhpcy5lbmNvZGVyLmVuY29kZShkYXRhKSksIGNpcGhlci5maW5hbCgpXSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICB9XG5cbiAgZGVjcnlwdChlbmNyeXB0ZWQpIHtcbiAgICB2YXIgZGVjaXBoZXIgPSBjcnlwdG8uY3JlYXRlRGVjaXBoZXJpdignYWVzLTI1Ni1jYmMnLCB0aGlzLmFlc0tleSwgdGhpcy5pdikuc2V0QXV0b1BhZGRpbmcoZmFsc2UpO1xuICAgIHZhciBkYXRhID0gQnVmZmVyLmNvbmNhdChbZGVjaXBoZXIudXBkYXRlKGVuY3J5cHRlZCwgJ2Jhc2U2NCcpLCBkZWNpcGhlci5maW5hbCgpXSk7XG4gICAgdmFyIGRlY3J5cHRlZCA9IHRoaXMuZW5jb2Rlci5kZWNvZGUoZGF0YSk7XG4gICAgdmFyIGxlbmd0aCA9IGRlY3J5cHRlZC5zbGljZSgxNiwgMjApLnJlYWRVSW50MzJCRSgwKTtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogZGVjcnlwdGVkLnNsaWNlKDIwLCAyMCArIGxlbmd0aCkudG9TdHJpbmcoKSxcbiAgICAgIHByaXZhdGVLZXk6IGRlY3J5cHRlZC5zbGljZSgyMCArIGxlbmd0aCkudG9TdHJpbmcoKVxuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ3J5cHRvO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
