import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import type { Session, User } from "@supabase/supabase-js";

//describs the user context
type UserContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
};
// the pased in children is a react node
type UserContextProps = {
  children: React.ReactNode;
};

// the user Context can be signed in or undefined/not signed in
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  // can be used for displaying loading bars, not utlized here tho
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //on intiinalization, creates a function
  // where the session is fetched from supabase,
  // sets the sesscion, and the session user, and sets loading to false
  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };
    
    //calls the created funtion
    initializeAuth();

    //subsribs to live even listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );
    //clean up function, unsubscribes
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    //returns the provider, with the passed in children, allowing
    //everything else to run as normal
    <UserContext.Provider value={{ user, session, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

//used to the the user token/userId
export const useUser = () => {
  //gets the user contrext
  const context = useContext(UserContext);
  //if the conext is null, UserProvider is most likleiy not being used
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  //return the context
  return context;
};