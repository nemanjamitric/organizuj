import ScreenBackground from "../../components/ScreenBackground";
import {Avatar, Button, Card, Divider, Snackbar, Text, TextInput} from "react-native-paper";
import {useState} from "react";
import {Dimensions, Image, View} from "react-native";
import {loginUser, registerUser} from "../../fetch/auth";
import {isBig} from "../../hooks/isBig";
import {s} from "../../styles/mainStyles";
import {useNavigation} from "@react-navigation/native";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState({
        "email": "",
        "password": "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const dataSetter = (field, value) => {
        setData(prevState => {
            return {...prevState, [field]: value};
        });
    }

    const loginHandler = async () => {
        await loginUser(data).then(async r => {
            const res = await r.json();
            console.log("REG", res)
        })
    }


    if (isBig()) {
        return (
            <ScreenBackground style={s.twoColumnsContainer}>
                <View style={{width: '50%'}}>
                    <Card style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        flex: 1,
                        marginBottom: 20
                    }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: Dimensions.get("window").height * 0.5
                        }}>
                            <Image
                                source={require('../../assets/LoginPhoto.png')}
                                style={{width: "100%", height: "100%"}}
                                resizeMethod='cover'
                            />
                        </View>
                        <View style={{height: 10}}/>
                        <Divider/>
                        <View style={{height: 10}}/>
                        <Text variant="headlineMedium">Vreme je vrednije od novca. Možete dobiti više novca, ali ne možete dobiti više vremena. – Džim Rom</Text>
                    </Card>
                </View>
                <View style={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 10}}>
                    <Card>
                        <Card.Title
                            title='Vaši podaci'
                            left={(props) => <Avatar.Icon {...props} icon="account"/>}
                        />
                        <Card.Content>
                            <TextInput
                                label="Email"
                                value={data.email}
                                onChangeText={text => dataSetter("email", text)}
                                keyboardType='email'
                                mode='outlined'
                            />
                            <TextInput
                                label="Lozinka"
                                value={data.password}
                                onChangeText={text => dataSetter("password", text)}
                                mode='outlined'
                                style={{marginBottom: 10}}
                                secureTextEntry={!passwordVisible}
                                right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => {setPasswordVisible(!passwordVisible)}} />}
                            />
                        </Card.Content>
                    </Card>
                    <View/>
                    <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                        <Button mode='contained' onPress={loginHandler}>Potvrdi</Button>
                        <Divider />
                        <Text variant="titleMedium" style={{textAlign: 'center'}}>Nemaš nalog?</Text>
                        <Button mode='outlined' onPress={() => navigation.navigate("RegistrationScreen")}>Kreiraj nalog</Button>
                    </View>
                    <Snackbar
                        visible={false}
                        onDismiss={()=> {}}
                        action={{
                            label: 'Undo',
                            onPress: () => {
                                // Do something
                            },
                        }}>
                        Hey there! I'm a Snackbar.
                    </Snackbar>
                </View>
            </ScreenBackground>
        )
    }

    return (
        <ScreenBackground>
            <View style={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 10}}>
                <Card>
                    <Card.Title
                        title='Vaši podaci'
                        left={(props) => <Avatar.Icon {...props} icon="account"/>}
                    />
                    <Card.Content>
                        <TextInput
                            label="Email"
                            value={data.email}
                            onChangeText={text => dataSetter("email", text)}
                            keyboardType='email'
                            mode='outlined'
                        />
                        <TextInput
                            label="Lozinka"
                            value={data.password}
                            onChangeText={text => dataSetter("password", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                            secureTextEntry={!passwordVisible}
                            right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => {setPasswordVisible(!passwordVisible)}} />}
                        />
                    </Card.Content>
                </Card>
                <View/>
                <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                    <Button mode='contained' onPress={loginHandler}>Potvrdi</Button>
                    <Divider />
                    <Text variant="titleMedium" style={{textAlign: 'center'}}>Nemaš nalog?</Text>
                    <Button mode='outlined' onPress={() => navigation.navigate("RegistrationScreen")}>Kreiraj nalog</Button>
                </View>
                <Snackbar
                    visible={false}
                    onDismiss={()=> {}}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    Hey there! I'm a Snackbar.
                </Snackbar>
            </View>
        </ScreenBackground>
    )
}

export default LoginScreen;