import Button from "../../components/button/button.component"
import FormInput from "../../components/input/input.component"
import './login.styles.scss'

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitted")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" placeholder="Enter email address" label="Email" name="email" />
                <FormInput type="password" placeholder="Enter password" label="Password" name="password" />
                <Button name="Login" type="submit" />
            </form>
        </div>
    )
}

export default Login;