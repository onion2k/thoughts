/* global faceapi */

import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./Person.css";

// const faceDectect = faceapi.loadSsdMobilenetv1Model("/models");
const faceapiModel = faceapi.loadSsdMobilenetv1Model("/models").then(() => {
  return faceapi.loadFaceLandmarkModel("/models");
});

class Person extends Component {
  constructor() {
    super();
    this.imageRef = React.createRef();
  }
  onDrop(acceptedFiles, rejectedFiles) {
    acceptedFiles.map(file => {
      this.imageRef.current.src = URL.createObjectURL(file);
      this.detect();
      return true;
    });
  }
  detect() {
    faceapiModel
      .then(() => {
        const input = document.getElementById("person");
        return faceapi
          .detectAllFaces(input, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks();
      })
      .then(results => {
        const canvas = document.getElementById("markers");
        const input = document.getElementById("person");

        function resizeCanvasAndResults(dimensions, canvas, results) {
          const { width, height } = dimensions;
          canvas.width = width;
          canvas.height = height;
          return results.map(res => res.forSize(width, height));
        }

        function drawLandmarks(dimensions, canvas, results, withBoxes = true) {
          const resizedResults = resizeCanvasAndResults(
            dimensions,
            canvas,
            results
          );

          if (withBoxes) {
            faceapi.drawDetection(
              canvas,
              resizedResults.map(det => det.detection)
            );
          }

          const faceLandmarks = resizedResults.map(det => det.landmarks);
          const drawLandmarksOptions = {
            lineWidth: 2,
            drawLines: true,
            color: "green"
          };
          faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions);
        }

        drawLandmarks(input, canvas, results, true);
      });
  }
  componentDidMount() {
    this.detect();
  }
  render() {
    const person = require("./people/trump.jpg");

    return (
      <Dropzone
        accept="image/jpeg, image/png"
        multiple={false}
        className={"Dropzone"}
        onDrop={this.onDrop.bind(this)}
      >
        <div className="person">
          <img id="person" src={person} alt="Person" ref={this.imageRef} />
          <canvas id="markers" className="markers" />
        </div>
      </Dropzone>
    );
  }
}

export default Person;
