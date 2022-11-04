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

export default function AddEmpresasForm(props) {
    const {toastRef,setLoading} = props
    const navigation = useNavigation()
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorEncargado, setErrorEncargado] = useState(null)
    const [errorCorreo, setErrorCorreo] = useState(null)
    const [errorHorario, setErrorHorario] = useState(null)
    const [errorTelefono, setErrorTelefono] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])

    const onSubmit = async() => {
        if(!validForm()){
            return
        }else{
            setLoading(true) 
            const responseUploadImages = await uploadImages()
            const empresas = {
                name: formData.name,
                encargado: formData.encargado,
                correo: formData.correo,
                horario: formData.horario,
                telefono: formData.telefono,
                images: responseUploadImages,                
                createAt: new Date()                
            }
            const responseAddDocument = await addDocumentWithoutId('empresas', empresas)
            setLoading(false)       
            navigation.navigate('empresaC')
        }
    } 

    const uploadImages = async () => {
        const imageUrl = []
        await Promise.all(
            map(imagesSelected, async(image) => {
                const response = await uploadImage(image, "empresas", uuid())
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
            setErrorName('Escribe el nombre completo de la empresa.')
            isValid = false
        }
        if(isEmpty(formData.encargado)){
            setErrorEncargado('Encargado de la empresa.')
            isValid = false
        }
        if(isEmpty(formData.correo)){
            setErrorCorreo('Escribe el correo de la empresa.')
            isValid = false
        }
        if(isEmpty(formData.horario)){
            setErrorHorario('Escribe el horario de trabajo de la empresa.')
            isValid = false
        }
        if(isEmpty(formData.telefono)){
            setErrorTelefono('Escribe el telefono de la empresa.')
            isValid = false
        }
        if(size(imagesSelected) === 0){
            Alert.alert("Debes agregar una imagen")
            isValid = false
        }
        
            return isValid
        
        
    }
const clearErrors = () => {
    setErrorCorreo(null)
    setErrorEncargado(null)
    setErrorName(null)
    setErrorTelefono(null)
    setErrorHorario(null)
}
  return (
    <ScrollView style={styles.formContainer}>            
            <ImageEmpresa
                    ImageEmpresa={imagesSelected[0]}
            />            
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorEncargado={errorEncargado}
                errorCorreo={errorCorreo}
                errorHorario={errorHorario}
                errorTelefono={errorTelefono}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title='Añadir Empresa'
                containerStyle={styles.btnCointainerCrearEmpresa}
                buttonStyle={styles.btnCrearEmpresa}
                onPress={onSubmit}
            />
        </ScrollView>
  )
}

function ImageEmpresa({imageEmpresa}){
   return (
       <View style={styles.viewPhoto}>
           <Image
                style={{width: widthScreen, height: 200}}
                source={
                    imageEmpresa
                    ? {uri: imageEmpresa}
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
                map(imagesSelected,(imageEmpresa, index) => (
                        <Avatar
                            key={index}
                            style={styles.miniatureStyle}
                            source={{uri: imageEmpresa}}
                            onPress={() => removeImage(imageEmpresa)}
                        />
                ))
            }
            
        </ScrollView>
    )
}

function FormAdd({formData,setFormData,errorName,errorEncargado,errorCorreo,errorTelefono, errorHorario}){
    
const onChange=(e,type)=>{
    setFormData({ ...formData,[type] : e.nativeEvent.text})
}

    return(
        <View style={styles.viewForm} >
            <Input
                placeholder="Nombre de la empresa"
                defaultValue={formData.name}
                onChange={(e)=> onChange(e, "name")}
                errorMessage={errorName}
                containerStyle={styles.inputForm}              
                
            />
            <Input
                placeholder="Encargado de la empresa"
                defaultValue={formData.encargado}
                onChange={(e)=> onChange(e, "encargado")}
                errorMessage={errorEncargado}
                required={true}
                containerStyle={styles.inputForm}                           
            />
            <Input
                placeholder="Correo de la empresa"
                defaultValue={formData.correo}
                onChange={(e)=> onChange(e, "correo")}
                errorMessage={errorCorreo}
                multiline
                containerStyle={styles.inputForm}                           
            />
            <Input
                placeholder="Horario de la empresa"
                defaultValue={formData.horario}
                onChange={(e)=> onChange(e, "horario")}
                errorHorario={errorHorario}               
                containerStyle={styles.inputForm}                           
            />
            <Input
                placeholder="Telefono de la empresa"
                defaultValue={formData.telefono}
                onChange={(e)=> onChange(e, "telefono")}
                errorMessage={errorTelefono}
                multiline
                containerStyle={styles.inputForm}                           
            />
        </View>
    )
}

const defaultFormValues = () =>{
    return{
        name: "",
        encargado:"",
        correo: "",
        horario: "",
        telefono: ""
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
    btnCointainerCrearEmpresa:{
        width: '50%',
        height: 150,
        marginLeft: 100 ,
        marginTop:50,  
        paddingTop: 10,
        paddingBottom: 10
        
    },
    btnCrearEmpresa:{
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