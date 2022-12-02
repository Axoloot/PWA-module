import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

const useUsers = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const signup = (email: string, password: string) => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signout = () => {
    signOut(auth)
    .then(() => {
        setUser(null)
        // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

}