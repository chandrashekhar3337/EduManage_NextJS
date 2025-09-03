import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query('SHOW TABLES');
    res.status(200).json({ tables: rows });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ message: 'Database connection failed' });
  }
}
