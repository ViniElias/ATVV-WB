import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'vinielias1',
    database: 'WorldBeauty'
})