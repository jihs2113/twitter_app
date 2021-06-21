import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "../components/Nweet.js";
import NweetFactory from "../components/NweetFactory.js";


const Home = ({ userObj }) => {
  
  const [nweets, setNweets] = useState([]);
  //위에 state들은 form을 위한 state들이다.
  //collection을 get하는 state
 
  useEffect(() => {
   
    dbService.collection("nweets").onSnapshot((snapshot) => {
      //새로운 스냅샷을 만들떄 배열을 만들어 다음 state에 집어넣는다.
         //query 대신 snapshot을 이용하면 실시간으로 update를 확인할수있음.
      const nweetArray = snapshot.docs.map((doc) => ({
        //모든 배열 아이템들의 구조는 밑에와 같이 id, data를 받는다.
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  return (
    <div>
      <NweetFactory userObj={userObj}/>
      <div>
        {nweets.map((nweet) => (
          <Nweet 
            key={nweet.id} 
            nweetObj={nweet}
            //nweet의 모든데이터 author text creatAt
            isOwner={nweet.creatorId === userObj.uid}
            //nweet당사자creatorId와 uid가 같으면 true 아니면 false
            //userObj는 prop으로 router와 어플리케이션(app)에서 받아온다
            //그리고 어플리케이션에서는 onAuthchanged state를 핸들링한다.
            />
        ))}
      </div>
    </div>
  );
};
export default Home;