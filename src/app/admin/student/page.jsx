'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const STUDENT = () => {
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
            setOk('Account created.');
            // setTimeout(() => (window.location.href = '/login'), 1200);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-[100%] h-[100%] text-[#000] flex flex-row bg-gray-100">
            <div style={{backgroundImage:"radial-gradient(circle,rgba(235, 172, 96, 1) 0%, rgba(201, 151, 107, 1) 50%, rgba(237, 206, 83, 0.92) 100%)"}} className="w-[20%] h-[100%] flex flex-col">
                <Image src={"/logo.png"} alt="Logo" width={200} height={200} className="mb-4 h-[10%] w-[100%]" />
                <h1 className="text-white text-2xl font-bold">Admin</h1>
                <Link
                    href="/admin"
                    className="text-white w-[100%] border-b-[#000] border-b-[1px] text-lg mt-4 hover:underline"
                >
                    add institution
                </Link>
                <Link
                    href="/admin/student"
                    className="text-white w-[100%] border-b-[#000] border-b-[1px] text-lg mt-2 hover:underline"
                >
                    add student
                </Link>
            </div>
            <div className="w-[80%] h-[100%] overflow-auto flex flex-col">
                <Image src={"/student.jpg"} alt="Logo" width={600} height={400} className="object-cover mb-4 h-[30%] w-[100%]" />
                <Image src={"/student.jpg"} alt="Logo" width={600} height={400} className="object-contain absolute ml-[15%] mt-[5%] h-[30%] w-[40%] shadow-2xl shadow-amber-800 radius-md"/>
                
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-[15%] w-[60%] ml-[20%]">
                    <h1 className="text-black text-4xl font-bold mb-4">Add Student</h1>
                    <input
                        type="text"
                        placeholder="Student Name"
                        onChange={(e) => update('full_name', e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        placeholder="Student Email"
                        onChange={(e) => update('email', e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />

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
                    {error && <div className="text-sm text-red-600">{error}</div>}
                    {ok && <div className="text-sm text-emerald-600">{ok}</div>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading?"adding..":"Add Student"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default STUDENT;