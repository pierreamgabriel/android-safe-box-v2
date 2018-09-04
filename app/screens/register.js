import React, {Component} from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage, StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, Alert} from 'react-native';
const CryptoJS = require("crypto-js");
const base64js = require('base64-js');
import RNSecureKeyStore from 'react-native-secure-key-store';
const Realm = require('realm');
import Schema from '../schemas.js';


class Login extends Component {
    static navigationOptions = {
    header: null
  };
    constructor(props) {
    super(props);  
    this.state = {key: "", confirm: ""};      
    this.openDb = this.openDb.bind(this);      
    }
componentDidMount() {
Alert.alert(
  '',
  'This is your first access. In order to create your encrypted database you need to provide a strong password containing at least 10 characters.',
  [
    {text: 'OK', onPress: () => console.log('ok')},
  ],
);    
}
openDb() {
if (this.state.key != this.state.confirm) {
    alert("Passwords don't match. Please try again");
} else if (this.state.key.length < 10) {  
    alert("Password must contain at least 10 characters.");
} else {  
let derivedKey = CryptoJS.PBKDF2(this.state.key, "", { keySize: 512/32, iterations: 1000 }).toString(CryptoJS.enc.Base64);
let key = base64js.toByteArray(derivedKey);
RNSecureKeyStore.set("key1", derivedKey);
AsyncStorage.setItem("registered", "yes");
AsyncStorage.setItem("logged", "yes");    
    
Realm.open({schema: Schema, encryptionKey: key}).then(realm => {
    
    realm.write(() => {
      realm.create('IdNumber', {
        id: 0,
        id_number: 0
      });
    });    
    }).then(() => {
    const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
this.props.navigation.dispatch(resetAction); 
});    
}
}
  render() {   
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#26abe2',
      }}>
        <Image style={{width: 50, height: 50, marginBottom: 10}} source={require('../images/icon.png')} /> 
        <Text style={styles.loginTitle}>Create a strong password</Text>
        <TextInput placeholder="Password" underlineColorAndroid="transparent" style={styles.textField} secureTextEntry={true} onChangeText={(key) => this.setState({key})} value={this.state.key} />
        <TextInput placeholder="Confirm password" underlineColorAndroid="transparent" style={styles.textField} secureTextEntry={true} onChangeText={(confirm) => this.setState({confirm})} value={this.state.confirm} />    
        <TouchableOpacity style={styles.button} onPress={this.openDb}>
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginTop: 7 }}>GO</Text>
</TouchableOpacity>    
      </View>
    );
  }
  
}


const styles = StyleSheet.create({ 
button: {
 borderColor: 'white', 
 color: 'white',    
 width: '80%', 
 height: 40,  
 alignContent: 'center',  
 backgroundColor: 'transparent', 
 borderWidth: 1,  
 borderRadius: 4,
 marginTop: 10,  
  },
loginTitle: {
 color: 'white',
 fontFamily: 'WorkSansBold',
 fontSize: 18,
 marginBottom: 10,
  },
textField: {
 backgroundColor: 'white',  
 borderRadius: 10,    
 width: '80%',     
 marginTop: 10    
  },
});

export default Login; 