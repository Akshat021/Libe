import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {getAuth} from "firebase/auth";
import { useEffect , useState} from 'react';
import {ChatEngine} from "react-chat-engine";
import ChatFeed from "./ChatEngine/ChatFeed";
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';


export default function Chat({history}) {
    const auth = getAuth(); 
    var {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const  SignOut = async () => {
      await auth.signOut()
        .then(() => {
          localStorage.removeItem("token");
          history.push("/");
        })
        .catch((e) => {
          alert(e.message);
        })
    }

    const getFile = async (url) => {
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data], "userPhoto.jpg", {type : 'image/jpeg' })
    }

    useEffect(() => {
// console.log(user.email, user.uid);
      const token = localStorage.getItem('token');
      if(!token){
        history.push('/');
        return;
      }
      if(!user){
        history.push('/');
        return ;
      }  
      axios.get('https://api.chatengine.io/users/me', {
        headers: {
          "project-id" : process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        }
      })
      .then(()=>{
        setLoading(false);
      })
      .catch((error) => {
// console.log(error);

        let formdata = new FormData();
        formdata.append('email', user.email); 
        formdata.append('username', user.email); 
        formdata.append('secret', user.uid); 
console.log(user.email, user.uid);
        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name)
          })
          .catch((e) => {
            console.log(e);
            // formdata.append  ('avatar', avatar, avatar.name)
          })
        axios.post('https://api.chatengine.io/users',
          formdata,
          {
            headers: {"private-key" : process.env.REACT_APP_CHAT_ENGINE_KEY}
          }
        )
        .then(() => setLoading(false))
        .catch((e) => {
          console.log(e)
          console.log("User Not Created yet");
        })  

      })
    }, [user, history])


    

  if(!user || loading) return 'Loading... Please Wait';

  return (
    <>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx = {{backgroundColor : "#256ff7"}} >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
            Welcome To LiveText
          </Typography>
          <Button color="inherit" sx = {{textTransform : "capitalize" ,borderColor:"black" }} onClick = {SignOut} >Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
    
    <ChatEngine
      height="calc(91vh)"
      projectID = {process.env.REACT_APP_CHAT_ENGINE_ID}
      userName = {user.email}
      userSecret = {user.uid}
      renderChatFeed = {(chatAppProps) => <ChatFeed {...chatAppProps}/> }
    />

  </>
  );
}
