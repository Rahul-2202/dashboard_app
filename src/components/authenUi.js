import React from "react";
import { useState } from "react";

import { auth, provider } from "../config/firebase-config";
import { SignIn } from "./signInUi";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Dashboard } from "./dashboard";
import "./authenUi.css";

export function AuthComponent() {
  const [authUi, setAuthUi] = useState(!auth?.currentUser?.uid ? true : false); //to display the signup pg

  const [log, setLog] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      //logging user with email and passowrd
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          console.log(userCredentials.user.uid);
          alert("User created successfully");
          setAuthUi(false);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    //signing in with google popup
    await signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // console.log(`Access token: ${token} && user: ${user}`);
        // console.log(`credentials:${credential}`);
        alert("User created successfully");
        setAuthUi(false);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(
          `Email: ${email},error_code:${errorCode}, error_message:${errorMessage}`
        );
        // ...
      });
  };

  const LogIn = async () => {
    // try {
    //   await signOut(auth);
    //   alert("signed out sucessfully");
    //   setAuthUi(true);
    // } catch (err) {
    //   console.error(err);
    // }
    setAuthUi(false);
    setLog(true);
  };

  if (authUi) {
    return (
      <div>
        <h1>Opinion$ Haven</h1>
        <MDBContainer fluid className="p-3 my-5">
          <MDBRow>
            <MDBCol col="10" md="6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                class="img-fluid"
                alt="Phone image"
              />
            </MDBCol>

            <MDBCol col="4" md="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn className="mb-4 w-100" size="lg" onClick={signIn}>
                Sign in
              </MDBBtn>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">OR</p>
              </div>

              <MDBBtn
                className="mb-4 w-100"
                size="lg"
                style={{ backgroundColor: "#3b5998" }}
                onClick={signInWithGoogle}
              >
                <MDBIcon fab icon="google" className="mx-2" />
                Continue with Google
              </MDBBtn>

              <MDBBtn
                className="mb-4 w-100"
                size="lg"
                style={{ backgroundColor: "#55acee" }}
                onClick={LogIn}
              >
                Already a user?Log In
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  } else if (log) {
    return <SignIn />;
  } else {
    return <Dashboard />;
  }
}
