import {Appbar} from "react-native-paper";

const CustomNavigationBar = ({options, navigation, back}) => {
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
            <Appbar.Action
                accessibilityLable="Menu"
                icon='menu'
                onPress={navigation.toggleDrawer}
            />
        </Appbar.Header>
    )
}

export default CustomNavigationBar;