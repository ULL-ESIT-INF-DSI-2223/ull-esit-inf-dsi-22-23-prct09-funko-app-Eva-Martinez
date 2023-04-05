/**
 * Clase `Funko` utilizada para crear objetos Funko.
 */
export class Funko {
  // Atributos privados
  private id: number;
  private nombre: string;
  private descripcion: string;
  private tipo: string;
  private genero: string;
  private franquicia: string;
  private numero: number;
  private exclusivo: boolean;
  private caracteristicas_especiales: string;
  private valor_mercado: number;

  /**
   * Constructor de la clase Funko.
   * @param id ID del Funko en el listado.
   * @param nombre Nombre del Funko.
   * @param descripcion Descripción del Funko.
   * @param tipo Tipo del Funko.
   * @param genero Género del Funko.
   * @param franquicia Franquicia del Funko.
   * @param numero Número del Funko.
   * @param exclusivo Condición para Funkos exclusivos.
   * @param caracteristicas_especiales Características especiales del Funko. 
   * @param valor_mercado Valor de mercado del Funko.
   */
  constructor(id: number, nombre: string, descripcion: string, tipo: string, genero: string, franquicia: string, numero: number, exclusivo: boolean, caracteristicas_especiales: string, valor_mercado: number) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.genero = genero;
    this.franquicia = franquicia;
    this.numero = numero;
    this.exclusivo = exclusivo;
    this.caracteristicas_especiales = caracteristicas_especiales;
    this.valor_mercado = valor_mercado;
  }
}