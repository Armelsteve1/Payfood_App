import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { HeaderTabs, SearchBar, Categories, RestaurantItem } from '../../src/components';
import { Screen } from '../styles';

const HomeScreen = () => {
    const [restaurantData, setRestaurantData] = useState([]);
    const [city, setCity] = useState("Paris");
    const [activeTab, setActiveTab] = useState("Delivery");
    const [loading, setLoading] = useState(false);

    const getRestaurantsFromYelp = () => {
        setLoading(true);
        fetch('https://arf3k5x9o1.execute-api.eu-north-1.amazonaws.com/items')
            .then(response => response.json())
            .then(data => {
                setRestaurantData(data.restaurantItems);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getRestaurantsFromYelp();
    }, []);

    return (
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchBar cityHandler={setCity} />
                <Categories />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <RestaurantItem restaurantData={restaurantData} />
                )}
            </ScrollView>
        </Screen>
    );
};

export default HomeScreen;