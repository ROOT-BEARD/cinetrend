import { Card, Button } from "@heroui/react";
import type { NewAccount } from '../types/database';
import { accountService } from "../services/accountService";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import SignUpForm from "../componets/SignUpForm";

export default function AuthenticationPage(){
    const { user } = useUser();
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignUp = async() => {
        const account:NewAccount = {
            email: email,
            password: password
        };
        await accountService.cerateAccount(account);
    }

    const handleSignIn = async() => {
        await accountService.signIn(email, password);
    }

    const handleSignOut = async() => {
        await accountService.signOut();
    }

    useEffect(() => {
        user?.id ? setSignedIn(true) : setSignedIn(false);
    }, [user?.id]);

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <Card variant="secondary" className=" flex flex-col items-center pt-25 md:w-1/2 md:m-0 m-5 w-full h-2/3">
                {signedIn?<Button onClick={handleSignOut}>SIGN OUT</Button>:
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