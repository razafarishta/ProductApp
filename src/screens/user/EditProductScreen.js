import React, { useEffect, useCallback, useReducer} from 'react'
import { View, StyleSheet, ScrollView, Platform, Alert, KeyboardAvoidingView} from 'react-native'
import {HeaderButtons , Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton';
import {useSelector, useDispatch} from 'react-redux'
import Input from '../../components/UI/Input'
import * as productsActions from '../../../store/actions/products'

const FORM_INPUT_UPDATE='FORM_INPUT_UPDATE';
const formReducer = (state, action) =>{
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value 
        };
        const updatedValidities= {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return{
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
            
        };

    }
    return state
}
const EditProductScreen = props => {
    const prodId=props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
        )
        const dispatch = useDispatch();


      const[formState , dispatchFormState] = useReducer(formReducer, {
            inputValues: {
                title: editedProduct ? editedProduct.title: '',
                imageUrl: editedProduct ? editedProduct.imageUrl: '',
                description: editedProduct ? editedProduct.description: '',
                price:''
            },
            inputValidities: {
                title: editedProduct ? true : false,
                imageUrl: editedProduct ? true : false,
                description: editedProduct ? true : false,
                price: editedProduct ? true : false,
            }, 
            formIsValid: editedProduct ? true : false
        })
    
  const submitHandler= useCallback(()=>{
        if(!formState.formIsValid){
            Alert.alert('Wrong Input', 'Please check the errors in the form', [
                {text:'Okay' }
            ])
            
            return;
        }
        if(editedProduct) {
            dispatch(productsActions.updateProduct(
                prodId, 
                formState.title, 
                formState.description, 
                formState.imageUrl))
        }
        else{
            dispatch(productsActions.createProduct(
                formState.title, 
                formState.description, 
                formState.imageUrl, 
                +formState.price))
        }
        props.navigation.goBack(); 

    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    },[submitHandler]
    )

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity)=>{
      
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    return(
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView>
            <View style= {styles.form}>
           <Input
           id="title"
           label="title"
           errorText='please enter a valid title!'
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange = {inputChangeHandler}
            initialValue= {editedProduct ? editedProduct.title: ''}
            initiallyValid = {!!editedProduct}
            required
           />
           
           <Input
           id="imageUrl"
           label="Image Url"
           errorText='please enter a valid Image url!'
            keyboardType="default"
            returnKeyType="next"
            onInputChange = {inputChangeHandler}
            initialValue= {editedProduct ? editedProduct.imageUrl: ''}
            initiallyValid = {!!editedProduct}
            required
           />

         {editedProduct ? null : (
             <Input
             id="price"
             label="Price"
             errorText='please enter a valid Price!'
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange = {inputChangeHandler}
              required
              min={0.1}
             />
         )}
            <Input
            id="description"
           label="Description"
           errorText='please enter a valid Description!'
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange = {inputChangeHandler}
            initialValue= {editedProduct ? editedProduct.description: ''}
            initiallyValid = {!!editedProduct}
            required
            minLength={5}
           />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>     
    )
};

EditProductScreen.navigationOptions= navData => {
    const submitFn = navData.navigation.getParam('submit');
    return{
        headerTitle: navData.navigation.getParam('productId') ? 'EditProduct' : 'Add Product',
        headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Save' 
        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
        onPress= {submitFn}
        />
    </HeaderButtons>
    };
}
const styles = StyleSheet.create({
    form: {
        margin: 20
    },
   
})

export default EditProductScreen;