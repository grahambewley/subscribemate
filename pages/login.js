import React from 'react';
// import { Container, Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { handleLogin } from '../utils/auth';
import Container from '../components/_App/Container';
import Form, { FormInput, FormSubmit, FormBottomCta } from '../components/_App/Form';

const INITIAL_USER = {
  email: "",
  password: ""
}

function Login() {
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
            const url = `${baseUrl}/api/login`;
            const payload = { ...user }
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
            header='Welcome back!'
            instruction="Log in with your email address and password"
            onSubmit={handleSubmit}
            error={ error ? error : null }
            >
        
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
            <FormSubmit
                disabled={disabled} >
                Login
            </FormSubmit>
            <FormBottomCta>New user? <Link href='/signup'><a>Sign up</a></Link> instead</FormBottomCta>
        </Form>
        
        {/* <Message
            attached
            icon="privacy"
            header="Welcome back!"
            content="Log in with email and password"
            color="blue"
        />
        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
            <Message 
            error
            header="Oops!"
            content={error}
            />
            <Segment>
            <Form.Input
                fluid
                icon="envelope"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
            />
            <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
            />
            <Button
                disabled={disabled || loading}
                icon="sign in"
                type="submit"
                color="orange"
                content="Login"
            />
            </Segment>
        </Form>
        <Message attached="bottom" warning>
            <Icon name="help"/>
            New User?{" "}
            <Link href="/signup">
            <a>Sign up here</a>
            </Link>{" "}instead.
        </Message> */}
    </Container>
    </>;
}

export default Login;
    
