import {Appbar} from "react-native-paper";
import {medium, useBreakpoint} from "../hooks/useBreakpoint";

const CustomNavigationBar = ({options, navigation, back}) => {
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
                breakpoint === medium &&
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