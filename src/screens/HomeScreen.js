import React, {useState } from 'react';
import { ScrollView} from 'react-native';
import Screen from '../components/Screen'
import Categories from '../components/Categories'
import SearchBar from '../components/SearchBar'
import RestaurantItem from '../components/RestaurantItem'
import tailwind from 'tailwind-react-native-classnames';


const HomeScreen = () => {
    const [restaurantData,] = useState([])
    const [city, setCity] = useState("Paris")

    return (
        <Screen style={tailwind`bg-white flex-1`}>
            <SearchBar setCity={setCity} city={city} />
            <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={false}>
                <Categories />               
            <RestaurantItem restaurantData={restaurantData} />
            </ScrollView>
        </Screen>
    );
}

export default HomeScreen;