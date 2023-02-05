import {View} from "react-native";
import {s} from "../../styles/mainStyles";
import {Avatar, Button, Card, Divider, FAB, Portal, Text} from "react-native-paper";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import ScreenBackground from "../../components/ScreenBackground";
import {isBig} from "../../hooks/isBig";
import {useCallback, useContext, useEffect, useState} from "react";
import {getEvents} from "../../fetch/events";
import {FlashList} from "@shopify/flash-list";
import {environment} from "../../enviroments/enviroment";
import {getProfilePic} from "../../hooks/getProfilePic";
import moment from "moment";
import {AuthContext} from "../../App";
import {UserContext} from "../../contexts/UserContext";

const {serverUrl} = environment;

const HomeScreen = (props) => {
    const authContext = useContext(AuthContext);
    const {user} = useContext(UserContext);
    const navigation = useNavigation();
    const [openFAB, setOpenFAB] = useState(false);
    const [events, setEvents] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadEvents()
        }
    }, [isFocused]);

    const loadEvents = useCallback(async () => {
        await getEvents().then(async r => {
            const res = await r.json();
            setEvents(res);
        })
    }, []);

    const renderEvent = ({item}) => {
        return (
            <Card style={{margin: 6}}>
                <Card.Title title={`${item?.user?.firstName} ${item?.user?.lastName}`} subtitle={moment(item?.event?.startDate).format("DD.MM.YYYY.")}
                            left={(props) => <Avatar.Image source={getProfilePic(item?.user)} {...props}/>}/>
                {item?.image?.imagePath && <Card.Cover source={{uri: `${serverUrl}${item?.image?.imagePath}`}}/>}
                <Card.Content style={{paddingTop: 10}}>
                    <Text variant="titleLarge">{item?.event?.eventName}</Text>
                    <Text variant="bodyMedium" numberOfLines={2}>{item?.event?.description}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button mode='elevated' onPress={() => {
                        navigation.navigate("SingleEventScreen", {eventId: item?.event?.id});
                    }}>Pogledaj</Button>
                </Card.Actions>
            </Card>
        )
    }

    if (isBig()) {
        return (
            <ScreenBackground style={s.twoColumnsContainer}>
                <View style={{flex: 1, paddingBottom: 30}}>
                    <Card style={{margin: 6}}>
                        <Card.Content>
                            <Text variant="titleLarge">Dobrodošao {user?.firstName}!</Text>
                        </Card.Content>
                    </Card>
                    <Divider bold style={{marginVertical: 10}} />
                    <Text variant="titleLarge" style={{marginBottom: 5}}>Događaji</Text>
                    <FlashList
                        data={events}
                        renderItem={renderEvent}
                        estimatedItemSize={20}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{flex: 1, width: '50%', justifyContent: 'space-between', paddingHorizontal: 10}}>
                    <Portal.Host>
                        <Portal>
                            <FAB.Group
                                open={openFAB}
                                visible
                                icon={openFAB ? 'close' : 'plus'}
                                actions={[
                                    {
                                        icon: 'plus',
                                        label: 'Kreiraj događaj',
                                        onPress: () => {
                                            navigation.navigate('CreateEventScreen');
                                        }
                                    },
                                    // {
                                    //     icon: 'star',
                                    //     label: 'Star',
                                    //     onPress: () => console.log('Pressed star'),
                                    // },
                                    // {
                                    //     icon: 'email',
                                    //     label: 'Email',
                                    //     onPress: () => console.log('Pressed email'),
                                    // },
                                    // {
                                    //     icon: 'bell',
                                    //     label: 'Remind',
                                    //     onPress: () => console.log('Pressed notifications'),
                                    // },
                                ]}
                                onStateChange={() => {
                                    setOpenFAB(!openFAB)
                                }}
                                onPress={() => {
                                    if (openFAB) {
                                        // do something if the speed dial is open
                                    }
                                }}
                            />
                        </Portal>
                    </Portal.Host>
                </View>
            </ScreenBackground>
        )
    }

    return (
        <Portal.Host>
        <ScreenBackground>
            <View style={{flex: 1, justifyContent: 'space-between', paddingBottom: 30}}>
                <Card style={{margin: 6}}>
                    <Card.Content>
                        <Text variant="titleLarge">Dobrodošao {user?.firstName}!</Text>
                    </Card.Content>
                </Card>
                <Divider bold style={{marginVertical: 10}} />
                <Text variant="titleLarge" style={{marginBottom: 5}}>Događaji</Text>
                <FlashList
                    data={events}
                    renderItem={renderEvent}
                    estimatedItemSize={20}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
                <Portal>
                    <FAB.Group
                        open={openFAB}
                        visible
                        icon={openFAB ? 'close' : 'plus'}
                        actions={[
                            {
                                icon: 'plus',
                                label: 'Kreiraj događaj',
                                onPress: () => {
                                    navigation.navigate('CreateEventScreen');
                                }
                            },
                            // {
                            //     icon: 'star',
                            //     label: 'Star',
                            //     onPress: () => console.log('Pressed star'),
                            // },
                            // {
                            //     icon: 'email',
                            //     label: 'Email',
                            //     onPress: () => console.log('Pressed email'),
                            // },
                            // {
                            //     icon: 'bell',
                            //     label: 'Remind',
                            //     onPress: () => console.log('Pressed notifications'),
                            // },
                        ]}
                        onStateChange={() => {
                            setOpenFAB(!openFAB)
                        }}
                        onPress={() => {
                            if (openFAB) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
        </ScreenBackground>
</Portal.Host>
    )
}

export default HomeScreen