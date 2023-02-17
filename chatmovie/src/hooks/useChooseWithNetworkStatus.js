import { useNetInfo } from "@react-native-community/netinfo";

export const useChooseWithNetworkStatus = (ValueConnected, ValueNotConnected) => {
    const values = {
        true: ValueConnected,
        false: ValueNotConnected
    };

    const netInfo = useNetInfo();

    if(!netInfo)
        return null;

    return values[netInfo?.isConnected?.toString()];
}