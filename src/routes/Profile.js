import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
      //route.js에서 redirect를 이용할수있고
        //history location을 사용하여 로그아웃되면 home으로
        //이동할수있다.
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      //내림차순desc일지 오름차순asc일지 정한다
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
     //where은 필터링 하는 방법을 알려준다.
        //where은 creatorId와 userObj.uid가 같은지 필터링해줌.
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};