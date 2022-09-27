import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase.utils";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/button/button.component";
import FormInput from "../../components/input/input.component";
import "./signup.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocFromAuth(user, { displayName });
      resetFormFields();

      setTimeout(() => {
        navigate("/admin");
      }, 500);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setTimeout(() => {
          Swal.fire({
            position: "center",
            icon: "info",
            iconColor: "#f0aa1f",
            title: "Error",
            text: `Email already in use`,
            showDenyButton: true,
            denyButtonText: "Try again",
            confirmButtonColor: "#f0aa1f",
          });
        }, 500);
      } else {
        console.log(err.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="signup-container">
      <div className="first">
        <Link to="/" style={{ textDecoration: "none" }}>
          <p className="go_back">Go back to login</p>
        </Link>
        <div className="logo">
          <img src="/assets/images/rmt-logo.png" alt="a logo" />
          <p>Parcifer</p>
        </div>
        <p className="reset">Don't have an account?</p>
        <form className="form-container" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Enter password"
            label="Display Name"
            name="displayName"
            onChange={handleChange}
            value={displayName}
          />
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
          <FormInput
            type="password"
            placeholder="Confirm password"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword}
          />
          <Button name="Sign up" type="submit" />
        </form>
      </div>
      <div className="second">
        <img src="/assets/images/img1.jpg" alt="guy on a laptop" />
      </div>
    </div>
  );
};

export default SignUp;
