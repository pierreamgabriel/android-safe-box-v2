import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput, Text, TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNSecureKeyStore from 'react-native-secure-key-store';
import Schema from '../schemas.js';
const CryptoJS = require("crypto-js");
const base64js = require('base64-js');
const Realm = require('realm');

class AddNote extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      key: "",    
      id: "",    
      note: ""
    };  
    this.addData = this.addData.bind(this);
    }    
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Add a note',
    headerTitleStyle: { color: '#26abe2',fontWeight: 'normal'}, 
    headerStyle: {paddingRight: 10},    
    headerTintColor: '#26abe2',
    headerRight: (
      <Icon
      size={30}    
      color= "#26abe2"
      onPress={navigation.getParam('handleAdd')}
      name="save"
      />  
    ),
    };      
  };
componentDidMount () {
this.props.navigation.setParams({ handleAdd: this.addData });    
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
this.props.navigation.navigate('Note');    
}
addData() {
    if (this.state.note != "") {
    Realm.open({schema: Schema, encryptionKey: this.state.key })
  .then(realm => {
    realm.write(() => {
      realm.create('Note', {
        id: this.state.id,  
        note: this.state.note
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
  'You must type something before saving!',
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
     <View style={{backgroundColor: 'white', height: "100%"}}> 
    <TextInput underlineColorAndroid="transparent" multiline={true} placeholder="Tap to type"  style={styles.textField} onChangeText={(note) => this.setState({note})} value={this.state.note} />
   </View>

    );
  }
};
export default AddNote; 

const styles = StyleSheet.create({ 
textField: {
 borderColor: '#26abe2',
 borderRadius: 10,    
 paddingLeft: 5,
 paddingRight: 5, 
 width: '100%',    
 height: '100%', 
 textAlignVertical: 'top',
  },
});