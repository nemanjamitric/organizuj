import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Drawer} from "react-native-paper";


const CustomNavigationDrawer = ({theme, ...navProps}) => {
    const {state, navigation} = navProps;

    const isActive = (index) => {
        console.log(index, state.index)
        return index === state.index
    };

    return (
        <DrawerContentScrollView {...navProps}>
            {
                state.routes.map((route, index) => {
                    return (
                        <Drawer.Item
                            label={route.name}
                            key={route.key}
                            accessibilityLabel={route.name}
                            active={isActive(index)}
                            onPress={() => {
                                navigation.navigate(route.name)
                            }}
                        />
                    )
                })
            }
        </DrawerContentScrollView>
    )
}

export default CustomNavigationDrawer;