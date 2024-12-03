import styles from './auth.module.css'
import { useState } from 'react'
import Form from '../../components/form/form'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/auth'
import { validateEmail } from '../../helper/utils'
import Footer from '../../components/footer/footer'
import foodImg from '../../assets/food_auth.png'

export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        name: false,
        phone: false,
        email: false,
        password: false
    })

    const formFields = [
        {
            name: "name",
            placeholder: "eg. John A",
            type: "text",
            value: formData?.name,
            onChange: (e) => {
                setFormData({ ...formData, name: e.target.value })
                setError({ ...error, name: false })
            },
        },
        {
            name: "phone",
            placeholder: "Enter your 10 digit mobile number",
            type: "tel",
            value: formData?.phone,
            onChange: (e) => {
                setFormData({ ...formData, phone: e.target.value })
                if (formData?.password == e.target.value) {
                    setError({ ...error, phone: false })
                }
            },
        },
        {
            name: "email",
            placeholder: "Example@email.com",
            type: "email",
            value: formData?.email,
            onChange: (e) => {
                setFormData({ ...formData, email: e.target.value })
                setError({ ...error, email: false })
            },
        },
        {
            name: "password",
            placeholder: "At least 8 characters",
            type: "password",
            value: formData?.password,
            showPassword: false,
            onChange: (e) => {
                setFormData({ ...formData, password: e.target.value })
                setError({ ...error, password: false })
            },
        }
    ]

    const errorMessages = {
        name: {
            message: "Enter your name",
            isValid: formData?.name.length > 0,
            onError: () => {
                setError((error) => ({ ...error, name: true }))
            }
        },
        email: {
            message: "Enter valid email address",
            isValid: validateEmail(formData?.email),
            onError: () => {
                setError((error) => ({ ...error, email: true }))
            }
        },
        password: {
            message: "Password should be min 8 characters",
            isValid: formData.password.length >= 8,
            onError: () => {
                setError((error) => ({ ...error, password: true }))
            }
        },
        phone: {
            message: "Enter valid mobile number",
            isValid: formData.phone && formData.phone.length === 10,
            onError: () => {
                setError((error) => ({ ...error, phone: true }))
            }
        },
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        let isError = false
        Object.keys(errorMessages).map((key) => {
            if (!errorMessages[key].isValid) {
                isError = true
                errorMessages[key].onError()
            }
        })
        if (!isError) {
            const res = await registerUser(formData)

            if (res.status == 200) {
                navigate('/login')
            } else {
                alert("ERROR")
            }
        } else {
            console.log(error)
        }
    }

    return (
        <div className={styles.parentContainer}>
            <div className={styles.container}>
                <div className={styles.container2}>
                    <img src='./logo.png' alt='logo' className={styles.logo} />
                    <p className={styles.headerText}>Welcome</p>
                    <p>Today is a new day. It is your day. You shape it.
                        Sign up to start ordering.</p>
                    <Form
                        formFields={formFields}
                        errorMessages={errorMessages}
                        error={error}
                        onSubmit={onSubmit}
                        buttonText={"Register"}
                    />
                    <p className={styles.lightText}>
                        Have an account ?&nbsp;
                        <span 
                            className={styles.buttonStyle}
                            onClick={() => navigate('/login')}>Sign In
                        </span>
                    </p>
                </div>
                <div className={styles.container1}>
                    <img src={foodImg} alt='food image' className={styles.imageStyle} />
                </div>
            </div>
            <Footer />
        </div>
    )
}