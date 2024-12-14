import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'mysql.sqlpub.com',
  user: 'wyksean',
  password: 'RScryJMRucNvk95x',
  database: 'shuqian',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
