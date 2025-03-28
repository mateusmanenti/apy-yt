import mysql from 'mysql';

const pool = mysql.createPool({
    "user":"root",
    "password": "9898",
    "database": "api-estoque",
    "host": "localhost",
    "port": 3306
})

export {pool};