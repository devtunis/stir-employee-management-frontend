import   { useState } from "react";
import "./JoinRoom.css";
import {use} from "../axiosClient/usehook.js"
import { useStoreauth } from "../useStore/UseStoreContext";
import NewLoader from "../Component/NewLoader.jsx";
 
const JoinRoom = ({setshowfalse}) => {
  const [roomCode, setRoomCode] = useState("");
  const {state}  = useStoreauth()
  const [load,setLoad] = useState(false)

  const handleJoin =async (e) => {
    e.preventDefault();
 
    if (!roomCode.trim()) return;
      const {err,data} = await use("/ogranization/join/v1","post",{"repoId": roomCode, "workerId":state.cin},setLoad)

      if(err!=null) {
         setshowfalse(false)
        
         return  
      }
      
   
      setshowfalse(false)

     
    


      
  };

  return (
    <> 
    
 
        
        
      {
        load &&   <div  style={{zIndex:"9999999999999", width:"100px",height:"100px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <NewLoader/>
      </div>  
      }
     
     <div className="joinRoom">
      <div className="joinRoom__card">

        <div className="joinRoom__icon">
          <span>↗</span>
        </div>

        <div className="joinRoom__content">
          <h2>Join a Room</h2>

          <p>
            Enter the room code you received to join the session.
          </p>

          <form onSubmit={(e)=>handleJoin(e)}>
            <label htmlFor="roomCode">
              Room code
            </label>

            <div className="joinRoom__inputWrapper">
              <input
                id="roomCode"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Enter room code"
                autoComplete="off"
              />
            </div>

            <button type="submit">
              <span>Join room</span>
              <span className="joinRoom__arrow">→</span>
            </button>
          </form>

          <div className="joinRoom__hint">
            <span>●</span>
            Ask the room administrator for the access code.
          </div>
        </div>

      </div>
    </div>
    </>
   
  );
};

export default JoinRoom;