// components/Transacoes.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    async function loadTransacoes() {
      const response = await axios.get('/api/transacoes');
      setTransacoes(response.data);
    }
    loadTransacoes();
  }, []);

  return (
    <div>
      <h2>Transações</h2>
      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            {format(new Date(transacao.data), 'dd/MM/yyyy')} - {transacao.descricao} - R$ {transacao.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}