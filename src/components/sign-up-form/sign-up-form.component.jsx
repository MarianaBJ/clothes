import { useState } from "react"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import './sign-up-form.styles.scss'


const initilValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassowrd: ''
}


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(initilValues)
    const { displayName, email, password, confirmPassowrd } = formFields


    const resetFormFields = () => {
        setFormFields(initilValues)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassowrd) {
            alert('Password do not match')
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)

            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields()

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use')
            } else {
                console.log('error user creation', error)
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name'
                    type='text'
                    onChange={handleChange}
                    name='displayName'
                    value={displayName} required
                />

                <FormInput label='Email'
                    type='email'
                    onChange={handleChange}
                    name='email'
                    value={email} required
                />

                <FormInput label='Password'
                    type='password'
                    onChange={handleChange}
                    name='password'
                    value={password} required
                />

                <FormInput label='Confirm Password'
                    type='password'
                    onChange={handleChange}
                    name='confirmPassowrd'
                    value={confirmPassowrd} required
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm