import {withTheme} from "react-native-paper";
import {View} from "react-native";
import {isBig} from "../hooks/isBig";

const ScreenBackground = ({theme, style, children}) => {
    const baseStyle = {flex: 1, backgroundColor: theme.colors.background, paddingHorizontal:'4%', paddingTop: 20}
    return (
        <View
            style={{...baseStyle, ...style}}
        >
            {children}
        </View>
    )
}

export default withTheme(ScreenBackground);