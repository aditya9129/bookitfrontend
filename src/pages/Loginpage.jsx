import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { BASE_URL } from "../helper";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);

    async function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({ email, pass: password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
    
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
             console.log(data);
            setUser(data);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleLogin}>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
                <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-6"
                />
                <button 
                    type="submit" 
                    className={`bg-pink-600 p-2 rounded-lg text-white w-full mb-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-700'}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p className="text-center text-gray-600">
                    Don't have an account? <Link to="/register" className="text-pink-600 hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
}