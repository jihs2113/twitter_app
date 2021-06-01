import React, { useState, useEffect } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {  
  const [init, setInit] = useState(false);
  //init이 false면 router를 숨긴다  
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  //user를 불러와 authentication을 지정해준다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() =>{
    authService.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return ( 
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing.."}
      <footer>&copy; {new Date().getFullYear()} twitter_app </footer>
    </>
 );
}

export default App;
