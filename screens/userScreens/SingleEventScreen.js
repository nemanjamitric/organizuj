import {Image, View} from "react-native";
import {s} from "../../styles/mainStyles";
import {Avatar, Button, Card, Divider, Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import ScreenBackground from "../../components/ScreenBackground";
import {isBig} from "../../hooks/isBig";
import moment from "moment/moment";
import {getProfilePic} from "../../hooks/getProfilePic";
import {environment} from "../../enviroments/enviroment";

const {serverUrl} = environment;

const SingleEventScreen = (props) => {
    const navigation = useNavigation();
    const eventObj = props?.route?.params?.event;

    if (isBig()){
        return (
            <ScreenBackground style={s.twoColumnsContainer}>
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
            </ScreenBackground>
        )
    }

    return (
        <ScreenBackground>
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
        </ScreenBackground>
    )
}

export default SingleEventScreen;