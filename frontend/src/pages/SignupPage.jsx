import React, { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { AiFillCamera } from "react-icons/ai";
import { BiErrorCircle, BiHide, BiShow } from "react-icons/bi";
export const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    isMinimumLength: true,
    hasUppercase: true,
    hasLowercase: true,
    hasNumber: true,
    hasSpecialChar: true,
  });
  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
    return isValid;
  };
  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/;
    const isMinimumLength = password.length >= 8;
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);
    setPasswordErrors({
      isMinimumLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    });
    return (
      isMinimumLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  };
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const isValidLength = name.trim().length >= 3;
    const isValidFormat = nameRegex.test(name);
    setIsValidName(isValidLength && isValidFormat);
    return isValidLength && isValidFormat;
  };
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    validateEmail(emailValue);
  };
  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue);
  };
  const handleNameChange = (event) => {
    const nameValue = event.target.value;
    setName(nameValue);
    validateName(nameValue);
  };
  const [isArtist, setIsArtist] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
  );
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePic(e.target.result);
    };
    reader.readAsDataURL(file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dvbh3e4ck");
    fetch(`https://api.cloudinary.com/v1_1/dvbh3e4ck/image/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setProfilePic(data.url));
  };
  const handleUploadClick = () => {
    document.querySelector(".file-upload").click();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid =
      isValidEmail && validatePassword(password) && isValidName;
    if (isFormValid) {
      const formData = {
        name,
        email,
        password,
        isArtist,
        isBuyer,
        profilePicture: profilePic,
      };
      console.log(formData);
    } else {
      setIsValidEmail(false);
      setIsValidName(false);
    }
  };
  return (
    <Div>
      <div>
        <h1>Create an account</h1>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <form action="" onSubmit={handleSubmit}>
          <div className="row">
            <div className="circle">
              <img className="profile-pic" src={profilePic} alt="Profile" />
            </div>
            <div className="p-image">
              <AiFillCamera
                onClick={handleUploadClick}
                className="upload-button"
              />
              <input
                className="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <label htmlFor="name"> full name</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          {!isValidName && (
            <p>
              <BiErrorCircle /> Please enter a valid name (minimum 3 characters
              and letters)
            </p>
          )}
          <label htmlFor="email">email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          {!isValidEmail && (
            <p>
              <BiErrorCircle /> Please enter a valid email address
            </p>
          )}
          <label htmlFor="password">password</label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <p onClick={handleToggleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </p>
          </div>
          {!passwordErrors.isMinimumLength && (
            <p>
              <BiErrorCircle />
              Password should be at least 8 characters long.
            </p>
          )}
          {!passwordErrors.hasUppercase && (
            <p>
              <BiErrorCircle />
              Password should include at least one uppercase letter.
            </p>
          )}
          {!passwordErrors.hasLowercase && (
            <p>
              <BiErrorCircle />
              Password should include at least one lowercase letter.
            </p>
          )}
          {!passwordErrors.hasNumber && (
            <p>
              <BiErrorCircle />
              Password should include at least one number.
            </p>
          )}
          {!passwordErrors.hasSpecialChar && (
            <p>
              <BiErrorCircle />
              Password should include at least one special character.
            </p>
          )}
          <label htmlFor="">pick one</label>
          <div id="category">
            <section>
              <input type="checkbox" onChange={() => setIsBuyer(!isBuyer)} />
              Buy Art
            </section>
            <section>
              <input type="checkbox" onChange={() => setIsArtist(!isArtist)} />
              Sell Art
            </section>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </Div>
  );
};
const Div = styled.div`
  background-image: url("https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700372939.jpg");
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100%;
  font-family: candara;
  > div {
    background-color: white;
    height: 90vh;
    width: 35%;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-30%, -50%);
    border-radius: 5px;
    padding: 50px;
    h1 {
      font-size: 40px;
      font-weight: bolder;
    }
    a {
      color: #14a3f1;
    }
    form {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      height: 85%;
      .row {
        height: 120px;
      }
      .profile-pic {
        width: 120px;
        height: 120px;
        display: inline-block;
      }
      .file-upload {
        display: none;
      }
      .circle {
        border-radius: 100% !important;
        overflow: hidden;
        width: 120px;
        height: 120px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        margin: auto;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      .p-image {
        position: relative;
        right: 40%;
        top: 85px;
        color: #666666;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
      }
      .p-image:hover {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .upload-button {
        font-size: 1.5em;
      }
      .upload-button:hover {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: #999;
      }
      label {
        margin-top: 10px;
        color: #747474;
        font-weight: bold;
        font-size: smaller;
        text-transform: capitalize;
      }
      input {
        outline: none;
        border-bottom: 1px solid lightgray;
        &:focus {
          border-bottom: 2px solid blue;
        }
      }
      > p {
        display: flex;
        align-items: center;
        gap: 5px;
        color: red;
        font-size: small;
      }
      div {
        display: flex;
        justify-content: space-between;
        input[type="password"] {
          width: 100%;
        }
        p {
          font-size: larger;
          color: #747474;
          cursor: pointer;
        }
      }
      #category {
        justify-content: left;
        gap: 20px;
        section {
          display: flex;
          align-items: center;
          justify-content: left;
          gap: 10px;
        }
      }
      button {
        color: white;
        background-color: black;
        padding: 9px 15px;
        font-size: large;
        width: fit-content;
        margin: auto;
        font-weight: bold;
        border-radius: 10px;
        margin-top: 15px;
      }
    }
  }
`;
