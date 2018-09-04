import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNSecureKeyStore from 'react-native-secure-key-store';
import Schema from '../schemas.js';
const CryptoJS = require("crypto-js");
const base64js = require('base64-js');
const Realm = require('realm');

class ShowNote extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      key: "",    
      id: this.props.navigation.getParam('id'),    
      note: this.props.navigation.getParam('note'),
    };  
    this.editData = this.editData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);  
        
    }    
  static navigationOptions = ({ navigation }) => {
    return {
    title: "View, edit or delete",
    headerTitleStyle: { color: '#26abe2',fontWeight: 'normal'}, 
    headerStyle: {paddingRight: 10},    
    headerTintColor: '#26abe2',
    headerRight: (
      <Icon
      size={30}    
      color= "#26abe2"
      onPress={navigation.getParam('handleDel')}
      name="trash-o"
      />  
    ),
     };    
  };
componentDidMount () {
this.props.navigation.setParams({ handleDel: this.confirmDelete });    
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
this.props.navigation.navigate('Note');    
}
editData() {
    if (this.state.note != "") {
    Realm.open({schema: Schema, encryptionKey: this.state.key })
  .then(realm => {
    realm.write(() => {
      realm.create('Note', {
        id: this.state.id,  
        note: this.state.note,
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
  'You must type something before saving!',
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
     let note = realm.create('Note', {
        id: this.state.id,  
        note: this.state.note,
      }, true);
    realm.delete(note);    
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
     <View style={{backgroundColor: 'white', height: "100%"}}> 
        <Icon
      style={{textAlign: 'right', marginRight: 10, marginTop: 5}}
      size={30}    
      color= "#26abe2"
      onPress={this.editData}
      name="save"
      />       
    <TextInput underlineColorAndroid="transparent" multiline={true} placeholder="Tap to type"  style={styles.textField} onChangeText={(note) => this.setState({note})} value={this.state.note} />
   </View>

    );
  }
};
export default ShowNote; 

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