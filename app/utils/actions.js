import React from 'react'
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/firestore'
import { fileToBlob } from './helpers'
const db = firebase.firestore(firebase)

export const uploadImage = async(image, path, name) => {
    const result = { statusResponse: false, error: null, url: null}
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)
    try{
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch(error){
        result.error = error
    }
    return result
}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: false, error: null}
    
    try{
        await db.collection(collection).add(data)
    } catch(error){
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getTrabajadores = async(limitTrabajadores) => {
    const result = { statusResponse: true, error: null, trabajadores: [], startTrabajadores: null}
    
    try{
        const response = await db.collection('trabajadores').orderBy("createAt","desc").limit(limitTrabajadores).get()
        if(response.docs.length > 0){
            result.startTrabajadores = response.docs[response.docs.length - 1]
        }
        response.forEach((doc)=> {
            const trabajador = doc.data()
            trabajador.id = doc.id
            result.trabajadores.push(trabajador)            
        })
    } catch(error){
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getEmpresas = async(limitEmpresas) => {
    const result = { statusResponse: true, error: null, empresas: [], startEmpresas: null}
    
    try{
        const response = await db.collection('empresas').orderBy("createAt","desc").limit(limitEmpresas).get()
        if(response.docs.length > 0){
            result.startEmpresas = response.docs[response.docs.length - 1]
        }
        response.forEach((doc)=> {
            const empresa = doc.data()
            empresa.id = doc.id
            result.empresas.push(empresa)            
        })
    } catch(error){
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getProductos = async(limitProductos) => {
    const result = { statusResponse: true, error: null, productos: [], startProductos: null}
    
    try{
        const response = await db.collection('productos').orderBy("createAt","desc").limit(limitProductos).get()
        if(response.docs.length > 0){
            result.startProductos = response.docs[response.docs.length - 1]
        }
        response.forEach((doc)=> {
            const producto = doc.data()
            producto.id = doc.id
            result.productos.push(producto)            
        })
    } catch(error){
        result.statusResponse = false
        result.error = error
    }
    return result
}