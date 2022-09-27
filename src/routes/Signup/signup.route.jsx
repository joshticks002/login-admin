import Button from "../../components/button/button.component"
import FormInput from "../../components/input/input.component"
import './signup.styles.scss'

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitted")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" placeholder="Enter password" label="Display Name" name="displayName" />
                <FormInput type="text" placeholder="Enter email address" label="Email" name="email" />
                <FormInput type="password" placeholder="Enter password" label="Password" name="password" />
                <FormInput type="password" placeholder="Confirm password" label="Confirm Password" name="confirmPassword" />
                <Button name="Login" type="submit" />
            </form>
        </div>
    )
}

export default SignUp;