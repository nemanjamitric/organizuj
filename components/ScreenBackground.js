import {withTheme} from "react-native-paper";
import {View} from "react-native";
import {isBig} from "../hooks/isBig";

const ScreenBackground = ({theme, style, children}) => {
    const baseStyle = {flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: isBig() ? '4%' : 0}
    return (
        <View
            style={{...baseStyle, ...style}}
        >
            {children}
        </View>
    )
}

export default withTheme(ScreenBackground);