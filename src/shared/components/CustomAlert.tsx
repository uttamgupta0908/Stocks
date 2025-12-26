import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { AlertTriangle, AlertCircle } from 'lucide-react-native';

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: 'danger' | 'info';
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
    visible,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    type = 'danger',
}) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-black/60 dark:bg-black/80 justify-center items-center p-6">
                <View className="bg-white dark:bg-slate-800 rounded-3xl p-6 w-full max-w-[340px] shadow-2xl">
                    <View className="items-center mb-4">
                        <View className={`p-4 rounded-full ${type === 'danger' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-primary/10'}`}>
                            {type === 'danger' ? (
                                <AlertTriangle size={32} color="#EF4444" />
                            ) : (
                                <AlertCircle size={32} color="#6366F1" />
                            )}
                        </View>
                    </View>

                    <Text className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
                        {title}
                    </Text>
                    <Text className="text-sm text-center text-gray-500 dark:text-slate-400 mb-8 leading-5">
                        {message}
                    </Text>

                    <View className="space-y-3">
                        <TouchableOpacity
                            onPress={onConfirm}
                            className={`py-4 rounded-2xl items-center ${type === 'danger' ? 'bg-red-500' : 'bg-primary'}`}
                            activeOpacity={0.8}
                        >
                            <Text className="text-white font-bold text-base">{confirmText}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onCancel}
                            className="py-4 rounded-2xl items-center bg-gray-100 dark:bg-slate-700 mt-3"
                            activeOpacity={0.6}
                        >
                            <Text className="text-gray-600 dark:text-slate-300 font-bold text-base">{cancelText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
