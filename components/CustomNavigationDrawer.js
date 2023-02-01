import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Drawer} from "react-native-paper";
import useTheme from "../hooks/useTheme";
import {large, useBreakpoint} from "../hooks/useBreakpoint";
import {Text} from "react-native";
import {isBig} from "../hooks/isBig";


const CustomNavigationDrawer = ({theme, ...navProps}) => {
    const {state, navigation} = navProps;
    const theme2 = useTheme();
    const breakpoint = useBreakpoint();

    const isActive = (index) => {
        return index === state.index
    };
    const baseStyle = {flex: 1, backgroundColor: theme2.colors.background}

    let itemStyle;

    if (breakpoint === large){
        itemStyle = {
            textAlign: 'right',
            padding: 10,
            alignItems: 'center',
            paddingLeft: 50,
        }
    } else {
        itemStyle = {
            textAlign: 'right',
            padding: 10,
        }
    }

    return (
        <DrawerContentScrollView {...navProps} style={baseStyle}>
            {
                state.routes.map((route, index) => {
                    return (
                        <Drawer.Item
                            label={breakpoint === large ? route.name : ""}
                            key={route.key}
                            accessibilityLabel={route.name}
                            active={isActive(index)}
                            onPress={() => {
                                navigation.navigate(route.name)
                            }}
                            right={() => {
                                if(breakpoint === large){
                                    return <Text></Text>
                                }
                                return <Text style={{fontSize: 16, color: theme2.colors.onBackground}}>{route.name}</Text>
                            }}
                            style={itemStyle}
                        />
                    )
                })
            }
        </DrawerContentScrollView>
    )
}

export default CustomNavigationDrawer;