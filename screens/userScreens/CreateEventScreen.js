import ScreenBackground from "../../components/ScreenBackground";
import {View} from "react-native";
import {Avatar, Button, Card, Snackbar, Text, TextInput} from "react-native-paper";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {DatePickerInput, TimePickerModal} from "react-native-paper-dates";

const CreateEventScreen = (props) => {
    const navigation = useNavigation();
    const [data, setData] = useState({
        "eventName": "",
        "description": "",
        "content": "",
        "location": "",
        "startDate": new Date(),
        "endDate": new Date(),
        "categoryId": null,
        "cityId": null,
        "isCommentable": 1,
    });
    const [startTimeObj, setStartTimeObj] = useState({
        hours: 10,
        minutes: 0,
        visible: false
    })
    const [endTimeObj, setEndTimeObj] = useState({
        hours: 10,
        minutes: 0,
        visible: false
    })
    const [snackbarObj, setSnackbarObj] = useState({visible: false, message: ""});

    const dataSetter = (field, value) => {
        setData(prevState => {
            return {...prevState, [field]: value};
        });
    }

    const createHandler = async () => {

    }

    return (
        <ScreenBackground single>
            <View style={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 10}}>
                <Card>
                    <Card.Title
                        title='Podaci o događaju'
                        left={(props) => <Avatar.Icon {...props} icon="calendar"/>}
                    />
                    <Card.Content>
                        <TextInput
                            label="Naziv"
                            value={data.eventName}
                            onChangeText={text => dataSetter("eventName", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Opis"
                            value={data.description}
                            onChangeText={text => dataSetter("description", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Sadržaj"
                            value={data.email}
                            onChangeText={text => dataSetter("content", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Lokacija"
                            value={data.location}
                            onChangeText={text => dataSetter("location", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <DatePickerInput
                            locale="sr"
                            label="Datum Početka"
                            value={data.startDate}
                            onChange={(d) => dataSetter("startDate", d)}
                            inputMode="start"
                            style={{marginBottom: 10}}
                        />
                        <DatePickerInput
                            locale="sr"
                            label="Datum Kraja"
                            value={data.endDate}
                            onChange={(d) => dataSetter("endDate", d)}
                            inputMode="start"
                            style={{marginBottom: 10}}
                        />
                        <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text mode=''>Vreme početka</Text>
                            <Button
                                mode='contained-tonal'
                                onPress={() => setStartTimeObj(prevState => {
                                    return {...prevState, visible: true}
                                })}>
                                {startTimeObj.hours < 10 && "0"}{startTimeObj.hours}:{startTimeObj.minutes < 10 && "0"}{startTimeObj.minutes}
                            </Button>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text mode=''>Vreme kraja</Text>
                            <Button
                                mode='contained-tonal'
                                onPress={() => setEndTimeObj(prevState => {
                                    return {...prevState, visible: true}
                                })}>
                                {endTimeObj.hours < 10 && "0"}{endTimeObj.hours}:{endTimeObj.minutes < 10 && "0"}{endTimeObj.minutes}
                            </Button>
                        </View>
                        <TimePickerModal
                            visible={endTimeObj.visible}
                            onDismiss={() => setEndTimeObj(prevState => {
                                return {...prevState, visible: false}
                            })}
                            onConfirm={({ hours, minutes }) => setEndTimeObj(prevState => {
                                return {hours: hours, minutes: minutes, visible: false}
                            })}
                            hours={endTimeObj.hours}
                            minutes={endTimeObj.minutes}
                        />
                        <TimePickerModal
                            visible={startTimeObj.visible}
                            onDismiss={() => setStartTimeObj(prevState => {
                                return {...prevState, visible: false}
                            })}
                            onConfirm={({ hours, minutes }) => setStartTimeObj(prevState => {
                                return {hours: hours, minutes: minutes, visible: false}
                            })}
                            hours={startTimeObj.hours}
                            minutes={startTimeObj.minutes}
                        />
                    </Card.Content>
                </Card>
                <View/>
                <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                    <Button mode='contained' onPress={createHandler}>Potvrdi</Button>
                </View>
                <Snackbar
                    visible={snackbarObj.visible}
                    onDismiss={() => {
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

export default CreateEventScreen