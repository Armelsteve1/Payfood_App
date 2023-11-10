import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-react-native-classnames';
import { selectTotalPrice } from '../redux/slices/basketSlice';
import { useNavigation } from '@react-navigation/core';
import { Input } from 'react-native-elements';

const RealodModal = ({ setModalVisible }) => {
    const totalPrice = useSelector(selectTotalPrice)
    const navigation = useNavigation()
    const [rechargeAmount, setRechargeAmount] = useState('');

    const addOrder = () => {
        setModalVisible(false)
        navigation.navigate("CheckoutScreen");
    }

    const updateTotalPrice = (amount) => {
        const newTotalPrice = totalPrice + parseFloat(amount);
        return newTotalPrice 
    }

    return (
        <View style={tailwind`flex-1 bg-black bg-opacity-40`}>
            <TouchableOpacity style={tailwind`flex-grow`} onPress={() => setModalVisible(false)}></TouchableOpacity>
            <View style={tailwind`pb-5  w-full px-4 bg-white pt-4`}>
                <Text style={tailwind`text-black text-center text-xl font-bold mb-5`}>Checkout details</Text>
                <View style={tailwind`mb-5`}>
                    <Input
                        label="Total Prix"
                        value={updateTotalPrice(rechargeAmount)}
                        onChangeText={(text) => setRechargeAmount(text)} 
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={[tailwind`py-3 px-10 self-center rounded-full`, { backgroundColor: "#FF3C6E" }]
                    }
                    onPress={addOrder}
                >
                    <Text style={tailwind`text-white`}>Payer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default RealodModal;

const OrderItem = ({ name, value, total }) => (
    <View style={tailwind`flex-row justify-between py-3 border-gray-200 items-center ${total ? 'border-t' : 'border-b'}`}>
        <Text style={tailwind`text-black font-bold text-black ${total && 'text-lg'}`} numberOfLines={1}>{name}</Text>
        <Text style={tailwind`text-black text-xs ${total && 'font-bold'}`}>{value}</Text>
    </View>
)
