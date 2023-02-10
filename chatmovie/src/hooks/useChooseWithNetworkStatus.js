import { useNetInfo } from "@react-native-community/netinfo";

export const useChooseWithNetworkStatus = (ValueConnected, ValueNotConnected, ValueLoading) => {
    const values = {
        true: ValueConnected,
        false: ValueNotConnected,
        loading: ValueLoading
    };

    const netInfo = useNetInfo();

    return values[netInfo?.isConnected?.toString() || 'loading'];
}