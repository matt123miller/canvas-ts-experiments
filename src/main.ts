
import ComplexHexagonEngine from "./ComplexHexagonEngine";
import SimpleHexagonEngine from "./SimpleHexagonEngine";
import { HexagonEngine } from "./Interfaces";

// Probably not necessary
enum EngineTypes {
  Simple = 'Simple',
  Complex = 'Complex'
}

let engine: HexagonEngine;
let canvas: HTMLCanvasElement;


canvas = <HTMLCanvasElement>document.getElementById('canvas');

engine = new ComplexHexagonEngine(canvas);

document.getElementById('SimpleEngine').addEventListener('click', () => {
  engine.stop();
  engine = new SimpleHexagonEngine(canvas);
  engine.start();
});

document.getElementById('ComplexEngine').addEventListener('click', () => {
  engine.stop();
  engine = new ComplexHexagonEngine(canvas);
  engine.start();
});




// main();
