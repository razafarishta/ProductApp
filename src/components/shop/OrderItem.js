import React, {useState } from 'react'
import { Text, View, StyleSheet, Button} from 'react-native'
import CartItems from '../../components/shop/CartItems'
//import Order from "../../models/order";
import Card from '../UI/Card'

import Colors from '../../constants/Colors';
import { Fonts } from '../../utils/Fonts';
const OrderItem = props =>{
    const [showDetails, setShowDetails] = useState(false)
    return(
        <Card style = {styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title = {showDetails ? 'Hide Details': 'show details'}  onPress={() =>{
                setShowDetails(prevState => !prevState) //agr true hoga to false retutn hoga or agr false hoga to true return hoga use state me
            }}/>
            {/* agr showDwtail true hoga to <View> return hoga*/}
        {showDetails &&( 
            <View style={styles.detailItems}>
            {props.items.map(cartItem => 
            <CartItems 
            quantity={cartItem.quantity} 
            amount={cartItem.sum} 
            title={cartItem.productTitle} />)}

        </View> )}
             
        </Card>
    )
}
const styles= StyleSheet.create({
    orderItem:{
        margin:20,
        padding:10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: Fonts.OpenSansBold, 
        fontSize: 16
    },
    date:{
        fontFamily: Fonts.OpenSansRegular,
        fontSize: 16,
        color: '#888'
    },
    detailItems:{
        width:'100%'
    } 
})
export default OrderItem