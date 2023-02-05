import ScreenBackground from "../../components/ScreenBackground";
import {Avatar, Button, Card, Divider, Snackbar, Text, TextInput} from "react-native-paper";
import {useContext, useState} from "react";
import {Dimensions, Image, View} from "react-native";
import {loginUser, registerUser} from "../../fetch/auth";
import {isBig} from "../../hooks/isBig";
import {s} from "../../styles/mainStyles";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../../App";

const LoginScreen = () => {
    const authContext = useContext(AuthContext);
    const navigation = useNavigation();
    const [data, setData] = useState({
        "email": "",
        "password": "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [snackbarObj, setSnackbarObj] = useState({visible: false, message: ""});

    const dataSetter = (field, value) => {
        setData(prevState => {
            return {...prevState, [field]: value};
        });
    }

    const loginHandler = async () => {
        await loginUser(data).then(async r => {
            const status = await r.status;
            console.log("CCC", status, data);
            if (status === 200){
                const res = await r.json();
                if (res.access_token) {
                    await AsyncStorage.setItem('user', JSON.stringify(res?.user));
                    await AsyncStorage.setItem('userId', JSON.stringify(res?.user?.id));
                    await AsyncStorage.setItem('token', res?.access_token);
                    await authContext.signIn();
                }
            } else {
                if (status === 401){
                    const res = await r.json();
                    setSnackbarObj({visible: true, message: res.message})
                } else {
                    setSnackbarObj({visible: true, message: "Login neuspešan."})
                }
            }
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
                        visible={snackbarObj.visible}
                        onDismiss={()=> {
                            setSnackbarObj({visible: false, message: ""})
                        }}
                        action={{
                            label: 'U redu',
                            onPress: () => {
                                setSnackbarObj({visible: false, message: ""})
                            },
                        }}>
                        {snackbarObj?.message}
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
                    visible={snackbarObj.visible}
                    onDismiss={()=> {
                        setSnackbarObj({visible: false, message: ""})
                    }}
                    action={{
                        label: 'U redu',
                        onPress: () => {
                            setSnackbarObj({visible: false, message: ""})
                        },
                    }}>
                    {snackbarObj?.message}
                </Snackbar>
            </View>
        </ScreenBackground>
    )
}

export default LoginScreen;