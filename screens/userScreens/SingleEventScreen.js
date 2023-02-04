import {Image, View} from "react-native";
import {s} from "../../styles/mainStyles";
import {ActivityIndicator, Avatar, Button, Card, Divider, Text} from "react-native-paper";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import ScreenBackground from "../../components/ScreenBackground";
import {isBig} from "../../hooks/isBig";
import moment from "moment/moment";
import {getProfilePic} from "../../hooks/getProfilePic";
import {environment} from "../../enviroments/enviroment";
import {useEffect, useState} from "react";
import {getEventById} from "../../fetch/events";

const {serverUrl} = environment;

const SingleEventScreen = (props) => {
    const navigation = useNavigation();
    const eventId = props?.route?.params?.eventId;
    const isFocused = useIsFocused();
    const [eventObj, setEventObj] = useState({});
    const [loaded, setLoaded] = useState(false);

    const loadEvent = async () => {
        await getEventById(eventId).then(async r => {
            const status = r.status;
            if (status !== 200){
                navigation.goBack();
            } else {
                const event = await r.json();
                console.log("EVENT", event);
                setEventObj(event);
                setLoaded(true);
            }
        })
    }

    useEffect(() => {
        if (eventId && isFocused){
            loadEvent();
        } else {
            setLoaded(false);
        }
    }, [eventId]);

    if (isBig()){
        return (
            <ScreenBackground style={s.twoColumnsContainer}>
                {
                    loaded ?
                        <>
                            <View style={{width: '50%'}}>
                                <Card style={{justifyContent: 'center', alignItems: 'center', padding: 20, flex: 1, marginBottom: 20}}>
                                    <Card.Title title={`${eventObj?.user?.firstName} ${eventObj?.user?.lastName}`} subtitle={moment(eventObj?.event?.startDate).format("DD.MM.YYYY.")}
                                                left={(props) => <Avatar.Image source={getProfilePic(eventObj?.user)} {...props}/>}/>
                                    <Card.Cover source={{uri: `${serverUrl}${eventObj?.image?.imagePath}`}}/>
                                    <Card.Content>
                                        <Text variant="titleLarge">{eventObj?.event?.eventName}</Text>
                                        <Text variant="bodyMedium" numberOfLines={2}>{eventObj?.event?.content}</Text>
                                    </Card.Content>
                                    <Card.Actions>
                                        <Button>Prijavi me</Button>
                                    </Card.Actions>
                                </Card>
                            </View>
                            <View style={{flex: 1, width: '50%', justifyContent: 'space-between', paddingHorizontal: 10}}>
                            </View>
                        </>
                        :
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size='large' />
                        </View>
                }
            </ScreenBackground>
        )
    }

    return (
        <ScreenBackground>
            {
                loaded ?
                    <Card style={{margin: 6}}>
                        <Card.Title title={`${eventObj?.user?.firstName} ${eventObj?.user?.lastName}`} subtitle={moment(eventObj?.event?.startDate).format("DD.MM.YYYY.")}
                                    left={(props) => <Avatar.Image source={getProfilePic(eventObj?.user)} {...props}/>}/>
                        <Card.Cover source={{uri: `${serverUrl}${eventObj?.image?.imagePath}`}}/>
                        <Card.Content>
                            <Text variant="titleLarge">{eventObj?.event?.eventName}</Text>
                            <Text variant="bodyMedium" numberOfLines={2}>{eventObj?.event?.content}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button>Pogledaj</Button>
                        </Card.Actions>
                    </Card>
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size='large' />
                    </View>
            }
        </ScreenBackground>
    )
}

export default SingleEventScreen;