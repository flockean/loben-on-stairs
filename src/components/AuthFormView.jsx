import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {rxLobenDatabase} from "../App";
import {RxDocument} from "rxdb";

import HeaderBar from "./HeaderBar";
import {login} from "../logic/userService";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const loginAsGuest = async () => {
        login(formData.username)
        navigate('/home')
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!isLogin && formData.password === formData.confirmPassword) {
            try {
                await setUser(formData.username, formData.password)

                // This is illegal
                login(formData.username)
                navigate('/home')

            }
            catch (err) {
                console.log(err)
                alert('Error during Registration')
            }
        }
        if (isLogin) {
            try {
                const user = await getUser(formData.username)

                if (user.get('password') === formData.password) {
                    login(formData.username)
                    navigate('/home')
                } else alert('Login Daten scheinen falsch zu sein!')
            } catch (err) {
                alert('Login Daten scheinen falsch zu sein User Existiert nichtw ')
            }
        }
        console.log(isLogin ? 'Login' : 'Registration', 'attempted with:', formData);

    };



    async function getUser (id: String): Promise<RxDocument> {
        const userCollection = (await rxLobenDatabase).user;
        const query = userCollection.findOne(id);
        const userValue = await query.exec()
        if (userValue === null) {
            // eslint-disable-next-line no-throw-literal
            throw "Incorrect UserData"
        }
        return userValue
    }

    async function setUser (name: String, password: String): Promise<RxDocument> {
        const userCollection = (await rxLobenDatabase).user;
        userCollection.insert({
            name: name,
            password: password
        });
    }

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({ username: '', password: '', confirmPassword: '' });
    };

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '300px',
            margin: '0 auto',
            padding: '20px',
            boxSizing: 'border-box',
        },
        header: {
            backgroundColor: '#f0f0f0',
            padding: '10px',
            textAlign: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            borderBottom: '2px solid #8a2be2',
        },
        headerText: {
            backgroundColor: '#8a2be2',
            color: 'white',
            padding: '8px',
            margin: '-10px -10px',
        },
        title: {
            textAlign: 'center',
            marginTop: '60px',
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: 'white',
            color: '#333',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
            fontSize: '16px',
        },
        link: {
            display: 'block',
            justifySelf: 'center',
            textAlign: 'center',
            marginTop: '15px',
            color: '#333',
            textDecoration: 'none',
            fontSize: '14px',
        },
        toggleLink: {
            background: 'none',
            border: 'none',
            color: '#8a2be2',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '14px',
        },
    };

    return (
        <div>
            <HeaderBar style={styles.headerText} title={isLogin ? 'Login' : 'Register'}/>
            <div style={styles.container}>

            <div style={styles.title}>
                Loben App<br />
                on the stairs
            </div>

            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        style={styles.input}
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        style={styles.input}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {!isLogin && (
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password erneut</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Password"
                            style={styles.input}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <button type="submit" style={styles.button}>
                    {isLogin ? 'Einloggen' : 'Registieren'}
                </button>
            </form>

            <div style={styles.link}>
                {isLogin ? (
                    <span>
            Kein Account?{' '}
                        <button onClick={toggleForm} style={styles.toggleLink}>
              Registrieren
            </button>
          </span>
                ) : (
                    <span>
            Bereits ein Account?{' '}
                        <button onClick={toggleForm} style={styles.toggleLink}>
              Einloggen
            </button>
          </span>
                )}
            </div>

                <button onClick={loginAsGuest} style={styles.link}>Gastlogin</button>
            </div>
        </div>
    );
}