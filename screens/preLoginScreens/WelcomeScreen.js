import {View} from "react-native";
import {s} from "../../styles/mainStyles";
import {Button} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import ScreenBackground from "../../components/ScreenBackground";

const WelcomeScreen = (props) => {
    const navigation = useNavigation();
    return (
        <ScreenBackground>
            <Button mode='contained' onPress={() => navigation.navigate("LoginScreen")}>Go to login</Button>
        </ScreenBackground>
    )
}

export default WelcomeScreen