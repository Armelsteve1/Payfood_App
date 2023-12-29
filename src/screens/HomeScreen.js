import React, { useEffect, useState } from 'react';
import { ScrollView, Alert, ActivityIndicator } from 'react-native';
import HeaderTabs from '../components/HeaderTabs';
import Screen from '../components/Screen'
import Categories from '../components/Categories'
import SearchBar from '../components/SearchBar'
import RestaurantItem from '../components/RestaurantItem'
import tailwind from 'tailwind-react-native-classnames';
import colors from '../configs/colors'

const YELP_API_KEY = "";

const HomeScreen = () => {
    const [restaurantData, setRestaurantData] = useState([])
    const [city, setCity] = useState("Paris")
    const [activeTab, setActiveTab] = useState("Delivery");
    const [loading, setLoading] = useState(false)

    const getRestaurantsFromYelp = () => {
        setLoading(true);
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

        const apiOptions = {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`,
            },
        };

        fetch(yelpUrl, apiOptions)
            .then(response => response.json())
            .then(data => {
                setRestaurantData(data.businesses);
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
        <Screen style={tailwind`bg-white flex-1`}>
            <SearchBar setCity={setCity} city={city} />
            <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={false}>
                <Categories />
                {loading && <ActivityIndicator size="large" color={colors.primary} style={tailwind`mt-2 mb-6`} />}
                <RestaurantItem restaurantData={restaurantData} />
            </ScrollView>
        </Screen>
    );
}

export default HomeScreen;