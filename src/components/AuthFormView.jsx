import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import HeaderBar from "./HeaderBar";
import UserService from "../logic/userService"

export default function AuthForm() {
    const userService = UserService;
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const loginAsGuest = async () => {
        if (await userService.login("Anon", "Anon")) {
            navigate('/home')
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // For Registration password not same
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // For Registration Succeed
        if (!isLogin && formData.password === formData.confirmPassword) {
            try {
                if (await userService.register(formData.username, formData.password)) {
                    console.log(userService.getCurrentUser())
                    navigate('/home')
                } else alert('LoginDaten sind falsch')
            }
            catch (err) {console.log(err)
                alert('Error during Registration')
            }
        }
        if (isLogin) {
            try {
                if (await userService.login(formData.username, formData.password)) {
                    console.log(userService.getCurrentUser())
                    navigate('/home')
                } else alert('LoginDaten sind falsch')
            } catch (err) {
                alert('Es scheint ein Problem aufgetreten zu sein')
            }
        }
        console.log(isLogin ? 'Login' : 'Registration', 'attempted as:', formData.username);

    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({ username: '', password: '', confirmPassword: '' });
    };

    return (
        <div>
            <HeaderBar className="bg-purple-800 text-white p-2 fixed top-0 left-0 right-0 border-b-2 border-purple-800" title={isLogin ? 'Login' : 'Register'}/>
            <div className="font-sans max-w-xs mx-auto p-5 box-border mt-20">

                <div className="text-center mt-16 mb-5 text-2xl font-bold">
                    Loben App<br />
                    on the stairs
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block mb-1 text-sm">Password erneut</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Password"
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded cursor-pointer mt-2 text-lg">
                        {isLogin ? 'Einloggen' : 'Registieren'}
                    </button>
                </form>

                <div className="text-center mt-4 text-sm">
                    {isLogin ? (
                        <span>
                            Kein Account?{' '}
                            <button onClick={toggleForm} className="bg-none border-none text-purple-800 underline cursor-pointer">
                                Registrieren
                            </button>
                        </span>
                    ) : (
                        <span>
                            Bereits ein Account?{' '}
                            <button onClick={toggleForm} className="bg-none border-none text-purple-800 underline cursor-pointer">
                                Einloggen
                            </button>
                        </span>
                    )}
                </div>

                <button onClick={loginAsGuest} className="block justify-self-center mt-4 text-sm text-purple-800 underline cursor-pointer">Gastlogin</button>
            </div>
        </div>
    );
}
