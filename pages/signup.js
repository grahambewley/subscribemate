import React from 'react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';
import Container from '../components/_App/Container';
import Form, { FormInput, FormButton, FormBottomCta } from '../components/_App/Form';

const INITIAL_USER = {
    name: '',
    email: '',
    password: ''
}

function Singup() {
    const [user, setUser] = React.useState(INITIAL_USER);
    const [disabled, setDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const isCompleteUser = Object.values(user).every(el => Boolean(el));
        isCompleteUser ? setDisabled(false) : setDisabled(true);
    }, [user]);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
    
        try {
            setLoading(true);
            setError('');
            const url = `${baseUrl}/api/signup`;
            const payload = { ...user };
            // JWT is sent back from signup endpoint
            const response = await axios.post(url, payload);
            handleLogin(response.data);
        } catch(error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    return <>
    <Container>
        <Form 
            header='Get Started!'
            instruction="Create a new account"
            onSubmit={handleSubmit}
            error={error ? error : null}
            >
            <FormInput
                id='name-input' 
                name='name' 
                value={user.name}
                type='text'
                placeholder='Name' 
                onChange={handleInputChange}
                label='Name' />
            <FormInput
                id='email-input' 
                name='email' 
                value={user.email}
                type='email'
                placeholder='Email address' 
                onChange={handleInputChange}
                label='Email address' />
            <FormInput
                id='password-input' 
                name='password' 
                value={user.password}
                type='password'
                placeholder='Password' 
                onChange={handleInputChange}
                label='Password' />
            <FormButton
                disabled={disabled} >
                Sign up
            </FormButton>
            <FormBottomCta>Already signed up? <Link href='/login'><a>Log in</a></Link></FormBottomCta>
        </Form>
    </Container>
  </>;
}

export default Singup;