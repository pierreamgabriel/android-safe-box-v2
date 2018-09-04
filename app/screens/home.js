import React, {Component} from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage, StyleSheet, View, Image, TouchableOpacity, ScrollView, ToolbarAndroid, Button, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNSecureKeyStore from 'react-native-secure-key-store';
const base64js = require('base64-js');
import Schema from '../schemas.js';

class Home extends Component {
    constructor(props) {
    super(props);  
    this.changeAsync = this.changeAsync.bind(this);    
    this.signOut = this.signOut.bind(this);       
    }    
   static navigationOptions = ({ navigation }) => {
    return {
    title: 'Android Safe Box',
    headerStyle: { paddingLeft: 14, paddingRight: 14},
    headerTitleStyle: { color: '#26abe2', marginLeft: 0, fontSize: 22, fontWeight: 'normal'},  
    headerRight: (<Icon onPress={navigation.getParam('signOut')} name="sign-out" size={22} fontWeight="normal" color="#26abe2" />),     
  }
   };
componentDidMount() {
this.props.navigation.setParams({ signOut: this.signOut }); 
this.props.navigation.setParams({ handleDel: this.confirmDelete });     
let registered = "";    
let logged = ""; 
AsyncStorage.getItem('registered').then((value) => {
  registered = value;
  }).then(() => {
AsyncStorage.getItem('logged').then((value) => {
  logged = value;
  }).then(() => {
if (registered != "yes" && logged != "yes"){
const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Register' })],
        });
this.props.navigation.dispatch(resetAction);   
} else if (logged != "yes") {
const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
this.props.navigation.dispatch(resetAction);  
}        
});    
});    
 
}
signOut() {
Alert.alert(
  '',
  'If you sign out you will have to type your password again in order to access your data. Do you want to continue?',
  [
    {text: 'NO', onPress: () => console.log('Cancel Pressed')},
    {text: 'YES', onPress: () => this.changeAsync()},  
  ],
  { cancelable: false }
);    
}
changeAsync() {
AsyncStorage.removeItem('logged');
const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
this.props.navigation.dispatch(resetAction);      
}
  render() {
    const { navigate } = this.props.navigation;
    return (
       
        
 <View style={{flex: 1, flexDirection: 'column'}}>  
    
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
        
   <View style={{flex: 1, flexDirection: 'row'}}>
    
        
        <TouchableOpacity style={{flex: 1}} onPress={() => navigate("Doc")}>
        <Image style={{flex: 1, height: undefined, width: undefined}} source={require('../images/personaldocs.png')} /> 
         </TouchableOpacity> 
        <TouchableOpacity style={{flex: 1}} onPress={() => navigate("Note")}>
        <Image style={{flex: 1, height: undefined, width: undefined}} source={require('../images/note.png')} /> 
         </TouchableOpacity>                                                  
      </View> 
 <View style={{flex: 1, flexDirection: 'row'}}>
        
         <TouchableOpacity style={{flex: 1}} onPress={() => navigate("Password")}>
        <Image style={{flex: 1, height: undefined, width: undefined}} source={require('../images/password.png')} /> 
         </TouchableOpacity> 
        <TouchableOpacity style={{flex: 1}} onPress={() => navigate("WebLogin")}>
        <Image style={{flex: 1, height: undefined, width: undefined}} source={require('../images/login.png')} /> 
         </TouchableOpacity>         
      </View> 
    <View style={{flex: 1, flexDirection: 'row'}}>
        
         <TouchableOpacity style={{flex: 1}} onPress={() => navigate("CreditCard")}>
        <Image style={{flex: 1, height: undefined, width: undefined}} source={require('../images/credit-card.png')} /> 
         </TouchableOpacity> 
        <TouchableOpacity style={{flex: 1}} onPress={() => navigate("Bank")}>
        <Image style={{flex: 1, height: undefined, width: undefined}} source={require('../images/bank.png')} /> 
         </TouchableOpacity>         
                                                                 
      </View>  
      </ScrollView>                                                                                                                 
      </View>
                                                               
    );
  }
}

const styles = StyleSheet.create({ 
toolbar: {
 backgroundColor: 'white', 
 color: '#26abe2',    
 height: 50, 
 width: '100%',    
  }    
});

export default Home; 