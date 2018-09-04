import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import Register from './app/screens/register';
import Login from './app/screens/login';
import Home from './app/screens/home';
import Doc from './app/screens/doc';
import AddDoc from './app/screens/adddoc';
import ShowDoc from './app/screens/showdoc';
import Note from './app/screens/note';
import AddNote from './app/screens/addnote';
import ShowNote from './app/screens/shownote';
import Password from './app/screens/password';
import AddPassword from './app/screens/addpassword';
import ShowPassword from './app/screens/showpassword';
import WebLogin from './app/screens/weblogin';
import AddLogin from './app/screens/addlogin';
import ShowLogin from './app/screens/showlogin';
import CreditCard from './app/screens/creditcard';
import AddCc from './app/screens/addcreditcard';
import ShowCc from './app/screens/showcreditcard';
import Bank from './app/screens/bank';
import AddBank from './app/screens/addbank';
import ShowBank from './app/screens/showbank';

const App = StackNavigator({  
    Home: { screen: Home}, 
    Register: { screen: Register}, 
    Login: { screen: Login},
    //Home: { screen: Home},
    Doc: {screen: Doc},
    AddDoc: {screen: AddDoc},
    ShowDoc: {screen: ShowDoc},
    Note: {screen: Note},
    AddNote: {screen: AddNote},
    ShowNote: {screen: ShowNote},
    Password: {screen: Password},
    AddPassword: {screen: AddPassword},
    ShowPassword: {screen: ShowPassword},
    WebLogin: {screen: WebLogin},
    AddLogin: {screen: AddLogin},
    ShowLogin: {screen: ShowLogin},
    CreditCard: {screen: CreditCard},
    AddCc: {screen: AddCc},
    ShowCc: {screen: ShowCc},
    Bank: {screen: Bank},
    AddBank: {screen: AddBank},
    ShowBank: {screen: ShowBank},
})

export default App;

