'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import styles from './Login.module.scss';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '../../(components)/Loading';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/week');
    }
  }, [status, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result!.error) {
      setError(result!.error);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  if (status === 'unauthenticated')
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <label>
            <p>E-mail</p>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button>Log In</button>
          <Link href='/register'>Want to sign up?</Link>
          {loading && <Loading />}
          {error && <p>{error}</p>}
        </form>
      </div>
    );

  return null;
};

export default Login;
