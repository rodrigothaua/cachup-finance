import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TransacoesTable from '../components/TransacoesTable';

export default function TransacoesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      axios.get('/api/transacoes').then((response) => {
        setTransacoes(response.data);
      });
    }
  }, [status, router]);

  return (
    <div>
      <h1>Transações</h1>
      <TransacoesTable transacoes={transacoes} />
    </div>
  );
}