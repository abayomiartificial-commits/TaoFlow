import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-stone-100">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="text-red-600" size={32} />
                        </div>

                        <h1 className="text-3xl font-serif text-stone-800 mb-4">
                            Algo salió mal
                        </h1>

                        <p className="text-stone-600 mb-6 leading-relaxed">
                            {this.state.error?.message || 'Ha ocurrido un error inesperado'}
                        </p>

                        <button
                            onClick={this.handleReset}
                            className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={18} />
                            Recargar Aplicación
                        </button>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="text-sm text-stone-400 cursor-pointer hover:text-stone-600">
                                    Detalles técnicos
                                </summary>
                                <pre className="mt-2 p-4 bg-stone-50 rounded-lg text-xs overflow-auto text-stone-600">
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
