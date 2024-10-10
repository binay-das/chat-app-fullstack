import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogIn({ handleLogIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAlertMessage('');
        setAlertSeverity('');

        try {
            const response = await fetch(' ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setAlertSeverity('success');
                setAlertMessage(`Logged in successfully as ${data.name}`);
                handleLogIn();   // Update the logged-in state

                setTimeout(() => {
                    navigate('/api/protected');
                }, 1000);
            } else {
                setAlertSeverity('error');
                setAlertMessage(`Error: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage(`Error: ${error.message}`);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 400, mx: 'auto', p: 3, borderRadius: 2, boxShadow: 3 }}>
            {alertMessage && (
                <Alert severity={alertSeverity}>
                    {alertSeverity === 'error' && <AlertTitle>Error</AlertTitle>}
                    {alertSeverity === 'success' && <AlertTitle>Success</AlertTitle>}
                    {alertMessage}
                </Alert>
            )}

            <Box sx={{ mb: 2 }}>
                <FormLabel htmlFor="email">e-mail</FormLabel>
                <TextField value={email} onChange={handleEmail} id="email" label="Email" variant="outlined" fullWidth required />
            </Box>

            <Box sx={{ mb: 2 }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField value={password} onChange={handlePassword} id="password" label="Password" variant="outlined" type="password" fullWidth required />
            </Box>

            <Button variant="contained" type="submit" fullWidth>
                Log In
            </Button>
            <Button sx={{ mt: 1 }} variant="contained" onClick={() => { setEmail('guest@example.com'); setPassword('123456'); }} fullWidth>
                Guest User
            </Button>
        </Box>
    );
}
