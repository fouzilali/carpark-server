/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randBool() {
  return Math.random() > 0.5;
}
function randIndex(arr) {
  return randInt(0, arr.length - 1);
}
export function randChoose(arr) {
  return arr[randIndex(arr)];
}

/**
 * Generate a random LP number
 */
export function randomLP() {
  if (randChoose([true, false])) {
    return "";
  }
  let characters = "ABCDEFGHJKLMNPRSTUVWXYZ";
  let a = randChoose(characters);
  let b = randChoose(characters);
  let n = randInt(100, 9999);

  return "" + a + b + n;
}

export default {
  array: [
    {
      spotID: "PS25",
      cameraID: "LG5-RowC3",
      lpNumber: "",
      mapXY: { x: 282, y: 590 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 152.015625, y: 447 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 413, y: 445 }
    },
    {
      spotID: "A1",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 413, y: 482 }
    },
    {
      spotID: "A2",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 413, y: 502 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 413, y: 537 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 413, y: 558 }
    },
    {
      spotID: "A1",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 413, y: 590 }
    },
    {
      spotID: "A2",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 413, y: 616 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 413, y: 643 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 370, y: 445 }
    },
    {
      spotID: "A1",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 370, y: 482 }
    },
    {
      spotID: "A2",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 370, y: 502 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 370, y: 537 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 370, y: 558 }
    },
    {
      spotID: "A1",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 370, y: 590 }
    },
    {
      spotID: "A2",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 370, y: 616 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 370, y: 643 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 282, y: 445 }
    },
    {
      spotID: "A1",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 282, y: 482 }
    },
    {
      spotID: "A2",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 282, y: 502 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 282, y: 537 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: "CK4269",
      mapXY: { x: 282, y: 558 }
    },
    {
      spotID: "A2",
      cameraID: "C1",
      lpNumber: "",
      mapXY: { x: 282, y: 616 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: "",
      mapXY: { x: 282, y: 643 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: "",
      mapXY: { x: 152.890625, y: 611 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 241.890625, y: 445 }
    },
    {
      spotID: "A1",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 240.890625, y: 482 }
    },
    {
      spotID: "A2",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 240.890625, y: 502 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: randomLP(),
      mapXY: { x: 241.890625, y: 537 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 241.890625, y: 558 }
    },
    {
      spotID: "A1",
      cameraID: "C2",
      lpNumber: "",
      mapXY: { x: 241.890625, y: 590 }
    },
    {
      spotID: "A2",
      cameraID: "C1",
      lpNumber: "",
      mapXY: { x: 241.890625, y: 616 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: "",
      mapXY: { x: 241.890625, y: 643 }
    },
    {
      spotID: "A1",
      cameraID: "C2",
      lpNumber: "",
      mapXY: { x: 153.890625, y: 589 }
    },
    {
      spotID: "A2",
      cameraID: "C1",
      lpNumber: "HA1034",
      mapXY: { x: 153.890625, y: 557 }
    },
    {
      spotID: "A1",
      cameraID: "C1",
      lpNumber: "HA1024",
      mapXY: { x: 153.890625, y: 537 }
    },
    {
      spotID: "A2",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 153.890625, y: 501 }
    },
    {
      spotID: "A1",
      cameraID: "C2",
      lpNumber: randomLP(),
      mapXY: { x: 153.890625, y: 481 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 241.015625, y: 390 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 241.890625, y: 369 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 282.890625, y: 369 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 281.875, y: 391 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 370.875, y: 390 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 371.875, y: 369 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 410.875, y: 370 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 411.875, y: 390 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 497.875, y: 388 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 495.875, y: 425 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 495.875, y: 446 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 495.875, y: 481 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 496.875, y: 501 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 496.875, y: 536 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 496.875, y: 556 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 495.875, y: 593 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 495.875, y: 613 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 496.875, y: 648 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 496.875, y: 669 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 523.875, y: 243 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 523.875, y: 208 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 523.875, y: 187 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 767.875, y: 155 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 768.875, y: 175 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 767.875, y: 222 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 767.875, y: 242 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 768.875, y: 268 }
    },
    {
      spotID: "A3",
      cameraID: "C3",
      lpNumber: randomLP(),
      mapXY: { x: 768.875, y: 288 }
    }
  ]
};
