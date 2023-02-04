import "./ignoreWarnings";
import { View } from 'react-native';
import PreLoginNavigation from "./navigation/preLogin/PreLoginNavigation";
import {Provider as PaperProvider} from 'react-native-paper';
import useTheme from "./hooks/useTheme";
import InAppNavigation from "./navigation/inApp/InAppNavigation";
import {createContext, useEffect, useMemo, useReducer, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserById} from "./fetch/users";
import {UserContext} from "./contexts/UserContext";

export const AuthContext = createContext(null);

export default function App() {
    const theme = useTheme();
    const [user, setUser] = useState({});
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
                        isLoading: false,
                        userToken: action.token,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        userToken: null,
                        isLoading: false,
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
                const userId = await AsyncStorage.getItem("userId");
                await getUserById(userId).then(async r => {
                    const res = await r.json();
                    setUser(res?.user);
                    dispatch({type: "SIGN_IN", token: userToken});
                })
            },
            signOut: async () => {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("user");
                setUser({});
                dispatch({type: "SIGN_OUT"});
            }
        }),
        []
    );

    useEffect(() => {
        const bootstrapAsync = async () => {
            const userToken = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("userId");
            if(userToken){
                dispatch({type: "SIGN_IN", token: userToken});
            }
            if (userId){
                await getUserById(userId).then(async r => {
                    if (r.status === 200){
                        const res = await r.json();
                        setUser(res?.user);
                        await AsyncStorage.setItem('user', JSON.stringify(res?.user));
                    }
                })
            }
        }
        bootstrapAsync();
    }, []);

    const renderApp = useMemo(() => {
        if (state.userToken){
            return <InAppNavigation />
        }
        return <PreLoginNavigation />
    }, [state.userToken]);

  return (
      <AuthContext.Provider value={authContext}>
          <UserContext.Provider value={{user: user, setUser: setUser}}>
              <PaperProvider theme={theme}>
                  <View style={{flex: 1, backgroundColor: theme.colors.backgroundColor}}>
                      {
                          renderApp
                      }
                  </View>
              </PaperProvider>
          </UserContext.Provider>
      </AuthContext.Provider>
  );
}
