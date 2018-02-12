#What is Hack the Fridge?
Hack the Fridge is a smart fridge which takes pictures of items put into it, keeps track of their expiry date, and gives recipe ideas in an effort to reduce food waste. The fridge takes a picture of each food item as it is placed in the fridge and compiles a list of possible recipes based on that item and the items already in the fridge. It also records the date each food item was added and keeps track of their expiry.

![Hack the Fridge] (https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/534/926/datas/gallery.jpg)

To create the fridge itself, we dumpster dived outside of E5 to look for cardboard boxes and found plenty. The fridge is made entirely from materials found at Hack the North, including all the food items we used. We took pictures using a Raspberry Pi and camera with Python and sent them to a Node.js server on AWS. Each food item was stored as an object using MongoDB, the data was then presented on an iOS app created with Swift.

![Fridge with Pear] (https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/534/924/datas/gallery.jpg)

![Fridge App] (https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/534/984/datas/gallery.jpg)
