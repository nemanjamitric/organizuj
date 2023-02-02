import {Appbar} from "react-native-paper";
import {medium, useBreakpoint} from "../hooks/useBreakpoint";
import {isBig} from "../hooks/isBig";
import {Platform} from "react-native";

const CustomNavigationBar = ({options, navigation, back, hideHamburger, showBack}) => {
    const breakpoint = useBreakpoint();

    return (
        <Appbar.Header mode="center-aligned">
            {
                (back || showBack) &&
                <Appbar.BackAction
                    onPress={navigation.goBack}
                    accessibilityLabel="Back"
                />
            }
            <Appbar.Content title={typeof options?.title === 'string' ? options.title : "ff"}/>
            {
                !hideHamburger &&
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