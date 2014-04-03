## Customized Desktop Notifications -

A customized desktop notifications system for [node-webkit](https://github.com/rogerwang/node-webkit) applications.

## Getting Started

1. Include the javascript `nw-desktop-notifications.js` in your application

2. Include the HTML template `dea-notifications.html` in your application

3. Create a notification using the API: `DEA.notifications.create(id, options, callback);`

##Running the demo

(1) Clone this project

(2) cd into the project

(3) Make the nw zip file by running the bash script

	./make-nw.sh

(4) Run the nw application

	node-webkit desktop-notify.nw

## Application Flow

1. Call the API to create a new notification.

2. `nw-desktop-notifications.js` creates the HTML template using the user provided content

3. `nw-desktop-notifications.js` created the notification and appends the template to the created notification window.

4. `dea-notifications.html` is simply the container for the content. It handles closing itself and sending off interaction events back to the parent who initiated the notification.

## Notification Types

### Text

![Text Notification](http://i.imgur.com/zibFWHf.png)

### Image

![Image Notification](http://i.imgur.com/d8lJOy7.png)
