import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import {large, useBreakpoint} from "../../hooks/useBreakpoint";
import HomeStack from "./HomeStack";
import {isBig} from "../../hooks/isBig";

const Drawer = createDrawerNavigator();

const InAppNavigation = (props) => {
    const breakpoint = useBreakpoint();

    const linking = {
        config: {
            screens: {
                initialRouteName: 'Home',
                Home:
                    {
                        initialRouteName: 'Home',
                        screens:
                            {
                                WelcomeScreen: '/home',
                            }
                    }
            }
        }
    }

    return (
        <NavigationContainer linking={linking}>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerPosition: 'right',
                    drawerType: isBig() ? 'permanent' : 'back'
                }}
                initialRouteName="Home"
                drawerContent={(props) => <CustomNavigationDrawer {...props} />}
            >
                <Drawer.Screen name='Home' component={HomeStack}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default InAppNavigation;