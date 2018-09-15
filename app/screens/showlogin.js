import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNSecureKeyStore from 'react-native-secure-key-store';
import Schema from '../schemas.js';
const CryptoJS = require("crypto-js");
const base64js = require('base64-js');
const Realm = require('realm');

class ShowLogin extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      key: "",    
      id: this.props.navigation.getParam('id'),    
      site: this.props.navigation.getParam('site'),
      username: this.props.navigation.getParam('username'),
      password: this.props.navigation.getParam('password'),
    };  
    this.editData = this.editData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);  
        
    }    
  static navigationOptions = {
    title: "View, edit or delete",
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
});   
    
}
goback() {
this.props.navigation.state.params.refresh();    
this.props.navigation.navigate('WebLogin');    
}
editData() {
    if (this.state.site != "") {
    Realm.open({schema: Schema, encryptionKey: this.state.key })
  .then(realm => {
    realm.write(() => {
      realm.create('Login', {
        id: this.state.id,  
        site: this.state.site,
        username: this.state.username,
        password: this.state.password,
      }, true)
    })}).then(() => {
          Alert.alert(
  '',
  'The information was successfully updated.',
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
confirmDelete() {
    Alert.alert(
  '',
  "Are you sure you want to proceed? Once deleted, you can't recover this data.",
  [
    {text: 'NO', onPress: () => console.log('Cancel Pressed')},
    {text: 'YES', onPress: () => this.deleteData()},  
  ],
  { cancelable: false }
);
}
deleteData() {
    Realm.open({schema: Schema, encryptionKey: this.state.key })
  .then(realm => {
    realm.write(() => {
     let login = realm.create('Login', {
        id: this.state.id,  
        site: this.state.site,
        username: this.state.username,
        password: this.state.password,
      }, true);
    realm.delete(login);    
    })}).then(() => {
          Alert.alert(
  '',
  'The information was successfully deleted.',
  [
    {text: 'OK', onPress: () => this.goback()},
  ],
  { cancelable: false }
)
      });  
}
  render() {
    const { state, navigate } = this.props.navigation;
    return (
     <View style={{backgroundColor: 'white', height: "100%", justifyContent: 'center', alignItems: 'center',}}> 
     <TextInput placeholder="Site"  style={styles.textField} onChangeText={(site) => this.setState({site})} value={this.state.site} />
    <TextInput placeholder="Username" style={styles.textField} onChangeText={(username) => this.setState({username})} value={this.state.username} />
    <TextInput placeholder="Password" style={styles.textField} onChangeText={(password) => this.setState({password})} value={this.state.password} />
    <TouchableOpacity style={styles.button} onPress={this.editData}>
    <Text style={{ color: '#26abe2', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginTop: 7 }}>Save changes</Text>
</TouchableOpacity>   
<TouchableOpacity style={styles.button} onPress={this.confirmDelete}>
    <Text style={{ color: '#26abe2', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginTop: 7 }}>Delete data</Text>
</TouchableOpacity> 
   </View>

    );
  }
};
export default ShowLogin; 

const styles = StyleSheet.create({ 
textField: {
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