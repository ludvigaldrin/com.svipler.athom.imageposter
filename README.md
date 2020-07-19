# Image Poster

Adds support for posting Image tokens to a web site. Example use is for storing camera images on a server.

# Usage
1. Add a flow Send a Image
2. Add the Image token
3. Add a URL
4. Run and check the server

# URL receiver
You need to create a page on the otherside that can recive a Form POST. Image will be stored with the ID "image". 
Here you can find a simple example: https://github.com/ludvigaldrin/com.svipler.athom.imageposter/blob/master/sendImage.php 
Upload it to your server and create a folder named images. Then point it out from the Flow e.g. http://yoururl.com/sendImage.php
There is some simple logging done.

If you need a simple Gallery this one can be used: http://sye.dk/sfpg/


# Installation
1. Clone repo
2. npm install
3. Install to Athom (athom app install)