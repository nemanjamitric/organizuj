import ScreenBackground from "../../components/ScreenBackground";
import {Avatar, Button, Card, Divider, Snackbar, Text, TextInput} from "react-native-paper";
import {useState} from "react";
import {Dimensions, Image, View} from "react-native";
import {registerUser} from "../../fetch/auth";
import {isBig} from "../../hooks/isBig";
import {s} from "../../styles/mainStyles";
import {useNavigation} from "@react-navigation/native";

const RegistrationScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState({
        "firstName": "",
        "lastName": "",
        "phoneNumber": "",
        "email": "",
        "password": "",
        "confirmPassword": ""
    });
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const dataSetter = (field, value) => {
        setData(prevState => {
            return {...prevState, [field]: value};
        });
    }

    const registerHandler = async () => {
        await registerUser(data).then(async r => {
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
                                source={require('../../assets/RegistrationImage.png')}
                                style={{width: "100%", height: "100%"}}
                                resizeMethod='cover'
                            />
                        </View>
                        <View style={{height: 10}}/>
                        <Divider/>
                        <View style={{height: 10}}/>
                        <Text variant="headlineMedium">Ako si uživao u potrošenom vremenu, onda to vreme nije uzalud
                            potrošeno. – Džon Lenon</Text>
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
                                label="Ime"
                                value={data.firstName}
                                onChangeText={text => dataSetter("firstName", text)}
                                mode='outlined'
                            />
                            <TextInput
                                label="Prezime"
                                value={data.lastName}
                                onChangeText={text => dataSetter("lastName", text)}
                                mode='outlined'
                            />
                            <TextInput
                                label="Email"
                                value={data.email}
                                onChangeText={text => dataSetter("email", text)}
                                keyboardType='email'
                                mode='outlined'
                            />
                            <TextInput
                                label="Broj telefona"
                                value={data.phoneNumber}
                                onChangeText={text => dataSetter("phoneNumber", text)}
                                keyboardType='numeric-pad'
                                mode='outlined'
                            />
                        </Card.Content>
                    </Card>
                    <View/>
                    <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                        <Button mode='contained' onPress={registerHandler}>Potvrdi</Button>
                        <Divider />
                        <Text variant="titleMedium" style={{textAlign: 'center'}}>Već imaš nalog?</Text>
                        <Button mode='outlined' onPress={() => navigation.navigate("LoginScreen")}>Uloguj
                            se</Button>
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
                            label="Ime"
                            value={data.firstName}
                            onChangeText={text => dataSetter("firstName", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Prezime"
                            value={data.lastName}
                            onChangeText={text => dataSetter("lastName", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Email"
                            value={data.email}
                            onChangeText={text => dataSetter("email", text)}
                            keyboardType='email'
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Broj telefona"
                            value={data.phoneNumber}
                            onChangeText={text => dataSetter("phoneNumber", text)}
                            keyboardType='numeric-pad'
                            mode='outlined'
                            style={{marginBottom: 10}}
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
                        <TextInput
                            label="Potvrdi lozinku"
                            value={data.confirmPassword}
                            onChangeText={text => dataSetter("confirmPassword", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                            secureTextEntry={!confirmVisible}
                            right={<TextInput.Icon icon={confirmVisible ? "eye-off" : "eye"} onPress={() => {setConfirmVisible(!confirmVisible)}} />}
                        />
                    </Card.Content>
                </Card>
                <View/>
                <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                    <Button mode='contained' onPress={registerHandler}>Potvrdi</Button>
                    <Divider />
                    <Text variant="titleMedium" style={{textAlign: 'center'}}>Već imaš nalog?</Text>
                    <Button mode='outlined' onPress={() => navigation.navigate("LoginScreen")}>Ulogujte
                        se</Button>
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

export default RegistrationScreen;