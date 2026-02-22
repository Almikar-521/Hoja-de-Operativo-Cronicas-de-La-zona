
import { Skill } from './types';
export { WEAPONS_CATALOG, WEAPON_PROPERTIES_GLOSSARY } from './data_weapons';
export { ARMOR_CATALOG, HEAD_CATALOG, FACE_CATALOG, EYES_CATALOG, EARS_CATALOG, RIG_CATALOG, BACKPACK_CATALOG } from './data_armor';
export { ITEMS_CATALOG } from './data_items';
export { TALENTS_CATALOG, TRAITS_CATALOG, MUTATIONS_CATALOG, PROTOCOLS_CATALOG } from './data_abilities';

export const CLASSES = ['Tank', 'DPS', 'Support'];

export const RADIATION_EFFECTS = [
    { level: 0, desc: "Sin efectos nocivos.", effect: "" },
    { level: 1, desc: "Leve", effect: "Desventaja en Pruebas de Habilidad. Náuseas, sabor metálico." },
    { level: 2, desc: "Moderado", effect: "Velocidad reducida a la mitad. Fatiga profunda, dolor articular." },
    { level: 3, desc: "Alto", effect: "Desventaja en Ataques y Salvaciones. Visión borrosa, vértigo, migrañas." },
    { level: 4, desc: "Severo", effect: "HP Máximo reducido a la mitad. Vómito de sangre, desorientación." },
    { level: 5, desc: "Letal", effect: "HP cae a 0. Shock, fallo orgánico, colapso." }
];

export const EXHAUSTION_EFFECTS = [
    { level: 0, desc: "Descansado", effect: "Sin efectos." },
    { level: 1, desc: "Fatiga Leve", effect: "Desventaja en Pruebas de Habilidad." },
    { level: 2, desc: "Fatiga Moderada", effect: "Velocidad reducida a la mitad." },
    { level: 3, desc: "Fatiga Severa", effect: "Desventaja en Ataques y Salvaciones." },
    { level: 4, desc: "Fallo Sistémico", effect: "HP Máximo reducido a la mitad." },
    { level: 5, desc: "Colapso", effect: "Velocidad reducida a 0." },
    { level: 6, desc: "Muerte", effect: "Muerte instantánea." }
];

export const MAGIC_STRESS_EFFECTS = [
    { level: 0, desc: "Estable", effect: "" },
    { level: 1, desc: "Migraña", effect: "-1 a Ataques/Percepción" },
    { level: 2, desc: "Temblor", effect: "Desventaja en DEX y Ataques Rango" },
    { level: 3, desc: "Hemorragia", effect: "1d4 daño necrótico inmediato" },
    { level: 4, desc: "Visión Borrosa", effect: "Rango de visión a la mitad" },
    { level: 5, desc: "Fatiga", effect: "1 Nivel de Exhaustion" },
    { level: 6, desc: "Shock", effect: "Aturdido hasta fin de turno" }
];

export const CONDITIONS_CATALOG = [
  { id: 'Sangrado', name: 'Sangrado', effect: 'Pierdes 1d4 HP al inicio de cada turno. Requiere Venda o Medicina (CD 12).' },
  { id: 'Fractura', name: 'Fractura', effect: 'Desventaja en pruebas de Fuerza/Destreza. Velocidad reducida -10 pies.' },
  { id: 'Dolor', name: 'Dolor', effect: 'Desventaja en tiradas de Ataque y Concentración. (Se cura con Morfina).' },
  { id: 'Cegado', name: 'Cegado', effect: 'Fallas auto pruebas de visión. Ataques contra ti tienen Ventaja. Tus ataques tienen Desventaja.' },
  { id: 'Aturdido', name: 'Aturdido', effect: 'Incapacitado (no puedes moverte ni actuar). Fallas automáticamente salvaciones de Fuerza y Destreza.' },
  { id: 'Miedo', name: 'Miedo', effect: 'Desventaja en Habilidad/Ataque mientras ves la fuente. No puedes acercarte.' },
  { id: 'Agarrado', name: 'Agarrado (Grappled)', effect: 'Velocidad 0.' },
  { id: 'Envenenado', name: 'Envenenado', effect: 'Desventaja en Ataques y Habilidad. Daño periódico según veneno.' },
];

export const SKILLS_LIST: Skill[] = [
  { id: 'athletics', name: 'Atletismo', attr: 'STR' },
  { id: 'acrobatics', name: 'Acrobacias', attr: 'DEX' },
  { id: 'stealth', name: 'Sigilo', attr: 'DEX' },
  { id: 'sleight_hand', name: 'Juego de Manos', attr: 'DEX' },
  { id: 'investigation', name: 'Investigación', attr: 'INT' },
  { id: 'tech', name: 'Ciencias/Tecnología', attr: 'INT' },
  { id: 'history', name: 'Historia', attr: 'INT' },
  { id: 'insight', name: 'Perspicacia', attr: 'WIS' },
  { id: 'medicine', name: 'Medicina', attr: 'WIS' },
  { id: 'perception', name: 'Percepción', attr: 'WIS' },
  { id: 'survival', name: 'Supervivencia', attr: 'WIS' },
  { id: 'nature', name: 'Naturaleza', attr: 'INT' },
  { id: 'religion', name: 'Religión', attr: 'INT' },
  { id: 'deception', name: 'Engaño', attr: 'CHA' },
  { id: 'intimidation', name: 'Intimidación', attr: 'CHA' },
  { id: 'persuasion', name: 'Persuasión', attr: 'CHA' },
];
