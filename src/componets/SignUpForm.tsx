import { Typography, Input, Button } from "@heroui/react";
import { useState } from "react";

export default function SignUpForm({setEmail, setPassword, email, password,
    handleSignIn, handleSignUp}
    :{setEmail:(value:string)=>void, setPassword:(value:string)=>void,
        password:string, email:string, handleSignIn:()=>void, handleSignUp:()=>void}){
    //whether the user is trying to sign in or sign up
    const [signIn, setSignIn] = useState<boolean>(false);
    
    return(
        <div className="w-full h-full flex flex-col items-center">
            {/* display sign in if trying to sign in, or sign up otherwise */}
            <Typography className='pb-10' type="h4">
                {signIn?"SIGN IN":"SIGN UP"}
            </Typography>
            {/* gets the users email input */}
            <Input placeholder="Email..." className='w-1/2 mb-5'
                onChange={(e)=>setEmail(e.target.value)} value={email as string}
            />
            {/* gets the users password input */}
            <Input type="password" placeholder="Password..." className='w-1/2 mb-5 '
                onChange={(e)=>setPassword(e.target.value)} value={password as string}
            />
            {/* lets the user change wheter they want to sign up,
            or if they already have an account and want to sign in */}
            <Button
                className="mb-5"
                onClick={() => setSignIn(!signIn)}
                variant="ghost"
            >
                {signIn?"don't have have an account? Sign up"
                :"already have an account? Sign in"}
            </Button>
            {/* calls handleSignIn or handleSignUp depeding
            on the state of the 'signIn' boolean */}
            <Button onClick={()=>{
                signIn?handleSignIn():handleSignUp()
            }}>
                {signIn?"SIGN IN":"SIGN UP"}
            </Button>
        </div>
    );
}