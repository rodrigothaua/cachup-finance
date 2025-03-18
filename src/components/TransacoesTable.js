import { format } from 'date-fns';

export default function TransacoesTable({ transacoes }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {transacoes && transacoes.map((transacao) => (
          <tr key={transacao.id}>
            <td>{format(new Date(transacao.data), 'dd/MM/yyyy')}</td>
            <td>{transacao.descricao}</td>
            <td>{transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}