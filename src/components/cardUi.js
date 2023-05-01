import React, { useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { auth } from "../config/firebase-config";
import { db } from "../config/firebase-config";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardHeader,
  MDBCardFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export function Card({ Title, Body, id }) {
  const docRef = doc(db, "opinions", id);
  const [voted, setVoted] = useState(false);
  const [yes, setYes] = useState(true);

  const voteCount = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      // const yesCount = data.yesVotes;
      // const noCount = data.noCount;
      setVoted(data.votedByUids.includes(auth?.currentUser?.uid));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  voteCount();

  const onCLickYes = async () => {
    if (!voted) {
      await updateDoc(docRef, {
        yesVotes: increment(1),
      });
      await updateDoc(docRef, {
        votedByUids: arrayUnion(auth?.currentUser?.uid),
      });
      setYes(true);
    }
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    // console.log(docSnap.data().votedByUids.includes(auth?.currentUser?.uid));
  };

  const onCLickNo = async () => {
    if (!voted) {
      await updateDoc(docRef, {
        noVotes: increment(1),
      });
      await updateDoc(docRef, {
        votedByUids: arrayUnion(auth?.currentUser?.uid),
      });
      setYes(false);
    }
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    // console.log(docSnap.data().votedByUids.includes(auth?.currentUser?.uid));
  };
  const str = voted && yes ? "YES" : "NO";

  if (!voted) {
    return (
      <MDBCol>
        <MDBCard
          shadow="0"
          border="warning"
          background="dark"
          className="text-white"
        >
          <MDBCardHeader background="transparent" border="warning">
            Featured
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle className="text-">{Title}</MDBCardTitle>
            <MDBCardText>{Body}</MDBCardText>
            <MDBRow row-cols-1 row-cols-md-2>
              <MDBCol>
                <MDBBtn color="success" onClick={onCLickYes} href="#">
                  Yes
                </MDBBtn>
              </MDBCol>
              <MDBCol>
                <MDBBtn color="danger" onClick={onCLickNo} href="#">
                  No
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
          <MDBCardFooter
            background="transparent"
            border="warning"
            className="text-muted"
          >
            2 days ago
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
    );
  } else {
    return (
      <MDBCol>
        <MDBCard
          shadow="0"
          border="warning"
          background="dark"
          className="text-white"
        >
          <MDBCardHeader background="transparent" border="warning">
            Featured
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle className="text-">{Title}</MDBCardTitle>
            <MDBCardText>{Body}</MDBCardText>

            <h5
              className={str === "YES" ? "text-success" : "text-danger"}
            >{`Voted ${str} sucessfully`}</h5>
          </MDBCardBody>
          <MDBCardFooter
            background="transparent"
            border="warning"
            className="text-muted"
          >
            2 days ago
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
    );
  }
}
