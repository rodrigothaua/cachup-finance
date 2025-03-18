import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className='container'>
      <h1>Bem-vindo ao CashUp Finanças!</h1>
      <p>Faça login para acessar o dashboard.</p>
      <button onClick={() => signIn()}>Login</button>
    </div>
  );
}