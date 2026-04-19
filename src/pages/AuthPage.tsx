import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, KeyRound, Loader2, PieChart, Lock } from 'lucide-react';

export default function AuthPage() {
  const { loginWithPassword, signUp, verifyOtp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (mode === 'signin') {
      const { error } = await loginWithPassword(email, password);
      if (error) {
        setError(error.message);
      }
      // On success, AuthContext auto-redirects
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setStep('otp'); // Supabase sends an OTP on signup
      }
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    const { error } = await verifyOtp(email, otp, 'signup');
    
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors">
      <div className="max-w-md w-full relative">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-teal-500/30 rounded-full blur-3xl animate-pulse delay-150"></div>
        <div className="absolute -top-4 -right-24 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-300"></div>

        <div className="relative bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800 backdrop-blur-xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <PieChart className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              {step === 'otp' ? 'Verify Email' : (mode === 'signin' ? 'Welcome Back' : 'Create Account')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {step === 'otp' 
                ? `We sent a secure code to ${email}`
                : (mode === 'signin' ? 'Sign in to access your dashboard' : 'Sign up to start tracking')}
            </p>
          </div>

          <form onSubmit={step === 'credentials' ? handleCredentialsSubmit : handleOtpSubmit} className="space-y-6">
            {step === 'credentials' ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Secure Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm tracking-widest font-mono transition-all"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:scale-[1.01]"
            >
              {loading ? (
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
              ) : step === 'credentials' ? (
                mode === 'signin' ? 'Sign In' : 'Create Account'
              ) : (
                'Verify & Sign In'
              )}
            </button>
            
            {step === 'credentials' && (
              <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="font-semibold text-blue-600 dark:text-teal-400 hover:underline"
                >
                  {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            )}
            
            {step === 'otp' && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="text-sm text-blue-600 dark:text-teal-400 hover:underline"
                >
                  Restart Sign Up
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
