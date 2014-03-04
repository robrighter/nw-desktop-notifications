##NW Desktop Notifications

A simple system for creating desktop notifications for [node-webkit](https://github.com/rogerwang/node-webkit) applications.


##Usage

By including nw-desktop-notifications.js and nw-desktop-notifications.html in your project you can create desktop notifications for your application by calling:

	window.LOCAL_NW.desktopNotifications.notify(iconUrl, title, content, clickHandlerCallback);


##Running the demo

(1) Clone this project

(2) cd into the project

(3) install dependencies

    `npm install`

(4) make the nw zip file

	`gulp`

(5) Run the nw application

	`npm start`

(This assumes you have GulpJS installed on your path)


##Update the Look-and-Feel

You can update the look and feel of the desktop notifications by updating the css embedded (via style tag) in nw-desktop-notifications.html.