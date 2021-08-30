import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider } from 'react-query';
import Nav from './components/Navigation';
import { Users } from './pages/Users';
import Doors from './pages/Doors';
import UserProfile from './components/UserProfile';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Management from './pages/Management';
import DeleteUser from './components/DeleteUser';
import FingerPrintScan from './components/FingerprintScan';
import NewUserProfile from './components/NewUserProfile';
import NewUserForm from './components/NewUserForm';
import Loading from './components/Loading';
import SearchBar from 'material-ui-search-bar';
import UserDetail from './components/UserDetail';
import Login2 from './pages/Login2';
import AdminProfile from './components/AdminProfile';
import UserDetailProfile from './components/UserDetailProfile';



function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>                
      <div className="App">
      <Nav />
      
        <Router>
                <Route path="/" exact><Management /></Route>
                <Route path="/doors" exact><Doors/></Route>
                <Route path="/users" component={Users} />
                <Route path="/delete-user"><DeleteUser /></Route>
                <Route path="/users/:id"><UserProfile /></Route>
                <Route path="/new-user"><NewUserProfile /></Route>
                <Route path="/fingerprintscan"><FingerPrintScan /></Route>
                <Route path="/userdetail/:userId"><UserDetailProfile /></Route>
                <Route path="/userform"><NewUserForm /></Route>
                <Route path="/loading"><Loading /></Route>
                <Route path="/search"><SearchBar /></Route>
                <Route path="/userdetai"><UserDetail /></Route>
                <Route path="/login"><Login2 /></Route>
                <Route path="/profile"><AdminProfile /></Route>


        </Router>
      </div>
    </QueryClientProvider>

  );
}

export default App;
