// src/pages/api/test-db.js
import { executeQuery } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const results = await executeQuery({ query: 'SELECT 1' });
    res.status(200).json({ message: 'Conexão com o banco de dados bem-sucedida!', results });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    res.status(500).json({ message: 'Erro ao conectar com o banco de dados.', error: error.message });
  }
}