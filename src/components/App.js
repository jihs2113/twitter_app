import React, { useState, useEffect } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {  
  const [init, setInit] = useState(false);
  //init이 false면 router를 숨긴다  
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  //user를 불러와 authentication을 지정해준다.
  const [userObj, setUserObj] = useState(null);
  //트위팅하는 user가 누군지 알수있는 state
  
  useEffect(() =>{
    authService.onAuthStateChanged((user) =>{
      //로그인 되면 이것이 호출되면서 로그인한 유저를 받는다.
      //setUser로 받고 필요할 때 사용한다.
      if(user){
        setUserObj(user);
        //user를 얻어야 로그인이 된다.
        //authService가 바뀌면 받을 user에 setUser를 넣는다
      } 
      setInit(true);
      //우린 항상 true로 한다 
      //왜냐하면 초기화가 되던 어플리케이션이 언제 시작되든? onAuthStateChanged 시작되어야한다.
    });
  }, []);

  return ( 
    <>
      {init ? (<AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/>
      //기본적으로 userObj가 존재할때 로그인 되고 없다면 로그인 안된다.
      //state를 router.js로 prop해준다.
       ) : "Initializing.."}
    </>
 );
}

export default App;
