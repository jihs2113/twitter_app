import React, { useState } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {  

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  //user를 불러와 authentication을 지정해준다.
  return ( 
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>;
      <footer>&copy; {new Date().getFullYear()} twitter_app </footer>
    </>
 );
}

export default App;
