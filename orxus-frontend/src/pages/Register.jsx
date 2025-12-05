import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, passwordConfirmation);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Terjadi kesalahan saat mendaftar.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-200">
                <div className="text-center mb-8">
                    <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <UserPlus className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Buat Akun Baru</h2>
                    <p className="text-slate-600 mt-2">Bergabunglah bersama kami untuk memulai.</p>
                </div>
                
                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-center border border-red-200 text-sm">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-slate-700 mb-1.5 font-medium text-sm">Nama Lengkap</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Nama Anda"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 mb-1.5 font-medium text-sm">Alamat Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="nama@perusahaan.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 mb-1.5 font-medium text-sm">Kata Sandi</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 mb-1.5 font-medium text-sm">Konfirmasi Kata Sandi</label>
                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 transition-all duration-200"
                    >
                        Daftar Sekarang
                    </button>
                </form>
                
                <div className="mt-6 text-center text-slate-600 text-sm">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 hover:underline">
                        Masuk
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
