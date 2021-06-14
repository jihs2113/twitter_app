import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
 //collection을 get하는 state
  useEffect(() => {
   
    dbService.collection("nweets").onSnapshot((snapshot) => {
         //query 대신 snapshot을 이용하면 실시간으로 update를 확인할수있음.
      const nweetArray = snapshot.docs.map((doc) => ({
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
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;