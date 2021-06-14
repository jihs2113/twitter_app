import React, { useState, useEffect } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {  
  const [init, setInit] = useState(false);
  //init이 false면 router를 숨긴다  
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  //user를 불러와 authentication을 지정해준다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  //트위팅하는 user가 누군지 알수있는 state
  
  useEffect(() =>{
    authService.onAuthStateChanged((user) =>{
      //로그인 되면 이것이 호출되면서 로그인한 유저를 받는다.
      //setUser로 받고 필요할 때 사용한다.
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
        //authService가 바뀌면 받을 user에 setUser를 넣는다
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return ( 
    <>
      {init ? (<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
      //state를 router.js로 prop해준다.
       ) : "Initializing.."}
      <footer>&copy; {new Date().getFullYear()} twitter_app </footer>
    </>
 );
}

export default App;
