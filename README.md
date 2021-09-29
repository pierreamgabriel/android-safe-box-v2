© All rights reserved 
# Android Safe Box
It's a personal project to compare the performance of two mobile app development frameworks. This app was built with React Native + Realm and will be compared against this one https://github.com/pierremacedo/android-safe-box-v1 built with NativeScript + SQLcipher.

## Security
The Realm database encrypts data with 256-bit AES. A 512-bit encryption key is generated from a ten characters password provided by the user. This key is securely stored on the device using RNSecureKeyStore https://github.com/pradeep1991singh/react-native-secure-key-store.

## Performance Analysis

### Startup
I couldn't see any difference here. Both apps start fast.

### Creating the database
The first step is to type a ten characters password to create a new encrypted database, and after that, the app automatically navigates to the main screen. This process is slightly faster with NativeScript.

### Navigation
This app contains many screens, and React Navigation makes the process of switching between them an easy and fast task.

### Adding, editing, and deleting data
Realm is notably faster than SQLite and also easier to use. In fact, I think this is the best database out there.

### Conclusion
React Native allows us to create apps with smoother navigation which is something crucial where NativeScript fails. And when I built this app, the only database with encryption capability available for NativeScript that met my needs was SQLcipher. It's a downside since Realm is a faster option.

NativeScript comes with Webpack that promises to speed up our apps, but this is a buggy tool. I couldn't make it work. The time you'll waste fixing Webpack errors, you could be already building a faster app with React Native.

## Screenshots
<p align="center">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v2/master/screenshots/splashscreen.png" height="350" title="splash screen">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v2/master/screenshots/registerscreen.png" height="350" title="register screen">
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v2/master/screenshots/loginscreen.png" height="350" title="login screen">  
<img src="https://raw.githubusercontent.com/pierremacedo/android-safe-box-v2/master/screenshots/mainscreen.png" height="350" title="main screen">    
</p>

