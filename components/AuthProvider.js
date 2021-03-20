import React,{createContext,useState} from "react";
import auth from '@react-native-firebase/auth';

import Snackbar from 'react-native-snackbar';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                        // setUser(email)
                    } catch (e) {
                        Snackbar.show({
                            text: e.message,
                            backgroundColor: '#f00',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (e) {
                        Snackbar.show({
                            text: e.message,
                            backgroundColor: '#f00',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        Snackbar.show({
                            text: e.message,
                            backgroundColor: '#f00',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}