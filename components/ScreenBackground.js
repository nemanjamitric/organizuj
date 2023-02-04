import {withTheme} from "react-native-paper";
import {View} from "react-native";
import {isBig} from "../hooks/isBig";

const ScreenBackground = ({theme, style, children, single}) => {
    const baseStyle = {flex: 1, backgroundColor: theme.colors.background, paddingHorizontal:'4%', paddingTop: 20}
    const singleStyle = {flex: 1, backgroundColor: theme.colors.background, paddingHorizontal:'20%', paddingTop: 20, alignItems: 'center'}
    if (single){
        if (isBig()){
            return (
                <View
                    style={{...singleStyle, ...style}}
                >
                    {children}
                </View>
            )
        } else {
            return (
                <View
                    style={{...baseStyle, ...style}}
                >
                    {children}
                </View>
            )
        }
    }
    return (
        <View
            style={{...baseStyle, ...style}}
        >
            {children}
        </View>
    )
}

export default withTheme(ScreenBackground);