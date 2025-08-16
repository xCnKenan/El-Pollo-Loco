// ist wie MovableObjects
class Buttons {
  x = 100;
  y = 100;
  img;
  height;
  width;

//   offset = {
//         top: 0, 
//         left: 0,
//         right: 0,
//         bottom: 0
//     };

  loadStartImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}
