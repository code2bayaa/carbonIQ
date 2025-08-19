// app/login/page.jsx
'use client';

import { useState } from 'react';
import AuthCard from '@/layers/authcard';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showP, setShowP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || 'Login failed');
      // Demo approach: store token (replace with httpOnly cookie in prod)
      localStorage.setItem('token', data.access_token);
      if(data.role === 'admin') { 
        // redirect or update UI
        window.location.href = '/admin';
      }else if(data.role === 'student') {
        // redirect or update UI
        window.location.href = '/student';
      }else if(data.role === 'staff') {
        // redirect or update UI
        window.location.href = '/staff';
      }else if(data.role === 'collector') {
        // redirect or update UI
        window.location.href = '/collector';
      }else{
        alert('Invalid role');
        throw new Error('Invalid role');
      } 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AuthCard title="Welcome back" subtitle="Sign in to your account">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[#000] mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
              aria-label="Email"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Password</span>
              <button
                type="button"
                onClick={() => setShowP(!showP)}
                className="text-[#000] hover:text-slate-700"
                aria-pressed={showP}
              >
                {showP ? 'Hide' : 'Show'}
              </button>
            </label>
            <input
              type={showP ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
              aria-label="Password"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 font-medium disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </div>

          <div className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-amber-700 font-semibold">
              Register
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
