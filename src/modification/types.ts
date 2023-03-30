export type Elemento = {
  n_elemento: number;
  peso: number;
  beneficio: number;
}

export type Mochila = {
  capacidad: number;
  n_elementos: number;
  elementos: Elemento[];
}