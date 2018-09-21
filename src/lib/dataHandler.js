import cryptoJSON from './crypto-json';

export function decryptAsync(data, code) {
  return new Promise((resolve, reject) => {
    try {
      let decryptedWallets = [];
      for (var i = 0; i < data.length; i++) {
        let decryptedWallet = cryptoJSON.decrypt(data[i], code);
        decryptedWallet._id = data[i].id;
        decryptedWallets.push(decryptedWallet);
      }
      resolve(decryptedWallets);
    } catch (exception) {
        reject({ message: exception.message });
    }
  });
}
