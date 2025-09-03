import pool from '../lib/db.js';

export const SchoolModel = {
  async create({ name, address, city, state, contact, email_id, image }) {
    const sql = `INSERT INTO schools (name, address, city, state, contact, email_id, image)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [name, address, city, state, contact, email_id, image]);
    return { id: result.insertId };
  },

  async findAll() {
    const [rows] = await pool.query(
      'SELECT id, name, address, city, image, created_at FROM schools ORDER BY id DESC'
    );
    return rows;
  },

  async findByPk(id) {
    const [rows] = await pool.query(
      'SELECT id, name, address, city, state, contact, email_id, image FROM schools WHERE id = ?',
      [id]
    );
    return rows[0] || null; // Return the first row or null if not found
  },
};