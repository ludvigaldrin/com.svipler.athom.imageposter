"use strict";

const Homey = require("homey");
const { PassThrough } = require("stream");
const fetch = require("node-fetch");
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
    let sendImage = this.homey.FlowCardAction("sendimage");
    sendImage.register().registerRunListener(async (args, state) => {
      console.log("[SEND IMAGE] " + JSON.stringify(args));

      let image = "image";
      let URL = args.URL;

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

      const response = await fetch(URL, {
        method: "POST",
        body: form.pipe(new PassThrough()),
        headers: form.getHeaders(),
      });

      if (!response.ok) {
        console.log("Response:", await response.text());
        return false;
      } else {
        console.log("Response:", await response.text());
      }

      //const body = await response.json();
      return response.ok;
    });
  }
}

module.exports = ImagePoster;
