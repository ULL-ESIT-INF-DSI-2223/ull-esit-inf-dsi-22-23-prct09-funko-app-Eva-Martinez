import 'mocha';
import { expect } from 'chai';
import { Funko } from '../src/funkoapp/funko';
import { AñadirFunko, EliminarFunko, EnseñarFunko, ExisteFunko, ExisteUsuario, ModificarFunko } from '../src/funkoapp/funko_app';

describe('Funko class tests', () => {
  it('Constructor test', () => {
    const funko = new Funko(1, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 5);
  });
});

describe('Funko app functions tests', () => {
  it('ExisteUsuario("Eva") returns true', () => {
    expect(ExisteUsuario("Eva")).to.be.eql(true);
  });

  it('ExisteUsuario("Pepe") returns false', () => {
    expect(ExisteUsuario("Pepe")).to.be.eql(false);
  });

  it('ExisteFunko("Eva", 1) returns true', () => {
    expect(ExisteFunko("Eva", 1)).to.be.eql(true);
  });

  it('ExisteFunko("Eva", 3) returns false', () => {
    expect(ExisteFunko("Eva", 3)).to.be.eql(false);
  });

  it('AñadirFunko("Eva", "IzukuMidoriya", 3, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 5) returns true', () => {
    expect(AñadirFunko("Eva", "IzukuMidoriya", 3, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 5)).to.be.eql(true);
  });

  it('AñadirFunko("Eva", "IzukuMidoriya", 1, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 5) returns false', () => {
    expect(AñadirFunko("Eva", "IzukuMidoriya", 1, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 5)).to.be.eql(false);
  });

  it('ModificarFunko("Eva", "IzukuMidoriya", 3, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 6) returns true', () => {
    expect(ModificarFunko("Eva", "IzukuMidoriya", 3, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 6)).to.be.eql(true);
  });

  it('ModificarFunko("Eva", "IzukuMidoriya", 5, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 6) returns false', () => {
    expect(ModificarFunko("Eva", "IzukuMidoriya", 5, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 6)).to.be.eql(false);
  });

  it('EliminarFunko("Eva", 3) returns true', () => {
    expect(EliminarFunko("Eva", 3)).to.be.eql(true);
  });

  it('EliminarFunko("Eva", 4) returns false', () => {
    expect(EliminarFunko("Eva", 4)).to.be.eql(false);
  });

  it('EnseñarFunko("Eva", 1) returns true', () => {
    expect(EnseñarFunko("Eva", 1)).to.be.eql(true);
  });

  it('EnseñarFunko("Eva", 3) returns false', () => {
    AñadirFunko("Eva", "IzukuMidoriya", 2, "Izuku Midoriya", "Izuku Midoriya en posición de ataque", "Pocket Pop! Keychain", "Anime", "My Hero Academia", 0, false, "Llavero", 5)
    expect(EnseñarFunko("Eva", 3)).to.be.eql(false);
  });
});