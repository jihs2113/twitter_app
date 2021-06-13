import { dbService } from "fbase";
import React, { useState } from "react";


const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) =>{
        //collection.add가 promise를 리턴하므로 async 추가
        event.preventDefault();
        await dbService.collection("nweet").add({
            //firestore에서 가져오는 dbservice를 이용하여
            //collection을 생성한다.
            nweet,
            //nweet:nweet 키와 컬렉션인데 그냥 저렇게 표현.
            createdAt: Date.now(),
        });
        setNweet("")
       //submit버튼을 누르면 nweet 컬렉션이 생성되고
       //빈 문자열로 초기화해준다.
    };
    const onChange = (event)=>{
        const {
            target: {value},
        } =event;
        setNweet(value);
    };
    return(

    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder=" whats on your mind?" maxLength={120}/>
            <input onChange={onChange} type="submit" value="Nweet"/>
        </form>
    </div>
    );
}

 export default Home;