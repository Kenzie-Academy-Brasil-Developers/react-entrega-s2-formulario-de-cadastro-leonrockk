import * as yup from "yup";
import "./styles.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import showPassword from "../../showPassword.svg";
import hidePassword from "../../hidePassword.svg";

export default function Form({setUsername }) {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const formSchema = yup.object().shape({
    fullName: yup
      .string()
      .required("You must enter your fullname")
      .min(5, "You must enter a valid full name")
      .matches(/^[A-Z a-z]+$/, "Only letters are acceptable"),
    email: yup
      .string()
      .email("Invalid email")
      .required("An email address must be informed"),
    password: yup
      .string()
      .required("A password must be informed")
      .matches(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Letter, One Number and One Special Case Character"
      ),
    passwordConfirm: yup
      .string()
      .required("You must confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords don't match"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    setUsername(data.fullName);
    navigate("/home");
  };

  return (
    <>
      <form className="formContainer" onSubmit={handleSubmit(onSubmitFunction)}>
        <input
          className="inputBox"
          placeholder="Full name"
          {...register("fullName")}
        />
        {errors.fullName ? <span>{errors.fullName.message}</span> : null}
        <input
          className="inputBox"
          placeholder="Email address"
          {...register("email")}
        />
        {errors.email ? <span>{errors.email.message}</span> : null}
        <div className="inputBox">
          <input
            type={passwordShown ? "text" : "password"}
            className="inputBox"
            placeholder="Password"
            {...register("password")}
          />
          <button
            tabIndex="-1"
            className="passwordButton"
            onClick={(e) => {
              e.preventDefault();
              togglePassword();
            }}
          >
            <img
              tabIndex="-1"
              src={passwordShown ? hidePassword : showPassword}
            ></img>
          </button>
        </div>
        {errors.password ? <span>{errors.password.message}</span> : null}
        <div className="inputBox">
          <input
            type={passwordShown ? "text" : "password"}
            className="inputBox"
            placeholder="Confirm password"
            {...register("passwordConfirm")}
          />
          <button
            tabIndex="-1"
            className="passwordButton"
            onClick={(e) => {
              e.preventDefault();
              togglePassword();
            }}
          >
            <img
              tabIndex="-1"
              src={passwordShown ? hidePassword : showPassword}
            ></img>
          </button>
        </div>
        {errors.passwordConfirm ? (
          <span>{errors.passwordConfirm.message}</span>
        ) : null}

        <button className="signUp"> Cadastrar</button>
      </form>
    </>
  );
}
