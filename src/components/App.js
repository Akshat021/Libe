import React from 'react'
import "../firebase"
import Login from "./Login"
import Sign from "./Sign"
import Chat from "./Chat"
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import "./App.css";
import {AuthProvider} from "../Contexts/AuthContext";

function App() {
  return (
    <div> 
      <Router>
        <AuthProvider>
          <Switch>
            <Route path = "/chats" component = {Chat}/>
            <Route path = "/sign" component = {Sign}/>
            <Route exact path = "/" component = {Login}/>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}
export default App;