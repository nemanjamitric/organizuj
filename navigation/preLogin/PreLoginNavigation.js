import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import LoginStack from "./LoginStack";
import WelcomeStack from "./WelcomeStack";
import {large, useBreakpoint} from "../../hooks/useBreakpoint";

const Drawer = createDrawerNavigator();

const PreLoginNavigation = (props) => {
    const breakpoint = useBreakpoint();

    const linking = {
        config: {
            screens: {
                initialRouteName: 'Hello',
                Hello:
                    {
                        initialRouteName: 'WelcomeScreen',
                        screens:
                            {
                                WelcomeScreen: '/hello',
                            }
                    },
                Login:
                    {
                        initialRouteName: 'LoginScreen',
                        screens:
                            {
                                LoginScreen: '/login',
                                RegistrationScreen: '/registration',
                            }
                    },

            }
        }
    }

    return (
        <NavigationContainer linking={linking}>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerPosition: 'right',
                    drawerType: 'back'
                }}
                initialRouteName="Welcome Stack"
                drawerContent={(props) => <CustomNavigationDrawer {...props} />}
            >
                <Drawer.Screen name='Hello' component={WelcomeStack}/>
                <Drawer.Screen name='Login' component={LoginStack}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default PreLoginNavigation;