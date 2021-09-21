import React , {useState , useEffect} from 'react'
// import { useHistory } from 'react-router';
import {getAuth , createUserWithEmailAndPassword} from "firebase/auth"
import { Button, Grid, TextField} from "@mui/material";

function Sign({history}) {

    const [email , setEmail] = useState("");
    const [pass , setPass] = useState("");
    const [loading , setLoading] = useState(false);


    useEffect(() => {           // to prevent user from accessing SignUp page when user is signIn
        const token = localStorage.getItem("token");
        if(token){
            history.push('/chats');
        }
    }, [])

    const SignUp = () => {
    const auth = getAuth();

        setLoading(true);
        createUserWithEmailAndPassword(auth , email , pass)
        .then(() => {
            // const user = userCredential.user;
            // console.log(user);
            history.push("/");
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => setLoading(false)
        );
    }

    return (
        <div>
            <Grid container style = {{ minHeight: '100vh' , backgroundColor: "#096dd9"}}>

                <Grid container 
                    alignItems = "center"
                    direction = "column"
                    justifyContent = "center"
                    style ={{padding : "10" ,maxHeight: "100vh"}}>
                    <div style = {{background : "#d9d9d9" , padding : "50px", borderRadius : "5px"}}> 
                    <div style = {{
                        display : "flex" ,
                        flexDirection : "column",
                        maxWidth : 400,
                        minWidth : 300
                    }}>
                        <TextField type = "email" label = "Email" margin = "normal" value = {email} onChange = { (e) => setEmail(e.target.value)} />
                        <TextField type = "password" label = "Password" margin = "normal" value = {pass} onChange = { (e) => setPass(e.target.value)}/>
                        <div style = {{height : 20}}/>
                        <Button color = "primary" variant = "contained" onClick = {SignUp} >
                            {loading ? "Creating User..." : "Sign Up"} 
                        </Button>
                        
                    </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Sign;