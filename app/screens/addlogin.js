import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNSecureKeyStore from 'react-native-secure-key-store';
import Schema from '../schemas.js';
const CryptoJS = require("crypto-js");
const base64js = require('base64-js');
const Realm = require('realm');

class AddLogin extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      key: "",    
      id: "",    
      site: "",
      username: "",
      password: "",
    };  
    this.addData = this.addData.bind(this);
    }    
  static navigationOptions = {
    title: 'Add a login',
    headerTitleStyle: { color: '#26abe2',fontWeight: 'normal'}, 
    headerTintColor: '#26abe2'
  };
componentDidMount () {
    
let key1 = "";
RNSecureKeyStore.get("key1")
	.then((res) => {
		key1 = res;
	}).then(() => {
   
   let key = base64js.toByteArray(key1);
   this.setState({key: key});  
       Realm.open({schema: Schema, encryptionKey: key})
  .then(realm => {

       let data = realm.objects('IdNumber');
       this.setState({id: data[0]["id_number"] + 1});    
    });    
});   
    
}
goback() {
this.props.navigation.state.params.refresh();    
this.props.navigation.navigate('WebLogin');    
}
addData() {
    if (this.state.site != "") {
    Realm.open({schema: Schema, encryptionKey: this.state.key })
  .then(realm => {
    realm.write(() => {
      realm.create('Login', {
        id: this.state.id,  
        site: this.state.site,
        username: this.state.username,
        password: this.state.password,
      });
    realm.create('IdNumber', {
        id: 0,
        id_number: this.state.id
      }, true);   
    })}).then(() => {
          Alert.alert(
  '',
  'Data added successfully.',
  [
    {text: 'OK', onPress: () => this.goback()},
  ],
  { cancelable: false }
);
      });  
    } else {
     Alert.alert(
  '',
  'The site field is required!',
  [
    {text: 'OK', onPress: () => console.log('required field')},
  ],
  { cancelable: false }
);   
    }
}
  render() {
    const { state, navigate } = this.props.navigation;
    return (
     <View style={{backgroundColor: 'white', height: "100%", justifyContent: 'center', alignItems: 'center',}}> 
    <TextInput placeholder="Site"  style={styles.textField} onChangeText={(site) => this.setState({site})} value={this.state.site} />
    <TextInput placeholder="Username" style={styles.textField} onChangeText={(username) => this.setState({username})} value={this.state.username} />
    <TextInput placeholder="Password" style={styles.textField} onChangeText={(password) => this.setState({password})} value={this.state.password} />
    <TouchableOpacity style={styles.button} onPress={this.addData}>
    <Text style={{ color: '#26abe2', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginTop: 7 }}>Save</Text>
</TouchableOpacity>    
   </View>

    );
  }
};
export default AddLogin; 

const styles = StyleSheet.create({ 
textField: {
 borderColor: '#26abe2',
 borderRadius: 10,    
 width: '80%',       
  },
button: {
 borderColor: '#26abe2',    
 width: '80%', 
 height: 40,  
 alignContent: 'center',  
 backgroundColor: 'transparent', 
 borderWidth: 1,  
 borderRadius: 4,
 marginTop: 10,  
  },    
});