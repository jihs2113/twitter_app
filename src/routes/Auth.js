import React, { useState } from "react";
import {authService} from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
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
        try {
            let data;
            //제출 눌렀을때 사이트 자체를 새로고침하지 않으려고
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
            console.log(error);
        }
    };
    return (
    <div>    
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
        </form>
        <div>
            <button onClick="">Google</button>
            <button>Github</button>
        </div>
    </div>
    );
};
 export default Auth;