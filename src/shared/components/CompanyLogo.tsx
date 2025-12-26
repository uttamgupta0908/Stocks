import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

interface CompanyLogoProps {
    symbol: string;
    size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-12 h-12',
    large: 'w-20 h-20',
};

const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl',
};

const iconSizeRaw = {
    small: 40,
    medium: 48,
    large: 80,
};

// Generate consistent color based on symbol
const getColorForSymbol = (symbol: string): string => {
    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-orange-500',
        'bg-red-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
    ];

    const charCode = symbol.charCodeAt(0);
    return colors[charCode % colors.length];
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
    symbol,
    size = 'medium'
}) => {
    const [hasError, setHasError] = useState(false);
    const initial = symbol.charAt(0).toUpperCase();
    const bgColor = getColorForSymbol(symbol);

    // Using Financial Modeling Prep's public logo CDN
    const logoUrl = `https://financialmodelingprep.com/image-stock/${symbol}.png`;

    return (
        <View className={`${sizeClasses[size]} rounded-2xl items-center justify-center overflow-hidden bg-white dark:bg-slate-700`}>
            {!hasError ? (
                <Image
                    source={{ uri: logoUrl }}
                    style={{ width: iconSizeRaw[size], height: iconSizeRaw[size] }}
                    resizeMode="contain"
                    onError={() => setHasError(true)}
                />
            ) : (
                <View className={`w-full h-full ${bgColor} items-center justify-center`}>
                    <Text className={`${textSizeClasses[size]} font-bold text-white`}>
                        {initial}
                    </Text>
                </View>
            )}
        </View>
    );
};
