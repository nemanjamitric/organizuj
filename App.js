import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PreLoginNavigation from "./navigation/preLogin/PreLoginNavigation";
import {Provider as PaperProvider} from 'react-native-paper';
import useTheme from "./hooks/useTheme";
import InAppNavigation from "./navigation/inApp/InAppNavigation";
import {createContext, useEffect, useMemo, useReducer} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);

export default function App() {
    const theme = useTheme();
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        userToken: action.token,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            userToken: null,
        }
    );

    const authContext = useMemo(
        () => ({
            signIn: async () => {
                const userToken = await AsyncStorage.getItem("token");
                dispatch({type: "SIGN_IN", token: userToken});
            },
            signOut: async () => {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("user");
                dispatch({type: "SIGN_OUT"});
            }
        }),
        []
    );

    useEffect(() => {
        const bootstrapAsync = async () => {
            const userToken = await AsyncStorage.getItem("token");
            if(userToken){
                dispatch({type: "SIGN_IN", token: userToken});
            }
        }
        bootstrapAsync();
    }, []);

    const renderApp = useMemo(() => {
        if (state.userToken){
            return <InAppNavigation />
        }
        return <PreLoginNavigation />
    }, [state.userToken])

  return (
      <AuthContext.Provider value={authContext}>
          <PaperProvider theme={theme}>
              {
                  renderApp
              }
          </PaperProvider>
      </AuthContext.Provider>
  );
}
