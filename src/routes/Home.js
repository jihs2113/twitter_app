import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "../components/Nweet.js";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
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
  const onSubmit = async (event) => {
      //collection.add가 promise를 리턴하므로 async 추가
    event.preventDefault();
    await dbService.collection("nweets").add({
          //어떤("nweets") collection에 너의 data들을 저장할지 지정하는곳
          //firestore에서 가져오는 dbservice를 이용하여
            //collection을 생성한다.
      text: nweet,
      //nweet:nweet 키와 컬렉션인데 그냥 저렇게 표현.
            //nweet는 state인 nweet의 value이다.
      createdAt: Date.now(),
      creatorId: userObj.uid,
       //nweet이 creatorId이다
    });
    setNweet("");
       //submit버튼을 누르면 nweet 컬렉션이 생성되고
       //빈 문자열로 초기화해준다.
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
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