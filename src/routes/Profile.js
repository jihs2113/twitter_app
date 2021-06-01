import React from "react";
import { authService } from "fbase";
import {useHistory} from "react-router-dom";

 export default () =>{
     const history = useHistory();

     const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
        //route.js에서 redirect를 이용할수있고
        //history location을 사용하여 로그아웃되면 home으로
        //이동할수있다.
     };
     return(
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
     );
 };