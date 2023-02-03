import {Appbar, Text} from "react-native-paper";
import {medium, useBreakpoint} from "../hooks/useBreakpoint";
import {isBig} from "../hooks/isBig";
import {Image, Platform, View} from "react-native";

const CustomNavigationBar = ({options, navigation, back, hideHamburger, showBack}) => {
    const breakpoint = useBreakpoint();

    let hideHamburgerBool;
    if (typeof hideHamburger === 'boolean'){
        hideHamburgerBool = !hideHamburger;
    } else {
        hideHamburgerBool = !isBig();
    }

    return (
        <Appbar.Header mode="center-aligned">
            {
                (back || showBack) &&
                <Appbar.BackAction
                    onPress={navigation.goBack}
                    accessibilityLabel="Back"
                />
            }
            <Appbar.Content title={typeof options?.title === 'string' ?
                <View style={{alignItems: 'center'}}>
                    <Image source={require('../assets/TransparentLogo.png')} style={{height: 30, width: 30}} />
                    <Text variant="headlineSmall">{options.title}</Text>
                </View>
                :
                ""
            } />
            {
                hideHamburgerBool &&
                <Appbar.Action
                    accessibilityLable="Menu"
                    icon='menu'
                    onPress={navigation.toggleDrawer}
                />
            }
        </Appbar.Header>
    )
}

export default CustomNavigationBar;