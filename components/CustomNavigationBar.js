import {Appbar} from "react-native-paper";
import {medium, useBreakpoint} from "../hooks/useBreakpoint";
import {isBig} from "../hooks/isBig";
import {Platform} from "react-native";

const CustomNavigationBar = ({options, navigation, back, hideHamburger}) => {
    const breakpoint = useBreakpoint();

    return (
        <Appbar.Header>
            {
                back &&
                <Appbar.BackAction
                    onPress={navigation.goBack}
                    accessibilityLabel="Back"
                />
            }
            <Appbar.Content title={options.title}/>
            {
                breakpoint === medium || hideHamburger &&
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