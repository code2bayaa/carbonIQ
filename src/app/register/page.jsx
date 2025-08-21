'use client';

import { useState } from 'react';
import AuthCard from '@/layers/authcard';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', role:"student" });
  const [showP, setShowP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  function update(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setOk('');
    if (!form.full_name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Registration failed');
      setOk('Account created. Redirecting to login…');
      setTimeout(() => (window.location.href = '/login'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AuthCard title="Create account" subtitle="Join us — it’s quick and easy">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">full name</label>
            <input
              value={form.name}
              onChange={(e) => update('full_name', e.target.value)}
              className="text-[#000] mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="text-[#000] mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Password</span>
              <button
                type="button"
                onClick={() => setShowP(!showP)}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                {showP ? 'Hide' : 'Show'}
              </button>
            </label>
            <input
              type={showP ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              className="text-[#000] mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <p className="text-xs text-slate-500 mt-1">Minimum 6 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Role</label>
            <select
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
              className="text-[#000] mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {/* <option value="student">student</option> */}
              <option value="staff">staff</option>
              <option value="admin">admin</option>
              <option value="admin">collector</option>
            </select>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {ok && <div className="text-sm text-emerald-600">{ok}</div>}

          <div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 font-medium disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Creating…' : 'Create account'}
            </button>
          </div>

          <div className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-700 font-semibold">
              Sign in
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
