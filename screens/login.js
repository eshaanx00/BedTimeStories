import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Image,
    StyleSheet
}from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            passwd:''
        }
    }
    login=async(email,passwd)=>{
    if(email&&passwd){
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email,passwd);
            if(response){
                this.props.navigation.navigate('TabNavigator')
            }
        }catch(error){
        switch(error.code){
            case 'auth/user-not-found':Alert.alert("user doesn't exist")
            break;
            case 'auth/invalid-email':Alert.alert("Incorrect email or password")
            break;

        }
        }
    }
    }
    render() {
        return (
    
        <KeyboardAvoidingView>

            <Image style={styles.imageStyle} source={require('../assets/book.png')}></Image>

            <TextInput 
            textAlign={'center'}
            placeholder="abc@xyz.com"
            keyboardType="email-address"
            style={styles.inputStye}
            onChangeText={(email)=>{
            this.setState({email:email})
            }}></TextInput>

            <TextInput
            textAlign={'center'}
            placeholder="Enter Password"
            secureTextEntry={true}
            style={styles.inputStye}
            onChangeText={(text)=>{
                this.setState({passwd:text})
            }}
            ></TextInput>

            <TouchableOpacity style={styles.touchableOpacityStyle} onPress={()=>{this.login(this.state.email,this.state.passwd)}}><Text style={{alignSelf:'center'}}>Login</Text></TouchableOpacity>

        </KeyboardAvoidingView>
    
        )
    }
}
const styles= StyleSheet.create({
    imageStyle:{
    alignSelf:'center',
    width:100,
    height:100,
    marginTop:-110
    },touchableOpacityStyle:{
        alignSelf:'center',
        borderRadius:5,
        borderWidth:2,
        width:60,
        justifyContent:'center',
    },inputStye:{
        marginBottom:15,
        width:240,
        height:30,
        borderWidth:2,
        borderRadius:6,
        marginTop:20,
        alignSelf:'center'
    }
})
