import React, { Component } from "react";
// import Dropzone from "react-dropzone";

const shapes = [
  <svg viewBox="0 0 100 150">
    <path d="M79.4,84.2 63.7,77.1 58.6,93.6 48.5,79.6 35.8,91.4 34,74.2 5,88.9 24.3,62.3 7.7,57.2 21.7,47.1 9.9,34.4   27.2,32.7 23.3,15.8 39.1,22.9 44.1,6.4 54.2,20.4 66.9,8.6 68.7,25.8 85.5,21.9 78.4,37.7 95,42.8 81,52.9 92.8,65.6 75.5,67.3 " />
  </svg>,
  <svg viewBox="0 0 100 125">
    <path d="M83,5.967H17c-6.601,0-12,5.396-12,12v40.998c0,6.604,5.399,12,12,12h23.001h10.5c1.099,0,2.638,0.639,3.413,1.418  l20.757,20.754c1.556,1.559,2.83,1.031,2.83-1.172v-18c0-1.646,1.349-3,3-3H83c6.602,0,12-5.396,12-12V17.967  C95,11.363,89.602,5.967,83,5.967z" />
  </svg>,
  <svg viewBox="0 0 100 125">
    <path d="M50 5C32.098 5 11.86 9.356 11.86 33.039c0 23.682 20.238 28.037 38.14 28.037 17.903 0 38.14-4.355 38.14-28.037C88.14 9.356 67.902 5 50 5zm0 58.79c-3.927 0-8.369.957-8.369 6.152 0 5.197 4.442 6.152 8.37 6.152 3.927 0 8.366-.955 8.366-6.152 0-5.195-4.439-6.151-8.367-6.151zm-5.138 15.016c-2.592 0-5.522.63-5.522 4.06 0 3.43 2.93 4.06 5.522 4.06 2.593 0 5.524-.63 5.524-4.06 0-3.43-2.931-4.06-5.524-4.06zM36.957 89.64c-1.71 0-3.644.415-3.644 2.679S35.247 95 36.957 95c1.712 0 3.646-.417 3.646-2.681 0-2.264-1.934-2.679-3.646-2.679z" />
  </svg>,
  <svg viewBox="0 0 100 125">
    <path d="M50.2 85c3.8 0 11.1-11.2 14-15.9.8-1.3 2.2-2 3.6-2h6c6.1 0 11-4.9 11-11V26c0-6.1-4.9-11-11-11H26.1c-6.1 0-11 4.9-11 11v30.1c0 6.1 4.9 11 11 11h6c1.5 0 2.9.8 3.6 2C38.7 73.8 46 85 49.8 85h.4z" />
  </svg>
];

const offsets = [
  { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
  { left: { x: 180, y: 650 }, right: { x: 570, y: 650 } },
  { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
  { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } }
];

class Person extends Component {
  shape = 1;
  scale = 0.5;

  onDrop(acceptedFiles) {
    acceptedFiles.map(file => {
      return true;
    });
  }

  render() {
    const top = this.props.box.top - offsets[this.shape].right.y;
    let left = this.props.box.left - offsets[this.shape].right.x;
    let flip = true;

    if (this.props.box.left > 720 * this.scale) {
      flip = false;
    } else {
      left = this.props.box.right - offsets[this.shape].left.x;
    }

    return (
      <div
        className={`bubble ${flip ? "flip" : ""}`}
        style={{
          left: left + "px",
          top: top * this.scale + "px",
          width: 100 * this.scale + "%"
        }}
      >
        {shapes[1]}
        <div className={`content-outer ${flip ? "flip" : ""}`}>
          <div className="content-inner">AI thought bubbles?</div>
        </div>
      </div>
    );
  }
}

export default Person;
