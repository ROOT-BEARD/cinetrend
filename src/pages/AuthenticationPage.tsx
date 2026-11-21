import { Card, Button } from "@heroui/react";
import type { NewAccount } from '../types/database';
import { accountService } from "../services/accountService";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import SignUpForm from "../componets/SignUpForm";

export default function AuthenticationPage(){
    const { user } = useUser();
    //whether the user is signed in or not
    const [signedIn, setSignedIn] = useState<boolean>(false);
    // the entered email
    const [email, setEmail] = useState<string>("");
    // the entered password
    const [password, setPassword] = useState<string>("");

    //signs up with entered info
    const handleSignUp = async() => {
        const account:NewAccount = {
            email: email,
            password: password
        };
        await accountService.cerateAccount(account);
    }
    //signs in with entered info
    const handleSignIn = async() => {
        await accountService.signIn(email, password);
    }
    //signs the user out
    const handleSignOut = async() => {
        await accountService.signOut();
    }

    //if their is a user id, set signed in true, else false
    useEffect(() => {
        user?.id ? setSignedIn(true) : setSignedIn(false);
    }, [user?.id]);
    
    return(
        <div className="w-full h-screen flex justify-center items-center">
            <Card variant="secondary" className=" flex flex-col items-center pt-25 md:w-1/2 md:m-0 m-5 w-full h-2/3">
                {/* if signed in display sign out button, else, the sign up form */}
                {signedIn?<Button onClick={handleSignOut}>SIGN OUT</Button>:
                //gets the users input
                <SignUpForm
                    setEmail={setEmail}
                    setPassword={setPassword}
                    email={email}
                    password={password}
                    handleSignIn={handleSignIn}
                    handleSignUp={handleSignUp}
                />}
            </Card>
        </div>
    );
}