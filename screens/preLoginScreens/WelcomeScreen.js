import {View} from "react-native";
import {s} from "../../styles/mainStyles";
import {Button} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

const WelcomeScreen = (props) => {
    const navigation = useNavigation();
    return (
        <View style={s.test}>
            <Button mode='contained' onPress={() => navigation.navigate("LoginScreen")}>Go to login</Button>
        </View>
    )
}

export default WelcomeScreen