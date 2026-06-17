import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState, FormEvent } from 'react';
import { Crown, FileText, Lock, Mail, ShieldAlert, Sparkles, LogIn, ArrowRight, Check } from 'lucide-react';

const PRESET_ACCOUNTS = [
  {
    name: "System Administrator",
    email: "admin@oneroofsolar.com.au",
    password: "OneroofAdmin2026!",
    role: "Administrator",
    badge: "Full Access",
    color: "brand"
  },
  {
    name: "Marketing & SEO Editor",
    email: "editor@oneroofsolar.com.au",
    password: "OneroofEditor2026!",
    role: "Editor",
    badge: "Limited Access",
    color: "emerald"
  }
];

export function AdminLogin() {
  const navigate = useNavigate();
  const { user, loginCustomUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const preset = PRESET_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (preset) {
      try {
        // Authenticate with actual Firebase Auth first so Firestore security rules accept writes
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (fbErr: any) {
          console.warn("Initial Firebase sign-in failed, attempting auto-registration", fbErr);
          if (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/invalid-credential') {
            try {
              await createUserWithEmailAndPassword(auth, email, password);
            } catch (regErr: any) {
              console.warn("Failed to register preset account automatically in Firebase", regErr);
            }
          }
        }

        loginCustomUser(preset.email, preset.role);
        navigate('/admin');
        setLoading(false);
        return;
      } catch (err: any) {
        console.error('Custom login error', err);
      }
    }

    // Try standard sign-in for any other custom credentials
    try {
      await signInWithEmailAndPassword(auth, email, password);
      loginCustomUser(email, "Administrator");
      navigate('/admin');
      setLoading(false);
      return;
    } catch (fbErr: any) {
      console.warn("Standard Firebase auth sign-in failed", fbErr);
    }

    setError('Invalid credentials. Please use one of the pre-authorized accounts:\n• admin@oneroofsolar.com.au (Password: OneroofAdmin2026!)\n• editor@oneroofsolar.com.au (Password: OneroofEditor2026!)\n\nOr click "Sign in with Google" below.');
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/admin');
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setError(err.message || 'Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPreset = (index: number) => {
    const preset = PRESET_ACCOUNTS[index];
    setEmail(preset.email);
    setPassword(preset.password);
    setSelectedPreset(index);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 md:p-8 font-sans selection:bg-brand-500/30 selection:text-brand-300">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(140,198,63,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <span className="p-2 bg-brand-500/10 text-brand-400 rounded-xl border border-brand-500/20">
            <Crown className="w-5 h-5 animate-pulse" />
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Oneroof Admin Panel</span>
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-display font-semibold mb-1 text-white text-center">Sign In</h1>
          <p className="text-slate-400 text-sm mb-6 text-center">Enter system administrator credentials to login.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 text-red-300 text-xs rounded-xl border border-red-500/20 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="whitespace-pre-line">
                <span className="font-semibold block mb-1">Authentication Failed</span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSelectedPreset(null);
                  }}
                  className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition"
                  placeholder="name@oneroofsolar.com.au"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSelectedPreset(null);
                  }}
                  className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium tracking-wide transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold shadow-lg shadow-brand-950/20 mt-6 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying authorization...
                </>
              ) : (
                <>
                  Secure Login
                  <LogIn className="w-4 h-4 ml-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-700/60"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
              <span className="bg-[#1e293b] px-3 text-slate-400">Or use Google Auth</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 border border-slate-700/60 text-white rounded-xl hover:bg-slate-950 transition flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold shadow-lg shadow-brand-950/20 cursor-pointer"
          >
            <svg className="w-4.5 h-4.5 fill-current shrink-0 text-slate-300" viewBox="0 0 24 24">
              <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C18.155 2.185 15.42 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.564-4.453 10.564-10.75 0-.725-.078-1.275-.175-1.665h-10.39z"/>
            </svg>
            Sign in with Google
          </button>
        </div>

      </div>
    </div>
  );
}

