import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { NotificationManagerIOS } from './NotificationManagerIOS';
import KeyStore from '../Store/LocalKeyStore';
import { NotificationManagerAndroid } from './NotificationManagerAndroid';

export async function requestUserPermission() {

    // NotificationManagerAndroid.createChannel();
    // NotificationManagerAndroid.configure();

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        return await getFCMToken()
    }

    else
        return 'false'
}

async function getFCMToken() {

    let fcmToken = await AsyncStorage.getItem("fcmToken")
    console.log('Saved FCM Token:  ', fcmToken)
    if (!fcmToken) {

        try {

            const newFCMToken = await messaging().getToken()

            if (newFCMToken) {

                console.log('New FCM Token:  ', newFCMToken)
                KeyStore.setKey('fcmToken', newFCMToken)
                return newFCMToken

            }

        } catch (error) {

            console.log('Error: ', error)
            Alert.alert('Error: ', JSON.stringify(error))
            return 'false'

        }



    }

    else {
        return fcmToken
    }

}

export function notificationListener(navigation) {

    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    //Old
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );

        navigation.navigate("ChartTesting")
        // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body + ": Opened from Background")
    });


    
// New
    try {

        // const unsubscribe = messaging().onMessage(async remoteMessage => 
        messaging().onMessage(async remoteMessage => 
            {
            JSON.stringify(remoteMessage.data);
            const { messageId } = remoteMessage;
            const data = remoteMessage.notification
            if (Platform.OS === 'android') {
                //  var notificationCount = AsyncStorage.getItem('notification');
                // let a = JSON.parse(notificationCount);
                //   console.log('aaaaaaa->>>>>>>>>>', notificationCount)
                //   if (notificationCount) {
                //     notificationCount = +1;
                //   } else {
                //     notificationCount = 1;
                //   }
                //   AsyncStorage.setItem("notification", JSON.stringify(notificationCount));

                NotificationManagerAndroid.showNotification(data.title, data.body, "SubText", messageId, data);
            }
            else {
                NotificationManagerIOS.showNotification(2, data.title, data.body, data, {})
            }
        });
        // return unsubscribe;
    } catch (error) {
        console.log(error.message);
    }


    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Back');
        const { data, messageId } = remoteMessage;
        const { Title, notificationText, subText } = data;
        if (Platform.OS === 'android') {
          NotificationManagerAndroid.showNotification(Title, notificationText, "subText", messageId);
        }
        else {
          NotificationManagerIOS.showNotification(messageId, Title, notificationText, data, {})
          // PushNotification.getApplicationIconBadgeNumber(badgeNumber => {
          //   PushNotificationIOS.setApplicationIconBadgeNumber(badgeNumber + 1)
          // })
        }
      });


    //OLD

    // messaging().onMessage( async remoteMessage=>{
    //     console.log('Received in Foreground: ', remoteMessage);
    //     Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body)
    // })


    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );

            }
        });

}