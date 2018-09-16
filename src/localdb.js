import PouchDB from 'pouchdb';

export const walletsDb = new PouchDB('absence-wallets');
export const passwordDb = new PouchDB('absence-password');
