import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateLogin, setCurrentUser } from '../utils/auth';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

const Login = () => {
  const [email, setEmail] = useState('admin@water.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const result = validateLogin(email, password);

      if (result.success) {
        setCurrentUser(result.user);
        navigate('/dashboard');
      } else {
        setError(result.message);
      }

      setLoading(false);
    }, 500);

    // TODO: Replace with backend API call
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
  };

  return (
    <div className="min-h-screen   flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-2">
            ASPS
          </h1>
          <p className="text-slate-600">De-risking Construction Planning</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="text-center text-slate-600 mt-6 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-700 hover:text-blue-600">
            Sign up
          </Link>
        </p>

        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-slate-600">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Email: admin@water.com</p>
          <p>Password: password123</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
