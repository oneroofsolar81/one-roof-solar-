import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error boundary exception:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A1118] flex flex-col items-center justify-center p-6 text-center select-none text-white font-sans">
          <div className="max-w-md p-8 rounded-[2rem] bg-[#111A24] border border-white/10 shadow-2xl flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div>
              <h2 className="text-2xl font-black mb-2 tracking-tight">Something went wrong</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                The application encountered an unexpected issue. Please click below to refresh the page.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full h-12 rounded-full font-bold bg-brand-500 hover:bg-brand-600 text-slate-900 transition-all shadow-[0_0_20px_rgba(140,198,63,0.2)] hover:shadow-[0_0_30px_rgba(140,198,63,0.3)] hover:-translate-y-0.5"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children ? this.props.children : null;
  }
}
