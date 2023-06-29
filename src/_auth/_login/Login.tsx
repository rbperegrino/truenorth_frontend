import React, {FormEvent, useState} from 'react';
import {Container, Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {doLogin} from "../../services/UserServices";

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loginError, setLoginError] = useState(false)


    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setUsernameError(false)
        setPasswordError(false)

        if (username === '') {
            setUsernameError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }

        const logged = await doLogin(username, password);

        if(logged) {
            setTimeout(() => {
                navigate('/');
            }, 500);
        } else {
            setLoginError(true)
        }



    }
    return <Container>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <TextField
                label="Email"
                onChange={e => setUsername(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="email"
                sx={{mb: 3}}
                fullWidth
                value={username}
                error={usernameError}
            />
            <TextField
                label="Password"
                onChange={e => setPassword(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="password"
                value={password}
                error={passwordError}
                fullWidth
                sx={{mb: 3}}
            />
            {loginError && <p>Error on login</p>}
            <Button variant="outlined" color="secondary" type="submit">Login</Button>

        </form>
    </Container>
}

export default Login;
