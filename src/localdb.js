const Datastore = require('nedb')
export let walletDb = new Datastore({ filename: 'assets/abdb', autoload: true });
