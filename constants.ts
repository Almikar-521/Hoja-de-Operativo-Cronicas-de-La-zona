
import { Armor, Protocol, Weapon, Item, Talent, Trait, Skill, Mutation } from './types';

export const CLASSES = ['Tank', 'DPS', 'Support'];

export const RADIATION_EFFECTS = [
    { level: 0, desc: "Sin efectos nocivos.", effect: "" },
    { level: 1, desc: "Sabor metálico, náuseas leves.", effect: "Desventaja en Pruebas de Habilidad." },
    { level: 2, desc: "Piel quemada, articulaciones crujen.", effect: "Velocidad reducida a la mitad." },
    { level: 3, desc: "Hemorragias, visión borrosa.", effect: "Desventaja en Ataques y Salvaciones." },
    { level: 4, desc: "Vómito de sangre, fallo sistémico.", effect: "HP Máximo reducido a la mitad." },
    { level: 5, desc: "Colapso total de órganos.", effect: "HP cae a 0. Salvaciones de Muerte." }
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
  { id: 'Fatiga', name: 'Fatiga', effect: 'Desventaja en Pruebas de Habilidad. (Nivel 1 de Agotamiento).' },
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

export const MUTATIONS_CATALOG: Mutation[] = [
    { id: 'mut_glass_skin', name: 'Piel de Vidrio', type: 'Corporeal', effect: 'Ventaja en Intimidación.', downside: 'Vulnerable a daño Contundente.' },
    { id: 'mut_photosensitivity', name: 'Fotosensibilidad', type: 'Corporeal', effect: 'Visión Oscura 60ft.', downside: 'Desventaja bajo luz solar directa.' },
    { id: 'mut_furnace', name: 'Metabolismo Horno', type: 'Corporeal', effect: 'Inmune al frío natural.', downside: 'Requiere x4 comida/agua o ganas Fatiga.' },
    { id: 'mut_acid_blood', name: 'Sangre Ácida', type: 'Corporeal', effect: 'Al recibir daño físico, 1d4 ácido a 5 pies.', downside: 'Dañas tu propia armadura (reparación costosa).' },
    { id: 'mut_whispers', name: 'Susurros', type: 'Psionic', effect: 'Inmune a Sorpresa.', downside: 'Desventaja en Concentración.' },
    { id: 'mut_magnetism', name: 'Magnetismo', type: 'Cosmic', effect: '+1 CA contra armas de fuego.', downside: '-1 Sigilo si llevas metal.' },
    { id: 'mut_spider_fingers', name: 'Dedos Arácnidos', type: 'Corporeal', effect: 'Ventaja Juego de Manos.', downside: 'Desventaja armas pequeñas.' },
    { id: 'mut_static_aura', name: 'Aura Estática', type: 'Cosmic', effect: 'Resistencia Eléctrica.', downside: 'Dañas electrónica cercana.' },
    { id: 'mut_hollow_bones', name: 'Huesos de Pájaro', type: 'Corporeal', effect: '+10ft Velocidad.', downside: '-2 Salvaciones Fuerza. Carga a la mitad.' },
    { id: 'mut_bark_skin', name: 'Piel Corteza', type: 'Corporeal', effect: 'CA Base 13 + Des (max 2).', downside: 'Desventaja Acrobacias.' },
    { id: 'mut_gills', name: 'Branquias', type: 'Corporeal', effect: 'Inmune gases.', downside: 'Desventaja respirando aire limpio prolongado.' },
    { id: 'mut_living_shadow', name: 'Sombra Viva', type: 'Cosmic', effect: 'Ventaja Sigilo (oscuro).', downside: 'Desventaja Iniciativa.' },
    { id: 'mut_phase', name: 'Desfase', type: 'Cosmic', effect: 'Teleport 15ft (bonus).', downside: 'Recibes 1d6 daño al usarlo.' },
    { id: 'mut_prey_scent', name: 'Olor de Presa', type: 'Corporeal', effect: 'Ventaja rastrear.', downside: 'Mutantes te focusean.' },
    { id: 'mut_reactor_heart', name: 'Corazón Reactor', type: 'Corporeal', effect: 'Inmune Radiación.', downside: 'Irradias a aliados cercanos.' },
    { id: 'mut_addiction', name: 'Adicción', type: 'Corporeal', effect: 'Comes EA en vez de comida.', downside: 'Coste mantenimiento elevado.' },
    { id: 'mut_radio_voice', name: 'Voz Radio', type: 'Psionic', effect: 'Hablas por radio mental.', downside: 'Voz normal suena mal.' },
    { id: 'mut_hive_mind', name: 'Mente Colmena', type: 'Psionic', effect: 'Detectas mutantes.', downside: 'Aturdido al matar.' },
    { id: 'mut_ascension', name: 'Ascensión', type: 'Psionic', effect: 'Gana +1 a un Stat.', downside: 'Tira dos veces en la tabla de mutaciones.' },
];

export const WEAPONS_CATALOG: Weapon[] = [
  // --- PISTOLAS ---
  { id: 'glock17', name: 'Glock 17/19', type: 'Pistola', damage: '2d4', damageType: 'Perforante', range: '30/90', weight: 1.5, price: 2500, rarity: 'Civil', properties: ['Fiable', 'Bonificada'] },
  { id: 'glock18c', name: 'Glock 18c', type: 'Pistola', damage: '2d4', damageType: 'Perforante', range: '20/60', weight: 1.8, price: 40000, rarity: 'Táctica', properties: ['Auto', 'Incontrolable'] },
  { id: 'fallo_cinderfall', name: 'Fallo de Cinderfall', type: 'Pistola', damage: '1d6', damageType: 'Fuerza', range: '60/120', weight: 1.5, price: 0, rarity: 'Legendaria', properties: ['Munición Infinita', 'Inestable'] },
  { id: 'tokarev', name: 'Tokarev TT', type: 'Pistola', damage: '1d8', damageType: 'Perforante', range: '40/120', weight: 1.9, price: 800, rarity: 'Civil', properties: ['Perforante'] },
  { id: 'clavo_comisario', name: 'El Clavo del Comisario', type: 'Pistola', damage: '1d8', damageType: 'Perforante', range: '50/150', weight: 1.9, price: 0, rarity: 'Legendaria', properties: ['Ignora Resistencia'] },
  { id: 'm1911', name: 'M1911', type: 'Pistola', damage: '1d6', damageType: 'Perforante', range: '30/90', weight: 2.4, price: 2000, rarity: 'Civil', properties: ['Bonificada'] },
  { id: 'm1911_tac', name: 'M1911 Táctica', type: 'Pistola', damage: '1d6', damageType: 'Perforante', range: '40/120', weight: 2.6, price: 6500, rarity: 'Táctica', properties: ['Freno de Boca'] },
  { id: 'bala_aitos', name: 'La Última Bala de Aitos', type: 'Pistola', damage: '1d6', damageType: 'Perforante', range: '40/120', weight: 2.4, price: 0, rarity: 'Legendaria', properties: ['Segunda Oportunidad'] },
  { id: 'makarov', name: 'Makarov PM', type: 'Pistola', damage: '1d4', damageType: 'Perforante', range: '20/60', weight: 1.6, price: 600, rarity: 'Civil', properties: ['Ligera'] },
  { id: 'makarov_pb', name: 'Makarov PB', type: 'Pistola', damage: '1d4', damageType: 'Perforante', range: '30/90', weight: 2.1, price: 3000, rarity: 'Táctica', properties: ['Silencio Total'] },
  { id: 'susurro_fantasma', name: 'Susurro del Fantasma', type: 'Pistola', damage: '1d4', damageType: 'Perforante', range: '30/90', weight: 2.0, price: 0, rarity: 'Legendaria', properties: ['Capa de Sombra'] },
  { id: 'stechkin', name: 'Stechkin APS', type: 'Pistola', damage: '1d4', damageType: 'Perforante', range: '40/120', weight: 2.7, price: 11000, rarity: 'Táctica', properties: ['Modo Ráfaga'] },
  { id: 'furia_general', name: 'La Furia del General', type: 'Pistola', damage: '1d4', damageType: 'Perforante', range: '40/120', weight: 2.5, price: 0, rarity: 'Legendaria', properties: ['Orden de Fuego'] },
  { id: 'beretta', name: 'Beretta M9', type: 'Pistola', damage: '2d4', damageType: 'Perforante', range: '40/120', weight: 2.1, price: 2300, rarity: 'Civil', properties: ['Bonificada'] },
  { id: 'deber_centurion', name: 'El Deber del Centurión', type: 'Pistola', damage: '2d4', damageType: 'Perforante', range: '40/120', weight: 2.1, price: 0, rarity: 'Legendaria', properties: ['Aura de Valor'] },
  { id: 'fiveseven', name: 'FN Five-seveN', type: 'Pistola', damage: '1d8', damageType: 'Perforante', range: '50/150', weight: 1.3, price: 15000, rarity: 'Táctica', properties: ['Perforante Superior'] },
  { id: 'abrelatas', name: 'El Abrelatas', type: 'Pistola', damage: '1d8', damageType: 'Perforante', range: '50/150', weight: 1.5, price: 0, rarity: 'Legendaria', properties: ['Ignorar Blindaje'] },
  { id: 'rhino', name: 'Revolver Rhino 60DS', type: 'Pistola', damage: '1d10', damageType: 'Perforante', range: '40/120', weight: 2.0, price: 3000, rarity: 'Civil', properties: ['Bajo Retroceso'] },
  { id: 'p226', name: 'Pistola P226R', type: 'Pistola', damage: '2d4', damageType: 'Perforante', range: '40/120', weight: 1.9, price: 7000, rarity: 'Táctica', properties: ['Fiabilidad'] },
  { id: 'derringer', name: 'Derringer', type: 'Pistola', damage: '1d4', damageType: 'Perforante', range: '10/30', weight: 0.5, price: 200, rarity: 'Civil', properties: ['Oculta'] },
  { id: 'ruger', name: 'Ruger Mark IV', type: 'Pistola', damage: '1d4', damageType: 'Perforante', range: '50/150', weight: 1.8, price: 450, rarity: 'Civil', properties: ['Sigilo'] },
  { id: 'ultimo_argumento', name: 'El Último Argumento', type: 'Pistola', damage: '2d12', damageType: 'Contundente', range: '30/90', weight: 4.5, price: 0, rarity: 'Legendaria', properties: ['Ejecución'] },

  // --- SUBFUSILES ---
  { id: 'mp5', name: 'MP5 (SP5)', type: 'Subfusil', damage: '2d4', damageType: 'Perforante', range: '50/150', weight: 5.5, price: 5000, rarity: 'Civil', properties: ['Estándar'] },
  { id: 'mp5a3', name: 'MP5A3', type: 'Subfusil', damage: '2d4', damageType: 'Perforante', range: '60/180', weight: 6.8, price: 20000, rarity: 'Táctica', properties: ['Control'] },
  { id: 'eco_asedio', name: 'Eco del Asedio', type: 'Subfusil', damage: '2d4', damageType: 'Perforante', range: '60/180', weight: 6.5, price: 0, rarity: 'Legendaria', properties: ['Defensor'] },
  { id: 'vityaz', name: 'Vityaz-SN', type: 'Subfusil', damage: '2d4', damageType: 'Perforante', range: '50/150', weight: 6.4, price: 18000, rarity: 'Táctica', properties: ['Robusta'] },
  { id: 'frio_petersburgo', name: 'El Frío de San Petersburgo', type: 'Subfusil', damage: '2d4', damageType: 'Perforante', range: '50/150', weight: 6.4, price: 0, rarity: 'Legendaria', properties: ['Congelación'] },
  { id: 'mp7', name: 'MP7', type: 'Subfusil', damage: '1d6', damageType: 'Perforante', range: '40/120', weight: 4.1, price: 35000, rarity: 'Táctica', properties: ['Perforante'] },
  { id: 'aguja_cirujano', name: 'La Aguja del Cirujano', type: 'Subfusil', damage: '1d6', damageType: 'Perforante', range: '40/120', weight: 4.2, price: 0, rarity: 'Legendaria', properties: ['Quirúrgico'] },
  { id: 'p90', name: 'P90', type: 'Subfusil', damage: '1d8', damageType: 'Perforante', range: '60/200', weight: 5.7, price: 38000, rarity: 'Táctica', properties: ['Cargador Masivo'] },
  { id: 'zumbido_colmena', name: 'El Zumbido de la Colmena', type: 'Subfusil', damage: '1d8', damageType: 'Perforante', range: '60/200', weight: 5.7, price: 0, rarity: 'Legendaria', properties: ['Rebote'] },
  { id: 'ump_c', name: 'UMP (Civil)', type: 'Subfusil', damage: '1d6', damageType: 'Perforante', range: '50/150', weight: 5.0, price: 4500, rarity: 'Civil', properties: ['Pesada'] },
  { id: 'ump_t', name: 'UMP (Táctica)', type: 'Subfusil', damage: '1d6', damageType: 'Perforante', range: '60/180', weight: 5.0, price: 14000, rarity: 'Táctica', properties: ['Parada'] },
  { id: 'pacificador', name: 'El Pacificador', type: 'Subfusil', damage: '1d6', damageType: 'Perforante', range: '60/180', weight: 5.0, price: 0, rarity: 'Legendaria', properties: ['Emboscada'] },
  { id: 'mp9', name: 'MP9', type: 'Subfusil', damage: '2d4', damageType: 'Perforante', range: '30/90', weight: 3.0, price: 19000, rarity: 'Táctica', properties: ['Bonificada', 'Dispersión'] },
  { id: 'vector', name: 'Vector (.45 ACP)', type: 'Subfusil', damage: '1d6', damageType: 'Perforante', range: '50/150', weight: 6.0, price: 42000, rarity: 'Táctica', properties: ['Super V'] },
  { id: 'ppsh', name: 'PPSh-41', type: 'Subfusil', damage: '1d8', damageType: 'Perforante', range: '40/120', weight: 8.0, price: 4000, rarity: 'Táctica', properties: ['Lluvia'] },

  // --- ESCOPETAS ---
  { id: 'toz106', name: 'TOZ-106', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '15/30', weight: 5.5, price: 500, rarity: 'Civil', properties: ['Recarga Constante'] },
  { id: 'desesperacion_huerfano', name: 'La Desesperación del Huérfano', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '15/30', weight: 5.5, price: 0, rarity: 'Legendaria', properties: ['Polvo y Silencio'] },
  { id: 'spr310', name: 'SPR310', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '20/60', weight: 7.0, price: 1200, rarity: 'Caceria', properties: ['Doble Cañón'] },
  { id: 'rugido_guardabosques', name: 'El Rugido del Guardabosques', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '20/60', weight: 7.0, price: 0, rarity: 'Legendaria', properties: ['Onda de Choque'] },
  { id: 'm870_c', name: 'M870 (Civil)', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '20/60', weight: 7.5, price: 1800, rarity: 'Civil', properties: ['Corredera'] },
  { id: 'm870_ca', name: 'M870 (Caza)', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '40/80', weight: 8.0, price: 2500, rarity: 'Caceria', properties: ['Precisión'] },
  { id: 'm870_t', name: 'M870 (Táctica)', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '20/60', weight: 7.0, price: 6000, rarity: 'Táctica', properties: ['Breaching'] },
  { id: 'fantasma_trinchera', name: 'El Fantasma de la Trinchera', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '20/60', weight: 7.0, price: 0, rarity: 'Legendaria', properties: ['Inevitable'] },
  { id: 'mp153_c', name: 'MP-153 (Civil)', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '30/90', weight: 8.0, price: 2200, rarity: 'Civil', properties: ['Semiauto'] },
  { id: 'mp153_ca', name: 'MP-153 (Caza)', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '40/100', weight: 8.5, price: 3000, rarity: 'Caceria', properties: ['Precisa'] },
  { id: 'mp153_t', name: 'MP-153 (Táctica)', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '30/90', weight: 8.2, price: 8000, rarity: 'Táctica', properties: ['Semiauto Táctico'] },
  { id: 'respiracion_dragon', name: 'La Respiración del Dragón', type: 'Escopeta', damage: '2d8', damageType: 'Fuego', range: '15 (Cono)', weight: 8.2, price: 0, rarity: 'Legendaria', properties: ['Fuego'] },
  { id: 'saiga12_c', name: 'Saiga-12 (Civil)', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '30/90', weight: 8.0, price: 4000, rarity: 'Civil', properties: ['Cargador'] },
  { id: 'saiga12_t', name: 'Saiga-12 (Táctica)', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '30/90', weight: 8.5, price: 16000, rarity: 'Táctica', properties: ['Supresión'] },
  { id: 'martillo_kult', name: 'El Martillo del Kult', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '30/90', weight: 8.5, price: 0, rarity: 'Legendaria', properties: ['Terror'] },
  { id: 'benelli', name: 'Benelli M4', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '30/90', weight: 8.4, price: 25000, rarity: 'Táctica', properties: ['Fiabilidad Extrema'] },
  { id: 'ks23', name: 'KS-23', type: 'Escopeta', damage: '3d10', damageType: 'Contundente', range: '40/120', weight: 10.0, price: 10000, rarity: 'Táctica', properties: ['Impacto Masivo'] },
  { id: 'remington1100', name: 'Remington 1100', type: 'Escopeta', damage: '2d8', damageType: 'Contundente', range: '40/100', weight: 7.5, price: 2800, rarity: 'Caceria', properties: ['Suave'] },
  { id: 'corazon_fuego', name: 'Corazón de Fuego', type: 'Escopeta', damage: '2d8', damageType: 'Fuego', range: '30/90', weight: 8.2, price: 0, rarity: 'Legendaria', properties: ['Daño Continuo'] },

  // --- RIFLES DE ASALTO ---
  { id: 'saiga_vepr_akm', name: 'Saiga/Vepr (AKM)', type: 'Rifle Asalto', damage: '1d10', damageType: 'Perforante', range: '80/240', weight: 7.7, price: 3500, rarity: 'Civil', properties: ['Semiauto'] },
  { id: 'saiga_vepr_ak74', name: 'Saiga/Vepr (AK-74)', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 7.5, price: 4000, rarity: 'Civil', properties: ['Preciso'] },
  { id: 'akm', name: 'AKM', type: 'Rifle Asalto', damage: '1d10', damageType: 'Perforante', range: '80/240', weight: 8.0, price: 12000, rarity: 'Táctica', properties: ['Penetración'] },
  { id: 'ak74', name: 'AK-74', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 7.8, price: 15000, rarity: 'Táctica', properties: ['Controlable'] },
  { id: 'ak105', name: 'Serie 100 / AK-105', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '90/270', weight: 7.0, price: 22000, rarity: 'Táctica', properties: ['Compacto'] },
  { id: 'ak12', name: 'AK-12', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '90/270', weight: 7.5, price: 30000, rarity: 'Táctica', properties: ['Ráfaga 2'] },
  { id: 'fantasma_cinderfall', name: 'Fantasma de Cinderfall', type: 'Rifle Asalto', damage: '1d8', damageType: 'Radiante', range: '100/300', weight: 6.0, price: 0, rarity: 'Legendaria', properties: ['Luz Pura'] },
  { id: 'adar', name: 'ADAR 2-15', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '90/270', weight: 7.0, price: 3000, rarity: 'Civil', properties: ['Modular'] },
  { id: 'm4a1_c', name: 'M4A1 Semi', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '90/270', weight: 6.5, price: 5000, rarity: 'Civil', properties: ['Ergonómica'] },
  { id: 'tx15', name: 'TX-15', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '120/360', weight: 7.5, price: 12000, rarity: 'Caceria', properties: ['Competición'] },
  { id: 'm4a1_t', name: 'M4A1 / Mk18', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '90/270', weight: 6.5, price: 28000, rarity: 'Táctica', properties: ['Modular Bonificada'] },
  { id: 'engranaje_perdido', name: 'El Engranaje Perdido', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '90/270', weight: 6.5, price: 0, rarity: 'Legendaria', properties: ['Canalizar'] },
  { id: 'hk416', name: 'HK 416', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 7.5, price: 40000, rarity: 'Táctica', properties: ['Fiabilidad'] },
  { id: 'martillo_thor', name: 'El Martillo de Thor', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 7.5, price: 0, rarity: 'Legendaria', properties: ['Tiro de Rayo'] },
  { id: 'asval', name: 'AS VAL', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '50/150', weight: 5.5, price: 55000, rarity: 'Táctica', properties: ['Fantasma'] },
  { id: 'ultimo_aliento', name: 'El Último Aliento del Traidor', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '50/150', weight: 5.5, price: 0, rarity: 'Legendaria', properties: ['Asesino'] },
  { id: 'fnscar_ca', name: 'FN SCAR-H (Caza)', type: 'Rifle Asalto', damage: '1d10', damageType: 'Perforante', range: '120/360', weight: 8.0, price: 18000, rarity: 'Caceria', properties: ['Potente'] },
  { id: 'fnscar_t', name: 'FN SCAR-H (Táctico)', type: 'Rifle Asalto', damage: '1d10', damageType: 'Perforante', range: '120/360', weight: 8.2, price: 42000, rarity: 'Táctica', properties: ['Calibre Batalla'] },
  { id: 'domador_bestias', name: 'El Domador de Bestias', type: 'Rifle Asalto', damage: '1d10', damageType: 'Perforante', range: '120/360', weight: 8.2, price: 0, rarity: 'Legendaria', properties: ['Cazador'] },
  { id: 'sks', name: 'SKS', type: 'Rifle Asalto', damage: '1d10', damageType: 'Perforante', range: '80/240', weight: 8.5, price: 900, rarity: 'Civil', properties: ['Indestructible'] },
  { id: 'aug', name: 'AUG A3', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '90/270', weight: 8.0, price: 33000, rarity: 'Táctica', properties: ['Bullpup'] },
  { id: 'czbren', name: 'CZ Bren 2', type: 'Rifle Asalto', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 6.8, price: 38000, rarity: 'Táctica', properties: ['Suave'] },

  // --- LMG ---
  { id: 'rpk16', name: 'RPK-16', type: 'LMG', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 10.0, price: 35000, rarity: 'Táctica', properties: ['Híbrido'] },
  { id: 'tambor_infinito', name: 'El Tambor Infinito', type: 'LMG', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 10.0, price: 0, rarity: 'Legendaria', properties: ['Regeneración'] },
  { id: 'pkm', name: 'PKM / PKP', type: 'LMG', damage: '1d10', damageType: 'Perforante', range: '150/450', weight: 17.0, price: 70000, rarity: 'Táctica', properties: ['Supresión'] },
  { id: 'corazon_oso', name: 'El Corazón del Oso', type: 'LMG', damage: '1d10', damageType: 'Perforante', range: '150/450', weight: 17.0, price: 0, rarity: 'Legendaria', properties: ['Resistencia'] },
  { id: 'mg3', name: 'MG3', type: 'LMG', damage: '2d6', damageType: 'Perforante', range: '150/450', weight: 25.0, price: 85000, rarity: 'Táctica', properties: ['Terror'] },
  { id: 'm249', name: 'M249 SAW', type: 'LMG', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 17.0, price: 45000, rarity: 'Táctica', properties: ['Volumen'] },
  { id: 'sierra_implacable', name: 'La Sierra Implacable', type: 'LMG', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 17.0, price: 0, rarity: 'Legendaria', properties: ['Infinita'] },
  { id: 'rpd', name: 'RPD', type: 'LMG', damage: '1d10', damageType: 'Perforante', range: '100/300', weight: 16.0, price: 25000, rarity: 'Táctica', properties: ['Fiable'] },
  { id: 'eco_jungla', name: 'El Eco de la Jungla', type: 'LMG', damage: '1d10', damageType: 'Perforante', range: '100/300', weight: 16.0, price: 0, rarity: 'Legendaria', properties: ['Invisible'] },
  { id: 'ultimax', name: 'Ultimax 100', type: 'LMG', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 11.0, price: 50000, rarity: 'Táctica', properties: ['Retroceso Constante'] },
  { id: 'pulso_constante', name: 'El Pulso Constante', type: 'LMG', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 11.0, price: 0, rarity: 'Legendaria', properties: ['Foco'] },

  // --- DMR / SNIPER ---
  { id: 'svd_c', name: 'SVD (Tigr)', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '200/600', weight: 8.5, price: 9000, rarity: 'Caceria', properties: ['Letal'] },
  { id: 'svd_t', name: 'SVD', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '250/750', weight: 9.5, price: 16000, rarity: 'Táctica', properties: ['Fiable'] },
  { id: 'ojo_dragon', name: 'El Ojo del Dragón', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '250/750', weight: 9.5, price: 0, rarity: 'Legendaria', properties: ['Visión'] },
  { id: 'm1a_c', name: 'M1A (Civil)', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '200/600', weight: 10.0, price: 3800, rarity: 'Civil', properties: ['Pesado'] },
  { id: 'm1a_ca', name: 'M1A (Caza)', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '200/600', weight: 9.0, price: 7000, rarity: 'Caceria', properties: ['Ergonómico'] },
  { id: 'eco_colina', name: 'El Eco de la Colina', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '200/600', weight: 9.0, price: 0, rarity: 'Legendaria', properties: ['Ventrílocuo'] },
  { id: 'sr25', name: 'SR-25', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '200/600', weight: 10.0, price: 45000, rarity: 'Táctica', properties: ['Silencioso'] },
  { id: 'marcador_destinos', name: 'El Marcador de Destinos', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '200/600', weight: 10.0, price: 0, rarity: 'Legendaria', properties: ['Marcar'] },
  { id: 'rsass', name: 'RSASS', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '250/750', weight: 11.0, price: 50000, rarity: 'Táctica', properties: ['Sub-MOA'] },
  { id: 'relojero', name: 'El Relojero', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '250/750', weight: 11.0, price: 0, rarity: 'Legendaria', properties: ['Alerta'] },
  { id: 'g28', name: 'G28', type: 'DMR', damage: '1d10', damageType: 'Perforante', range: '200/600', weight: 13.0, price: 52000, rarity: 'Táctica', properties: ['Óptica'] },
  { id: 'm700_c', name: 'M700 (Civil)', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '200/600', weight: 7.0, price: 2500, rarity: 'Civil', properties: ['Simple'] },
  { id: 'm700_ca', name: 'M700 (Caza)', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '200/600', weight: 7.5, price: 5000, rarity: 'Caceria', properties: ['Flotante'] },
  { id: 'm700_t', name: 'M700 (Táctico)', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '200/600', weight: 12.0, price: 12000, rarity: 'Táctica', properties: ['Militar'] },
  { id: 'aliento_congelado', name: 'El Aliento Congelado', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '200/600', weight: 7.5, price: 0, rarity: 'Legendaria', properties: ['Parálisis'] },
  { id: 'mosin', name: 'Mosin-Nagant', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '200/600', weight: 8.8, price: 700, rarity: 'Civil', properties: ['Indestructible'] },
  { id: 'ultimo_zumbido', name: 'El Último Zumbido', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '200/600', weight: 8.0, price: 0, rarity: 'Legendaria', properties: ['Fantasma'] },
  { id: 't5000', name: 'T-5000', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '300/900', weight: 13.0, price: 35000, rarity: 'Táctica', properties: ['Quirúrgico'] },
  { id: 'ecuacion_imposible', name: 'La Ecuación Imposible', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '300/900', weight: 13.0, price: 0, rarity: 'Legendaria', properties: ['Cálculo'] },
  { id: 'dvl10', name: 'DVL-10', type: 'Sniper', damage: '1d10', damageType: 'Perforante', range: '200/600', weight: 11.0, price: 48000, rarity: 'Táctica', properties: ['Fantasma Urbano'] },
  { id: 'vacio_acustico', name: 'El Vacío Acústico', type: 'Sniper', damage: '1d10', damageType: 'Perforante', range: '200/600', weight: 11.0, price: 0, rarity: 'Legendaria', properties: ['Silencio'] },
  { id: 'vss', name: 'VSS Vintorez', type: 'Sniper', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 5.7, price: 52000, rarity: 'Táctica', properties: ['Subsónico'] },
  { id: 'silenciador_verdad', name: 'El Silenciador de la Verdad', type: 'Sniper', damage: '1d8', damageType: 'Perforante', range: '100/300', weight: 5.7, price: 0, rarity: 'Legendaria', properties: ['Olvido'] },
  { id: 'sv98', name: 'SV-98', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '250/750', weight: 13.0, price: 28000, rarity: 'Táctica', properties: ['Robusto'] },
  { id: 'axmc', name: 'AXMC (.338)', type: 'Sniper', damage: '2d8', damageType: 'Perforante', range: '600/1800', weight: 15.0, price: 90000, rarity: 'Táctica', properties: ['Alcance Extremo'] },
  { id: 'winchester70', name: 'Winchester 70', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '200/600', weight: 8.0, price: 4500, rarity: 'Caceria', properties: ['Fiable'] },
  { id: 'susurro_viento', name: 'El Susurro del Viento', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '∞', weight: 3.0, price: 0, rarity: 'Legendaria', properties: ['Sin Caída'] },

  // --- ANTI-MATERIAL ---
  { id: 'ash12', name: 'Ash-12', type: 'Rifle Asalto', damage: '1d12', damageType: 'Perforante', range: '50/150', weight: 13.0, price: 60000, rarity: 'Táctica', properties: ['Urbano'] },
  { id: 'matador_gigantes', name: 'El Matador de Gigantes', type: 'Sniper', damage: '1d12', damageType: 'Perforante', range: '50/150', weight: 13.0, price: 0, rarity: 'Legendaria', properties: ['Cazador'] },
  { id: 'osv96', name: 'OSV-96', type: 'Sniper', damage: '2d10', damageType: 'Perforante', range: '500/1500', weight: 28.0, price: 120000, rarity: 'Táctica', properties: ['Plegable'] },
  { id: 'llave_maestra', name: 'La Llave Maestra', type: 'Sniper', damage: '2d10', damageType: 'Perforante', range: '500/1500', weight: 28.0, price: 0, rarity: 'Legendaria', properties: ['Demolición'] },
  { id: 'barrett', name: 'Barrett M82', type: 'Sniper', damage: '2d12', damageType: 'Perforante', range: '600/1800', weight: 30.0, price: 150000, rarity: 'Táctica', properties: ['Anti-Estructura'] },
  { id: 'rompemundos', name: 'El Rompemundos', type: 'Sniper', damage: '2d12', damageType: 'Perforante', range: '600/1800', weight: 30.0, price: 0, rarity: 'Legendaria', properties: ['Onda'] },
  { id: 'ptrs41', name: 'PTRS-41', type: 'Sniper', damage: '3d10', damageType: 'Perforante', range: '300/900', weight: 46.0, price: 20000, rarity: 'Táctica', properties: ['Obsoleto'] },
  { id: 'puno_hierro', name: 'El Puño de Hierro', type: 'Sniper', damage: '3d10', damageType: 'Perforante', range: '300/900', weight: 46.0, price: 0, rarity: 'Legendaria', properties: ['Perforador'] },
  { id: 'ntw20', name: 'NTW-20', type: 'Sniper', damage: '4d8', damageType: 'Perforante', range: '500/1500', weight: 68.0, price: 180000, rarity: 'Táctica', properties: ['Explosivo'] },
  { id: 'juicio_final', name: 'El Juicio Final', type: 'Sniper', damage: '4d8', damageType: 'Plasma', range: '500/1500', weight: 68.0, price: 0, rarity: 'Legendaria', properties: ['Plasma'] },

  // --- MELEE ---
  { id: 'cuchillo', name: 'Cuchillo / Machete', type: 'Melee', damage: '1d4', damageType: 'Cortante', range: '5', weight: 1.0, price: 50, rarity: 'Civil', properties: ['Herramienta'] },
  { id: 'machete_pesado', name: 'Machete Pesado', type: 'Melee', damage: '1d6', damageType: 'Cortante', range: '5', weight: 3.0, price: 150, rarity: 'Civil', properties: ['Despejar'] },
  { id: 'kukri', name: 'Kukri de Caza', type: 'Melee', damage: '1d6', damageType: 'Cortante', range: '5', weight: 2.0, price: 400, rarity: 'Caceria', properties: ['Corte Profundo'] },
  { id: 'hacha_palanca', name: 'Hacha / Palanca', type: 'Melee', damage: '1d6', damageType: 'Contundente', range: '5', weight: 4.0, price: 80, rarity: 'Civil', properties: ['Rompe Puertas'] },
  { id: 'espadon_chatarra', name: 'Espadón de Chatarra', type: 'Melee', damage: '1d12', damageType: 'Cortante', range: '5', weight: 12.0, price: 200, rarity: 'Civil', properties: ['Lento'] },
  { id: 'lanza_tuberia', name: 'Lanza de Tubería', type: 'Melee', damage: '1d8', damageType: 'Perforante', range: '10', weight: 5.0, price: 50, rarity: 'Civil', properties: ['Alcance'] },
  { id: 'lanza_caza', name: 'Lanza de Caza', type: 'Melee', damage: '1d8', damageType: 'Perforante', range: '10', weight: 4.0, price: 600, rarity: 'Caceria', properties: ['Parada'] },
  { id: 'sable', name: 'Sable de Caballería', type: 'Melee', damage: '1d8', damageType: 'Cortante', range: '5', weight: 3.0, price: 800, rarity: 'Civil', properties: ['Tajo'] },
  { id: 'kabar', name: 'KABAR', type: 'Melee', damage: '1d6', damageType: 'Perforante', range: '5', weight: 1.0, price: 300, rarity: 'Táctica', properties: ['Militar'] },
  { id: 'hacha_tactica', name: 'Hacha Táctica', type: 'Melee', damage: '1d6', damageType: 'Cortante', range: '5', weight: 2.0, price: 400, rarity: 'Táctica', properties: ['Rápida'] },
  { id: 'cuchillo_trinchera', name: 'Cuchillo de Trinchera', type: 'Melee', damage: '1d4', damageType: 'Mixto', range: '5', weight: 1.5, price: 500, rarity: 'Táctica', properties: ['Nudillos'] },
  { id: 'gladius', name: 'Espada Corta "Gladius"', type: 'Melee', damage: '1d6', damageType: 'Perforante', range: '5', weight: 2.5, price: 1200, rarity: 'Táctica', properties: ['CQC'] },
  { id: 'katana', name: 'Katana Táctica', type: 'Melee', damage: '1d8', damageType: 'Cortante', range: '5', weight: 3.0, price: 2500, rarity: 'Táctica', properties: ['Versátil'] },
  { id: 'fragmento_cinderfall', name: 'Fragmento de Cinderfall', type: 'Melee', damage: '1d4', damageType: 'Fuerza', range: '5', weight: 1.0, price: 0, rarity: 'Legendaria', properties: ['Anómalo'] },
  { id: 'ecos_vacio', name: 'Ecos del Vacío', type: 'Melee', damage: '1d8', damageType: 'Necrótico', range: '5', weight: 2.0, price: 0, rarity: 'Legendaria', properties: ['Vampirismo'] },
  { id: 'divisor', name: 'El Divisor', type: 'Melee', damage: '2d6', damageType: 'Cortante', range: '5', weight: 15.0, price: 0, rarity: 'Legendaria', properties: ['Rompe-Escudos'] },
  { id: 'aguja_cielo', name: 'Aguja del Cielo', type: 'Melee', damage: '1d8', damageType: 'Eléctrico', range: '15', weight: 4.0, price: 0, rarity: 'Legendaria', properties: ['Relámpago'] },

  // --- ANÓMALAS ---
  { id: 'singularidad', name: 'La Singularidad Portátil', type: 'Anomala', damage: '3d8', damageType: 'Fuerza', range: '60', weight: 8.0, price: 0, rarity: 'Anomala', properties: ['Gravedad'] },
  { id: 'eco_olvido', name: 'Eco del Olvido', type: 'Anomala', damage: '2d6', damageType: 'Psíquico', range: '60', weight: 3.0, price: 0, rarity: 'Anomala', properties: ['Olvido'] },
  { id: 'lanzador_cinetico', name: 'Lanzador Cinético', type: 'Anomala', damage: '2d8', damageType: 'Contundente', range: '40', weight: 6.0, price: 0, rarity: 'Anomala', properties: ['Infinita'] },
  { id: 'espada_tormenta', name: 'Espada de Tormenta Resonante', type: 'Anomala', damage: '1d8', damageType: 'Eléctrico', range: '5', weight: 3.0, price: 0, rarity: 'Anomala', properties: ['Arco Voltaico'] },
  { id: 'corazon_helado', name: 'El Corazón Helado del Reich', type: 'Anomala', damage: '3d6', damageType: 'Frío', range: '15 (Cono)', weight: 5.0, price: 0, rarity: 'Anomala', properties: ['Congelar'] },
];

export const ARMOR_CATALOG: Armor[] = [
    // Ligera
    { id: 'ropa_civil', name: 'Ropa Reforzada', type: 'Light', acBase: 11, dexBonus: 99, weight: 8, ra: 1, rarity: 'Civil', stealthDisadvantage: false, price: 300 },
    { id: 'chaleco_kevlar', name: 'Chaleco Antibalas "PACA"', type: 'Light', acBase: 12, dexBonus: 99, weight: 10, ra: 1, rarity: 'Civil', stealthDisadvantage: false, price: 1000 },
    { id: 'traje_amanecer', name: 'Traje de Stalker "Amanecer"', type: 'Light', acBase: 12, dexBonus: 99, weight: 12, ra: 2, rarity: 'Stalker', stealthDisadvantage: false, price: 1800 },
    { id: 'korund', name: 'Blindaje Ligero "Korund"', type: 'Light', acBase: 13, dexBonus: 99, weight: 15, ra: 1, rarity: 'Táctica', stealthDisadvantage: false, price: 2500 },
    { id: 'manto_negro', name: 'Traje Táctico "Manto Negro"', type: 'Light', acBase: 13, dexBonus: 99, weight: 10, ra: 2, rarity: 'Táctica', stealthDisadvantage: false, price: 4000, effect: 'Ventaja en Sigilo (Oscuro)' },
    { id: 'baile_ender', name: 'El Último Baile de Ender', type: 'Light', acBase: 14, dexBonus: 99, weight: 5, ra: 3, rarity: 'Legendaria', stealthDisadvantage: false, price: 0, effect: 'Reacción: +2 CA contra ataque visible.' },

    // Media
    { id: 'module3m', name: 'Chaleco "Module-3M"', type: 'Medium', acBase: 14, dexBonus: 2, weight: 20, ra: 2, rarity: 'Civil', stealthDisadvantage: true, price: 3500 },
    { id: 'nomada', name: 'Traje de Mercenario "Nómada"', type: 'Medium', acBase: 14, dexBonus: 2, weight: 25, ra: 3, rarity: 'Stalker', stealthDisadvantage: false, price: 5000 },
    { id: 'killa', name: 'Blindaje Pesado "6B13 Killa"', type: 'Medium', acBase: 15, dexBonus: 2, weight: 30, ra: 2, rarity: 'Táctica', stealthDisadvantage: true, price: 7500 },
    { id: 'luz_rota', name: 'Armadura de Paladín "Luz Rota"', type: 'Medium', acBase: 15, dexBonus: 2, weight: 40, ra: 2, rarity: 'Legendaria', stealthDisadvantage: true, price: 8000 },
    { id: 'seva', name: 'Traje Ambiental "SEVA"', type: 'Medium', acBase: 14, dexBonus: 2, weight: 35, ra: 4, rarity: 'Stalker', stealthDisadvantage: true, price: 9000, effect: 'Inmune gases/esporas. Resistencia Ácido.' },
    { id: 'piel_caminante', name: 'La Piel del Caminante', type: 'Medium', acBase: 16, dexBonus: 2, weight: 15, ra: 5, rarity: 'Legendaria', stealthDisadvantage: false, price: 0, effect: 'Regeneración 1HP/hora. Resistencia Fuego.' },

    // Pesada
    { id: 'thor', name: 'Blindaje Táctico "Thor"', type: 'Heavy', acBase: 16, dexBonus: 0, weight: 45, ra: 2, rarity: 'Táctica', stealthDisadvantage: true, price: 12000 },
    { id: 'eod', name: 'Traje Antiexplosivos "EOD"', type: 'Heavy', acBase: 17, dexBonus: 0, weight: 60, ra: 1, rarity: 'Táctica', stealthDisadvantage: true, price: 18000, effect: 'Resistencia Fuego/Explosiones.' },
    { id: 'defender', name: 'Blindaje de Asalto "Defender-2"', type: 'Heavy', acBase: 17, dexBonus: 0, weight: 50, ra: 2, rarity: 'Táctica', stealthDisadvantage: true, price: 22000 },
    { id: 'juggernaut', name: 'Blindaje "Juggernaut"', type: 'Heavy', acBase: 18, dexBonus: 0, weight: 65, ra: 1, rarity: 'Táctica', stealthDisadvantage: true, price: 30000, effect: '-10 pies Velocidad.' },
    { id: 'engranaje', name: 'Prototipo "Engranaje Negro"', type: 'Heavy', acBase: 16, dexBonus: 0, weight: 55, ra: 3, rarity: 'Táctica', stealthDisadvantage: true, price: 25000, effect: 'Inestable: Crítico recibido causa 1d6 eléctrico al usuario.' },
    { id: 'sigfried', name: 'La Obra Maestra de Sigfried', type: 'Heavy', acBase: 18, dexBonus: 0, weight: 40, ra: 4, rarity: 'Legendaria', stealthDisadvantage: false, price: 0, effect: 'Silencio Mecánico.' },

    // Exoesqueletos
    { id: 'mule_exo', name: 'Exoesqueleto "MULE"', type: 'Exo', acBase: 10, dexBonus: 0, weight: 40, ra: 1, rarity: 'Civil', stealthDisadvantage: true, price: 15000, effect: 'Fuerza considerada 19 para carga.' },
    { id: 'warden', name: 'Exoesqueleto "Warden"', type: 'Exo', acBase: 18, dexBonus: 0, weight: 80, ra: 3, rarity: 'Táctica', stealthDisadvantage: true, price: 50000, effect: 'Fuerza considerada 21.' },
    { id: 'ssp99', name: 'Prototipo Ambiental "SSP-99"', type: 'Exo', acBase: 14, dexBonus: 2, weight: 50, ra: 6, rarity: 'Científico', stealthDisadvantage: true, price: 75000, effect: 'Inmune Veneno/Ácido/Enfermedad. Resistencia Fuego/Elec.' },
    { id: 'bulat', name: 'Exoesqueleto "Bulat"', type: 'Exo', acBase: 19, dexBonus: 0, weight: 75, ra: 3, rarity: 'Táctica', stealthDisadvantage: true, price: 90000, effect: 'Fuerza 22. Resistencia Contundente no mágico.' },
    { id: 'corazon', name: 'Exoesqueleto "Corazón"', type: 'Exo', acBase: 20, dexBonus: 0, weight: 100, ra: 5, rarity: 'Anomala', stealthDisadvantage: true, price: 150000, effect: 'Fuerza 24. Cura 1 HP/turno si vivo.' },
    { id: 'corazon_cinderfall', name: 'Corazón de Cinderfall', type: 'Exo', acBase: 22, dexBonus: 0, weight: 80, ra: 7, rarity: 'Legendaria', stealthDisadvantage: true, price: 0, effect: 'Fuerza 26. Inmune Radiación/Necrótico.' },
];

export const HEAD_CATALOG: Item[] = [
    { id: 'gorra', name: 'Gorra Táctica / Boina', type: 'Valuable', weight: 0, cost: 50, maxStack: 1, effect: '+1 Intimidación/Persuasión' },
    { id: 'casco_obra', name: 'Casco de Obra / Minero', type: 'Valuable', weight: 1, cost: 100, maxStack: 1, effect: 'Incluye luz. CA +0' },
    { id: 'casco_anti', name: 'Casco Antidisturbios', type: 'Valuable', weight: 3, cost: 500, maxStack: 1, effect: 'Niega Críticos. -1 Percepción' },
    { id: 'casco_ssh68', name: 'Casco de Acero Ssh-68', type: 'Valuable', weight: 4, cost: 300, maxStack: 1, effect: '+1 CA vs armas fuego. -1 Sigilo' },
    { id: 'casco_highcut', name: 'Casco Táctico "High-Cut"', type: 'Valuable', weight: 2, cost: 2500, maxStack: 1, effect: '+1 CA. Compatible con auriculares' },
    { id: 'casco_altyn', name: 'Casco Pesado "Altyn"', type: 'Valuable', weight: 8, cost: 8000, maxStack: 1, effect: '+2 CA. Inmune Aturdir. Desventaja Percepción' },
    { id: 'capucha_psiquico', name: 'Capucha de Psíquico', type: 'Valuable', weight: 1, cost: 5000, maxStack: 1, effect: 'Ventaja Salv INT/SAB' },
];

export const FACE_CATALOG: Item[] = [
    { id: 'panuelo', name: 'Pañuelo / Balaclava', type: 'Valuable', weight: 0, cost: 10, maxStack: 1, effect: 'Identidad oculta. Resistencia frío leve' },
    { id: 'respirador', name: 'Respirador Industrial', type: 'Valuable', weight: 1, cost: 200, maxStack: 1, effect: 'Permite Filtros Tipo I' },
    { id: 'mascara_gas', name: 'Máscara de Gas (GP-5)', type: 'Valuable', weight: 2, cost: 500, maxStack: 1, effect: 'Filtros I y II. -2 Vista' },
    { id: 'mascara_panoramica', name: 'Máscara Panorámica', type: 'Valuable', weight: 2, cost: 1500, maxStack: 1, effect: 'Filtros I, II, III. Sin penalización' },
    { id: 'rebreather', name: 'Rebreather', type: 'Valuable', weight: 3, cost: 4000, maxStack: 1, effect: 'Autónomo 1h. Recargable' },
];

export const EYES_CATALOG: Item[] = [
    { id: 'gafas_balisticas', name: 'Gafas Balísticas', type: 'Valuable', weight: 0, cost: 150, maxStack: 1, effect: 'Inmune Ceguera física' },
    { id: 'gafas_sol', name: 'Gafas de Sol', type: 'Valuable', weight: 0, cost: 50, maxStack: 1, effect: '+1 Carisma. Evita deslumbramiento' },
    { id: 'visor_nvg1', name: 'Visor Nocturno (NVG-1)', type: 'Tech', weight: 1, cost: 2000, maxStack: 1, effect: 'Visión oscuridad 60ft (Verde)' },
    { id: 'visor_nvg2', name: 'Visor Digital (NVG-2)', type: 'Tech', weight: 1, cost: 5000, maxStack: 1, effect: 'Visión oscuridad 90ft. Mejor contraste' },
    { id: 'visor_termico', name: 'Visor Térmico (T-7)', type: 'Tech', weight: 2, cost: 12000, maxStack: 1, effect: 'Calor a 120ft. Ignora humo' },
    { id: 'fosforo_blanco', name: 'Fósforo Blanco (GPNVG)', type: 'Tech', weight: 1, cost: 25000, maxStack: 1, effect: 'Visión perfecta 120ft' },
    { id: 'lentes_analista', name: 'Lentes de Analista', type: 'Tech', weight: 0, cost: 3000, maxStack: 1, effect: '+2 Investigación. Muestra HP' },
];

export const EARS_CATALOG: Item[] = [
    { id: 'auriculares_gssh', name: 'Auriculares GSSh-01', type: 'Tech', weight: 1, cost: 600, maxStack: 1, effect: 'Ventaja Oído. Desventaja Trueno' },
    { id: 'auriculares_comtac', name: 'Auriculares ComTac IV', type: 'Tech', weight: 1, cost: 1500, maxStack: 1, effect: 'Ventaja Oído. Suprime ruidos fuertes' },
    { id: 'radio', name: 'Radio de Escuadra', type: 'Tech', weight: 1, cost: 300, maxStack: 1, effect: 'Comms 1km' },
];

export const RIG_CATALOG: Item[] = [
    { id: 'chaleco_pesca', name: 'Chaleco de Pesca', type: 'Valuable', weight: 2, cost: 50, maxStack: 1, effect: '2 Cargadores. Recarga lenta' },
    { id: 'microrig', name: 'Micro-Rig "Bank Robber"', type: 'Valuable', weight: 1, cost: 300, maxStack: 1, effect: '3 Cargadores' },
    { id: 'chaleco_alpha', name: 'Chaleco Táctico "Alpha"', type: 'Valuable', weight: 3, cost: 1200, maxStack: 1, effect: '6 Cargadores. Recarga Rápida' },
    { id: 'arnes_lmg', name: 'Arnés de Ametrallador', type: 'Valuable', weight: 5, cost: 2000, maxStack: 1, effect: 'Recarga LMG en 1 Acción' },
    { id: 'chaleco_demo', name: 'Chaleco de Demoliciones', type: 'Valuable', weight: 4, cost: 1500, maxStack: 1, effect: 'Slots explosivos. Uso rápido' },
];

export const BACKPACK_CATALOG: Item[] = [
    { id: 'sling', name: 'Bandolera (Sling)', type: 'Valuable', weight: 1, cost: 200, maxStack: 1, effect: '+25 lbs Carga' },
    { id: 'assault', name: 'Mochila de Asalto', type: 'Valuable', weight: 3, cost: 800, maxStack: 1, effect: '+45 lbs Carga' },
    { id: 'expedition', name: 'Mochila de Expedición', type: 'Valuable', weight: 5, cost: 2000, maxStack: 1, effect: '+70 lbs Carga. Visible (-1 Sigilo)' },
    { id: 'mule', name: 'Mochila "MULE"', type: 'Valuable', weight: 7, cost: 3500, maxStack: 1, effect: '+90 lbs Carga. Marco externo.' },
    { id: 'anomala', name: 'Mochila Anómala', type: 'Artifact', weight: 5, cost: 0, maxStack: 1, tier: 4, effect: 'Infinita. Bolsillo dimensional.' },
];

export const ITEMS_CATALOG: Item[] = [
    // MEDICAL
    { id: 'venda', name: 'Venda Aséptica', type: 'Medical', weight: 0.1, cost: 20, maxStack: 10, effect: 'Detiene sangrado' },
    { id: 'medkit_basico', name: 'Kit Médico AI-2', type: 'Medical', weight: 1, cost: 100, maxStack: 5, effect: 'Cura 1d4+1 HP' },
    { id: 'medkit_avanzado', name: 'Kit Militar IFAK', type: 'Medical', weight: 1, cost: 300, maxStack: 3, effect: 'Cura 2d4+2 HP + Sangrado' },
    { id: 'morfina', name: 'Morfina', type: 'Medical', weight: 0.1, cost: 150, maxStack: 5, effect: '5 HP Temp + Ignora dolor' },
    { id: 'kit_cirugia', name: 'Kit Cirugía', type: 'Medical', weight: 2, cost: 800, maxStack: 1, effect: 'Repara fractura (1 min)' },
    { id: 'antirrad', name: 'Antirrad', type: 'Medical', weight: 0.1, cost: 400, maxStack: 5, effect: 'Reduce 1d4 Niveles Radiación' },
    { id: 'estimulante', name: 'Estimulante Combate', type: 'Medical', weight: 0.1, cost: 500, maxStack: 5, effect: '+1 Acción este turno. Fatiga después' },
    
    // FOOD & DRINK
    { id: 'agua', name: 'Agua Purificada', type: 'Food', weight: 1, cost: 100, maxStack: 5, effect: 'Hidratación' },
    { id: 'lata', name: 'Lata de Carne', type: 'Food', weight: 1, cost: 150, maxStack: 5, effect: 'Nutrición' },
    { id: 'vodka', name: 'Vodka', type: 'Food', weight: 2, cost: 500, maxStack: 3, effect: '-1 Rad, +1 Resaca' },
    
    // AMMO & FILTERS
    { id: 'ammo_22', name: 'Caja .22LR (20)', type: 'Ammo', weight: 0.5, cost: 20, maxStack: 10, effect: 'Silenciosa' },
    { id: 'ammo_9mm_fmj', name: 'Caja 9x19mm FMJ (20)', type: 'Ammo', weight: 1, cost: 50, maxStack: 10, effect: 'Estándar' },
    { id: 'ammo_9mm_hp', name: 'Caja 9x19mm HP (20)', type: 'Ammo', weight: 1, cost: 80, maxStack: 10, effect: '+5 Daño vs Carne' },
    { id: 'ammo_9mm_ap', name: 'Caja 9x19mm AP (20)', type: 'Ammo', weight: 1, cost: 150, maxStack: 10, effect: '+3 Atq/+5 Daño vs Blindaje' },
    { id: 'ammo_45_fmj', name: 'Caja .45 ACP FMJ (20)', type: 'Ammo', weight: 1.2, cost: 60, maxStack: 10, effect: 'Estándar' },
    { id: 'ammo_556_fmj', name: 'Caja 5.56mm FMJ (20)', type: 'Ammo', weight: 1, cost: 100, maxStack: 10, effect: 'Estándar' },
    { id: 'ammo_762_fmj', name: 'Caja 7.62mm FMJ (20)', type: 'Ammo', weight: 1.5, cost: 120, maxStack: 10, effect: 'Estándar' },
    { id: 'ammo_308', name: 'Caja .308 Win (20)', type: 'Ammo', weight: 2, cost: 150, maxStack: 10, effect: '+5 Daño vs Sin Armadura' },
    { id: 'ammo_50bmg', name: 'Caja .50 BMG (10)', type: 'Ammo', weight: 3, cost: 4000, maxStack: 5, effect: '+5 Atq / +10 Daño vs Blindaje' },
    { id: 'ammo_127', name: 'Caja 12.7x55mm (20)', type: 'Ammo', weight: 2.5, cost: 6000, maxStack: 5, effect: 'Anti-Material' },
    { id: 'ammo_shotgun', name: 'Caja Calibre 12 (20)', type: 'Ammo', weight: 2, cost: 25, maxStack: 10, effect: 'Postas' },
    { id: 'ammo_slug', name: 'Caja Calibre 12 Slug (20)', type: 'Ammo', weight: 2, cost: 35, maxStack: 10, effect: 'Bala única' },
    { id: 'ammo_thermal', name: 'Munición Quemadora (10)', type: 'Ammo', weight: 1, cost: 2000, maxStack: 5, effect: '+1d4 Fuego' },
    { id: 'ammo_electric', name: 'Munición Estática (10)', type: 'Ammo', weight: 1, cost: 2000, maxStack: 5, effect: '+1d4 Eléctrico' },
    { id: 'ammo_cryo', name: 'Munición Criogénica (10)', type: 'Ammo', weight: 1, cost: 3000, maxStack: 5, effect: '+1d6 Frío' },
    { id: 'ammo_acid', name: 'Munición Corrosiva (10)', type: 'Ammo', weight: 1, cost: 3000, maxStack: 5, effect: '+1d6 Ácido' },
    { id: 'filtro_i', name: 'Filtro Básico (Tipo I)', type: 'Tool', weight: 0.5, cost: 80, maxStack: 5, effect: '1h Polvo/Humo' },
    { id: 'filtro_ii', name: 'Filtro Químico (Tipo II)', type: 'Tool', weight: 0.5, cost: 250, maxStack: 5, effect: '30min Gas/Veneno' },
    { id: 'filtro_iii', name: 'Filtro Arcana (Tipo III)', type: 'Tool', weight: 0.5, cost: 800, maxStack: 5, effect: '15min Cinderfall/Mutágeno' },

    // TECH / TOOLS
    { id: 'multiherramienta', name: 'Multiherramienta', type: 'Tool', weight: 1, cost: 500, maxStack: 1, effect: 'Reparaciones simples' },
    { id: 'geiger', name: 'Contador Geiger', type: 'Tech', weight: 1, cost: 400, maxStack: 1, effect: 'Detecta radiación' },
    { id: 'detector_anomalo', name: 'Detector Anomalías (T1)', type: 'Tech', weight: 1.5, cost: 1500, maxStack: 1, effect: 'Detecta presencia' },
    { id: 'detector_est', name: 'Detector Estabilidad (T2)', type: 'Tech', weight: 1.5, cost: 3500, maxStack: 1, effect: 'Dirección y Distancia' },
    { id: 'analizador', name: 'Analizador Esencia (T3)', type: 'Tech', weight: 2, cost: 8000, maxStack: 1, effect: 'Identifica Artefactos' },
    { id: 'linterna_led', name: 'Lámpara LED', type: 'Tool', weight: 0.5, cost: 150, maxStack: 1, effect: 'Luz 60ft' },
    { id: 'linterna_plasma', name: 'Linterna Plasma', type: 'Tool', weight: 0.5, cost: 600, maxStack: 1, effect: 'Luz fría segura' },

    // EXPLOSIVES
    { id: 'granada_humo', name: 'Granada Humo M8', type: 'Explosive', weight: 1, cost: 50, maxStack: 5, effect: 'Nube 20ft' },
    { id: 'granada_frag', name: 'Granada Frag M67', type: 'Explosive', weight: 1, cost: 350, maxStack: 5, effect: '3d6 Perforante' },
    { id: 'bomba_mol', name: 'Bomba Moléculas', type: 'Explosive', weight: 1, cost: 1200, maxStack: 2, effect: '5d6 Plasma' },

    // ARTIFACTS
    // Tier 1
    { id: 'crono_estatilla', name: 'Crono-Estatilla', type: 'Artifact', tier: 1, weight: 1, cost: 0, maxStack: 1, effect: '+1 Iniciativa. Activa: Bullet Time' },
    { id: 'corazon_acero', name: 'Corazón de Acero', type: 'Artifact', tier: 1, weight: 2, cost: 0, maxStack: 1, effect: '+2 Atletismo. Resist Veneno.' },
    { id: 'chispa_fria', name: 'La Chispa Fría', type: 'Artifact', tier: 1, weight: 1, cost: 0, maxStack: 1, effect: '+1 Arcano. Resist Elec. Activa: Pulso Cero' },
    { id: 'guijarro_grav', name: 'Guijarro Gravitacional', type: 'Artifact', tier: 1, weight: 5, cost: 0, maxStack: 1, effect: '+2 Acrobacias. +5ft Salto.' },
    { id: 'ojo_vidente', name: 'Ojo del Vidente', type: 'Artifact', tier: 1, weight: 1, cost: 0, maxStack: 1, effect: '+2 Investigación. No sorprendido.' },
    { id: 'musgo', name: 'Musgo Filtrador', type: 'Artifact', tier: 1, weight: 0.5, cost: 0, maxStack: 1, effect: '+1 Salv Veneno. Activa: Aire Puro' },
    // Tier 2
    { id: 'bateria_interna', name: 'Batería Interna', type: 'Artifact', tier: 2, weight: 1, cost: 0, maxStack: 1, effect: '+1 Salv DEX. Resist Elec.' },
    { id: 'manto_susurros', name: 'Manto de Susurros', type: 'Artifact', tier: 2, weight: 1, cost: 0, maxStack: 1, effect: '+2 Sigilo/Engaño. Activa: Invisibilidad' },
    { id: 'flor_fuego', name: 'Flor de Fuego', type: 'Artifact', tier: 2, weight: 1, cost: 0, maxStack: 1, effect: 'Resist Fuego. +1d4 Fuego Melee.' },
    { id: 'nudo_espacial', name: 'Nudo Espacial', type: 'Artifact', tier: 2, weight: 2, cost: 0, maxStack: 1, effect: 'Ignora Terreno. Activa: Teleport 10ft' },
    { id: 'medula', name: 'Médula Ósea Reforzada', type: 'Artifact', tier: 2, weight: 2, cost: 0, maxStack: 1, effect: '+1 DG Max.' },
    { id: 'resonador', name: 'Resonador Armónico', type: 'Artifact', tier: 2, weight: 1, cost: 0, maxStack: 1, effect: 'Ventaja Percepción (Oído). Inmune Sordera.' },
    // Tier 3
    { id: 'nucleo_grav', name: 'Núcleo Gravitacional', type: 'Artifact', tier: 3, weight: 10, cost: 0, maxStack: 1, effect: 'Ventaja Fuerza. Resist Contundente.' },
    { id: 'matriz_psi', name: 'Matriz Psiónica', type: 'Artifact', tier: 3, weight: 1, cost: 0, maxStack: 1, effect: 'Resist Psíquico. +1 CD Conjuros.' },
    { id: 'corazon_llama', name: 'Corazón Llama Eterna', type: 'Artifact', tier: 3, weight: 1, cost: 0, maxStack: 1, effect: 'Inmune Fuego. Cura con Fuego.' },
    { id: 'simulacro', name: 'Simulacro Temporal', type: 'Artifact', tier: 3, weight: 1, cost: 0, maxStack: 1, effect: 'Ventaja Iniciativa. Activa: Rebobinar daño.' },
    { id: 'crisalida', name: 'Crisálida Adaptativa', type: 'Artifact', tier: 3, weight: 3, cost: 0, maxStack: 1, effect: '+1 CA. Regenera 1 HP/ronda.' },
    { id: 'silenciador_real', name: 'Silenciador de Realidad', type: 'Artifact', tier: 3, weight: 1, cost: 0, maxStack: 1, effect: 'Inmune Adivinación. Ventaja Sigilo.' },
    // Tier 4 (Legendary)
    { id: 'corazon_cataclismo', name: 'Corazón del Cataclismo', type: 'Artifact', tier: 4, weight: 5, cost: 0, maxStack: 1, effect: '+1 Todos Stats. Inmune Anomalías. Activa: Deseo.' },
    { id: 'fragmento_monolito', name: 'Fragmento Monolito', type: 'Artifact', tier: 4, weight: 3, cost: 0, maxStack: 1, effect: 'Inmune Psíquico. Detectar Pensamientos.' },
    { id: 'lagrima_cronos', name: 'Lágrima de Cronos', type: 'Artifact', tier: 4, weight: 1, cost: 0, maxStack: 1, effect: 'Inmune Efectos Tiempo. Acción Extra.' },
    { id: 'semilla_mundo', name: 'Semilla del Mundo', type: 'Artifact', tier: 4, weight: 2, cost: 0, maxStack: 1, effect: 'Regenera 10HP/ronda. Inmune Veneno/Enfermedad.' },
    { id: 'generador_cero', name: 'Generador Punto Cero', type: 'Artifact', tier: 4, weight: 10, cost: 0, maxStack: 1, effect: 'Inmune Eléctrico/Fuerza. Levitar.' },
    { id: 'mapa_pliega', name: 'El Mapa Que Se Pliega', type: 'Artifact', tier: 4, weight: 1, cost: 0, maxStack: 1, effect: '+1 CA. Teletransporte Infinito.' },

    // VEHICLES & BASES
    { id: 'moto_pony', name: 'Moto "Pony"', type: 'Vehicle', weight: 0, cost: 3000, maxStack: 1, effect: 'Rápida, sin protección. Ideal mensajeros.' },
    { id: 'pickup', name: 'Pickup 4x4', type: 'Vehicle', weight: 0, cost: 8000, maxStack: 1, effect: 'Carga +300 lbs. Fiable.' },
    { id: 'furgon', name: 'Furgón Blindado', type: 'Vehicle', weight: 0, cost: 15000, maxStack: 1, effect: 'Blindaje ligero, 6 pax.' },
    { id: 'humvee', name: 'Humvee Mod', type: 'Vehicle', weight: 0, cost: 35000, maxStack: 1, effect: 'Blindaje medio. Torreta.' },
    { id: 'hovercar', name: 'Hovercar Lujo', type: 'Vehicle', weight: 0, cost: 60000, maxStack: 1, effect: 'Flota, ignora terreno. Muy rápido.' },
    { id: 'exo_mula_veh', name: 'Exo-MULA (Plataforma)', type: 'Vehicle', weight: 0, cost: 120000, maxStack: 1, effect: 'Blindaje pesado, EMP. Plataforma armas.' },
    
    { id: 'apartamento', name: 'Apartamento', type: 'Base', weight: 0, cost: 5000, maxStack: 1, effect: 'Espacio 2. Ventaja Percepción. Discreto.' },
    { id: 'taller', name: 'Taller', type: 'Base', weight: 0, cost: 15000, maxStack: 1, effect: 'Espacio 4. Fabrica FMJ. Inspiración.' },
    { id: 'bunker_mil', name: 'Búnker Militar', type: 'Base', weight: 0, cost: 40000, maxStack: 1, effect: 'Espacio 6. CA 20. Luz, Ops.' },
    { id: 'bunker_ano', name: 'Búnker Anómalo', type: 'Base', weight: 0, cost: 100000, maxStack: 1, effect: 'Espacio 8. Filtro III. Campo Fuerza. Lab.' },
];

export const TALENTS_CATALOG: Talent[] = [
    // TANK TIER 1
    { id: 'tank_tier1_1', name: 'Piel de Mutante', type: 'Tank', tier: 1, description: 'Tu piel se endurece.', benefit: '+1 CA permanente.', cost: 1000 },
    { id: 'tank_tier1_2', name: 'Provocación Táctica', type: 'Tank', tier: 1, description: 'Gritas un desafío.', benefit: 'Enemigo debe atacarte o desventaja.', cost: 1000 },
    { id: 'tank_tier1_3', name: 'Rompe-Líneas', type: 'Tank', tier: 1, description: 'Músculos potenciados.', benefit: 'Ventaja Fuerza (Atletismo).', cost: 1000 },
    { id: 'tank_tier1_4', name: 'Resistencia al Dolor', type: 'Tank', tier: 1, description: 'Nervios amortiguados.', benefit: 'Ventaja Salv. CON vs Fatiga.', cost: 1000 },
    { id: 'tank_tier1_5', name: 'Impacto Cinético', type: 'Tank', tier: 1, description: 'Caes como piedra.', benefit: 'Reacción reducir daño contundente 1d4.', cost: 1000 },
    { id: 'tank_tier1_6', name: 'Metabolismo de Acero', type: 'Tank', tier: 1, description: 'Filtros industriales.', benefit: 'Ventaja vs Veneno/Enfermedad.', cost: 1000 },
    { id: 'tank_tier1_7', name: 'Pies de Plomo', type: 'Tank', tier: 1, description: 'Centro gravedad.', benefit: 'Ventaja vs Derribo.', cost: 1000 },
    { id: 'tank_tier1_8', name: 'Grito de Guerra', type: 'Tank', tier: 1, description: 'Rugido inspirador.', benefit: 'Otorga HP Temp a aliado.', cost: 1000 },
    { id: 'tank_tier1_9', name: 'Freno de Boca', type: 'Tank', tier: 1, description: 'Recibir disparo.', benefit: 'Reduce daño fuego quemarropa.', cost: 1000 },
    
    // TANK TIER 2
    { id: 'tank_tier2_1', name: 'Escudo de Esencia', type: 'Tank', tier: 2, description: 'Aura repele energía.', benefit: 'Resistencia a Fuego/Frio/Elec. +1 RA.', cost: 3000 },
    { id: 'tank_tier2_2', name: 'Regeneración de Emergencia', type: 'Tank', tier: 2, description: 'Metabolismo rápido.', benefit: 'Gasta 2 DG como acción.', cost: 3000 },
    { id: 'tank_tier2_3', name: 'Presencia Intimidante', type: 'Tank', tier: 2, description: 'Muerte encarnada.', benefit: 'Enemigos heridos desventaja atacarte.', cost: 3000 },
    { id: 'tank_tier2_4', name: 'Arresto Táctico', type: 'Tank', tier: 2, description: 'Prensas hidráulicas.', benefit: 'Presa a 2 objetivos.', cost: 3000 },
    { id: 'tank_tier2_5', name: 'Absorción de Esencia', type: 'Tank', tier: 2, description: 'Alimentas del fracaso.', benefit: 'Si fallan por 3 o menos, curas 1 HP.', cost: 3000 },
    { id: 'tank_tier2_6', name: 'Competencia Adicional', type: 'Tank', tier: 2, description: 'Entrenamiento extra.', benefit: 'Arma marcial extra o sin penalización Sigilo armadura pesada.', cost: 3000 },
    
    // TANK TIER 3
    { id: 'tank_tier3_1', name: 'Bastión Inquebrantable', type: 'Tank', tier: 3, description: 'Objeto inamovible.', benefit: 'Inmune Derribo. Estable a 0 HP.', cost: 6000 },
    { id: 'tank_tier3_2', name: 'Guardián de la Zona', type: 'Tank', tier: 3, description: 'Trayectoria letal.', benefit: 'Recibes daño por aliado.', cost: 6000 },
    { id: 'tank_tier3_3', name: 'Muro de Acero', type: 'Tank', tier: 3, description: 'Piel impenetrable.', benefit: 'Reduce 3 daño físico con Armadura Pesada.', cost: 6000 },

    // DPS TIER 1
    { id: 'dps_tier1_1', name: 'Ojo de Halcón', type: 'DPS', tier: 1, description: 'Zoom biológico.', benefit: 'Mitad penalización rango largo. Ventaja Percepción vista.', cost: 1000 },
    { id: 'dps_tier1_2', name: 'Disparo de Precisión', type: 'DPS', tier: 1, description: 'Apunta punto débil.', benefit: '+Bono Comp ataque, -1d4 daño.', cost: 1000 },
    { id: 'dps_tier1_3', name: 'Recarga Rápida', type: 'DPS', tier: 1, description: 'Manos borrosas.', benefit: 'Recarga como Bonus.', cost: 1000 },
    { id: 'dps_tier1_4', name: 'Pistolero Nato', type: 'DPS', tier: 1, description: 'Extensión del puño.', benefit: '+1 Ataque/Daño pistolas. Sin desventaja melee.', cost: 1000 },
    { id: 'dps_tier1_5', name: 'Reflejos de Serpiente', type: 'DPS', tier: 1, description: 'Overclock nervioso.', benefit: 'Suma Bono Comp a Iniciativa.', cost: 1000 },
    { id: 'dps_tier1_6', name: 'Asesino Silencioso', type: 'DPS', tier: 1, description: 'Donde duele.', benefit: '+1d4 daño armas silenciadas.', cost: 1000 },
    { id: 'dps_tier1_7', name: 'Tirador Experto', type: 'DPS', tier: 1, description: 'Maestría fusiles.', benefit: '+1 Ataque Rifles/DMR.', cost: 1000 },
    { id: 'dps_tier1_8', name: 'Doble Disparo', type: 'DPS', tier: 1, description: 'Arma secundaria.', benefit: 'Ataque extra pistola mano torpe (Bonus).', cost: 1000 },
    { id: 'dps_tier1_9', name: 'Manos Ágiles', type: 'DPS', tier: 1, description: 'Dedos cirujano.', benefit: 'Ventaja Juego Manos.', cost: 1000 },

    // DPS TIER 2
    { id: 'dps_tier2_1', name: 'Descarga de Adrenalina', type: 'DPS', tier: 2, description: 'Mundo ralentiza.', benefit: '2 ataques extra este turno. Fatiga siguiente.', cost: 3000 },
    { id: 'dps_tier2_2', name: 'Perforador Anómalo', type: 'DPS', tier: 2, description: 'Balas vibran.', benefit: 'Suma mitad Bono Comp a daño vs Armadura.', cost: 3000 },
    { id: 'dps_tier2_3', name: 'Movimiento Fantasma', type: 'DPS', tier: 2, description: 'Disparas y desvaneces.', benefit: 'Mover 10ft sin ataque oportunidad tras atacar.', cost: 3000 },
    { id: 'dps_tier2_4', name: 'Tiro Letal', type: 'DPS', tier: 2, description: 'Órganos vitales.', benefit: 'Críticos tiran dado extra.', cost: 3000 },
    { id: 'dps_tier2_5', name: 'Especialista Munición', type: 'DPS', tier: 2, description: 'Modificar balas.', benefit: 'HP gana penetración AP y viceversa.', cost: 3000 },

    // DPS TIER 3
    { id: 'dps_tier3_1', name: 'Maestro de Ráfagas', type: 'DPS', tier: 3, description: 'Control retroceso.', benefit: 'Penalización Ráfaga reducida mitad.', cost: 6000 },
    { id: 'dps_tier3_2', name: 'Instinto Asesino', type: 'DPS', tier: 3, description: 'Sangre llama sangre.', benefit: 'Al matar, mover y atacar otra vez (Reacción).', cost: 6000 },
    { id: 'dps_tier3_3', name: 'Danza de la Muerte', type: 'DPS', tier: 3, description: 'Trauma masivo.', benefit: 'Acertar todo a un objetivo lo Aturde.', cost: 6000 },

    // SUPPORT TIER 1
    { id: 'sup_tier1_1', name: 'Resistencia a Anomalías', type: 'Support', tier: 1, description: 'ADN repara.', benefit: 'Ventaja salvación Radiación/Veneno anómalo.', cost: 1000 },
    { id: 'sup_tier1_2', name: 'Técnico de Campo', type: 'Support', tier: 1, description: 'Manos rápidas.', benefit: 'Kit Médico/Mecánico como Bonus.', cost: 1000 },
    { id: 'sup_tier1_3', name: 'Pulso Vital', type: 'Support', tier: 1, description: 'Energía restauradora.', benefit: 'Acción: Cura 1d8 HP.', cost: 1000 },
    { id: 'sup_tier1_4', name: 'Ojo del Supervisor', type: 'Support', tier: 1, description: 'Ves patrones.', benefit: 'Ventaja Percepción/Investigación trampas.', cost: 1000 },
    { id: 'sup_tier1_5', name: 'Alquimia Rápida', type: 'Support', tier: 1, description: 'Mezclas y aplicas.', benefit: 'Administrar poción como Bonus.', cost: 1000 },
    { id: 'sup_tier1_6', name: 'Conocimiento Prohibido', type: 'Support', tier: 1, description: 'Archivos secretos.', benefit: 'Competencia Arcano/Historia/Religión.', cost: 1000 },
    { id: 'sup_tier1_7', name: 'Escudo Esencia Menor', type: 'Support', tier: 1, description: 'Aura protege.', benefit: 'Resistencia daño elemental 1 día.', cost: 1000 },
    { id: 'sup_tier1_8', name: 'Vínculo Anómalo', type: 'Support', tier: 1, description: 'Simbiosis.', benefit: 'Con Artefacto, recuperas 1 HP/turno.', cost: 1000 },
    { id: 'sup_tier1_9', name: 'Red de Seguridad', type: 'Support', tier: 1, description: 'Nadie atrás.', benefit: 'Reacción: Curar aliado caído gastando DG.', cost: 1000 },

    // SUPPORT TIER 2
    { id: 'sup_tier2_1', name: 'Mente Sincronizada', type: 'Support', tier: 2, description: 'Nodo conexión.', benefit: '+1 RA. Comparte pasivos artefactos.', cost: 3000 },
    { id: 'sup_tier2_2', name: 'Intervención Crítica', type: 'Support', tier: 2, description: 'Advertencia psíquica.', benefit: 'Reacción: Aliado repite salvación.', cost: 3000 },
    { id: 'sup_tier2_3', name: 'Sanador de Combate', type: 'Support', tier: 2, description: 'Cura potente.', benefit: 'Curas a 0 HP suman Bono Comp.', cost: 3000 },
    { id: 'sup_tier2_4', name: 'Conjuración Emergencia', type: 'Support', tier: 2, description: 'Sobrecarga.', benefit: 'Lanzar hechizo Nv1 sin gastar slot (1/LR).', cost: 3000 },
    { id: 'sup_tier2_5', name: 'Ingenio Anómalo', type: 'Support', tier: 2, description: 'Aprendizaje.', benefit: 'Descuento en coste Mejora Habilidad.', cost: 3000 },
    { id: 'sup_tier2_6', name: 'Mano Lejana', type: 'Support', tier: 2, description: 'Proyección.', benefit: 'Alcance curación/toque aumenta 30 pies.', cost: 3000 },

    // SUPPORT TIER 3
    { id: 'sup_tier3_1', name: 'Fuente de Esencia', type: 'Support', tier: 3, description: 'Reactor viviente.', benefit: 'Recuperas 1d4 EA/Descanso. Aura +1 Salv.', cost: 6000 },
    { id: 'sup_tier3_2', name: 'Poder de la Zona', type: 'Support', tier: 3, description: 'Zona obedece.', benefit: 'Ventaja Concentración. +1 RA. Ignora armadura.', cost: 6000 },
    { id: 'sup_tier3_3', name: 'Resurrección Limitada', type: 'Support', tier: 3, description: 'Desafío muerte.', benefit: 'Revivir muerto reciente 1HP (1/Semana).', cost: 6000 },

    // GENERAL
    { id: 'gen_mule', name: 'Mula de Carga', type: 'General', tier: 1, description: 'Espalda fuerte.', benefit: '+20 lbs capacidad de carga.', cost: 800 },
    { id: 'gen_runner', name: 'Corredor', type: 'General', tier: 1, description: 'Piernas fuertes.', benefit: '+5 pies de velocidad.', cost: 800 },
];

export const TRAITS_CATALOG: Trait[] = [
    // Backgrounds (V28)
    { id: 'bg_militar', name: 'Ex-Militar / Contratista', type: 'Background', description: 'Veterano endurecido.', effect: 'Disciplina: Ventaja vs Miedo mundano.', grantsProficiency: ['athletics', 'intimidation'] },
    { id: 'bg_cientifico', name: 'Científico Renegado', type: 'Background', description: 'Intelectual de la Zona.', effect: 'Analista: Identifica propiedades básicas anomalías.', grantsProficiency: ['tech', 'medicine'] },
    { id: 'bg_scavenger', name: 'Habitante del Yermo', type: 'Background', description: 'Nacido en la basura.', effect: 'Estómago Hierro: Ventaja vs comida/agua mala.', grantsProficiency: ['stealth', 'survival'] },
    { id: 'bg_criminal', name: 'Criminal / Contrabandista', type: 'Background', description: 'Vive al margen.', effect: 'Contactos: Conoces códigos del bajo mundo.', grantsProficiency: ['deception', 'sleight_hand'] },
    { id: 'bg_medico', name: 'Médico de Campo', type: 'Background', description: 'Salvador de vidas.', effect: 'Triaje: Estabiliza como Acción Bonificada.', grantsProficiency: ['medicine', 'insight'] },
    { id: 'bg_tecnologo', name: 'Tecnólogo del Reich', type: 'Background', description: 'Ingeniero avanzado.', effect: 'Mantenimiento: Repara pifias armas como Bonus.', grantsProficiency: ['investigation', 'tech'] },
    { id: 'bg_guia', name: 'Guía Local (Sherpa)', type: 'Background', description: 'Conoce los caminos.', effect: 'Sexto Sentido: Aviso de peligros inminentes.', grantsProficiency: ['survival', 'history'] },
    { id: 'bg_sacerdote', name: 'Sacerdote del Culto', type: 'Background', description: 'Fe en la Zona.', effect: 'Aura: Ventaja Carisma con fanáticos/anómalos.', grantsProficiency: ['religion', 'persuasion'] },
    { id: 'bg_cazador', name: 'Cazador de Bestias', type: 'Background', description: 'Depredador.', effect: 'Anatomía: Ventaja INT para debilidades monstruos.', grantsProficiency: ['nature', 'stealth'] },
    { id: 'bg_rata', name: 'Rata de Túnel', type: 'Background', description: 'Explorador subterráneo.', effect: 'Escurridizo: Sin desventaja en espacios estrechos.', grantsProficiency: ['acrobatics', 'perception'] },
    { id: 'bg_mensajero', name: 'Mensajero de la Zona', type: 'Background', description: 'Corredor veloz.', effect: 'Paso Ligero: +5 pies velocidad (sin armadura pesada).', grantsProficiency: ['athletics', 'acrobatics'] },
    { id: 'bg_cocinero', name: 'Cocinero de Anomalías', type: 'Background', description: 'Chef mutante.', effect: 'Nutrición Anómala: Comida cura 1d4 extra.', grantsProficiency: ['survival'] },
    { id: 'bg_psiquico', name: 'Psíquico Latente', type: 'Background', description: 'La Zona te habla.', effect: 'Detector Humano: Sientes anomalías (dolor cabeza).', grantsProficiency: ['perception', 'deception'] },
    { id: 'bg_arquitecto', name: 'Arquitecto de Refugios', type: 'Background', description: 'Constructor.', effect: 'Fortificar: +5 CD a puertas reforzadas.', grantsProficiency: ['investigation'] },
    { id: 'bg_comerciante', name: 'Comerciante Itinerante', type: 'Background', description: 'El dinero manda.', effect: 'Ojo para el Oro: Tasación instantánea.', grantsProficiency: ['persuasion', 'insight'] },

    // Positive
    { id: 'trait_alert', name: 'Alerta', type: 'Positive', description: 'Siempre atento.', effect: '+5 Iniciativa.' },
    { id: 'trait_lucky', name: 'Afortunado', type: 'Positive', description: 'El destino te sonríe.', effect: '3 Puntos de Suerte/día.' },
    { id: 'trait_scout', name: 'Explorador', type: 'Positive', description: 'Conoces el terreno.', effect: 'Ignoras terreno difícil natural no mágico.' },
    { id: 'trait_charismatic', name: 'Líder Nato', type: 'Positive', description: 'Inspiras confianza.', effect: 'Aliados a 10 pies ganan +1 a salvaciones contra miedo.' },
    { id: 'trait_tough', name: 'Duro de Matar', type: 'Positive', description: 'Demasiado terco para morir.', effect: 'Ventaja en la primera Salvación de Muerte.' },
    { id: 'trait_mobile', name: 'Ágil', type: 'Positive', description: 'Movimiento fluido.', effect: 'Levantarse del suelo solo cuesta 5 pies.' },
    { id: 'trait_observant', name: 'Observador', type: 'Positive', description: 'Nada se te escapa.', effect: '+2 a Percepción Pasiva.' },
    { id: 'trait_ghost', name: 'Fantasma', type: 'Positive', description: 'Silencioso como la muerte.', effect: 'Ventaja en Sigilo si llevas armadura ligera.' },
    { id: 'trait_brawler', name: 'Peleador', type: 'Positive', description: 'Puños de acero.', effect: 'Tus ataques desarmados hacen 1d4 de daño.' },

    // Negative
    { id: 'trait_fragile', name: 'Huesos de Cristal', type: 'Negative', description: 'Esqueleto débil.', effect: '-10 lbs Carga, Vulnerable a daño contundente.' },
    { id: 'trait_insomniac', name: 'Insomne', type: 'Negative', description: 'Pesadillas constantes.', effect: 'Solo recuperas mitad de DG en descanso largo.' },
    { id: 'trait_paranoid', name: 'Paranoico', type: 'Negative', description: 'No confías en nadie.', effect: 'Desventaja en Persuasión y Engaño para hacer amigos.' },
    { id: 'trait_greed', name: 'Codicia', type: 'Negative', description: 'El brillo te ciega.', effect: 'Debes pasar salvación WIS 12 para no intentar robar objetos valiosos visibles.' },
    { id: 'trait_addict', name: 'Adicto', type: 'Negative', description: 'Necesitas tu dosis.', effect: 'Si no consumes (alcohol/drogas) en 24h, sufres Desventaja en todo.' },
    { id: 'trait_coward', name: 'Cobarde', type: 'Negative', description: 'El miedo te paraliza.', effect: 'Desventaja en salvaciones contra Miedo.' },
    { id: 'trait_clumsy', name: 'Torpe', type: 'Negative', description: 'Dos pies izquierdos.', effect: 'Desventaja en Sigilo.' },
    { id: 'trait_hemophiliac', name: 'Hemofílico', type: 'Negative', description: 'Tu sangre no coagula.', effect: 'Cualquier efecto de Sangrado requiere medicina CD 15 para parar.' },
    { id: 'trait_unlucky', name: 'Gafe', type: 'Negative', description: 'Mala suerte.', effect: 'El DJ puede obligarte a repetir una tirada con éxito 1 vez al día.' },
    { id: 'trait_night_blind', name: 'Ceguera Nocturna', type: 'Negative', description: 'No ves nada de noche.', effect: 'Desventaja en Percepción y Ataque en luz tenue.' },
    { id: 'trait_loud', name: 'Ruidoso', type: 'Negative', description: 'No puedes callarte.', effect: 'Los enemigos tienen ventaja para detectarte auditivamente.' },
];

export const PROTOCOLS_CATALOG: Protocol[] = [
    // Nivel 0
    { id: 'p_resistance', name: 'Estimulante Resistencia', level: 0, school: 'Abjuración', castingTime: '1 Acción', range: 'Toque', description: 'Refuerza sinapsis.', effect: '+1d4 a Salvación.' },
    { id: 'p_bladeward', name: 'Endurecimiento Dérmico', level: 0, school: 'Abjuración', castingTime: '1 Acción', range: 'Personal', description: 'Piel dura.', effect: 'Resistencia daño físico.' },
    { id: 'p_sanctity', name: 'Sello de Plomo Menor', level: 0, school: 'Abjuración', castingTime: '1 Acción', range: 'Toque', description: 'Zona muerta.', effect: 'Indetectable sensores.' },
    { id: 'p_deflect', name: 'Deflector Escombros', level: 0, school: 'Abjuración', castingTime: 'Reacción', range: 'Personal', description: 'Almohadilla aire.', effect: 'Reduce daño objeto 0.' },
    { id: 'p_lock', name: 'Cierre Emergencia', level: 0, school: 'Abjuración', castingTime: '1 Acción', range: 'Toque', description: 'Fusión molecular.', effect: 'Traba puerta.' },
    { id: 'p_magehand', name: 'Brazo Manipulador', level: 0, school: 'Conjuración', castingTime: '1 Acción', range: '30 pies', description: 'Gravedad visible.', effect: 'Manipula 10 lbs.' },
    { id: 'p_poison', name: 'Dardo Tóxico', level: 0, school: 'Conjuración', castingTime: '1 Acción', range: '10 pies', description: 'Nube partículas.', effect: '1d12 Veneno.' },
    { id: 'p_acid', name: 'Vial Ácido', level: 0, school: 'Conjuración', castingTime: '1 Acción', range: '60 pies', description: 'Glóbulo inestable.', effect: '1d6 Ácido (2 objetivos).' },
    { id: 'p_bonfire', name: 'Bengala Térmica', level: 0, school: 'Conjuración', castingTime: '1 Acción', range: '60 pies', description: 'Ignición espontánea.', effect: '1d8 Fuego (Conc).' },
    { id: 'p_infest', name: 'Nanocápsula Enjambre', level: 0, school: 'Conjuración', castingTime: '1 Acción', range: '30 pies', description: 'Parásitos energía.', effect: '1d6 Veneno + Mover 5ft.' },
    { id: 'p_truestrike', name: 'Cálculo Balístico', level: 0, school: 'Adivinación', castingTime: '1 Acción', range: '30 pies', description: 'Vectores futuros.', effect: 'Ventaja primer ataque.' },
    { id: 'p_guide', name: 'Asistente IA', level: 0, school: 'Adivinación', castingTime: '1 Acción', range: 'Toque', description: 'Presciencia menor.', effect: '+1d4 Habilidad.' },
    { id: 'p_analyze', name: 'Escaneo Rápido', level: 0, school: 'Adivinación', castingTime: '1 Acción', range: 'Toque', description: 'Estructura atómica.', effect: 'Lectura física.' },
    { id: 'p_sense', name: 'Detector Anomalías', level: 0, school: 'Adivinación', castingTime: '1 Acción', range: 'Personal', description: 'Zumbido dientes.', effect: 'Alerta anómala 30ft.' },
    { id: 'p_cipher', name: 'Lectura Labios', level: 0, school: 'Adivinación', castingTime: '1 Acción', range: 'Visual', description: 'Micro-vibraciones.', effect: 'Entiendes habla visual.' },
    { id: 'p_light', name: 'Linterna Química', level: 0, school: 'Evocación', castingTime: '1 Acción', range: 'Toque', description: 'Fotones visibles.', effect: 'Luz 20ft.' },
    { id: 'p_shocking', name: 'Taser Contacto', level: 0, school: 'Evocación', castingTime: '1 Acción', range: 'Toque', description: 'Carga estática.', effect: '1d8 Eléctrico + No Reacción.' },
    { id: 'p_rayfrost', name: 'Rayo Criogénico', level: 0, school: 'Evocación', castingTime: '1 Acción', range: '60 pies', description: 'Roba calor.', effect: '1d8 Frío -10ft vel.' },
    { id: 'p_firebolt', name: 'Disparo Incendiario', level: 0, school: 'Evocación', castingTime: '1 Acción', range: '120 pies', description: 'Esfera plasma.', effect: '1d10 Fuego.' },
    { id: 'p_thunder', name: 'Detonador Sónico', level: 0, school: 'Evocación', castingTime: '1 Acción', range: '5 pies', description: 'Onda choque.', effect: '1d6 Trueno (Área).' },
    { id: 'p_mockery', name: 'Insulto Psíquico', level: 0, school: 'Encantamiento', castingTime: '1 Acción', range: '60 pies', description: 'Glitch cerebral.', effect: '1d4 Psíquico + Desventaja.' },
    { id: 'p_friends', name: 'Feromonas Sintéticas', level: 0, school: 'Encantamiento', castingTime: '1 Acción', range: 'Personal', description: 'Aura confianza.', effect: 'Ventaja Carisma.' },
    { id: 'p_mindsliver', name: 'Pico Neuronal', level: 0, school: 'Encantamiento', castingTime: '1 Acción', range: '60 pies', description: 'Aguja mental.', effect: '1d6 Psíquico -1d4 salv.' },
    { id: 'p_message', name: 'Radio Cifrada', level: 0, school: 'Transmutación', castingTime: '1 Acción', range: '120 pies', description: 'Voz mente.', effect: 'Susurro distancia.' },
    { id: 'p_mending', name: 'Soldador', level: 0, school: 'Transmutación', castingTime: '1 Min', range: 'Toque', description: 'Fusión bordes.', effect: 'Repara roturas.' },
    { id: 'p_presti', name: 'Multi-Herramienta', level: 0, school: 'Transmutación', castingTime: '1 Acción', range: '10 pies', description: 'Alteración local.', effect: 'Limpiar/Calentar/Marcar.' },
    { id: 'p_thornwhip', name: 'Cable Arrastre', level: 0, school: 'Transmutación', castingTime: '1 Acción', range: '30 pies', description: 'Látigo materia.', effect: '1d6 Daño + Atrae 10ft.' },
    { id: 'p_shillelagh', name: 'Bastón Cargado', level: 0, school: 'Transmutación', castingTime: 'Bonus', range: 'Toque', description: 'Fuerza cinética.', effect: 'Arma mágica d8.' },
    { id: 'p_chill', name: 'Toque Entrópico', level: 0, school: 'Necromancia', castingTime: '1 Acción', range: '120 pies', description: 'Mano espectral.', effect: '1d8 Necrótico (No cura).' },
    { id: 'p_spare', name: 'Estabilizador', level: 0, school: 'Necromancia', castingTime: '1 Acción', range: 'Toque', description: 'Choque vital.', effect: 'Estabiliza a 0 HP.' },
    { id: 'p_toll', name: 'Frecuencia Mortal', level: 0, school: 'Necromancia', castingTime: '1 Acción', range: '60 pies', description: 'Resonancia debilidad.', effect: 'Daño alto si herido.' },
    
    // Nivel 1
    { id: 'p_shield1', name: 'Campo de Fuerza', level: 1, school: 'Abjuración', castingTime: 'Reacción', range: 'Personal', description: 'Barrera hexagonal.', effect: '+5 CA.' },
    { id: 'p_prot_evil', name: 'Sello de Plomo', level: 1, school: 'Abjuración', castingTime: '1 Acción', range: 'Toque', description: 'Ruido blanco psíquico.', effect: 'Desventaja Aberraciones.' },
    { id: 'p_absorb', name: 'Absorción Energía', level: 1, school: 'Abjuración', castingTime: 'Reacción', range: 'Personal', description: 'Pararrayos aura.', effect: 'Resist Elemento + Daño.' },
    { id: 'p_magearmor', name: 'Blindaje de Piel', level: 1, school: 'Abjuración', castingTime: '1 Acción', range: 'Toque', description: 'Campo estático.', effect: 'CA 13 + DES.' },
    { id: 'p_sanctuary', name: 'Baliza Protección', level: 1, school: 'Abjuración', castingTime: 'Bonus', range: '30 pies', description: 'Campo apatía.', effect: 'Enemigo falla ataque.' },
    { id: 'p_grease', name: 'Grasa Industrial', level: 1, school: 'Conjuración', castingTime: '1 Acción', range: '60 pies', description: 'Ectoplasma resbaladizo.', effect: 'Terreno difícil/Caer.' },
    { id: 'p_fog', name: 'Nube de Humo', level: 1, school: 'Conjuración', castingTime: '1 Acción', range: '120 pies', description: 'Vapor denso.', effect: 'Oscurecimiento total.' },
    { id: 'p_hunter', name: 'Marcador Táctico', level: 1, school: 'Adivinación', castingTime: 'Bonus', range: '90 pies', description: 'Firma vital.', effect: '+1d6 daño. Rastreo.' },
    { id: 'p_detect', name: 'Escáner Amenazas', level: 1, school: 'Adivinación', castingTime: '1 Acción', range: 'Personal', description: 'Tercer ojo.', effect: 'Detecta Aberraciones.' },
    { id: 'p_identify', name: 'Identificar', level: 1, school: 'Adivinación', castingTime: '1 Min', range: 'Toque', description: 'Memoria residual.', effect: 'Propiedades mágicas.' },
    { id: 'p_missile', name: 'Micro-Cohetes', level: 1, school: 'Evocación', castingTime: '1 Acción', range: '120 pies', description: 'Dardos fuerza.', effect: '3x (1d4+1) Auto.' },
    { id: 'p_burn', name: 'Lanzallamas', level: 1, school: 'Evocación', castingTime: '1 Acción', range: 'Cono 15ft', description: 'Abanico fuego.', effect: '3d6 Fuego.' },
    { id: 'p_thunderwave', name: 'Onda Sónica', level: 1, school: 'Evocación', castingTime: '1 Acción', range: 'Cubo 15ft', description: 'Explosión aire.', effect: '2d8 Trueno + Empuje.' },
    { id: 'p_guidebolt', name: 'Proyectil Plasma', level: 1, school: 'Evocación', castingTime: '1 Acción', range: '120 pies', description: 'Trazador energía.', effect: '4d6 Radiante + Ventaja.' },
    { id: 'p_command', name: 'Orden Imperativa', level: 1, school: 'Encantamiento', castingTime: '1 Acción', range: '60 pies', description: 'Autoridad psíquica.', effect: 'Obedece 1 palabra.' },
    { id: 'p_heroism', name: 'Inyección Valor', level: 1, school: 'Encantamiento', castingTime: '1 Acción', range: 'Toque', description: 'Bloquea miedo.', effect: 'Inmune Miedo + HP Temp.' },
    { id: 'p_disguise', name: 'Holo-Disfraz', level: 1, school: 'Ilusión', castingTime: '1 Acción', range: 'Personal', description: 'Capa holográfica.', effect: 'Cambia apariencia.' },
    { id: 'p_image', name: 'Señuelo', level: 1, school: 'Ilusión', castingTime: '1 Acción', range: '60 pies', description: 'Holograma 3D.', effect: 'Imagen móvil.' },
    { id: 'p_inflict', name: 'Toque Muerte', level: 1, school: 'Necromancia', castingTime: '1 Acción', range: 'Toque', description: 'Canaliza entropía.', effect: '3d10 Necrótico.' },
    { id: 'p_falselife', name: 'Falsa Vida', level: 1, school: 'Necromancia', castingTime: '1 Acción', range: 'Personal', description: 'Refuerzo anómalo.', effect: '1d4+4 HP Temp.' },
    { id: 'p_feather', name: 'Caída Pluma', level: 1, school: 'Transmutación', castingTime: 'Reacción', range: '60 pies', description: 'Altera gravedad.', effect: 'Caída lenta.' },
    { id: 'p_jump', name: 'Salto Asistido', level: 1, school: 'Transmutación', castingTime: '1 Acción', range: 'Toque', description: 'Potencia músculos.', effect: 'Triple salto.' },

    // Nivel 2
    { id: 'p_arcanelock', name: 'Cierre Electrónico', level: 2, school: 'Abjuración', castingTime: '1 Acción', range: 'Toque', description: 'Reescribe realidad puerta.', effect: 'Bloqueo permanente +10 CD.' },
    { id: 'p_misty', name: 'Salto de Fase', level: 2, school: 'Conjuración', castingTime: 'Bonus', range: 'Personal', description: 'Dimensión bolsillo.', effect: 'Teleport 30ft.' },
    { id: 'p_web', name: 'Espuma Contención', level: 2, school: 'Conjuración', castingTime: '1 Acción', range: '60 pies', description: 'Red sólida.', effect: 'Apresado (Inflamable).' },
    { id: 'p_invis', name: 'Camuflaje Óptico', level: 2, school: 'Ilusión', castingTime: '1 Acción', range: 'Toque', description: 'Dobla luz.', effect: 'Invisible.' },
    { id: 'p_scorching', name: 'Rayo Abrasador', level: 2, school: 'Evocación', castingTime: '1 Acción', range: '120 pies', description: 'Láser concentrado.', effect: '3 rayos 2d6 Fuego.' },
    { id: 'p_darkness', name: 'Oscuridad', level: 2, school: 'Evocación', castingTime: '1 Acción', range: '60 pies', description: 'Vacío fotónico.', effect: 'Oscuridad total.' },
    { id: 'p_hold', name: 'Parálisis Táctica', level: 2, school: 'Encantamiento', castingTime: '1 Acción', range: '60 pies', description: 'Corta conexión muscular.', effect: 'Paralizado.' },
    { id: 'p_levitate', name: 'Levitar', level: 2, school: 'Transmutación', castingTime: '1 Acción', range: '60 pies', description: 'Anula gravedad.', effect: 'Flotar 20 pies.' },
    { id: 'p_darkvision', name: 'Visión Nocturna', level: 2, school: 'Transmutación', castingTime: '1 Acción', range: 'Toque', description: 'Altera retinas.', effect: 'Visión oscuridad.' },
    { id: 'p_seeinvis', name: 'Visión Térmica', level: 2, school: 'Adivinación', castingTime: '1 Acción', range: 'Personal', description: 'Espectro completo.', effect: 'Ves invisibles.' },
    { id: 'p_detectthought', name: 'Escáner Mental', level: 2, school: 'Adivinación', castingTime: '1 Acción', range: 'Personal', description: 'Sintoniza Noosfera.', effect: 'Lees pensamientos.' },
    { id: 'p_locate', name: 'Localizar Objeto', level: 2, school: 'Adivinación', castingTime: '1 Acción', range: 'Personal', description: 'Radar mental.', effect: 'Dirección objeto.' },
    { id: 'p_zone', name: 'Zona de Verdad', level: 2, school: 'Encantamiento', castingTime: '1 Acción', range: '60 pies', description: 'Presión mental.', effect: 'Impide mentir.' },
    { id: 'p_suggestion', name: 'Sugestión', level: 2, school: 'Encantamiento', castingTime: '1 Acción', range: '30 pies', description: 'Reescribe prioridades.', effect: 'Sigue instrucción 8h.' },
    { id: 'p_mirror', name: 'Doble Digital', level: 2, school: 'Ilusión', castingTime: '1 Acción', range: 'Personal', description: 'Ecos temporales.', effect: 'Duplicados absorben ataque.' },
    { id: 'p_silence', name: 'Silenciador', level: 2, school: 'Ilusión', castingTime: '1 Acción', range: '120 pies', description: 'Anula vibraciones.', effect: 'Silencio absoluto.' },
    { id: 'p_enfeeble', name: 'Rayo Debilitante', level: 2, school: 'Necromancia', castingTime: '1 Acción', range: '60 pies', description: 'Atrofia músculos.', effect: 'Mitad daño fuerza.' },
    { id: 'p_lesser', name: 'Restauración Sistema', level: 2, school: 'Abjuración', castingTime: '1 Acción', range: 'Toque', description: 'Energía pura.', effect: 'Cura condiciones.' },
    { id: 'p_weapon', name: 'Dron de Asalto', level: 2, school: 'Conjuración', castingTime: 'Bonus', range: '60 pies', description: 'Constructo fuerza.', effect: 'Ataque 1d8+Mod.' },
    { id: 'p_magicwep', name: 'Arma Anómala', level: 2, school: 'Transmutación', castingTime: 'Bonus', range: 'Toque', description: 'Vibra energía.', effect: 'Arma +1.' },

    // Nivel 3
    { id: 'p_counter', name: 'Contramedida EMP', level: 3, school: 'Abjuración', castingTime: 'Reacción', range: '60 pies', description: 'Pulso negación.', effect: 'Interrumpe hechizo.' },
    { id: 'p_dispel', name: 'Disipador Anomalías', level: 3, school: 'Abjuración', castingTime: '1 Acción', range: '120 pies', description: 'Arranca hilos esencia.', effect: 'Fin efectos mágicos.' },
    { id: 'p_fireball', name: 'Granada Vacío', level: 3, school: 'Evocación', castingTime: '1 Acción', range: '150 pies', description: 'Singularidad térmica.', effect: '8d6 Fuego (20ft radio).' },
    { id: 'p_lightning', name: 'Cañón Riel', level: 3, school: 'Evocación', castingTime: '1 Acción', range: '100 pies', description: 'Arco voltaico.', effect: '8d6 Eléctrico (Línea).' },
    { id: 'p_revivify', name: 'Desfibrilador', level: 3, school: 'Necromancia', castingTime: '1 Acción', range: 'Toque', description: 'Descarga masiva.', effect: 'Revive muerto reciente.' },
    { id: 'p_fly', name: 'Volar', level: 3, school: 'Transmutación', castingTime: '1 Acción', range: 'Toque', description: 'Desafía gravedad.', effect: 'Vuelo 60ft.' },
    { id: 'p_haste', name: 'Acelerar', level: 3, school: 'Transmutación', castingTime: '1 Acción', range: '30 pies', description: 'Flujo temporal.', effect: 'Doble vel, +2 CA, Acción extra.' },
    { id: 'p_slow', name: 'Lentitud', level: 3, school: 'Transmutación', castingTime: '1 Acción', range: '120 pies', description: 'Espesa tiempo.', effect: 'Mitad vel, -2 CA.' },
    { id: 'p_vampiric', name: 'Toque Vampírico', level: 3, school: 'Necromancia', castingTime: '1 Acción', range: 'Personal', description: 'Vórtice succión.', effect: 'Daño cura usuario.' },
    { id: 'p_animate', name: 'Reanimación', level: 3, school: 'Necromancia', castingTime: '1 Min', range: '10 pies', description: 'Obediencia macabra.', effect: 'Crea Zombie/Esqueleto.' },
    { id: 'p_stinking', name: 'Nube Tóxica', level: 3, school: 'Conjuración', castingTime: '1 Acción', range: '90 pies', description: 'Gas sulfúrico.', effect: 'Náuseas.' },
    { id: 'p_thunderstep', name: 'Transposición Sónica', level: 3, school: 'Conjuración', castingTime: '1 Acción', range: '90 pies', description: 'Colapso espacio.', effect: 'Teleport + 3d10 daño.' },
    { id: 'p_animals', name: 'Torreta Automática', level: 3, school: 'Conjuración', castingTime: '1 Acción', range: '60 pies', description: 'Luz dura.', effect: 'Invoca aliados.' },
    { id: 'p_magiccircle', name: 'Círculo Aislamiento', level: 3, school: 'Abjuración', castingTime: '1 Min', range: '10 pies', description: 'Límite matemático.', effect: 'Bloquea extraplanares.' },
    { id: 'p_tinyhut', name: 'Búnker Portátil', level: 3, school: 'Abjuración', castingTime: '1 Min', range: 'Personal', description: 'Realidad bolsillo.', effect: 'Cúpula segura.' },

    // Nivel 4
    { id: 'p_stoneskin', name: 'Piel de Grafeno', level: 4, school: 'Abjuración', castingTime: '1 Acción', range: 'Toque', description: 'Carbono cristalino.', effect: 'Resistencia físico.' },
    { id: 'p_confusion', name: 'Confusión', level: 4, school: 'Encantamiento', castingTime: '1 Acción', range: '90 pies', description: 'Caos cognitivo.', effect: 'Acciones aleatorias.' },
    { id: 'p_wallfire', name: 'Muro de Fuego', level: 4, school: 'Evocación', castingTime: '1 Acción', range: '120 pies', description: 'Plasma sostenido.', effect: '5d8 Fuego.' },
    { id: 'p_icestorm', name: 'Tormenta de Hielo', level: 4, school: 'Evocación', castingTime: '1 Acción', range: '300 pies', description: 'Granizo anómalo.', effect: 'Daño mixto + Terreno.' },
    { id: 'p_greaterinvis', name: 'Camuflaje Mayor', level: 4, school: 'Ilusión', castingTime: '1 Acción', range: 'Toque', description: 'Invisibilidad estable.', effect: 'Invisible atacando.' },
    { id: 'p_phantasmal', name: 'Pesadilla', level: 4, school: 'Ilusión', castingTime: '1 Acción', range: '120 pies', description: 'Miedo primitivo.', effect: '4d10 Psíquico/turno.' },
    { id: 'p_blight', name: 'Plaga', level: 4, school: 'Necromancia', castingTime: '1 Acción', range: '60 pies', description: 'Drena agua.', effect: '8d8 Necrótico.' },
    { id: 'p_polymorph', name: 'Polimorfar', level: 4, school: 'Transmutación', castingTime: '1 Acción', range: '60 pies', description: 'Reescribe biología.', effect: 'Transforma en bestia.' },
    { id: 'p_arcaneeye', name: 'Ojo Espía', level: 4, school: 'Adivinación', castingTime: '1 Acción', range: '30 pies', description: 'Sensor remoto.', effect: 'Visión remota ilimitada.' },
    { id: 'p_dimensiondoor', name: 'Puerta de Gusano', level: 4, school: 'Conjuración', castingTime: '1 Acción', range: '500 pies', description: 'Pliega espacio.', effect: 'Teleport 500ft.' },

    // Nivel 5
    { id: 'p_greaterresto', name: 'Restablecimiento Mayor', level: 5, school: 'Abjuración', castingTime: '1 Acción', range: 'Toque', description: 'Copia seguridad biológica.', effect: 'Elimina efectos severos.' },
    { id: 'p_cloudkill', name: 'Nube de la Muerte', level: 5, school: 'Conjuración', castingTime: '1 Acción', range: '120 pies', description: 'Niebla corrosiva.', effect: '5d8 Veneno/turno.' },
    { id: 'p_dominate', name: 'Dominar Mente', level: 5, school: 'Encantamiento', castingTime: '1 Acción', range: '60 pies', description: 'Suprime consciencia.', effect: 'Control total.' },
    { id: 'p_telepathic', name: 'Enlace de Datos', level: 5, school: 'Adivinación', castingTime: '1 Acción', range: '30 pies', description: 'Red neuronal.', effect: 'Telepatía grupal.' },
    { id: 'p_telekinesis', name: 'Telequinesis', level: 5, school: 'Transmutación', castingTime: '1 Acción', range: '60 pies', description: 'Fuerza mental.', effect: 'Mueve objetos/criaturas.' },

    // Nivel 6+
    { id: 'p_trueseeing', name: 'Visión Verdadera', level: 6, school: 'Adivinación', castingTime: '1 Acción', range: 'Toque', description: 'Código fuente.', effect: 'Ve todo 120ft.' },
    { id: 'p_sunbeam', name: 'Rayo Solar', level: 6, school: 'Evocación', castingTime: '1 Acción', range: 'Personal', description: 'Láser estelar.', effect: '6d8 Radiante + Ceguera.' },
    { id: 'p_disintegrate', name: 'Desintegrar', level: 6, school: 'Transmutación', castingTime: '1 Acción', range: '60 pies', description: 'Rompe enlaces.', effect: 'Daño masivo/Polvo.' },
    { id: 'p_wallthorns', name: 'Muro de Alambre', level: 6, school: 'Conjuración', castingTime: '1 Acción', range: '120 pies', description: 'Fractales afilados.', effect: '7d8 Cortante.' },
    { id: 'p_pwpain', name: 'Palabra de Dolor', level: 7, school: 'Encantamiento', castingTime: '1 Acción', range: '60 pies', description: 'Receptores al máximo.', effect: 'Desventaja total.' },
    { id: 'p_simulacrum', name: 'Simulacro', level: 7, school: 'Ilusión', castingTime: '12 Horas', range: 'Toque', description: 'Copia materia inerte.', effect: 'Duplicado mitad HP.' },
    { id: 'p_clone', name: 'Clon', level: 8, school: 'Necromancia', castingTime: '1 Hora', range: 'Toque', description: 'Recipiente inerte.', effect: 'Cuerpo repuesto.' },
    { id: 'p_foresight', name: 'Presagio Combate', level: 9, school: 'Adivinación', castingTime: '1 Min', range: 'Toque', description: 'Tiempo no lineal.', effect: 'Ventaja todo 8h.' },
    { id: 'p_timestop', name: 'Parar el Tiempo', level: 9, school: 'Transmutación', castingTime: '1 Acción', range: 'Personal', description: 'Fuera de flujo.', effect: '1d4+1 turnos extra.' },
];
