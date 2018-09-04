const Identification = {
  name: 'IdNumber',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    id_number: 'int'
  }
};       
const BankSchema = {
  name: 'Bank',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    bank_name: 'string',
    account_number: 'string',
    password: 'string',
    other_info: 'string'  
  }
};   
const CcSchema = {
  name: 'CreditCard',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    brand: 'string',
    number: 'string',
    verification: 'string',
    expiration_date: 'string',
    password: 'string'  
  }
};  
const LoginSchema = {
  name: 'Login',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    site: 'string',
    username: 'string',
    password: 'string'
  }
};    
const PasswordSchema = {
  name: 'Password',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    name: 'string',
    password: 'string',
    other_info: 'string'  
  }
};    
const DocSchema = {
  name: 'Doc',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    type: 'string',
    number: 'string',
    issue_date: 'string',
    expiration_date: 'string',
    other_info: 'string',  
  }
};   
const NoteSchema = {
  name: 'Note',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    note: 'string'
  }
};  

const Schema = [Identification, BankSchema, CcSchema, LoginSchema, PasswordSchema, DocSchema, NoteSchema];
module.exports = Schema;