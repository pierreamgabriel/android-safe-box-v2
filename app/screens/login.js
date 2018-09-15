import React, {Component} from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage, StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity} from 'react-native';
const CryptoJS = require("crypto-js");
const base64js = require('base64-js');
import RNSecureKeyStore from 'react-native-secure-key-store';
const Realm = require('realm');


class Login extends Component {
    static navigationOptions = {
    header: null
  };
    constructor(props) {
    super(props);  
    this.state = {key: "", key2: ""};      
    this.openDb = this.openDb.bind(this);        
    }
componentDidMount() {
RNSecureKeyStore.get("key1")
	.then((res) => {
		this.setState({key2: res});
	});        
}

openDb() {    
let derivedKey = CryptoJS.PBKDF2(this.state.key, "", { keySize: 512/32, iterations: 1000 }).toString(CryptoJS.enc.Base64);
let key = base64js.toByteArray(derivedKey);

    if (this.state.key2 != derivedKey){
alert("Wrong password. Please try again.")        
    } else {
AsyncStorage.setItem("logged", "yes").then(() => {
const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
this.props.navigation.dispatch(resetAction);   });   
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
        <Text style={styles.loginTitle}>Log in to your safe box</Text>
        <TextInput placeholder="Password" underlineColorAndroid="transparent" style={styles.textField} secureTextEntry={true} onChangeText={(key) => this.setState({key})} value={this.state.key} />
        <TouchableOpacity style={styles.button} onPress={this.openDb}>
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginTop: 7 }}>LOG IN</Text>
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
  },
});

export default Login; 