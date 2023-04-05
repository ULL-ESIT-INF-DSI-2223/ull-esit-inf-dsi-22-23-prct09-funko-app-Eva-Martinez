// Import chalk
import * as chalk from 'chalk';
// Import Funko class
import { Funko } from './funko';
// Import fs
import * as fs from 'fs';

// Constantes

/**
 * Constante `log` utilizada para el paquete chalk.
 */
const log = console.log;

/**
 * Constante `ruta` utilizada para las operaciones con la base de datos.
 */
const ruta = "./src/funkoapp/basededatos";

// Funciones

/**
 * Función que comprueba si existe un usuario en concreto.
 * @param usuario Usuario a comprobar su existencia.
 * @returns True si el usuario existe o false si no existe.
 */
export function ExisteUsuario(usuario: string): boolean {
  const elementos = fs.readdirSync(ruta);
  for (const elemento of elementos) {
    const informacion = fs.statSync(`${ruta}/${elemento}`);
    if (informacion.isDirectory() && elemento == usuario) {
      return true;
    }
  }
  return false;
}

/**
 * Función que comprueba si existe un funko en concreto en la colección del usuario correspondiente.
 * @param usuario Usuario con la colección a examinar.
 * @param id Id del funko a analizar.
 * @returns True si existe el funko o false si no existe.
 */
export function ExisteFunko(usuario: string, id: number): boolean {
  const elementos = fs.readdirSync(`${ruta}/${usuario}`);
  const ref: string[] = [];
  if (elementos !== ref) {
    for (const elemento of elementos) {
      const archivo = `${ruta}/${usuario}/${elemento}`;
      const contenido = fs.readFileSync(archivo, 'utf-8');
      const json = JSON.parse(contenido);
      const elemento_id = json.id;
      if (elemento_id === id) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Función que crea un objeto funko y lo añade a la colección del usuario en la base de datos.
 * @param usuario Usuario al que añadir a su colección el funko.
 * @param fichero Nombre del fichero json con el funko.
 * @param id Id del funko.
 * @param nombre Nombre del funko.
 * @param descripcion Descripción del funko.
 * @param tipo Tipo del funko.
 * @param genero Género del funko.
 * @param franquicia Franquicia del funko.
 * @param numero Número del funko.
 * @param exclusivo Exclusivo del funko.
 * @param caracteristicas_especiales Características especiales del funko.
 * @param valor_mercado Valor mercado del funko.
 * @returns True si se ha creado el funko o false si no se ha creado porque ya existe el id.
 */
export function AñadirFunko(usuario: string, fichero: string, id: number, nombre: string, descripcion: string, tipo: string, genero: string, franquicia: string, numero: number, exclusivo: boolean, caracteristicas_especiales: string, valor_mercado: number): boolean {
  if (ExisteFunko(usuario, id)) {
    return false;
  } else {
    const funko: Funko = new Funko(id, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicas_especiales, valor_mercado);
    const rutaFichero = `${ruta}/${usuario}/${fichero}.json`;
    try {
      fs.writeFileSync(rutaFichero, JSON.stringify(funko));
      return true;
    } catch (error) {
      return false;
    }
  }
}

/**
 * Función que modifica un objeto funko y lo actualiza a la colección del usuario en la base de datos.
 * @param usuario Usuario al que modificar el funko de su colección.
 * @param fichero Nombre del fichero json con el funko.
 * @param id Id del funko.
 * @param nombre Nombre del funko.
 * @param descripcion Descripción del funko.
 * @param tipo Tipo del funko.
 * @param genero Género del funko.
 * @param franquicia Franquicia del funko.
 * @param numero Número del funko.
 * @param exclusivo Exclusivo del funko.
 * @param caracteristicas_especiales Características especiales del funko.
 * @param valor_mercado Valor mercado del funko.
 * @returns True si se ha modificado el funko o false si no se ha modificado porque ya existe el id.
 */
export function ModificarFunko(usuario: string, fichero: string, id: number, nombre: string, descripcion: string, tipo: string, genero: string, franquicia: string, numero: number, exclusivo: boolean, caracteristicas_especiales: string, valor_mercado: number): boolean {
  if (ExisteFunko(usuario, id)) {
    EliminarFunko(usuario, id);
    AñadirFunko(usuario, fichero, id, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicas_especiales, valor_mercado);
    return true;
  } else {
    return false;
  }
}

/**
 * Función que elimina un funko de la colección del usuario.
 * @param usuario Usuario al que eliminar el funko de su colección.
 * @param id Id del funko.
 * @returns True si se ha eliminado el funko o false si no se ha modificado.
 */
export function EliminarFunko(usuario: string, id: number): boolean {
  if (ExisteFunko(usuario, id)) {
    let rutaArchivo = ``;
    const elementos = fs.readdirSync(`${ruta}/${usuario}`);
    for (const elemento of elementos) {
      const archivo = `${ruta}/${usuario}/${elemento}`;
      const contenido = fs.readFileSync(archivo, 'utf-8');
      const json = JSON.parse(contenido);
      const elemento_id = json.id;
      if (elemento_id === id) {
        rutaArchivo = archivo;
      }
    }
    fs.unlinkSync(rutaArchivo);
    return true;
  } else {
    return false;
  }
}

/**
 * Función que enseña los atributos de un funko determinado de la colección del usuario.
 * @param usuario Usuario con el funko a mostrar.
 * @param id Id del funko a mostrar.
 * @returns True si se muestra el funko o false si no
 */
export function EnseñarFunko(usuario: string, id: number): boolean {
  if (ExisteFunko(usuario, id)) {
    const elementos = fs.readdirSync(`${ruta}/${usuario}`);
    for (const elemento of elementos) {
      const archivo = `${ruta}/${usuario}/${elemento}`;
      const contenido = fs.readFileSync(archivo, 'utf-8');
      const json = JSON.parse(contenido);
      if (json.id === id) {
        log(chalk.white("---------------------------------"));
        log(chalk.white("ID: " + json.id));
        log(chalk.white("Nombre: " + json.nombre));
        log(chalk.white("Descripción: " + json.descripcion));
        log(chalk.white("Tipo: " + json.tipo));
        log(chalk.white("Género: " + json.genero));
        log(chalk.white("Franquicia: " + json.franquicia));
        log(chalk.white("Número " + json.numero));
        if (json.exclusivo) {
          log(chalk.yellow("Exclusivo!"));
        }
        log(chalk.white("Caracterísiticas Especiales: " + json.caracteristicas_especiales));
        if (json.valor_mercado <= 5) {
          log(chalk.white("Valor Mercado: " + chalk.red(json.valor_mercado) + "€"));
        } else if (json.valor_mercado > 5 && json.valor_mercado <= 10) {
          log(chalk.white("Valor Mercado: " + chalk.yellow(json.valor_mercado) + "€"));
        } else if (json.valor_mercado > 10 && json.valor_mercado <= 15) {
          log(chalk.white("Valor Mercado: " + chalk.green(json.valor_mercado) + "€"));
        } else {
          log(chalk.white("Valor Mercado: " + chalk.magenta(json.valor_mercado) + "€"));
        }
        log(chalk.white("---------------------------------"));
      }
    }
    return true;
  } else {
    return false; 
  }
}