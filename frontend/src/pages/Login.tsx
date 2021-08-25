import { Button, Card, CardContent, CardHeader, TextField} from '@material-ui/core';
import React from 'react';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    userName: string,
    email: string,
    password: string,
  
  };

export default function Login(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);


    return(

            <div style={{width:'100%', display: 'grid', placeItems: 'center'}}>
                <h1 style={{textAlign:'center', marginBottom:'10%'}}>Log in</h1>
                    <Card style={{width:'35%',marginLeft:'3%',float:'left', textAlign:'center', padding:'5%'}}>
                    <CardHeader title="Log in"></CardHeader>
                    <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>

                    {/* pattern: /^\S+@\S+$/i */}
                        <TextField   {...register("userName" || "email", { required: true})} margin="dense" id="username" label='username' variant='filled'/><br></br>
                        {errors.userName  && <span style={{color:'red'}}>Please enter a unique username <br></br></span>}

                        <TextField   {...register("password", { required: true })} type='password' margin="dense" id="password" label='password' variant='filled'/> <br></br>
                        {errors.password  && <span style={{color:'red'}}>Please enter a password <br></br></span>}

                        <Button type="submit" variant='contained' >Save</Button>

                    </form>
                    </CardContent>
                    </Card>

            </div>
    )
}