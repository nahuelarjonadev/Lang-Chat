const pg = require('pg');
const pool = require('./../pool');

const CREATE_TABLE= `CREATE TABLE IF NOT EXISTS user(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  token VARCHAR(80) NOT NULL, 
  email VARCHAR(255) NOT NULL,
  picture_url VARCHAR(255),
  about_me VARCHAR(250),
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

const INSERT_USER = `INSERT INTO user (username, token, email, picture_url, about_me) VALUES ($1, $2, $3, $4, $5)`
 
pool.query(CREATE_TABLE, (err, result) => {
  if (err) console.log('error creating user table:', err);
  else console.log('user table created or already existed');
});

const model = {
  createUser(userName, token, email, picture_url, about_me) {
    return new Promise((resolve, reject) => {
      pool.query(INSERT_USER, [userName, token, email, picture_url, about_me], (err,result) => {
        if (err) {
          console.error('error on creating user:',err);
          return reject(err);
        }
        else {
          console.log('user has been created in table');
          return resolve(result);
        }
      });
    })
  },
  

  
};

module.exports = model;