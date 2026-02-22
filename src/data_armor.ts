
import { Armor, Item } from './types';

export const ARMOR_CATALOG: Armor[] = [
    // Ligera
    { id: 'ropa_civil', name: 'Ropa Reforzada', type: 'Light', acBase: 11, dexBonus: 99, weight: 8, ra: 1, rarity: 'Civil', stealthDisadvantage: false, price: 300, effect: 'Sin bonos.' },
    { id: 'chaleco_kevlar', name: 'Chaleco Antibalas "PACA"', type: 'Light', acBase: 12, dexBonus: 99, weight: 10, ra: 1, rarity: 'Civil', stealthDisadvantage: false, price: 1000, effect: 'Fibra balística suave.' },
    { id: 'traje_amanecer', name: 'Traje de Stalker "Amanecer"', type: 'Light', acBase: 12, dexBonus: 99, weight: 12, ra: 2, rarity: 'Stalker', stealthDisadvantage: false, price: 1800, effect: 'Equilibrio protección ambiental y balística.' },
    { id: 'korund', name: 'Blindaje Ligero "Korund"', type: 'Light', acBase: 13, dexBonus: 99, weight: 15, ra: 1, rarity: 'Táctica', stealthDisadvantage: false, price: 2500, effect: 'Protección frontal excelente.' },
    { id: 'manto_negro', name: 'Traje Táctico "Manto Negro"', type: 'Light', acBase: 13, dexBonus: 99, weight: 10, ra: 2, rarity: 'Táctica', stealthDisadvantage: false, price: 4000, effect: 'Ventaja en pruebas de Sigilo en entornos oscuros.' },
    { id: 'baile_ender', name: 'El Último Baile de Ender', type: 'Light', acBase: 14, dexBonus: 99, weight: 5, ra: 3, rarity: 'Legendaria', stealthDisadvantage: false, price: 0, effect: 'Reacción: +2 CA contra ataque visible.' },

    // Media
    { id: 'module3m', name: 'Chaleco "Module-3M"', type: 'Medium', acBase: 14, dexBonus: 2, weight: 20, ra: 2, rarity: 'Civil', stealthDisadvantage: true, price: 3500, effect: 'Pesado y ruidoso.' },
    { id: 'nomada', name: 'Traje de Mercenario "Nómada"', type: 'Medium', acBase: 14, dexBonus: 2, weight: 25, ra: 3, rarity: 'Stalker', stealthDisadvantage: false, price: 5000, effect: 'Ergonómico. Sin desventaja Sigilo.' },
    { id: 'killa', name: 'Blindaje Pesado "6B13 Killa"', type: 'Medium', acBase: 15, dexBonus: 2, weight: 30, ra: 2, rarity: 'Táctica', stealthDisadvantage: true, price: 7500, effect: '+1 a tiradas de Intimidación.' },
    { id: 'luz_rota', name: 'Armadura de Paladín "Luz Rota"', type: 'Medium', acBase: 15, dexBonus: 2, weight: 40, ra: 2, rarity: 'Legendaria', stealthDisadvantage: true, price: 8000, effect: 'Resistencia a daño Necrótico.' },
    { id: 'seva', name: 'Traje Ambiental "SEVA"', type: 'Medium', acBase: 14, dexBonus: 2, weight: 35, ra: 4, rarity: 'Stalker', stealthDisadvantage: true, price: 9000, effect: 'Inmune gases/esporas. Resistencia Ácido.' },
    { id: 'piel_caminante', name: 'La Piel del Caminante', type: 'Medium', acBase: 16, dexBonus: 2, weight: 15, ra: 5, rarity: 'Legendaria', stealthDisadvantage: false, price: 0, effect: 'Regeneración 1HP/hora. Resistencia Fuego.' },

    // Pesada
    { id: 'thor', name: 'Blindaje Táctico "Thor"', type: 'Heavy', acBase: 16, dexBonus: 0, weight: 45, ra: 2, rarity: 'Táctica', stealthDisadvantage: true, price: 12000, effect: 'Reduce en 1 todo el daño cortante recibido.' },
    { id: 'eod', name: 'Traje Antiexplosivos "EOD"', type: 'Heavy', acBase: 17, dexBonus: 0, weight: 60, ra: 1, rarity: 'Táctica', stealthDisadvantage: true, price: 18000, effect: 'Resistencia Fuego. Ventaja en salvaciones contra Explosiones.' },
    { id: 'defender', name: 'Blindaje de Asalto "Defender-2"', type: 'Heavy', acBase: 17, dexBonus: 0, weight: 50, ra: 2, rarity: 'Táctica', stealthDisadvantage: true, price: 22000, effect: 'Inmune a críticos por disparos.' },
    { id: 'juggernaut', name: 'Blindaje "Juggernaut"', type: 'Heavy', acBase: 18, dexBonus: 0, weight: 65, ra: 1, rarity: 'Táctica', stealthDisadvantage: true, price: 30000, effect: '-10 pies Velocidad. Ventaja contra derribos.' },
    { id: 'engranaje', name: 'Prototipo "Engranaje Negro"', type: 'Heavy', acBase: 16, dexBonus: 0, weight: 55, ra: 3, rarity: 'Táctica', stealthDisadvantage: true, price: 25000, effect: 'Inestable: Crítico recibido causa 1d6 eléctrico al usuario.' },
    { id: 'sigfried', name: 'La Obra Maestra de Sigfried', type: 'Heavy', acBase: 18, dexBonus: 0, weight: 40, ra: 4, rarity: 'Legendaria', stealthDisadvantage: false, price: 0, effect: 'Silencio Mecánico. Sin desventaja en Sigilo.' },

    // Exoesqueletos
    { id: 'mule_exo', name: 'Exoesqueleto "MULE"', type: 'Exo', acBase: 10, dexBonus: 0, weight: 40, ra: 1, rarity: 'Civil', stealthDisadvantage: true, price: 15000, effect: 'Fuerza considerada 19 para carga. Ruidoso.' },
    { id: 'warden', name: 'Exoesqueleto "Warden"', type: 'Exo', acBase: 18, dexBonus: 0, weight: 80, ra: 3, rarity: 'Táctica', stealthDisadvantage: true, price: 50000, effect: 'Fuerza considerada 21. +1 al daño melee.' },
    { id: 'ssp99', name: 'Prototipo Ambiental "SSP-99"', type: 'Exo', acBase: 14, dexBonus: 2, weight: 50, ra: 6, rarity: 'Científico', stealthDisadvantage: true, price: 75000, effect: 'Inmune Veneno/Ácido/Enfermedad. Resistencia Fuego/Elec.' },
    { id: 'bulat', name: 'Exoesqueleto "Bulat"', type: 'Exo', acBase: 19, dexBonus: 0, weight: 75, ra: 3, rarity: 'Táctica', stealthDisadvantage: true, price: 90000, effect: 'Fuerza 22. Resistencia a daño Contundente no mágico.' },
    { id: 'corazon', name: 'Exoesqueleto "Corazón"', type: 'Exo', acBase: 20, dexBonus: 0, weight: 100, ra: 5, rarity: 'Anomala', stealthDisadvantage: true, price: 150000, effect: 'Fuerza 24. Cura 1 HP al inicio de tu turno si estás consciente.' },
    { id: 'corazon_cinderfall', name: 'Corazón de Cinderfall', type: 'Exo', acBase: 22, dexBonus: 0, weight: 80, ra: 7, rarity: 'Legendaria', stealthDisadvantage: true, price: 0, effect: 'Fuerza 26. Inmune Radiación y Necrótico.' },
];

export const HEAD_CATALOG: Item[] = [
    { id: 'gorra', name: 'Gorra Táctica / Boina', type: 'Valuable', weight: 0, cost: 50, maxStack: 1, effect: '+1 Intimidación/Persuasión.' },
    { id: 'casco_obra', name: 'Casco de Obra / Minero', type: 'Valuable', weight: 1, cost: 100, maxStack: 1, effect: 'Incluye luz frontal (Cono 30ft).' },
    { id: 'casco_anti', name: 'Casco Antidisturbios', type: 'Valuable', weight: 3, cost: 500, maxStack: 1, effect: 'Niega Críticos recibidos. -1 Percepción.' },
    { id: 'casco_ssh68', name: 'Casco de Acero Ssh-68', type: 'Valuable', weight: 4, cost: 300, maxStack: 1, effect: '+1 CA contra armas de fuego. -1 Sigilo.' },
    { id: 'casco_highcut', name: 'Casco Táctico "High-Cut"', type: 'Valuable', weight: 2, cost: 2500, maxStack: 1, effect: '+1 CA. Ligero.' },
    { id: 'casco_altyn', name: 'Casco Pesado "Altyn"', type: 'Valuable', weight: 8, cost: 8000, maxStack: 1, effect: '+2 CA. Inmune a condición Aturdido. Desventaja Percepción.' },
    { id: 'capucha_psiquico', name: 'Capucha de Psíquico', type: 'Valuable', weight: 1, cost: 5000, maxStack: 1, effect: 'Ventaja en Salvaciones de INT y SAB.' },
];

export const FACE_CATALOG: Item[] = [
    { id: 'balaclava', name: 'Pañuelo / Balaclava', type: 'Valuable', weight: 0.1, cost: 10, maxStack: 1, effect: 'Oculta el rostro. Resistencia leve al frío.' },
    { id: 'respirador', name: 'Respirador Industrial', type: 'Valuable', weight: 1, cost: 200, maxStack: 1, effect: 'Permite usar Filtros Tipo I (Polvo/Humo).' },
    { id: 'mascara_gas', name: 'Máscara de Gas GP-5', type: 'Valuable', weight: 2, cost: 500, maxStack: 1, effect: 'Permite usar Filtros Tipo I y II. -2 Percepción (Vista).' },
    { id: 'mascara_panoramica', name: 'Máscara Panorámica', type: 'Valuable', weight: 2, cost: 1500, maxStack: 1, effect: 'Permite usar Filtros Tipo I, II y III. Sin penalización de visión.' },
    { id: 'rebreather', name: 'Rebreather Táctico', type: 'Tech', weight: 3, cost: 4000, maxStack: 1, effect: 'Inmune a gases por 1 hora (recargable). No usa filtros desechables.' },
];

export const EYES_CATALOG: Item[] = [
    { id: 'gafas_sol', name: 'Gafas de Sol', type: 'Valuable', weight: 0.1, cost: 50, maxStack: 1, effect: '+1 Carisma. Evita desventaja por luz solar intensa.' },
    { id: 'gafas_balisticas', name: 'Gafas Balísticas', type: 'Valuable', weight: 0.2, cost: 150, maxStack: 1, effect: 'Inmunidad a Ceguera por polvo o escombros.' },
    { id: 'visor_nocturno', name: 'Visor Nocturno (NVG-1)', type: 'Tech', weight: 1, cost: 2000, maxStack: 1, effect: 'Visión en oscuridad (Verde, 60 pies). Deslumbra con luz fuerte.' },
    { id: 'visor_nvg2', name: 'Visor Digital (NVG-2)', type: 'Tech', weight: 1, cost: 5000, maxStack: 1, effect: 'Visión en oscuridad (90 pies). Imagen digital, mejora contraste.' },
    { id: 'visor_termico', name: 'Visor Térmico (T-7)', type: 'Tech', weight: 2, cost: 12000, maxStack: 1, effect: 'Detecta firmas de calor a 120 pies. Ignora humo/oscuridad/cobertura ligera.' },
    { id: 'visor_gpnvg', name: 'Fósforo Blanco (GPNVG)', type: 'Tech', weight: 1, cost: 25000, maxStack: 1, effect: 'Visión en oscuridad perfecta (120 pies). Visión periférica total.' },
    { id: 'lentes_analista', name: 'Lentes de Analista', type: 'Tech', weight: 0.1, cost: 3000, maxStack: 1, effect: '+2 Investigación. Muestra HP aproximado del enemigo.' },
];

export const EARS_CATALOG: Item[] = [
    { id: 'gssh01', name: 'Auriculares GSSh-01', type: 'Tech', weight: 1, cost: 600, maxStack: 1, effect: 'Ventaja en Percepción (Oído). Desventaja vs daño Trueno.' },
    { id: 'comtac', name: 'Auriculares ComTac IV', type: 'Tech', weight: 1, cost: 1500, maxStack: 1, effect: 'Ventaja en Percepción. Suprime ruidos fuertes (inmune a ensordecer).' },
    { id: 'radio_escuadra', name: 'Radio de Escuadra', type: 'Tech', weight: 1, cost: 300, maxStack: 1, effect: 'Comunicación encriptada con aliados a 1km.' },
];

export const RIG_CATALOG: Item[] = [
    { id: 'chaleco_pesca', name: 'Chaleco de Pesca (Scav)', type: 'Valuable', weight: 2, cost: 50, maxStack: 1, effect: 'Capacidad 2 cargadores. Recarga lenta (Acción).' },
    { id: 'micro_rig', name: 'Micro-Rig "Bank Robber"', type: 'Valuable', weight: 1, cost: 300, maxStack: 1, effect: 'Capacidad 3 cargadores. Recarga Normal.' },
    { id: 'chaleco_tactico', name: 'Chaleco Táctico "Alpha"', type: 'Valuable', weight: 3, cost: 1200, maxStack: 1, effect: 'Capacidad 6 cargadores. Recarga Rápida (Bonus).' },
    { id: 'arnes_ametrallador', name: 'Arnés de Ametrallador', type: 'Valuable', weight: 5, cost: 2000, maxStack: 1, effect: 'Recarga LMGs/Tambores en 1 Acción (en vez de Completa).' },
    { id: 'chaleco_demoliciones', name: 'Chaleco de Demoliciones', type: 'Valuable', weight: 4, cost: 1500, maxStack: 1, effect: 'Slots para 6 granadas/minas. Sacarlas es Acción Gratuita.' },
];

export const BACKPACK_CATALOG: Item[] = [
    { id: 'sling', name: 'Bandolera (Sling)', type: 'Valuable', weight: 1, cost: 200, maxStack: 1, effect: '+25 lbs Capacidad. No estorba.' },
    { id: 'assault', name: 'Mochila de Asalto', type: 'Valuable', weight: 2, cost: 800, maxStack: 1, effect: '+45 lbs Capacidad. Estándar 3 días.' },
    { id: 'expedition', name: 'Mochila de Expedición', type: 'Valuable', weight: 4, cost: 2000, maxStack: 1, effect: '+70 lbs Capacidad. Enorme y visible. -1 Sigilo.' },
    { id: 'mule', name: 'Mochila "MULE"', type: 'Valuable', weight: 6, cost: 3500, maxStack: 1, effect: '+90 lbs Capacidad. Marco externo. Desventaja Sigilo/Acrobacias.' },
    { id: 'anomala', name: 'Mochila Anómala', type: 'Anomala', weight: 5, cost: 0, maxStack: 1, effect: 'Capacidad Infinita. Bolsillo dimensional. Peso fijo 5 lbs.' },
];
