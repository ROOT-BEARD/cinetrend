import type { NewAccount } from "../types/database";
import { supabase } from "../supabase-client";

export const accountService = {
    async cerateAccount(account:NewAccount) {
        const {data, error} = await supabase.auth.signUp({
                email:account.email,
                password:account.password
            });
        if(error) console.error("error adding account", error.message);
        return data;
    },
    async signOut(){
        const { error } = await supabase.auth.signOut();
        if(error) console.error("error signing out: ", error.message);
    },
    async signIn(email:string,password:string){
        const { error } = await supabase.auth.signInWithPassword({
            email:email,
            password:password
        });
        if(error) console.error("error siging in: ", error.message);
    }
}