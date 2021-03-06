import Constants from 'expo-constants';
import { Platform } from 'react-native';

export type Host = 'aoe2companion' | 'aoe2net';

export function getHost(host: Host) {
    switch (host) {
        case "aoe2companion": {
            if (__DEV__ && !Constants.isDevice) {
                const platformHost = Platform.select({ios: 'localhost', android: '10.0.2.2'});
                return `http://${platformHost}:3000/dev/`;
            }
            return `https://function.aoe2companion.com/`;
        }
        case "aoe2net": {
            if (Platform.OS === 'web') {
                return 'https://powerful-gorge-32054.herokuapp.com/http://aoe2.net/';
            }
            return `http://aoe2.net/`;
        }
    }
}
