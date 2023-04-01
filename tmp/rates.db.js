// var sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3';
sqlite3.verbose();

import md5 from 'md5'

const DBSOURCE = './tmp/db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    //currency TABLE
    db.run(
      `CREATE TABLE currency (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            BASE_CODE text, 
            USD FLOAT, 
            EUR FLOAT, 
            GBP FLOAT, 
            CNY FLOAT, 
            created_at INTEGER UNIQE,
            updated_at INTEGER UNIQE,
            CONSTRAINT created_at UNIQUE (created_at),
            CONSTRAINT updated_at UNIQUE (updated_at)
            )`,
      (err) => {
        if (err) {
          console.log('currency Table already created')
        } else {
          console.log('Table currency just created')
        }
      }
    );
    //user TABLE
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            'INSERT INTO user (name, email, password) VALUES (?,?,?)';
          db.run(insert, ['admin', 'admin@example.com', md5('admin123456')]);
          db.run(insert, ['user', 'user@example.com', md5('user123456')]);
        }
      }
    );
  }
});

export default db;
