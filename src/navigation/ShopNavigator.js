import React from 'react'
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import {Platform} from 'react-native'

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';


import { Fonts } from '../utils/Fonts';

const defaultNavOptions = {
    
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: Fonts.OpenSansBold
        },
        headerBackTitleStyle:{
            fontFamily:Fonts.OpenSansRegular
        },
        headerTintColor: Platform.OS ==='android' ? 'white' : Colors.primary
    }


const ProductsNavigator =createStackNavigator(
    {
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen 
    },
    
{
    navigationOptions:{
        drawerIcon: drawerConfig => (<Ionicons 
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        size={23}
        color={drawerConfig.tintColor}
        />)
    },
    defaultNavigationOptions: defaultNavOptions
})
const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => (<Ionicons 
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
        />)
    },
    defaultNavigationOptions: defaultNavOptions
}
);

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => (
        <Ionicons 
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
        />)
    },
    defaultNavigationOptions: defaultNavOptions
}
);
const ShopNavigator  = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},{
    contentOptions:{
        activeTintColor: Colors.primary
    }
}

)

export default createAppContainer(ShopNavigator)