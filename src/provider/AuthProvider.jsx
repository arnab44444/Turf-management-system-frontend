import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import React, {  createContext, useEffect, useState } from "react";
  import { auth } from "../firebase.init";
  import axios from "axios";
  
  
  export const AuthContext = createContext();
  
  const googleProvider = new GoogleAuthProvider();
  
  // const app = getAuth(app)
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
      // name: 'arnab',
      // email: 'arnab@gmail.com'
    });
  
    const [loading, setLoading] = useState(true);
  
    //console.log(loading, user);
  
    const createUser = (email, password) => {
      //
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider); // opore google provider banaisi
    };
  
    const signOutUser = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    const updateUser = (updateData) => {
      return updateProfile(auth.currentUser, updateData);
    };
  
    // updateProfile(auth.currentUser, {
    //     displayName: "name", photoURL: "photoURL"
    //   }).then(() => {
    //     // Profile updated!
    //     // ...
    //   }).catch((error) => {
    //     cpnsole.log(error)
    //     // An error occurred
    //     // ...
    //   });
  
    // const updatePro = (updateData) => {
    //     updateProfile(auth.currentUser,
    //          displayName: "name", photoURL: "photoURL")}
    const updateUserProfile = profileInfo => {
            return updateProfile(auth.currentUser, profileInfo);
        }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          //console.log('has current user inside useEffect', currentUser);
          setUser(currentUser);
          setLoading(false);
  
          if(currentUser?.email){
            const userData = {
              email: currentUser.email};
  
              axios.post('https://asg-12-server.vercel.app/jwt', userData)
              .then(res =>{
                console.log('jwt token', res.data.token);
                const token = res.data.token;
                localStorage.setItem('access-token', token);
              })
          }
        } 
        
        else {
          setUser(null);
          setLoading(false);
  
          // eta bhule setLoading true disilam er fole see more e click korle login page e niye jaschilona
  
          // console.log('current user',currentUser);
        }
      });
  
      return () => {
        return unsubscribe();
      };
    }, []);
  
    const authData = {
      user,
      setUser,
      createUser,
      signOutUser,
      signInUser,
      loading,
      setLoading,
      updateUser,
      googleSignIn,
      updateUserProfile,
    };
  
    return <AuthContext value={authData}>{children}</AuthContext>;
  };
  export default AuthProvider;