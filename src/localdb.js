const Datastore = require('nedb')
export let walletDb = new Datastore({ filename: 'assets/db', autoload: true });
