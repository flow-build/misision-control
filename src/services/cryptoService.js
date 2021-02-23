const crypto = require('crypto');

class CryptoService {
  constructor({
    cryptoOptions,
    loggerService,
  }) {
    if (cryptoOptions.cryptoKey) {
      this.key = cryptoOptions.cryptoKey;
    } else throw new Error('cryptoKey not Setted');
    if (cryptoOptions.cryptoIV) {
      this.iv = cryptoOptions.cryptoIV;
    } else throw new Error('cryptoIV not Setted');
    if (loggerService) {
      this.logger = loggerService;
    } else throw new Error('logger Service not Setted');
  }

  encryptPayload(payload) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    let encrypted = cipher.update(JSON.stringify(payload), 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  decryptPayload(encryptedPayload) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
    const decrypted = decipher.update(encryptedPayload, 'base64', 'utf8');
    const value = decrypted + decipher.final('utf8');
    try {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (e) {
      this.logger.warning(
        `Parse Decrypt payload failed, returning raw; error: ${e.message}`,
      );
      return value;
    }
  }
}

module.exports = CryptoService;
