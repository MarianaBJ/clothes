import { useState } from "react"

import { signInWithGooglePopup, 
        createUserDocumentFromAuth,
        sigInAuthUserWithEmailAndPassword
    } from "../../utils/firebase/firebase.utils"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"


import './sign-in-form.styles.scss'


const initilValues = {
    email: '',
    password: ''
}


const SignInForm = () => {

    const [formFields, setFormFields] = useState(initilValues)
    const { email, password } = formFields


    const resetFormFields = () => {
        setFormFields(initilValues)
    }


    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
        
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const {user} = await sigInAuthUserWithEmailAndPassword(email, password)
            resetFormFields()

        } catch (error) {

            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorret password')
                break;
                case 'auth/user-not-found':
                    alert('Email is invalid')
                break;
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm