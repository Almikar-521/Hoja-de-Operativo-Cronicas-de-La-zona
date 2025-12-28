
import { Item } from './types';

export const ITEMS_CATALOG: Item[] = [
    // AMMO - SHOTGUN
    { id: 'ammo_20ga', name: 'Caja Calibre 20 (20)', type: 'Ammo', weight: 1.5, cost: 20, maxStack: 10, effect: '2d6 Daño. Área: Cono 15ft. Salv DEX CD 12 mitad.' },
    { id: 'ammo_12ga_buck', name: 'Caja Calibre 12 Postas (20)', type: 'Ammo', weight: 2, cost: 25, maxStack: 10, effect: '1d8 Daño. Área: Cono 20ft. Salv DEX CD 13 mitad.' },
    { id: 'ammo_12ga_slug', name: 'Caja Calibre 12 Slug (20)', type: 'Ammo', weight: 2, cost: 35, maxStack: 10, effect: '1d10 Daño. Bala única. Rango 60ft.' },
    { id: 'ammo_12ga_hp', name: 'Caja Calibre 12 HP Slug (20)', type: 'Ammo', weight: 2, cost: 50, maxStack: 10, effect: '1d10 Daño. +5 Daño extra vs Bestias/Carne.' },
    { id: 'ammo_12ga_ap', name: 'Caja Calibre 12 AP Slug (20)', type: 'Ammo', weight: 2, cost: 120, maxStack: 10, effect: '1d10 Daño. +3 Ataque y +5 Daño vs Blindaje.' },
    { id: 'ammo_4ga_shrapnel', name: 'Caja Calibre 4 Shrapnel (10)', type: 'Ammo', weight: 3, cost: 200, maxStack: 5, effect: '3d8 Daño. Área: Cono 30ft. Salv STR CD 14 o Prone.' },

    // ARTIFACTS (V5)
    // Tier 1
    { id: 'crono_estatilla', name: 'Crono-Estatilla', type: 'Artifact', tier: 1, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: +1 Iniciativa. Activa (2/LR): "Bullet Time". Reacción +2 Salv DEX, Mover Doble.' },
    { id: 'corazon_acero', name: 'Corazón de Acero', type: 'Artifact', tier: 1, weight: 2, cost: 0, maxStack: 1, effect: 'Pasiva: +2 Atletismo. Resistencia Veneno. Activa (1/SR): Acción Bonus Sobrecarga Adrenal.' },
    { id: 'chispa_fria', name: 'La Chispa Fría', type: 'Artifact', tier: 1, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: +1 Arcano. Resistencia Eléctrica. Activa (1/SR): Acción. Pulso 5ft Aturdido.' },
    { id: 'guijarro_grav', name: 'Guijarro Gravitacional', type: 'Artifact', tier: 1, weight: 5, cost: 0, maxStack: 1, effect: 'Pasiva: +2 Acrobacias. +5ft Salto. Activa (3/SR): Reacción. Salto Ligero (Mitad daño caída).' },
    { id: 'ojo_vidente', name: 'Ojo del Vidente', type: 'Artifact', tier: 1, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: +2 Investigación. No puedes ser sorprendido. Activa (1/LR): Visión Verdadera 1 min.' },
    { id: 'musgo', name: 'Musgo Filtrador', type: 'Artifact', tier: 1, weight: 0.5, cost: 0, maxStack: 1, effect: 'Pasiva: +1 Salv. Veneno. Activa (3/LR): Inmunidad gas/veneno inhalado 1 min.' },
    // Tier 2
    { id: 'bateria_interna', name: 'Batería Interna', type: 'Artifact', tier: 2, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: +1 Salv DEX. Resistencia Eléctrica. Activa (1/LR): Ataque eléctrico daño máximo.' },
    { id: 'manto_susurros', name: 'Manto de Susurros', type: 'Artifact', tier: 2, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: +2 Sigilo/Engaño. Activa (1/SR): Invisibilidad.' },
    { id: 'flor_fuego', name: 'Flor de Fuego', type: 'Artifact', tier: 2, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: Resistencia Fuego. Ataques +1d4 Fuego. Activa (1/LR): Explosión 10ft 3d6 Fuego.' },
    { id: 'nudo_espacial', name: 'Nudo Espacial', type: 'Artifact', tier: 2, weight: 2, cost: 0, maxStack: 1, effect: 'Pasiva: Ignoras terreno difícil. Activa (2/SR): Teleport 10ft reacción.' },
    { id: 'medula', name: 'Médula Ósea Reforzada', type: 'Artifact', tier: 2, weight: 2, cost: 0, maxStack: 1, effect: 'Pasiva: +1 HP por Nivel. Gasta 1 DG para Ventaja Salv CON.' },
    { id: 'resonador', name: 'Resonador Armónico', type: 'Artifact', tier: 2, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: Ventaja Percepción (Oído). Inmune Sordera. Activa (1/SR): Grito Sónico 15ft 2d8 Trueno.' },
    // Tier 3
    { id: 'nucleo_grav', name: 'Núcleo Gravitacional', type: 'Artifact', tier: 3, weight: 10, cost: 0, maxStack: 1, effect: 'Pasiva: Ventaja Fuerza. Resistencia Contundente. Activa (1/LR): Empuja 15ft.' },
    { id: 'matriz_psi', name: 'Matriz Psiónica', type: 'Artifact', tier: 3, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: Resistencia Psíquico. +1 CD hechizos. Activa (1/LR): Dominio Mental.' },
    { id: 'corazon_llama', name: 'Corazón Llama Eterna', type: 'Artifact', tier: 3, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: Inmunidad Fuego. Cura 1d4/ronda en fuego. Activa (1/LR): Torrente Ígneo 6d6.' },
    { id: 'simulacro', name: 'Simulacro Temporal', type: 'Artifact', tier: 3, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: Ventaja Iniciativa. Activa (1/LR): Rebobinar daño.' },
    { id: 'crisalida', name: 'Crisálida Adaptativa', type: 'Artifact', tier: 3, weight: 3, cost: 0, maxStack: 1, effect: 'Pasiva: +1 CA. Regen 1 HP/ronda. Activa (1/LR): Gana Resistencia daño 1h.' },
    { id: 'silenciador', name: 'Silenciador de Realidad', type: 'Artifact', tier: 3, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: Inmune Adivinación. Ventaja Sigilo. Activa (1/SR): Silencio 20ft.' },
    // Tier 4
    { id: 'corazon_cataclismo', name: 'Corazón del Cataclismo', type: 'Artifact', tier: 4, weight: 5, cost: 0, maxStack: 1, effect: 'Pasiva: +1 a todo. Inmune Anomalías. Activa (1/Semana): Reescribir Realidad.' },
    { id: 'fragmento_monolito', name: 'Fragmento del Monolito', type: 'Artifact', tier: 4, weight: 2, cost: 0, maxStack: 1, effect: 'Pasiva: Inmunidad Psíquico. Detectar Pensamientos. Activa (1/LR): Voluntad del Monolito (Domina).' },
    { id: 'lagrima_cronos', name: 'Lágrima de Cronos', type: 'Artifact', tier: 4, weight: 0.1, cost: 0, maxStack: 1, effect: 'Pasiva: Inmune efectos temporales. Acción extra. Activa (1/LR): Parada Temporal.' },
    { id: 'semilla_mundo', name: 'Semilla del Mundo', type: 'Artifact', tier: 4, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: Regen 10 HP/ronda. Inmune Veneno/Enfermedad. Activa (1/LR): Pulso de Vida (Cura masiva).' },
    { id: 'generador_cero', name: 'Generador Punto Cero', type: 'Artifact', tier: 4, weight: 10, cost: 0, maxStack: 1, effect: 'Pasiva: Inmunidad Eléctrico/Fuerza. Levitar. Activa (1/LR): Tormenta de Vacío.' },
    { id: 'mapa_pliega', name: 'El Mapa Que Se Pliega', type: 'Artifact', tier: 4, weight: 1, cost: 0, maxStack: 1, effect: 'Pasiva: +1 CA. Puerta Dimensional 1/SR. Activa (1/LR): Plegar Espacio (Teleport universal).' },
    
    // STANDARD AMMO
    { id: 'ammo_22', name: 'Caja .22LR (20)', type: 'Ammo', weight: 0.5, cost: 20, maxStack: 10, effect: 'Silenciosa. -1 al daño.' },
    { id: 'ammo_9mm_fmj', name: 'Caja 9x19mm FMJ (20)', type: 'Ammo', weight: 1, cost: 50, maxStack: 10, effect: 'Estándar OTAN.' },
    { id: 'ammo_9mm_hp', name: 'Caja 9x19mm HP (20)', type: 'Ammo', weight: 1, cost: 80, maxStack: 10, effect: 'Hollow Point. +5 Daño vs sin armadura.' },
    { id: 'ammo_9mm_ap', name: 'Caja 9x19mm AP (20)', type: 'Ammo', weight: 1, cost: 150, maxStack: 10, effect: 'Armor Piercing. +3 Ataque/+5 Daño vs Blindaje.' },
    { id: 'ammo_45_fmj', name: 'Caja .45 ACP FMJ (20)', type: 'Ammo', weight: 1.2, cost: 60, maxStack: 10, effect: 'Estándar.' },
    { id: 'ammo_556_fmj', name: 'Caja 5.56mm FMJ (20)', type: 'Ammo', weight: 1, cost: 100, maxStack: 10, effect: 'Estándar.' },
    { id: 'ammo_762_fmj', name: 'Caja 7.62mm FMJ (20)', type: 'Ammo', weight: 1.5, cost: 120, maxStack: 10, effect: 'Estándar.' },
    { id: 'ammo_308', name: 'Caja .308 Win (20)', type: 'Ammo', weight: 2, cost: 150, maxStack: 10, effect: '+2 Daño base.' },
    { id: 'ammo_50bmg', name: 'Caja .50 BMG (10)', type: 'Ammo', weight: 3, cost: 4000, maxStack: 5, effect: 'Anti-Material. +5 Atq / +10 Daño vs Blindaje.' },
    { id: 'ammo_thermal', name: 'Munición Quemadora (10)', type: 'Ammo', weight: 1, cost: 200, maxStack: 5, effect: 'Añade +1d4 daño de Fuego.' },
    { id: 'ammo_electric', name: 'Munición Estática (10)', type: 'Ammo', weight: 1, cost: 200, maxStack: 5, effect: 'Añade +1d4 daño Eléctrico.' },
    { id: 'ammo_cryo', name: 'Munición Criogénica (10)', type: 'Ammo', weight: 1, cost: 300, maxStack: 5, effect: 'Añade +1d6 daño Frío. Slow.' },
    { id: 'ammo_acid', name: 'Munición Corrosiva (10)', type: 'Ammo', weight: 1, cost: 300, maxStack: 5, effect: 'Añade +1d6 daño Ácido. -1 CA.' },
    { id: 'ammo_psychic', name: 'Munición Psíquica (5)', type: 'Ammo', weight: 0.5, cost: 500, maxStack: 5, effect: '+1d10 Psíquico. Salv SAB o Asustado.' },
    { id: 'ammo_force', name: 'Munición Anuladora (5)', type: 'Ammo', weight: 0.5, cost: 800, maxStack: 5, effect: '1d4 Fuerza. Impide curación.' },

    // MEDICAL & FOOD
    { id: 'venda', name: 'Venda Aséptica', type: 'Medical', weight: 0.1, cost: 20, maxStack: 10, effect: 'Detiene Sangrado. Estabiliza (CD 10).' },
    { id: 'medkit_basico', name: 'Kit Médico AI-2', type: 'Medical', weight: 1, cost: 100, maxStack: 5, effect: 'Cura 1d4+1 HP.' },
    { id: 'medkit_avanzado', name: 'Kit Militar IFAK', type: 'Medical', weight: 1, cost: 300, maxStack: 3, effect: 'Cura 2d4+2 HP y elimina Sangrado.' },
    { id: 'morfina', name: 'Morfina', type: 'Medical', weight: 0.1, cost: 150, maxStack: 5, effect: '5 HP Temp. Elimina Dolor.' },
    { id: 'kit_cirugia', name: 'Kit Cirugía', type: 'Medical', weight: 2, cost: 800, maxStack: 1, effect: 'Repara Fractura (Medicina CD 15).' },
    { id: 'antirrad', name: 'Antirrad', type: 'Medical', weight: 0.1, cost: 400, maxStack: 5, effect: 'Reduce 1d4 Radiación. Causa Fatiga.' },
    { id: 'estimulante', name: 'Estimulante Combate', type: 'Medical', weight: 0.1, cost: 500, maxStack: 5, effect: 'Acción extra. Luego Fatiga.' },
    { id: 'agua', name: 'Agua Purificada', type: 'Food', weight: 1, cost: 100, maxStack: 5, effect: 'Previene deshidratación.' },
    { id: 'lata', name: 'Lata de Carne', type: 'Food', weight: 1, cost: 150, maxStack: 5, effect: 'Ración diaria. 1d4 HP en Short Rest.' },
    { id: 'vodka', name: 'Vodka', type: 'Food', weight: 2, cost: 500, maxStack: 3, effect: '-1 Radiación. Resaca.' },

    // EXPLOSIVES
    { id: 'granada_humo', name: 'Granada Humo M8', type: 'Explosive', weight: 1, cost: 50, maxStack: 5, effect: 'Nube 20ft. Visibilidad nula.' },
    { id: 'granada_frag', name: 'Granada Frag M67', type: 'Explosive', weight: 1, cost: 350, maxStack: 5, effect: '20ft radio. 3d6 Perforante. DEX CD 13 mitad.' },
    { id: 'bomba_mol', name: 'Bomba Moléculas', type: 'Explosive', weight: 1, cost: 1200, maxStack: 2, effect: '10ft radio. 5d6 Plasma. Derrite armadura.' },

    // TECH
    { id: 'filtro_i', name: 'Filtro Básico (Tipo I)', type: 'Tool', weight: 0.5, cost: 80, maxStack: 5, effect: '1h. Polvo/Humo.' },
    { id: 'filtro_ii', name: 'Filtro Químico (Tipo II)', type: 'Tool', weight: 0.5, cost: 250, maxStack: 5, effect: '30min. Gases/Esporas.' },
    { id: 'filtro_iii', name: 'Filtro Arcana (Tipo III)', type: 'Tool', weight: 0.5, cost: 800, maxStack: 5, effect: '15min. Inmunidad total inhalada.' },
    { id: 'multiherramienta', name: 'Multiherramienta', type: 'Tool', weight: 1, cost: 500, maxStack: 1, effect: 'Permite Tecnología en campo.' },
    { id: 'geiger', name: 'Contador Geiger', type: 'Tech', weight: 1, cost: 400, maxStack: 1, effect: 'Mide radiación.' },
    { id: 'detector_anomalo', name: 'Detector Anomalías', type: 'Tech', weight: 1.5, cost: 1500, maxStack: 1, effect: 'Detecta anomalías invisibles.' },
    
    // VEHICLES & BASES
    { id: 'moto_pony', name: 'Moto "Pony"', type: 'Vehicle', weight: 0, cost: 3000, maxStack: 1, effect: 'Rápida, sin protección.' },
    { id: 'pickup', name: 'Pickup 4x4', type: 'Vehicle', weight: 0, cost: 8000, maxStack: 1, effect: 'Carga +300 lbs. Fiable.' },
    { id: 'furgon', name: 'Furgón Blindado', type: 'Vehicle', weight: 0, cost: 15000, maxStack: 1, effect: 'Blindaje ligero, 6 pax.' },
    { id: 'humvee', name: 'Humvee Mod', type: 'Vehicle', weight: 0, cost: 35000, maxStack: 1, effect: 'Blindaje medio. Torreta.' },
    { id: 'hovercar', name: 'Hovercar Lujo', type: 'Vehicle', weight: 0, cost: 60000, maxStack: 1, effect: 'Flota. Muy rápido.' },
    { id: 'exo_mula_veh', name: 'Exo-MULA (Plataforma)', type: 'Vehicle', weight: 0, cost: 120000, maxStack: 1, effect: 'Blindaje pesado. Plataforma armas.' },
    
    { id: 'apartamento', name: 'Apartamento', type: 'Base', weight: 0, cost: 5000, maxStack: 1, effect: '2 Pax. Ventaja Percepción. Discreto.' },
    { id: 'taller', name: 'Taller', type: 'Base', weight: 0, cost: 15000, maxStack: 1, effect: '4 Pax. Fabrica FMJ. 1 Inspiración.' },
    { id: 'bunker_mil', name: 'Búnker Militar', type: 'Base', weight: 0, cost: 40000, maxStack: 1, effect: '6 Pax. CA 20. Luz.' },
    { id: 'bunker_ano', name: 'Búnker Anómalo', type: 'Base', weight: 0, cost: 100000, maxStack: 1, effect: '8 Pax. Filtro III. Campo Fuerza.' },
];
