'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import styles from '../login/Login.module.scss';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '../../(components)/Loading';
import { getDateSlug } from '../../../lib/getDateSlug';
import { useDateContext } from '../../../context/useDateContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/week');
    }
  }, [status, router]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setLoading(false);
      return;
    }

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
          <h1>Sign Up</h1>
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
          <label>
            <p>Password</p>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button>Sign Up</button>
          <Link href='/login'>Want to log in?</Link>
          {loading && <Loading />}
          {error && <p>{error}</p>}
        </form>
      </div>
    );

  return null;
};

export default Register;
