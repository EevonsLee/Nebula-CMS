import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import Empty from './View/Empty'
import Home from './View/Home'
import Login from './View/Login'
import About from './View/About'
import {AuthLoin} from './Common/Auth'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props)=>{
            return <Redirect to='/home'></Redirect>
        }}></Route>
        <Route path="/home" render={(props)=>{
          if(!AuthLoin()){
            return <Redirect to='/login'></Redirect>
          }
          return <Home {...props}></Home>
        }}></Route>
      <Route path='/about' render={(props) =>{
        if(!AuthLoin()){
          return <Redirect to={`/login?url=${props.match.path}`}></Redirect>
        }
        return <About {...props} />
      }}>

      </Route>
        <Route path="/login" component={Login}></Route>
        <Route component={Empty}></Route>
      </Switch>
    </Router>
  );
}

export default App;
