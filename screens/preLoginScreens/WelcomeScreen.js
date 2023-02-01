import {Image, View} from "react-native";
import {s} from "../../styles/mainStyles";
import {Button, Card, Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import ScreenBackground from "../../components/ScreenBackground";
import {isBig} from "../../hooks/isBig";

const WelcomeScreen = (props) => {
    const navigation = useNavigation();

    if (isBig()){
        return (
            <ScreenBackground style={s.twoColumnsContainer}>
                <Card style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../../assets/intro1.png')} style={{width: 250, height: 250}} />
                    </View>

                    <Text variant="headlineLarge" style={{textAlign: 'center'}}>Organizuj!</Text>
                    <Text variant="bodyLarge" style={{textAlign: 'center'}}>Organizuj sva dešavanja koja planiraš na brži i efikasniji način.</Text>
                </Card>
            </ScreenBackground>
        )
    }

    return (
        <ScreenBackground style={{padding: 40}}>
            <Card style={{justifyContent: 'center', alignItems: 'center', margin: 10, padding: 10}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../assets/intro1.png')} style={{width: 250, height: 250}} />
                </View>

                <Text variant="headlineLarge" style={{textAlign: 'center'}}>Organizuj!</Text>
                <Text variant="bodyLarge" style={{textAlign: 'center'}}>Organizuj sva dešavanja koja planiraš na brži i efikasniji način.</Text>
            </Card>
        </ScreenBackground>
    )
}

export default WelcomeScreen