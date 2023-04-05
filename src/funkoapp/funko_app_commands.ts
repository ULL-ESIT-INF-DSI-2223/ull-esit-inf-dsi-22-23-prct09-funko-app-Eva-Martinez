// Import chalk
import * as chalk from 'chalk';
// Imports yargs
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
// Import fs
import * as fs from 'fs';
// Import exit
import { exit } from 'process';
// Import funciones funko_app.ts
import { ExisteUsuario, AñadirFunko, ModificarFunko, EliminarFunko, EnseñarFunko } from './funko_app';

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
 * Función que crea la ruta del usuario en la base de datos
 * @param usuario Usuario cuya ruta crear.
 */
export function CrearUsuario(usuario: string): void {
  fs.mkdirSync(`${ruta}/${usuario}`, { recursive: true });
}

/**
 * Función que lista la colección de funkos del usuario.
 * @param usuario Usuario con la colección a mostrar.
 */
export function ListarColeccionFunkos(usuario: string): void {
  const elementos = fs.readdirSync(`${ruta}/${usuario}`);
  for (const elemento of elementos) {
    const archivo = `${ruta}/${usuario}/${elemento}`;
    const contenido = fs.readFileSync(archivo, 'utf-8');
    const json = JSON.parse(contenido);
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
    log(chalk("Caracterísiticas Especiales: " + json.caracteristicas_especiales));
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

// Comandos

/**
 * Commando `add` utilizado para la adición de funkos a la colección.
 */
yargs(hideBin(process.argv))
  .command('add', 'Añade un Funko', {
    usuario: {
      description: 'Usuario',
      type: 'string',
      demandOption: true
    },
    fichero: {
      description: 'Nombre del fichero con el funko',
      type: 'string',
      demandOption: true
    },
    id: {
      description: 'ID del Funko',
      type: 'number',
      demandOption: true
    },
    nombre: {
      description: 'Nombre del Funko',
      type: 'string',
      demandOption: true
    },
    descripcion: {
      description: 'Descripción del Funko',
      type: 'string',
      demandOption: true
    },
    tipo: {
      description: 'Tipo del Funko',
      type: 'string',
      demandOption: true
    },
    genero: {
      description: 'Género del Funko',
      type: 'string',
      demandOption: true
    },
    franquicia: {
      description: 'Franquicia del Funko',
      type: 'string',
      demandOption: true
    },
    numero: {
      description: 'Número del Funko',
      type: 'number',
      demandOption: true
    },
    exclusivo: {
      description: 'Condición para Funkos exclusivos',
      type: 'boolean',
      demandOption: true
    },
    caracteristicasEspeciales: {
      description: 'Características especiales del Funko',
      type: 'string',
      demandOption: true
    },
    valorMercado: {
      description: 'Valor de mercado del Funko',
      type: 'number',
      demandOption: true
    }
  }, (argv) => {
    if (ExisteUsuario(argv.usuario)) {
      if(AñadirFunko(argv.usuario, argv.fichero, argv.id, argv.nombre, argv.descripcion, argv.tipo, argv.genero, argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicasEspeciales, argv.valorMercado)) {
        log(chalk.green("El funko insertado se ha agregado exitosamente a la colección!"));
        exit(0);
      } else {
        log(chalk.red("El funko insertado ya existe en la colección!"));
        exit(0);
      }
    } else {
      CrearUsuario(argv.usuario);
      if(AñadirFunko(argv.usuario, argv.fichero, argv.id, argv.nombre, argv.descripcion, argv.tipo, argv.genero, argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicasEspeciales, argv.valorMercado)) {
        log(chalk.green("El funko insertado se ha agregado exitosamente a la colección!"));
        exit(0);
      } else {
        log(chalk.red("El funko insertado ya existe en la colección!"));
        exit(0);
      }
    }
  })
  .help()
  .argv;

/**
 * Commando `modify` utilizado para la modificación de un funko de la colección.
 */
yargs(hideBin(process.argv))
  .command('modify', 'Modifica un Funko', {
    usuario: {
      description: 'Usuario',
      type: 'string',
      demandOption: true
    },
    fichero: {
      description: 'Nombre del fichero con el funko',
      type: 'string',
      demandOption: true
    },
    id: {
      description: 'ID del Funko',
      type: 'number',
      demandOption: true
    },
    nombre: {
      description: 'Nombre del Funko',
      type: 'string',
      demandOption: true
    },
    descripcion: {
      description: 'Descripción del Funko',
      type: 'string',
      demandOption: true
    },
    tipo: {
      description: 'Tipo del Funko',
      type: 'string',
      demandOption: true
    },
    genero: {
      description: 'Género del Funko',
      type: 'string',
      demandOption: true
    },
    franquicia: {
      description: 'Franquicia del Funko',
      type: 'string',
      demandOption: true
    },
    numero: {
      description: 'Número del Funko',
      type: 'number',
      demandOption: true
    },
    exclusivo: {
      description: 'Condición para Funkos exclusivos',
      type: 'boolean',
      demandOption: true
    },
    caracteristicasEspeciales: {
      description: 'Características especiales del Funko',
      type: 'string',
      demandOption: true
    },
    valorMercado: {
      description: 'Valor de mercado del Funko',
      type: 'number',
      demandOption: true
    }
  }, (argv) => {
    if(ExisteUsuario(argv.usuario)) {
      if(ModificarFunko(argv.usuario, argv.fichero, argv.id, argv.nombre, argv.descripcion, argv.tipo, argv.genero, argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicasEspeciales, argv.valorMercado)) {
        log(chalk.green("El funko insertado se ha modificado exitosamente!"));
        exit(0);
      } else {
        log(chalk.red("El funko insertado no existe en la colección!"));
        exit(0);
      }
    } else {
      log(chalk.red("El usuario insertado no existe!"));
      exit(0);
    }
  })
  .help()
  .argv;

/**
 * Commando `delete` utilizado para la eliminación de un funko de la colección.
 */
yargs(hideBin(process.argv))
  .command('delete', 'Elimina un Funko', {
    usuario: {
      description: 'Usuario',
      type: 'string',
      demandOption: true
    },
    id: {
      description: 'ID del Funko',
      type: 'number',
      demandOption: true
    }
  }, (argv) => {
    if(ExisteUsuario(argv.usuario)) {
      if(EliminarFunko(argv.usuario, argv.id)) {
        log(chalk.green("El funko insertado se ha eliminado exitosamente!"));
        exit(0);
      } else {
        log(chalk.red("El funko insertado no existe en la colección!"));
        exit(0);
      }
    } else {
      log(chalk.red("El usuario insertado no existe!"));
      exit(0);
    }
  })
  .help()
  .argv;

/**
 * Commando `list` utilizado para la listar los funkos de la colección.
 */
yargs(hideBin(process.argv))
.command('list', 'Lista la colección de Funkos', {
  usuario: {
    description: 'Usuario',
    type: 'string',
    demandOption: true
  }
}, (argv) => {
  if(ExisteUsuario(argv.usuario)) {
    ListarColeccionFunkos(argv.usuario);
    exit(0);
  } else {
    log(chalk.red("El usuario insertado no existe!"));
    exit(0);
  }
})
.help()
.argv;

/**
 * Commando `show` utilizado para la mostrar la información de un funko de la colección.
 */
yargs(hideBin(process.argv))
  .command('show', 'Muestra la información de un Funko', {
    usuario: {
      description: 'Usuario',
      type: 'string',
      demandOption: true
    },
    id: {
      description: 'ID del Funko',
      type: 'number',
      demandOption: true
    }
  }, (argv) => {
    if(ExisteUsuario(argv.usuario)) {
      if(!EnseñarFunko(argv.usuario, argv.id)) {
        log(chalk.red("El funko insertado no existe en la colección!"));
        exit(0);
      }
    } else {
      log(chalk.red("El usuario insertado no existe!"));
      exit(0);
    }
  })
  .help()
  .argv;