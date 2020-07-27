# Image Poster
Adds support for posting Image Token's to a web site. Example use is for storing camera images on a web server.

# What is a Image Token?
Image Token is an object defined in Homey SDK: https://apps-sdk-v2.developer.athom.com/tutorial-Flow-Tokens-Image.html

# Usage
1. Add a flow Send a Image
2. Add the Image token
3. Add a URL
4. Run and check the server

# URL receiver
You need to create a page on the "other side" that can receive a Form POST. Image will be stored with the ID "image".
Here you can find a simple example: https://github.com/ludvigaldrin/com.svipler.athom.imageposter/blob/master/example/sendImage.php
Upload it to your server and create a folder named images. Then point it out from the Flow e.g. http://yoururl.com/sendImage.php
There is some simple logging done.

If you need a simple Gallery this one can be used: http://sye.dk/sfpg/
