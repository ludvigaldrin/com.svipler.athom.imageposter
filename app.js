"use strict";

const Homey = require("homey");
const { PassThrough } = require("stream");
const axios = require('axios')
const FormData = require("form-data");

const CONTENT_TYPES = {
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
};

class ImagePoster extends Homey.App {
  async onInit() {
    this.log("Image Poster is running...");

    this.initializeActions();
  }

  async initializeActions() {
    const sendImageCard = this.homey.flow.getActionCard("sendimage");
    sendImageCard.registerRunListener(async (args, state) => {
      console.log("[SEND IMAGE] " + JSON.stringify(args));

      const image = args.droptoken;
      const URL = args.URL;

      const form = new FormData();
      if (image.getStream) {
        console.log("get stream");

        const stream = await image.getStream();
        form.append("image", stream, {
          contentType: stream.contentType,
          filename: stream.filename,
          name: "image",
        });
      } else {
        //backwards compatibility

        const buf = await image.getBuffer();

        if (typeof buf === "string") {
          form.append("image", buf);
        } else {
          form.append("image", buf, {
            contentType: CONTENT_TYPES[image.getFormat()],
            filename: "x." + image.getFormat(),
            name: "image",
          });
        }
      }
      console.log("Send stream to: ", URL)
      const response = await axios({
        url: URL,
        method: "POST",
        data: form.pipe(new PassThrough()),
        headers: form.getHeaders(),
      });


      if (response.statusText !== "OK") {
        console.log("Response NOT OK:", response.data());
        return false;
      } else {
        console.log("Response:", response.data());
        return true;
      }
    });
  }
}

module.exports = ImagePoster;
