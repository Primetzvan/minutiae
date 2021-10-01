import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Card, MenuItem, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddDoors from "./AddDoors";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { useMutation, useQuery } from "react-query";
import {  useParams } from "react-router-dom";
import { CreateNewUserFormRouteProps, createUser, getAdminProfile, getUserDetail, User } from "../shared/API";
import { NewUserFormRouteProps } from '../shared/API';
import Loading from "./Loading";
import { Door } from "../shared/API";
import axios from "axios";

type Inputs = {
  userName: string,
  firstName: string,
  lastName: string,
  role: string,
  email: string,
  phonenr: string,
  address: string,
  password: string,
  passwordRepeat?: string,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      fontSize: 14,

    },
    root: {
      flexGrow: 3,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
  }),
);


const roles = [
    {
      value: 'ADMIN',
      label: 'ADMIN',
    },
    {
      value: 'USER',
      label: 'USER',
    },
  ];


export default function UserDetail() {

  const [currency, setCurrency] = useState('USER');
  const classes = useStyles();
  const params = useParams<CreateNewUserFormRouteProps>();

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      userName: params?.username,
    }
  }
  );

  const { data, isLoading } = useQuery(createUser.name, createUser(params.username)); 


  const onSubmit: SubmitHandler<Inputs> = async (userData) => {
      
    
    if(userData.password == userData.passwordRepeat){

      delete userData.passwordRepeat;

      console.log(userData);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${data?.uuid}`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        credentials: "include",
          body: JSON.stringify(data)
      });
  
      const jsonData = await response.json();

      if(response.ok){
       // alert("created user");
      }else{
      //  alert("couldn't create user");
      }
    }else{
     // alert("password nicht korrekt");
    }
    

 

}
 

  // const { data, isLoading } = useQuery(getUserDetail.name, getUserDetail(params.username)); 
  // let role = data?.role;

  // if(isLoading){
  //     console.log("is Loading...");
  //     <Loading />
  // }


  return (
    <Card style={{backgroundColor:'#c6d9cb', padding:'0.5%', margin:'0.5%'}}>    
        <Link to='/users' style={{color:'black', textDecoration:'none'}}><Button variant='contained' style={{margin:'1%',backgroundColor:'#9bbda3', textAlign:'center'}} startIcon={<ArrowBackIcon />}>back</Button></Link>
    
    <form onSubmit={handleSubmit(onSubmit)}>

        <div style={{display: 'inline-block',float:'left', textAlign:'left', color:'black'}}>
             <h3 style={{paddingBottom:'20%', paddingTop:'15%'}}>Username:*</h3>
             <h3 style={{paddingBottom:'20%'}}>Firstname:</h3>
             <h3 style={{paddingBottom:'20%'}}>Lastname:</h3>
             <h3 style={{paddingBottom:'20%'}}>Role:</h3>
             <h3 style={{paddingBottom:'20%'}}>Email:</h3>
             <h3 style={{paddingBottom:'20%'}}>Phone number:</h3>
             <h3 style={{paddingBottom:'20%'}}>Fingerprint:</h3>
        </div>
        <div className={classes.root} style={{display: 'inline-block', float:'left', marginLeft: '10%', backgroundColor:'white', padding:'2%', width:'25ch'}}>
            {/* <TextField  required {...register("userName", { required: true })} margin="dense" id="username" label='username' variant='filled'/>  */}
            <input {...register("userName")}></input>
            {errors.userName  && <span style={{color:'red'}}>Please enter a unique username <br></br></span>}
            <TextField {...register("firstName")} margin="dense" id="firstname" label='firstname' variant='filled' />
            <TextField {...register("lastName")} margin="dense" id="lastname" label='lastname' variant='filled' />
            <TextField id="role" margin="dense" select variant='filled' label="Role" value={currency} onChange={handleChangeCurrency}>
            {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem> ))} </TextField> 
            <TextField {...register("email", {required: true, pattern: /^\S+@\S+$/i})} margin="dense" id="email" label='email' variant='filled' />
            {errors.email  && <span style={{color:'red'}}>Please enter a valid email </span>}
            <TextField {...register("phonenr")} margin="dense" id="phonenr" label='phonenr' variant='filled'/>
            <Link to='/fingerprintscan'><Button variant='outlined' style={{marginTop:'10%'}} fullWidth><FingerprintIcon style={{color:'red', marginRight:'1%'}} /> hinzufügen</Button></Link>
        </div>
        <Link to='/users'><Button  type="submit" variant='contained' style={{float:'right', display:'inline-block', marginTop:'-4%'}} >Save</Button></Link>

        <div className={classes.root} style={{display: 'inline-block',width:'50%',float:'right', backgroundColor:'#A9C6B0', marginLeft:'3%',position:'relative', padding:'1%'}}>
            Door Access: 
            <Button data-cy="addDoorsbtn"><AddDoors /></Button>
            <br></br>

            {/* <ul>
            {data?.accesses.map((door: Door) =>(
                <li>{door.doorname}</li>
            ))}
            </ul> */}
            

        </div>
        <div hidden={data?.role == 'USER'}>
        <Card className={classes.root} style={{display: 'inline-block',width:'50%',float:'right',backgroundColor:'white',textAlign:'center', padding:'1%'}}>
            <p>Enter a password: </p>
            <TextField {...register("password")}placeholder="password" variant="filled" type="password" disabled={data?.role == "USER"}/>
            <br></br>
            <p>Repeat the password:</p>
            <TextField {...register("passwordRepeat")} placeholder="password" variant="filled" type="password" />
            <br></br>
            <br></br>

        </Card>
        </div>
    </form>
    </Card>
  );
}