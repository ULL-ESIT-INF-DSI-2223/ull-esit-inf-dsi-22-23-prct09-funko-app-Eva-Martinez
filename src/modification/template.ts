import fs from 'fs';
import { Mochila } from "./types.js";

export abstract class MochilaAlgorithm {
  protected mochila: Mochila;

  constructor(protected fichero: string) {
    this.mochila;
  }

  public run() {
    this.procesar(this.fichero);
  }

  protected abstract procesar(fichero: string): number[][] | undefined;

  protected lectura() {
    const elements: Buffer[] = []
    fs.promises.readFile(this.fichero).then(function(result) {
      elements.push(result)
    })
    .catch(function(error) {
      console.log(error);
    })
    return elements;
  }
}