import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Image,Input, Icon, Button, Avatar } from 'react-native-elements'
import firebase from "firebase/compat/app";
import { useNavigation } from '@react-navigation/native'
import {map, size, filter, isEmpty} from 'lodash'
import { loadImageFromGallery } from '../../utils/helpers'
import { addDocumentWithoutId, uploadImage } from '../../utils/actions'
import uuid from 'random-uuid-v4'

const widthScreen = Dimensions.get("window").width

export default function AddProductosForm(props) {
    const {toastRef,setLoading} = props
    const navigation = useNavigation()
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorCodigo, setErrorCodigo] = useState(null)
    const [errorName, setErrorName] = useState(null)    
    const [errorPrecio, setErrorPrecio] = useState(null)
    const [errorStock, setErrorStock] = useState(null)    
    const [imagesSelected, setImagesSelected] = useState([])

    const onSubmit = async() => {
        if(!validForm()){
            return
        }else{
            setLoading(true) 
            const responseUploadImages = await uploadImages()
            const productos = {
                codigo: formData.codigo,
                name: formData.name,                
                precio: formData.precio,
                stock: formData.stock,                
                images: responseUploadImages,                
                createAt: new Date()                
            }
            const responseAddDocument = await addDocumentWithoutId('productos', productos)
            setLoading(false)       
            navigation.navigate('products')
        }
    } 

    const uploadImages = async () => {
        const imageUrl = []
        await Promise.all(
            map(imagesSelected, async(image) => {
                const response = await uploadImage(image, "productos", uuid())
                if(response.statusResponse){
                    imageUrl.push(response.url)
                }
        })
        )
        return imageUrl
    }

    const validForm = () => {
        clearErrors()
        let isValid = true
        if(isEmpty(formData.name)){
            setErrorName('Escribe el nombre completo del producto.')
            isValid = false
        }
        if(isEmpty(formData.codigo)){
            setErrorCodigo('Escriba el codigo del producto.')
            isValid = false
        }
        if(isEmpty(formData.precio)){
            setErrorPrecio('Escribe el precio del producto.')
            isValid = false
        }
        if(isEmpty(formData.stock)){
            setErrorStock('Escribe el stock del producto.')
            isValid = false
        }        
        if(size(imagesSelected) === 0){
            Alert.alert("Debes agregar una imagen")
            isValid = false
        }
        
            return isValid
        
        
    }
const clearErrors = () => {
    setErrorPrecio(null)
    setErrorCodigo(null)
    setErrorName(null)
    setErrorStock(null)
}
  return (
    <ScrollView style={styles.formContainer}>            
            <ImageProducto
                    ImageProducto={imagesSelected[0]}
            />            
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorCodigo={errorCodigo}
                errorPrecio={errorPrecio}
                errorStock={errorStock}                
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title='Añadir Producto'
                containerStyle={styles.btnCointainerCrearProducto}
                buttonStyle={styles.btnCrearProducto}
                onPress={onSubmit}
            />
        </ScrollView>
  )
}

function ImageProducto({imageProducto}){
   return (
       <View style={styles.viewPhoto}>
           <Image
                style={{width: widthScreen, height: 200}}
                source={
                    imageProducto
                    ? {uri: imageProducto}
                    : require("../../../assets/img/noImage.png")
                }
           />
       </View>
   ) 
}

function UploadImage({toastRef,imagesSelected,setImagesSelected}){
    const imageSelect = async() =>{
        const response = await loadImageFromGallery([4,3])
        if(!response.status){
            toastRef.current.show("No has seleccionado ninguna imagen", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estás seguro que deseas borrar la imagen?",
            [
                {
                    text: "Si",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl => imageUrl !== image))
                        )
                    }
                },
                {
                    text: "No",
                    style: "cancel"
                }                
            ],
            {
                cancelable: true
            }
        )
    }

    return(
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected) < 1 && (
                    <Icon
                    type='material-community'
                    name='camera'
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
                )                
            }
            {
                map(imagesSelected,(imageProducto, index) => (
                        <Avatar
                            key={index}
                            style={styles.miniatureStyle}
                            source={{uri: imageProducto}}
                            onPress={() => removeImage(imageProducto)}
                        />
                ))
            }
            
        </ScrollView>
    )
}

function FormAdd({formData,setFormData,errorName,errorCodigo,errorPrecio, errorStock}){
    
const onChange=(e,type)=>{
    setFormData({ ...formData,[type] : e.nativeEvent.text})
}

    return(
        <View style={styles.viewForm} >
            <Input
                placeholder="Nombre del producto"
                defaultValue={formData.name}
                onChange={(e)=> onChange(e, "name")}
                errorMessage={errorName}
                containerStyle={styles.inputForm}              
                
            />
            <Input
                placeholder="Codigo del producto"
                defaultValue={formData.codigo}
                onChange={(e)=> onChange(e, "codigo")}
                errorMessage={errorCodigo}
                required={true}
                containerStyle={styles.inputForm}                           
            />
            <Input
                placeholder="Precio del producto "
                defaultValue={formData.precio}
                onChange={(e)=> onChange(e, "precio")}
                errorMessage={errorPrecio}
                multiline
                containerStyle={styles.inputForm}                           
            />
            <Input
                placeholder="Stock del producto"
                defaultValue={formData.stock}
                onChange={(e)=> onChange(e, "stock")}
                errorStock={errorStock}               
                containerStyle={styles.inputForm}                           
            />            
        </View>
    )
}

const defaultFormValues = () =>{
    return{
        codigo:"",
        name: "",        
        precio: "",
        stock: ""        
    }
}
const styles = StyleSheet.create({
    viewForm:{
       marginHorizontal: 10 
    },
    formContainer:{
        height:"100%",
        marginTop: 30
    },
    inputForm:{
        width: '100%',
        marginTop: 20
    },
    btnCointainerCrearProducto:{
        width: '50%',
        height: 150,
        marginLeft: 100 ,
        marginTop:50,  
        paddingTop: 10,
        paddingBottom: 10
        
    },
    btnCrearProducto:{
        backgroundColor: '#F2B61D'
    },
    iconRight:{
        color: '#c1c1c1'
    },
    logo:{
        width: '100%',
        height: 150,
        marginTop: 20
    },
    viewImage:{
        flexDirection: "row",
        marginLeft: 120,
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        height: 100,
        width: 100,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width: 120,
        height:90,
        marginRight:10
    },
    viewPhoto:{
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    }
})