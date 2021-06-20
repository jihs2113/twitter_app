import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';

const Nweet = ({ nweetObj , isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure?");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            //delete nweet
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            //refFromURL함수를 이용하면 URL에서 reference를 얻을수있다.
            //firebase에 refFromURL함수에 url을 넘기면 그object의 reference를 얻는다. 
            //이 작업으로 nweet와 사진을 가진 reference 자체를 삭제해준다.
        }
    };
    const  toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(event) => {
        event.preventDefault();
        // console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet,
            //newNweet는 input에 있는 text이다.
        });
        setEditing(false);
    };
    const onChange = (event) =>{
        const {
            target:{ value },
        }=event;
        setNewNweet(value);
    };
    return(
    <div>
        {editing ? (
            //수정하고있는 경우에
            <>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Edit nweet" 
                    value={newNweet} 
                    required 
                    onChange={onChange}
                    />
                <input type="submit" value="Update Nweet" />
            </form> 
            <button onClick={toggleEditing}>Cancel</button>
            </>
         ) : (
        <>
        <h4>{nweetObj.text}</h4>
        {nweetObj.attachmentUrl && (<img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="" />
         )}
        {isOwner && (
            <>
            <button onClick={onDeleteClick}>Delete Nweet</button>
            <button onClick={toggleEditing}>Edit Nweet</button>
            </>
        )}
        </>)
        }
    </div>
    );
};
export default Nweet;