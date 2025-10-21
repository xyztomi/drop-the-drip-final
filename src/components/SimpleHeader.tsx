import { Droplet, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function SimpleHeader() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <>
      <header className="bg-white border-b-4 border-black mb-8 md:mb-12">
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-10">
          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex absolute top-6 right-6 gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 border-2 border-black bg-white">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-bold">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors font-bold text-sm uppercase"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  disabled
                  className="px-4 py-2 border-2 border-black bg-gray-200 text-gray-500 font-bold text-sm uppercase cursor-not-allowed"
                  title="Autentikasi sementara dinonaktifkan"
                >
                  Masuk
                </button>
                <button
                  disabled
                  className="px-4 py-2 border-2 border-black bg-gray-200 text-gray-500 font-bold text-sm uppercase cursor-not-allowed"
                  title="Autentikasi sementara dinonaktifkan"
                >
                  Daftar
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="bg-black text-white p-2.5 md:p-3 border-2 border-black">
              <Droplet className="w-8 h-8 md:w-10 md:h-10" fill="white" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Drop the Drip
            </h1>
          </div>
          <p className="text-center mt-3 text-sm md:text-lg uppercase tracking-wider">
            AI-Powered Virtual Try On
          </p>

          {/* Auth Buttons - Mobile */}
          <div className="flex md:hidden justify-center gap-3 mt-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 border-2 border-black bg-white">
                  <User className="w-4 h-4" />
                  <span className="text-xs font-bold">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  disabled
                  className="px-4 py-2 border-2 border-black bg-gray-200 text-gray-500 font-bold text-xs uppercase cursor-not-allowed"
                  title="Autentikasi sementara dinonaktifkan"
                >
                  Masuk
                </button>
                <button
                  disabled
                  className="px-4 py-2 border-2 border-black bg-gray-200 text-gray-500 font-bold text-xs uppercase cursor-not-allowed"
                  title="Autentikasi sementara dinonaktifkan"
                >
                  Daftar
                </button>
              </>
            )}
          </div>
        </div>
      </header>

    </>
  );
}