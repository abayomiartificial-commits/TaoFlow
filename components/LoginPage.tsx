import React from 'react';
import { LogIn, Wind } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
    const { signInWithGoogle, isLoading } = useAuth();
    const [error, setError] = React.useState<string | null>(null);

    const handleGoogleLogin = async () => {
        try {
            setError(null);
            await signInWithGoogle();
        } catch (err) {
            setError('Error al iniciar sesión. Por favor intenta de nuevo.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#f0ece4] p-6">
            <div className="max-w-md w-full">
                {/* Logo and Title */}
                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 rounded-full mb-6 shadow-xl shadow-teal-600/20">
                        <Wind className="text-white" size={40} />
                    </div>
                    <h1 className="text-5xl font-serif text-stone-800 mb-3">TaoFlow</h1>
                    <p className="text-lg text-stone-500 italic">El Camino del Tai Chi</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-stone-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <h2 className="text-2xl font-serif text-stone-800 mb-2 text-center">
                        Bienvenido
                    </h2>
                    <p className="text-stone-500 text-center mb-8">
                        Inicia sesión para comenzar tu práctica
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                            <p className="text-red-800 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full py-4 bg-white hover:bg-stone-50 border-2 border-stone-200 hover:border-teal-500 text-stone-800 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        {isLoading ? 'Iniciando sesión...' : 'Continuar con Google'}
                    </button>

                    <p className="text-xs text-stone-400 text-center mt-6 leading-relaxed">
                        Al continuar, aceptas nuestros términos de servicio y política de privacidad.
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-stone-400 text-sm">
                    <p>Donde fluye la atención, fluye la energía</p>
                </div>
            </div>
        </div>
    );
};
