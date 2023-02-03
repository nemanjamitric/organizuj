import ScreenBackground from "../../components/ScreenBackground";
import {Avatar, Button, Card, Divider, Snackbar, Text, TextInput} from "react-native-paper";
import {useContext, useState} from "react";
import {Dimensions, Image, View} from "react-native";
import {registerUser} from "../../fetch/auth";
import {isBig} from "../../hooks/isBig";
import {s} from "../../styles/mainStyles";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../App";
import {UserContext} from "../../contexts/UserContext";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const authContext = useContext(AuthContext);
    const {user} = useContext(UserContext);
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
                                value={user.firstName}
                                onChangeText={text => dataSetter("firstName", text)}
                                mode='outlined'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                label="Prezime"
                                value={user.lastName}
                                onChangeText={text => dataSetter("lastName", text)}
                                mode='outlined'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                label="Email"
                                value={user.email}
                                onChangeText={text => dataSetter("email", text)}
                                keyboardType='email'
                                mode='outlined'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                label="Broj telefona"
                                value={user.phoneNumber}
                                onChangeText={text => dataSetter("phoneNumber", text)}
                                keyboardType='numeric-pad'
                                mode='outlined'
                                style={{marginBottom: 10}}
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
                            value={user.firstName}
                            onChangeText={text => dataSetter("firstName", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Prezime"
                            value={user.lastName}
                            onChangeText={text => dataSetter("lastName", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Email"
                            value={user.email}
                            onChangeText={text => dataSetter("email", text)}
                            keyboardType='email'
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Broj telefona"
                            value={user.phoneNumber}
                            onChangeText={text => dataSetter("phoneNumber", text)}
                            keyboardType='numeric-pad'
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                    </Card.Content>
                </Card>
                <View/>
                <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                    <Button mode='contained' onPress={() => {
                        authContext.signOut();
                    }}>Odjavi se</Button>
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

export default ProfileScreen;