import {Image, View} from "react-native";
import {s} from "../../styles/mainStyles";
import {Button, Card, Divider, Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import ScreenBackground from "../../components/ScreenBackground";
import {isBig} from "../../hooks/isBig";

const WelcomeScreen = (props) => {
    const navigation = useNavigation();

    if (isBig()){
        return (
            <ScreenBackground style={s.twoColumnsContainer}>
                <View style={{width: '50%'}}>
                    <Card style={{justifyContent: 'center', alignItems: 'center', padding: 20, flex: 1, marginBottom: 20}}>
                        <Text variant="displayLarge">Organizuj!</Text>
                        <View style={{height: 10}} />
                        <Divider />
                        <View style={{height: 10}} />
                        <Text variant="headlineMedium">Organizuj sva dešavanja koja planiraš na brži i efikasniji način.</Text>
                        <View style={{height: 10}} />
                        <Text variant="headlineMedium">Napravi pozivnice, listu želja i daj svojim gostima sve što im je potrebno da uživaju na tvom događaju.</Text>
                        <View style={{height: 10}} />
                        <Text variant="headlineMedium">Uživaj u maštanju o događaju, a ostalo prepusti nama!</Text>
                    </Card>
                </View>
                <View style={{flex: 1, width: '50%', justifyContent: 'space-between', paddingHorizontal: 10}}>
                    <Card style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../assets/intro1.png')} style={{width: 250, height: 250}} />
                        </View>

                        <Text variant="headlineLarge" style={{textAlign: 'center'}}>Treba ti pomoć?</Text>
                        <Text variant="bodyLarge" style={{textAlign: 'center'}}>Uradi brzu registraciju i odmah koristi naš servis!</Text>
                    </Card>
                    <View />
                    <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                        <Button mode='contained' onPress={() => navigation.navigate("Login", {screen: "LoginScreen"})}>Prijavi se</Button>
                        <Divider />
                        <Text variant="titleMedium" style={{textAlign: 'center'}}>Nemaš nalog?</Text>
                        <Button mode='outlined' onPress={() => navigation.navigate("Login", {screen: "RegistrationScreen"})}>Registruj se</Button>
                    </View>
                </View>
            </ScreenBackground>
        )
    }

    return (
        <ScreenBackground>
            <View style={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 10}}>
                <Card style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../../assets/intro1.png')} style={{width: 250, height: 250}} />
                    </View>

                    <Text variant="headlineLarge" style={{textAlign: 'center'}}>Organizuj!</Text>
                    <Text variant="bodyLarge" style={{textAlign: 'center'}}>Organizuj sva dešavanja koja planiraš na brži i efikasniji način.</Text>
                </Card>
                <View />
                <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                    <Button mode='contained' onPress={() => navigation.navigate("Login", {screen: "LoginScreen"})}>Prijavi se</Button>
                    <Divider />
                    <Text variant="titleMedium" style={{textAlign: 'center'}}>Nemaš nalog?</Text>
                    <Button mode='outlined' onPress={() => navigation.navigate("Login", {screen: "RegistrationScreen"})}>Registruj se</Button>
                </View>
            </View>
        </ScreenBackground>
    )
}

export default WelcomeScreen