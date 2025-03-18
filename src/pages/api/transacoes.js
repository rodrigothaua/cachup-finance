import { getSession } from 'next-auth/react';
import { executeQuery } from '../../../lib/db';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autenticado' });
  }

  const usuario_id = session.user.id;

  if (req.method === 'GET') {
    const transacoes = await executeQuery({
      query: 'SELECT * FROM transacoes WHERE usuario_id = ?',
      values: [usuario_id],
    });
    res.status(200).json(transacoes);
  }
  // ... (outros métodos)
}