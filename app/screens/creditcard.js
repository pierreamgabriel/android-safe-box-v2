import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Schema from '../schemas.js';
import RNSecureKeyStore from 'react-native-secure-key-store';
const CryptoJS = require("crypto-js");
const base64js = require('base64-js');
const Realm = require('realm');

class CreditCard extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      data: [],
    };   
    this.refreshFunction = this.refreshFunction.bind(this);  
    }    
  static navigationOptions = {
    title: 'All credit cards',
    headerTitleStyle: { color: '#26abe2',fontWeight: 'normal'}, 
    headerTintColor: '#26abe2'
  };
refreshFunction() {     
let key1 = "";
RNSecureKeyStore.get("key1")
	.then((res) => {
		key1 = res;
	}).then(() => {
   
   let key = base64js.toByteArray(key1);
  
       Realm.open({schema: Schema, encryptionKey: key})
  .then(realm => {

       this.setState({data: realm.objects('CreditCard')});    
    });    
});       
}
componentDidMount() {
this.refreshFunction();

}
renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
}
  render() {
    const { state, navigate } = this.props.navigation;
    return (
     <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white',}}> 
    <View style={{alignItems: 'center'}}>
    <Icon style={{marginTop: 10}} name="plus-circle" size={35} color="#26abe2" onPress={() => navigate("AddCc", {refresh: this.refreshFunction})} />    
    </View>    
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
    <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{
          marginLeft: 10,
          marginTop: 5,         
          marginBottom: 5,        
        }}>
                <TouchableOpacity onPress={() => navigate("ShowCc", {id: item.id, brand: item.brand, number: item.number, verification: item.verification, expiration: item.expiration_date, password: item.password, refresh: this.refreshFunction})} >
                <Text style={{fontSize: 20, color: "black"}}>{item.brand}</Text>
                </TouchableOpacity> 
              </View>
            );
          }}
        />    
    </ScrollView>    
       
   </View>

    );
  }
};
export default CreditCard; 