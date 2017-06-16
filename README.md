## How to use this App
1. From the command line run: 
    $ sudo npm install -g ionic cordova

2. Create a project folder and extract the project here. 
    From its package.json, remove all references of 'mx.ferreya.callnumber'.

3. cd into the project and inside it run:
    $ sudo npm install
    $ ionic cordova plugin add call-number
    $ sudo npm install --save @ionic-native/call-number

4. Then, to run it in a browser, cd into the extracted project and run:
Note: (no native support in browser, so some native features might not work) 
    $ ionic serve

5. To run it in a device or a simulator:

```bash
$ ionic cordova platform add ios
$ ionic cordova build ios
$ ionic cordova run ios
```

Note: Substitute ios for android if not on a Mac, and remove sudo from the commands if using Windows.

##About this app:
This app is a hybrid mobile app for viewing videos, giving quizzes and receiving notifications. It uses Ionic (Frontend) and Firebase (Backend), with ChartJS, SQLLite and ReactJS supplemental. 

