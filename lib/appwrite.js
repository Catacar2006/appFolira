import { Platform } from "react-native";
import { Client } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    Platform: 'com.jms.folira',
    projectId: '66e25653001d566e0145',
    databaseId: '66e25eb50023cfc7174d',
    userCollecctionId: '66e26037003143287637',
    rolCollectionId: '66e261b6000dc19f41c5',
    storagedId: '66e26bd3001b98f9c196',
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject('455x34dfkj') // Your project ID
    .setPlatform('com.example.myappwriteapp') // Your application ID or bundle ID.
;