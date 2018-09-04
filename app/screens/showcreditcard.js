import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNSecureKeyStore from 'react-native-secure-key-store';
import Schema from '../schemas.js';
const CryptoJS = require("crypto-js");
const base64js = require('base64-js');
const Realm = require('realm');

class ShowCc extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      key: "",    
      id: this.props.navigation.getParam('id'),    
      brand: this.props.navigation.getParam('brand'),
      number: this.props.navigation.getParam('number'),
      verification: this.props.navigation.getParam('verification'), 
      expiration: this.props.navigation.getParam('expiration'),    
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
this.props.navigation.navigate('CreditCard');    
}
editData() {
    if (this.state.brand != "") {
    Realm.open({schema: Schema, encryptionKey: this.state.key })
  .then(realm => {
    realm.write(() => {
      realm.create('CreditCard', {
        id: this.state.id,  
        brand: this.state.brand,
        number: this.state.number,
        verification: this.state.verification,
        expiration_date: this.state.expiration,  
        password: this.state.password
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
  'The brand field is required!',
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
     let creditcard = realm.create('CreditCard', {
        id: this.state.id,  
        brand: this.state.brand,
        number: this.state.number,
        verification: this.state.verification,
        expiration_date: this.state.expiration,  
        password: this.state.password
      }, true);
    realm.delete(creditcard);    
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
   <TextInput placeholder="Brand"  style={styles.textField} onChangeText={(brand) => this.setState({brand})} value={this.state.brand} />
    <TextInput placeholder="Number" style={styles.textField} onChangeText={(number) => this.setState({number})} value={this.state.number} />
    <TextInput placeholder="Verification" style={styles.textField} onChangeText={(verification) => this.setState({verification})} value={this.state.verification} />    
    <TextInput placeholder="Expiration date" style={styles.textField} onChangeText={(expiration) => this.setState({expiration})} value={this.state.expiration} />    
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
export default ShowCc; 

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