import { useState, useRef, useEffect, useCallback } from 'react';
import { ActivityIndicator as Spinner, Animated } from 'react-native';
import { Container, Logo, TitleLogo, ColorRed } from './styles.js';

import imgMovies from '../../assets/logo/video-player.png';

const SplashScreen = ({fontsLoaded}) => {
    
    const positionAnim = useRef(new Animated.Value(0)).current;
    const [loadingComponent, setLoadingComponent] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(positionAnim, {
                toValue: -40,
                duration: 400,
                useNativeDriver: true,
                isInteraction: false
            }).start();
            
            setTimeout(() => setLoadingComponent(true), 300);
        }, 700)
    }, [])

    if (!fontsLoaded)
        return

    return (
        <Container>
            <Animated.View
                style={{
                    alignItems: 'center',
                    position: 'relative',
                    translateY: positionAnim,              
                    top: 35
                }}
            >
                <Logo source={imgMovies} />
                <TitleLogo>
                    Chat<ColorRed>M</ColorRed>ovie
                </TitleLogo>
            </Animated.View>
            
            <Spinner
                size="large"
                color="red"
                style={{
                    top: 100
                }}
                animating={loadingComponent}
            />
        </Container>
    )
};

export default SplashScreen