import { MochilaAlgorithm } from "./template.js";
import { OperacionesAlgorithm } from "./operaciones.js";

function clientCode(mochilaAlgorithm: MochilaAlgorithm) {
  mochilaAlgorithm.run();
}

clientCode(new OperacionesAlgorithm("mochila.csv"));