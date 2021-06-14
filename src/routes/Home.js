import { dbService } from "fbase";
import React, { useState, useEffect } from "react";


const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    //collection을 get하는 state
    const getNweets = async() =>{
        //collection을 get하는 함수
        const dbNweets = await dbService.collection("nweet").get(); 
        // dbNweets.forEach((document) => console.log(document.data()));
        //내 state에 있는 document.data를 다루고있음.
        dbNweets.forEach((document) => {
            //dbNweets 안에 있는 모든 document를 다루려면 set을 쓴다.
            const nweetObject ={
                ...document.data(),
                //이건 모든 document의 data다.
                id: document.id,
            };
            // setNweets((prev) => [document.data(), ...prev]);
            //모든 이전 nweets에 대해 배열을 리턴함.
            //새로 작성한 트윗과 그 이전것들을 리턴.
            //set이붙는 함수는 값대신 함수를 전달할수있음.
            //함수를 전달하면 리액트는 이전 값에 접근하게해줌.
            setNweets((prev) => [nweetObject, ...prev]);
            //위에 document.data를 보기쉽게 객체로 만들어준다.
            //data와 id가 있음.

           
        });
         //dbnweets 이전 document들에게 setNweet에서 함수를 사용중인데
         //배열을 리턴중이다.
         //배열은 최근 document 그뒤로 이전 document를 붙인다.
    };
    useEffect(() => {
        getNweets();
    }, []);
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
    console.log(nweets);
    return(

    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder=" whats on your mind?" maxLength={120}/>
            <input onChange={onChange} type="submit" value="Nweet"/>
        </form>
        <div>
            {nweets.map((nweet) =>( 
            <div key={nweet.id}>
                <h4>{nweet.nweet}</h4>
            </div>
            ))};
        </div>
    </div>
    );
}

 export default Home;