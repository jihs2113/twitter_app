import React, { useState } from "react";
import {authService} from "fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) =>{
        // console.log(event.target.name);
        const{
            target: {name, value},
        } = event;
        // console.log(value);
        if (name === "email"){
            setEmail(value);
        }else if(name ==="password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) =>{
        event.preventDefault();
        //제출 눌렀을때 사이트 자체를 새로고침하지 않으려고
        try {
            let data;
            
            if (newAccount){
                //create account
               data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            } else {
                //log in
               data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount(prev => !prev);
    //반대값으로 바꿔준다
    return (
        <>
        <form onSubmit={onSubmit}>
            <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                required value={email} 
                onChange={onChange}
            />
            <input 
                name="password" 
                type="password" 
                placeholder="password" 
                required value={password}
                onChange={onChange}
            />
            <input 
                type="submit" 
                value={newAccount ? "Create Account" : "Log In"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign In" : "Create Account"}
        </span>
        </>
    );
};

export default AuthForm;