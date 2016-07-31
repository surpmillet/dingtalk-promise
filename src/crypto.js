/**
 * Created by michao on 16/7/14.
 */
import crypto from 'crypto';

class PKCS7Encoder {
  getBlockSize = function () {
    return 32;
  };
  encode = function (data) {
    var amountToPad = this.getBlockSize() - (data.length % this.getBlockSize());
    if (amountToPad == 0) {
      amountToPad = this.getBlockSize();
    }
    var padding = Buffer.alloc(amountToPad);
    padding.fill(amountToPad);
    return Buffer.concat([data, padding]);
  };

  decode = function (data) {
    var padding = data[data.length - 1];
    if (padding < 1 || padding > this.getBlockSize()) {
      padding = 0;
    }
    return data.slice(0, data.length - padding);
  }
}

class Crypto {

  constructor(token, encodingAESKey, key) {
    this.token = token;
    this.aesKey = new Buffer(encodingAESKey + '=', 'base64');
    this.iv = this.aesKey.slice(0, 16);
    this.privateKey = key;
    this.encoder = new PKCS7Encoder();
  }

  getSignature(timestamp, nonce, encrypted) {
    try {
      var hash = crypto.createHash('sha1');
      hash.update([this.token, timestamp, nonce, encrypted].sort().join(''));
      return hash.digest('hex');
    } catch (e) {
      console.log(e);
    }
  }

  encrypt(msg) {
    var cipher = crypto.createCipheriv('aes-256-cbc', this.aesKey, this.iv).setAutoPadding(false);
    const buf = Buffer.alloc(4);
    buf.writeUInt32BE(msg.length, 0);
    var data = Buffer.concat([crypto.pseudoRandomBytes(16), buf, Buffer.from(msg), Buffer.from(this.privateKey)]);
    return Buffer.concat([cipher.update(this.encoder.encode(data)), cipher.final()]).toString('base64');
  }

  decrypt(encrypted) {
    var decipher = crypto.createDecipheriv('aes-256-cbc', this.aesKey, this.iv).setAutoPadding(false);
    var data = Buffer.concat([decipher.update(encrypted, 'base64'), decipher.final()]);
    var decrypted = this.encoder.decode(data);
    var length = decrypted.slice(16, 20).readUInt32BE(0);
    return {
      message: decrypted.slice(20, 20 + length).toString(),
      privateKey: decrypted.slice(20 + length).toString()
    }
  }
}
export default Crypto;
