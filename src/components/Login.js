import React , {useState , useEffect} from 'react'
import {getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Button, Grid, TextField, Typography} from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google";
import {Link} from "react-router-dom";
import { GoogleAuthProvider , signInWithPopup} from "firebase/auth";


function Login( {history} ) {
    const [email , setEmail] = useState("") ;
    const [pass , setPass] = useState("");
    const [loading , setLoading] = useState(false);
    
    useEffect(() =>{
        const token = localStorage.getItem('token');
        if(token){
            history.push('/chats');
        }
    }, [])
    
    const LogIn = () => {
        const auth = getAuth();
        setLoading(true);
        signInWithEmailAndPassword(auth , email, pass)
            .then((userCredential) => {
                localStorage.setItem("token", userCredential._tokenResponse.idToken)
                // history.push("/chats")
                // console.log(user);
            })
            .catch((e) => {
                alert("Email or Password is wrong")
            })
            .finally(() => setLoading(false));
    }

    const Google = () => {
        const auth = getAuth();
        signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            localStorage.setItem("token",token);
            // history.push("/chats")
        })
        .catch((e) => alert("Google SignIn fail"))
        .finally(() => setLoading(false));
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
                        <Button color = "primary" variant = "contained"
                            onClick = {LogIn}>
                            {loading ? "Loging In.." :"Log in"}
                        </Button>
                        <div style = {{height: 10}} />
                        <div>
                            <Typography style = {{
                                textAlign : "center",
                            }}>
                                OR
                            </Typography>
                        </div>
                        <div style = {{height: 10}} />
                        <Button color = "primary" variant = "outlined"
                        style = {{minWidth : 300 ,justifyContent : "space-evenly"}}
                        onClick = {Google}
                        >
                            <GoogleIcon/> Sign In with Google
                        </Button>

                        <div style = {{height: 20}} />
                        <Typography variant = "p" sx = {{ textAlign : "center"}}>
                            <Link to = "/sign" style = {{textDecoration : "none"}}>
                            Don't have an account
                            </Link>
                        </Typography>
                    </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;