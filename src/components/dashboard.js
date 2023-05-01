import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../config/firebase-config";
// import "./dash.css";
import { AuthComponent } from "./authenUi";
import { Card } from "./cardUi";
import { getDocs, collection } from "firebase/firestore";

import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
  MDBNavbarBrand,
  MDBRow,
} from "mdb-react-ui-kit";
export function Dashboard() {
  const [dashUi, setDashUi] = useState(auth?.currentUser?.uid ? true : false); //to diaplay the dashboard ui page
  const [authUi, setAuthUi] = useState(!auth?.currentUser?.uid ? true : false); //to display the login page

  const [list, setList] = useState([]); //to store the differnt data form database

  const opiCollection = collection(db, "opinions");
  useEffect(() => {
    //reading data form firestore
    const getList = async () => {
      //read data
      //list==data
      try {
        const data = await getDocs(opiCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setList(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, []);

  const logout = async () => {
    //signing out a user
    try {
      await signOut(auth);
      alert("signed out sucessfully");
      setDashUi(false);
      setAuthUi(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (dashUi) {
    return (
      //navbar
      <MDBContainer fluid>
        <MDBNavbar border="warning" bgColor="dark">
          <MDBContainer fluid>
            <MDBNavbarBrand light href="#">
              Opinions Haven
            </MDBNavbarBrand>
            <MDBBtn className="d-flex w-auto mb-3" onClick={logout} outline>
              Logout
            </MDBBtn>
          </MDBContainer>
        </MDBNavbar>

        <MDBRow className="row-cols-1 row-cols-md-2 g-4">
          {/* <Card
            pro={{
              title: "csk vs mi",
              body: "With supporting text below as a natural lead-in to additional content.",
            }}

          /> */}
          {/* rendering cards with the database data */}
          {list.map((opi) => {
            return <Card Title={opi.title} Body={opi.body} id={opi.id} />;
          })}
        </MDBRow>
      </MDBContainer>
    );
  } else if (authUi) {
    <AuthComponent />;
  }
}
