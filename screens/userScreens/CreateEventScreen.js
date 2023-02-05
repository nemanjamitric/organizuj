import ScreenBackground from "../../components/ScreenBackground";
import {ScrollView, View} from "react-native";
import {Avatar, Button, Card, Dialog, Portal, RadioButton, Snackbar, Switch, Text, TextInput} from "react-native-paper";
import {useContext, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {DatePickerInput, TimePickerModal} from "react-native-paper-dates";
import {UserContext} from "../../contexts/UserContext";
import {createEvent} from "../../fetch/events";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";
import {createEventImage} from "../../fetch/image";
import {getAllCities} from "../../fetch/cities";
import {getAllCategories} from "../../fetch/categories";

const CreateEventScreen = (props) => {
    const navigation = useNavigation();
    const {user} = useContext(UserContext);
    const [image, setImage] = useState();
    const [data, setData] = useState({
        "name": "",
        "description": "",
        "content": "",
        "location": "",
        "startDate": new Date(),
        "endDate": new Date(),
        "categoryId": null,
        "cityId": null,
        "isCommentable": true,
        "userId": user.id,
    });
    const [startTimeObj, setStartTimeObj] = useState({
        hours: 10,
        minutes: 0,
        visible: false
    })
    const [endTimeObj, setEndTimeObj] = useState({
        hours: 12,
        minutes: 0,
        visible: false
    })
    const [snackbarObj, setSnackbarObj] = useState({visible: false, message: ""});
    const [cityPickerVisible, setCityPickerVisible] = useState(false);
    const [cities, setCities] = useState([]);
    const [categoryPickerVisible, setCategoryPickerVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    const loadData = async () => {
        await getAllCities().then(async r => {
            const res = await r.json();
            setCities(res);
        })
        await getAllCategories().then(async r => {
            const res = await r.json();
            setCategories(res);
        })
    }

    useEffect(() => {
        loadData();
    }, [])

    const dataSetter = (field, value) => {
        setData(prevState => {
            return {...prevState, [field]: value};
        });
    }

    const createHandler = async () => {
        const dataToSend = {
            "name": data.name,
            "description": data.description,
            "content": data.content,
            "location": data.location,
            "startDate": moment(data.startDate).format("YYYY-MM-DD") + " "
                + startTimeObj.hours + ":" + (startTimeObj.minutes < 10 ? "0" : "") + startTimeObj.minutes + ":00",
            "endDate": moment(data.endDate).format("YYYY-MM-DD") + " "
                + endTimeObj.hours + ":" + (endTimeObj.minutes < 10 ? "0" : "") + endTimeObj.minutes + ":00",
            "categoryId": data.categoryId,
            "cityId": data.cityId,
            "isCommentable": data.isCommentable,
            "userId": user.id,
        }
        await createEvent(dataToSend).then(async r => {
            const res = await r.json();
            console.log("EVENT", res);
            if (image) {
                await createEventImage(image, res?.id).then(async r2 => {
                    const res2 = await r2.text();
                    console.log("RES2", res2);
                })
            }
        })
    }

    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    }

    return (
        <ScreenBackground single>
            <ScrollView
                contentContainerStyle={{justifyContent: 'space-between'}}
                style={{flex: 1, width: '100%'}}
            >
                <Card>
                    <Card.Title
                        title='Podaci o događaju'
                        left={(props) => <Avatar.Icon {...props} icon="calendar"/>}
                    />
                    <Card.Content>
                        {
                            image ?
                                <TouchableRippleNative onPress={handleImagePicker} style={{marginBottom: 10}}>
                                    <Card.Cover source={{uri: image.uri}}/>
                                </TouchableRippleNative>
                                :
                                <Button mode='contained-tonal' onPress={handleImagePicker} style={{marginBottom: 10}}>
                                    <Avatar.Icon icon='plus'/>
                                </Button>
                        }
                        <TextInput
                            label="Naziv"
                            value={data.name}
                            onChangeText={text => dataSetter("name", text)}
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
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text mode='bodyMedium'>Kategorija</Text>
                            <Button mode='contained-tonal' onPress={() => {
                                setCategoryPickerVisible(true)
                            }}>
                                {
                                    data?.categoryId ?
                                        categories.find(x => x.id === data.categoryId).name
                                        :
                                        <Avatar.Icon icon='plus' size={20}/>
                                }
                            </Button>
                        </View>
                        <Portal>
                            <Dialog visible={categoryPickerVisible} onDismiss={() => {
                                setCategoryPickerVisible(false)
                            }}>
                                <Dialog.Title>Izaberite kategoriju</Dialog.Title>
                                <Dialog.ScrollArea>
                                    <ScrollView>
                                        <RadioButton.Group onValueChange={newValue => dataSetter("categoryId", newValue)}
                                                           value={data.categoryId}>
                                            {
                                                categories && categories.map(category => {
                                                    return (
                                                        <RadioButton.Item key={category.id} label={category.name} value={category.id}/>
                                                    )
                                                })
                                            }
                                        </RadioButton.Group>
                                    </ScrollView>
                                </Dialog.ScrollArea>
                                <Dialog.Actions>
                                    <Button onPress={() => {
                                        setCategoryPickerVisible(false)
                                    }}>Done</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text mode='bodyMedium'>Grad</Text>
                            <Button mode='contained-tonal' onPress={() => {
                                setCityPickerVisible(true)
                            }}>
                                {
                                    data?.cityId ?
                                        cities.find(x => x.id === data.cityId).name
                                        :
                                        <Avatar.Icon icon='plus' size={20}/>
                                }
                            </Button>
                        </View>
                        <Portal>
                            <Dialog visible={cityPickerVisible} onDismiss={() => {
                                setCityPickerVisible(false)
                            }}>
                                <Dialog.Title>Izaberite grad</Dialog.Title>
                                <Dialog.ScrollArea>
                                    <ScrollView>
                                        <RadioButton.Group onValueChange={newValue => dataSetter("cityId", newValue)}
                                                           value={data.cityId}>
                                            {
                                                cities && cities.map(city => {
                                                    return (
                                                        <RadioButton.Item key={city.id} label={city.name} value={city.id}/>
                                                    )
                                                })
                                            }
                                        </RadioButton.Group>
                                    </ScrollView>
                                </Dialog.ScrollArea>
                                <Dialog.Actions>
                                    <Button onPress={() => {
                                        setCityPickerVisible(false)
                                    }}>Done</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                        <TextInput
                            label="Adresa"
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
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text mode='bodyMedium'>Vreme početka</Text>
                            <Button
                                mode='contained-tonal'
                                onPress={() => setStartTimeObj(prevState => {
                                    return {...prevState, visible: true}
                                })}>
                                {startTimeObj.hours < 10 && "0"}{startTimeObj.hours}:{startTimeObj.minutes < 10 && "0"}{startTimeObj.minutes}
                            </Button>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text mode='bodyMedium'>Vreme kraja</Text>
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
                            onConfirm={({hours, minutes}) => setEndTimeObj(prevState => {
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
                            onConfirm={({hours, minutes}) => setStartTimeObj(prevState => {
                                return {hours: hours, minutes: minutes, visible: false}
                            })}
                            hours={startTimeObj.hours}
                            minutes={startTimeObj.minutes}
                        />
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text mode='bodyMedium'>Dozvoli komentare</Text>
                            <Switch value={data.isCommentable} onValueChange={(value) => dataSetter("isCommentable", value)} />
                        </View>
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
            </ScrollView>
        </ScreenBackground>
    )
}

export default CreateEventScreen