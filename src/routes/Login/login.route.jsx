import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";
import Button from "../../components/button/button.component";
import FormInput from "../../components/input/input.component";
import Swal from "sweetalert2";
import "./login.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
      setTimeout(() => {
        navigate("/admin");
      }, 500);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          Swal.fire({
            position: "center",
            icon: "info",
            iconColor: "#f0aa1f",
            title: "Error",
            text: `Incorrect password for email`,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: "Try again",
            showConfirmButton: false,
          });
          break;
        case "auth/user-not-found":
          Swal.fire({
            position: "center",
            icon: "info",
            iconColor: "#f0aa1f",
            title: "Error",
            text: "No user associated with this email",
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: "Try again",
          });
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="signin-container">
      <div className="first">
        <div className="logo">
          <img src="/assets/images/rmt-logo.png" alt="a logo" />
          <p>Parcifer</p>
        </div>
        <p className="login-account">Already have an account?</p>
        <form className="form-container" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Enter email address"
            label="Email"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <FormInput
            type="password"
            placeholder="Enter password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <Button name="Login" type="submit" />
        </form>
        <div className="signup">
          <p>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </div>
      <div className="second">
        <img src="/assets/images/img1.jpg" alt="guy on a laptop" />
      </div>
    </div>
  );
};

export default Login;
