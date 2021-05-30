import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) =>{
        // console.log(event.target.name);
        const{
            target: {name, value},
        } =event;
        if (name === "email"){
            setEmail(value);
        }else if(name ==="password"){
            setPassword(value);
        }
    };
    const onSubmit = (event) =>{
        event.preventDefault();
    };
    return (
    <div>    
        <form>
            <input 
                name="email" 
                type="text" 
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
                placeholder="Log In" 

            />
        </form>
        <div>
            <button onClick="">Google</button>
            <button>Github</button>
        </div>
    </div>
    );
};
 export default Auth;