# Android Safe Box
A personal project to compare the performances of two app development frameworks on android. This app was built with React Native + Realm and will be compared against this one https://github.com/pierremacedo/android-safe-box-v1 built with NativeScript + SQLcipher.

This app as its name implies is a place to store sensitive information such as bank accounts, credit cards, personal documents, etc., on android devices.

## Download

https://github.com/pierremacedo/android-safe-box-v2/releases/download/v1.0/android-safe-box.apk

## Security
The Realm database encrypts data with 256-bit AES. A 512-bit encryption key is generated from a ten characters password provided by the user. This key is securely stored on the device using RNSecureKeyStore https://github.com/pradeep1991singh/react-native-secure-key-store.

## Performance Analysis

### Startup
I couldn't see any difference here. Both apps start up in an acceptable time.

### Creating the database
The first step is to type a ten characters password in order to create a new encrypted database, and after that, the app automatically navigates to the main screen. This process is slightly faster with NativeScript. 

### Navigation
This app contains many screens, and React Navigation makes the process of switching between them an easy and fast task.

### Adding, editing and deleting data
Realm is notably faster than SQLite and also easier to use. In fact, I think this is the best database out there.

### Conclusion
React Native certainly allows us to create apps with a smoother navigation which is something really crucial where NativeScript fails. Also, at the moment I created this project, the only suitable database with encryption capability available for NativeScript was SQLcipher, and it's an important downside since Realm is a faster option.

NativeScript comes with Webpack that promises to speed up our apps, but this a buggy tool. I couldn't make it work. The time you'll waste fixing Webpack errors, you could be already building a faster app with React Native.

## Screenshots
<p align="center">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v2/master/screenshots/splashscreen.png" height="350" title="splash screen">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v2/master/screenshots/registerscreen.png" height="350" title="register screen">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v2/master/screenshots/loginscreen.png" height="350" title="login screen">  
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v2/master/screenshots/mainscreen.png" height="350" title="main screen">    
</p>

