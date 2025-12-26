import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    borderRadius = 4,
    className = '',
}) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            animatedValue.setValue(0);
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => startAnimation());
        };

        startAnimation();
    }, [animatedValue]);

    const skeletonWidth = typeof width === 'number' ? width : 400; // Fallback for '100%' or other strings
    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-skeletonWidth, skeletonWidth],
    });

    const backgroundColor = isDark ? '#1E293B' : '#E2E8F0';
    const highlightColor = isDark ? '#334155' : '#F1F5F9';

    return (
        <View
            style={[
                {
                    width: width as any,
                    height: height as any,
                    borderRadius,
                    backgroundColor,
                    overflow: 'hidden',
                },
            ]}
            className={className}
        >
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <LinearGradient
                    colors={[backgroundColor, highlightColor, backgroundColor]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                />
            </Animated.View>
        </View>
    );
};
