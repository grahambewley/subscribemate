import React from 'react';
import Container from '../components/_App/Container';
import Form, { FormInput, FormButton, FormBottomCta } from '../components/_App/Form/Form';
import Link from 'next/link';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import Router from 'next/router';

const Forgot = ({ user }) => {
    const [values, setValues] = React.useState({});

    function handleInputChange(e) {
        const updateValues = values;
        updateValues[`${e.target.name}`] = e.target.value;
        setValues(updateValues);   
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const url = `${baseUrl}/api/forgot`;
        const payload = {
            email: values.email,
            //password: password
        }
        const resetPasswordResponse = await axios.post(url, payload );
        console.log("Reset password response: ", resetPasswordResponse);

        if(resetPasswordResponse.status == 201) {
            Router.push('/login');
        }
    }

    return (<>
        <Container>
            <Form 
                header='Forgot your password?'
                instruction="Enter your email address below and we'll send you a temporary password you can use to log in again."
                onSubmit={handleSubmit}>
                
                <FormInput
                    id='email-input' 
                    name='email' 
                    type='email' 
                    placeholder='Email address' 
                    onChange={handleInputChange}
                    label='Email address' />
                <FormButton>Reset</FormButton>
                <FormBottomCta>Just Remembered? <Link href='/login'><a>Log In</a></Link></FormBottomCta>
            </Form>
        </Container>
    </>);
}

export default Forgot;