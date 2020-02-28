export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return {type: DELETE_PRODUCT , pid: productId};
}

export const createProduct =(title, description, imageUrl, price) =>{
    return async dispatch =>{
        //any async code you want
        const response = await fetch('https://rn-complete-guide-2fa9a.firebaseio.com/products.json',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        }) 

        const resData =await response.json();

        console.log(resData)
        dispatch({
        type: CREATE_PRODUCT,
        productData: { //object he ye
            id: resData.name,
            title,  //property or value ka name same tha is lie aik bar likha warna u likhte
                        // title:title, description:description modern js ke property he ye 
            description,
            imageUrl,
            price
        }
    })
    }
};

export const updateProduct = ( id, title, description, imageUrl) =>{
    return{
        type: UPDATE_PRODUCT,
        pid: id,
        productData: { //object he ye
            title,  //property or value ka name same tha is lie aik bar likha warna u likhte
            description,         // title:title, description:description modern js ke property he ye   
            imageUrl,
        }
    }
}; 