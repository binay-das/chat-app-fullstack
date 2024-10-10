import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const handleFile = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            setAlertMessage('All fields are required');
            setAlertSeverity('error');
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setAlertMessage('Passwords do not match');
            setAlertSeverity('error');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            if (image) formData.append('pic', image);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            };

            const { data } = await axios.post('  ', formData, config);

            localStorage.setItem('userInfo', JSON.stringify(data));

            setAlertMessage('Registration Successful');
            setAlertSeverity('success');
            setLoading(false);

            // Redirect to another page after successful signup
            navigate('/chats');
        } catch (error) {
            setLoading(false);
            setAlertMessage('An error occurred during registration');
            setAlertSeverity('error');
            console.error(`Error: ${error}`);
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
                <FormLabel htmlFor="name">Enter your name</FormLabel>
                <TextField value={name} onChange={handleName} id="name" label="Full Name" variant="outlined" fullWidth />
            </Box>

            <Box sx={{ mb: 2 }}>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <TextField value={email} onChange={handleEmail} id="email" label="Email" variant="outlined" fullWidth />
            </Box>

            <Box sx={{ mb: 2 }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField value={password} onChange={handlePassword} id="password" label="Password" variant="outlined" type="password" fullWidth />
            </Box>

            <Box sx={{ mb: 2 }}>
                <FormLabel htmlFor="confirmPassword">Re-enter Password</FormLabel>
                <TextField value={confirmPassword} onChange={handleConfirmPassword} id="confirmPassword" label="Confirm Password" variant="outlined" type="password" fullWidth />
            </Box>

            <Box sx={{ mb: 2 }}>
                <FormLabel htmlFor="pic">Profile Picture</FormLabel>
                <TextField id="pic" variant="outlined" type="file" onChange={handleFile} fullWidth />
            </Box>

            <Button variant="contained" type="submit" fullWidth disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
        </Box>
    );
}
