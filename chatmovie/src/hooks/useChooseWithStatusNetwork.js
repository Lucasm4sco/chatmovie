import { useNetInfo } from "@react-native-community/netinfo";

export const useChooseWithStatusNetwork = (ValueConnected, ValueNotConnected, ValueLoading, isComponents = false) => {
    const values = isComponents ? ({
        true: <ValueConnected />,
        false: <ValueNotConnected />,
        loading: <ValueLoading />
    }) : ({
        true: ValueConnected,
        false: ValueNotConnected,
        loading: ValueLoading
    });

    const netInfo = useNetInfo();

    return values[netInfo?.isConnected?.toString() || 'loading'];
}