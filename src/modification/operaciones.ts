import { Elemento, Mochila } from "./types.js";
import { MochilaAlgorithm } from "./template.js";

export class OperacionesAlgorithm extends MochilaAlgorithm {
  constructor(protected override fichero: string) {
    super(fichero);
  }

  protected procesar(fichero: string): number[][] | undefined {
    const formato = fichero.split('.');
    if (formato[1] === "csv") {
      const beneficios: number[] = [];
      const pesos: number[] = [];
      const lectura = this.lectura();
      const capacidad = +lectura[0];
      const n_elementos = +lectura[1];
      const elementos: Elemento[] = [];
      for (let i = 2; i < n_elementos; i++) {
        const n_elemento = +lectura[i];
        i++;
        const peso = +lectura[i];
        i++;
        const beneficio = +lectura[i];
        const elemento: Elemento = {n_elemento, peso, beneficio};
        elementos.push(elemento);
      }
      const mochila: Mochila = {capacidad, n_elementos, elementos};
      for (let i = 0; i < mochila.n_elementos; i++) {
        beneficios.push(mochila.elementos[i].beneficio);
        pesos.push(mochila.elementos[i].peso);
      }
      const resultados = [beneficios, pesos];
      return resultados;
    } else if (formato[1] == "json") {
      const beneficios: number[] = [];
      const pesos: number[] = [];
      const lectura = this.lectura();
    } else {
      return undefined;
    }
  }
}