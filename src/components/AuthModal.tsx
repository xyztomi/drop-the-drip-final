import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      onClose();
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black" />
        <div className="relative z-10 bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#000000]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
            {mode === 'login' ? 'Masuk' : 'Daftar'}
          </h2>
          <p className="text-xs md:text-sm text-black/60 mb-6">
            {mode === 'login'
              ? 'Masuk ke akun Anda untuk melanjutkan'
              : 'Buat akun baru untuk memulai'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wide mb-2">
                  Nama
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 border-4 border-black focus:outline-none focus:ring-4 focus:ring-[--accent] text-sm"
                  placeholder="Nama lengkap"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border-4 border-black focus:outline-none focus:ring-4 focus:ring-[--accent] text-sm"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold uppercase tracking-wide mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border-4 border-black focus:outline-none focus:ring-4 focus:ring-[--accent] text-sm"
                placeholder="Min. 6 karakter"
                required
              />
            </div>

            {error && (
              <div className="border-4 border-black bg-red-100 text-black px-3 py-2">
                <p className="text-xs font-bold">⚠️ {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 border-4 border-black font-black uppercase text-sm transition-all ${isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[--accent] text-black hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1'
                }`}
            >
              {isLoading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center text-sm">
            <span className="text-black/60">
              {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}
            </span>
            {' '}
            <button
              onClick={toggleMode}
              className="font-bold underline decoration-2 decoration-black hover:text-black/70"
            >
              {mode === 'login' ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
