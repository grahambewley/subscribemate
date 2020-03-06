import React from 'react';
import Container from '../components/_App/Container';
import Form, { FormInput, FormSubmit, FormBottomCta } from '../components/_App/Form';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import cookie from 'js-cookie';
import catchErrors from '../utils/catchErrors';
import Router from 'next/router';

const ResetPassword = () => {
    const [values, setValues] = React.useState({});
    const [showPasswordMatchWarning, setShowPasswordMatchWarning] = React.useState(false);

    function handleInputChange(e) {
        const updateValues = values;
        updateValues[`${e.target.name}`] = e.target.value;
        
        // If newPassword is entered AND confirmPassword is entered and the two do not match
        if(updateValues.newPassword && updateValues.confirmPassword && (updateValues.newPassword !== updateValues.confirmPassword)) {
            setShowPasswordMatchWarning(true);
        } else {
            setShowPasswordMatchWarning(false);
        }

        setValues(updateValues);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        if(!showPasswordMatchWarning && values.currentPassword && values.newPassword && values.confirmPassword) {
            console.log("Trying to reset password");
            // Send current and new passwords, along with user token, into api handler to reset password
            const url = `${baseUrl}/api/resetPassword`;
            const payload = { ...values };
            const token = cookie.get('token');
            const headers = { headers: { Authorization: token } };
            const resetPasswordResponse = await axios.post(url, payload, headers );
            console.log("Reset password response: ", resetPasswordResponse);

            if(resetPasswordResponse.status == 201) {
                Router.push('/');
            }
        }
        else {
            alert("Please fill out all for fields appropriately to reset your password.")
        }
    }

    return (
        <Container>
            <Form 
                header='Reset your password'
                instruction="Confirm your current credentials in order to reset your password"
                onSubmit={handleSubmit}>
                
                <FormInput
                    id='current-password-input' 
                    name='currentPassword' 
                    type='password' 
                    placeholder='Current Password' 
                    onChange={handleInputChange}
                    label='Current Password' />
                <FormInput
                    id='new-password-input' 
                    name='newPassword' 
                    type='password' 
                    placeholder='New Password' 
                    onChange={handleInputChange}
                    label='New Password' />
                <FormInput
                    id='confirm-password-input' 
                    name='confirmPassword' 
                    type='password' 
                    placeholder='Confirm Password' 
                    onChange={handleInputChange}
                    label='Confirm Password' 
                    warningText={ showPasswordMatchWarning ? 'Passwords do not match' : null }
                    />
                <FormSubmit >Reset</FormSubmit>
                {/* <FormBottomCta>Just Remembered? <Link href='/login'><a>Log In</a></Link></FormBottomCta> */}
            </Form>
        </Container>
    )
}

export default ResetPassword; 