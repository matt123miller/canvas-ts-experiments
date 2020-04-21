
import { BouncingBall } from "./ball";

function main() {

  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  // new whatever(canvas) pass the canvas in
  const b = new BouncingBall(canvas);
  var a = 1
  console.log(a);
  
  setTimeout(() => {
    b.stop();
  }, 3000);

  setTimeout(() => {
    b.start()
  }, 5000);
}

main();
