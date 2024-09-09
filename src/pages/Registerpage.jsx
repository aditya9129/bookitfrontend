import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                body: JSON.stringify({ name, email, pass: password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleRegister}>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
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
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                <p className="text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-pink-600 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
}