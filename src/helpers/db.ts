import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    // https://github.com/expo/expo/issues/5264
    // bug report with the unknown `transaction` type
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      )
    })
  });
};
