import React, {useState} from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";


const NweetFactory = ({userObj}) =>{
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState(""); 
    //위에 state들은 form을 위한 state들이다.
    //collection을 get하는 state
    const onSubmit = async (event) => {
        //collection.add가 promise를 리턴하므로 async 추가
      event.preventDefault();
      let attachmentUrl = "";
      if(attachment !== ""){
        //attachment인 사진이 있다면 비어있는 string을 storage에서 다운받은 URL로 업데이트한다.
        const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        //data_url은 format 부분이고, readAsDataURL()와 유사하다.
        //attachment의 string은 이미지 전체이다.
        //우린 이미 파일에대한 엄청 긴 URL을 가지고 있어서 putString을 사용한다.
        //child에는 기본적으로 이미지path가 들어간다. (collection과 비슷하다)
        //ref에서 폴더를 만들수있고 child는 이미지 path가 들어간다.
        const response = await attachmentRef.putString(attachment , "data_url");
        //사진에대한 nweet을 할수있도록
        attachmentUrl = await response.ref.getDownloadURL();
      }
      const nweetObj = {
          text: nweet,
          //nweet:nweet 키와 컬렉션인데 그냥 저렇게 표현.
          //nweet는 state인 nweet의 value이다.
          createdAt: Date.now(),
          creatorId: userObj.uid,
          //nweet이 creatorId이다
          attachmentUrl,
          //collection에 사진의 Url이 들어간다.
      };
     
      await dbService.collection("nweets").add(nweetObj);
       //어떤("nweets") collection에 너의 data들을 저장할지 지정하는곳
      //firestore에서 가져오는 dbservice를 이용하여
      //collection을 생성한다.
      setNweet("");
      setAttachment("");
       //submit버튼을 누르면 nweet 컬렉션이 생성되고
      //빈 문자열로 초기화해준다.
    };
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNweet(value);
    };
    const onFileChange = (event) =>{
      const {
        target: {files},
      } =event;
      //event안에서 target안으로 가서 파일을 받아옴.
      //event.target.files이다.
      const theFile = files[0];
      //input 파일들중 첫번쨰 파일 하나만 받았다.
      const reader = new FileReader();
      //files를 가지고 reader를 만든다음
      reader.onloadend =(finishedEvent) => {
        //FileReader의 API를 이용하여 파일을 읽은다음 finishedEvent를 받는다
       const{
         currentTarget: {result},
       } = finishedEvent;
        setAttachment(result);
        //onloaded에 finishedEvent의 result를 setAttachment로 설정
      }
      //eventLister를 file reader에 추가한다
      reader.readAsDataURL(theFile);
      //readAsDataURL를 사용해서 파일을 읽는다.
    };
    const onClearAttachment = () => setAttachment("")  

    return(
      <>
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Nweet" />
            {attachment && (
            <div>
            <img src={attachment} alt="" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
            </div>
            )}
        </form>
      </>
    );
}

export default NweetFactory;