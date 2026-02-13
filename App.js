import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import ProfileScreen from './src/screens/Profile';
import Cart from './src/screens/Cart';
import CallScreen from './src/screens/Call';
import NotificationScreen from './src/screens/Notification';
import MessageScreen from './src/screens/Message';
import { CartProvider } from './src/context/CartContext';
import LanguageSelectionScreen from './src/screens/LanguageSelection';
import ForumScreen from './src/screens/Forum';
import PurchaseHistoryScreen from './src/screens/PurchaseHistoryScreen';
import RoleSelectionScreen from './src/screens/RoleSelection';
import FarmerHomeScreen from './src/screens/farmers/HomeScreen';
import LearnExploreScreen from './src/screens/farmers/LearnExploreScreen';
import MarketPlace from './src/screens/farmers/MarketPlace';
import SalesHistoryScreen from './src/screens/farmers/SalesHistoryScreen';
import CategoryScreen from './src/screens/farmers/CategoryScreen';
import SubCategoryScreen from './src/screens/farmers/SubCategoryScreen';
import SchemeScreen from './src/screens/farmers/SchemeScreen';
import StateScreen from './src/screens/farmers/StateScreen';
import FProductDetailScreen from './src/screens/farmers/FProductDetailScreen';
import ProductUpdateScreen from './src/screens/farmers/ProductUpdateScreen';
import FForumScreen from './src/screens/farmers/FForumScreen';
import FProfileScreen from './src/screens/farmers/FProfileScreen';
import i18n from './src/i18n';
import { StateProvider } from './src/context/StateContext';
import { LanguageProvider } from './src/context/LanguageContext';
import FNotificationScreen from './src/screens/farmers/FNotificationScreen';
import FMessageScreen from './src/screens/farmers/FMessage';
import Login from './src/Login';
import Registration from './src/Registration';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CartProvider>
        <StateProvider>
          <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LanguageSelection">
            <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="FarmerHome" component={FarmerHomeScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Call" component={CallScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="Forum" component={ForumScreen} />
            <Stack.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} />
            <Stack.Screen name="LearnExploreScreen" component={LearnExploreScreen} />
            <Stack.Screen name="MarketPlace" component={MarketPlace} />
            <Stack.Screen name="SalesHistory" component={SalesHistoryScreen} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
            <Stack.Screen name="SchemeScreen" component={SchemeScreen} />
            <Stack.Screen name="StateScreen" component={StateScreen} />
            <Stack.Screen name="FProductDetailScreen" component={FProductDetailScreen} />
            <Stack.Screen name="ProductUpdate" component={ProductUpdateScreen} />
            <Stack.Screen name="FForumScreen" component={FForumScreen}/>
            <Stack.Screen name="FProfileScreen" component={FProfileScreen}/>
            <Stack.Screen name="FNotificationScreen" component={FNotificationScreen}/>
            <Stack.Screen name="FMessage" component={FMessageScreen}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Registration" component={Registration}/>
          </Stack.Navigator>
        </NavigationContainer>
        </LanguageProvider>
        </StateProvider>
      </CartProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
