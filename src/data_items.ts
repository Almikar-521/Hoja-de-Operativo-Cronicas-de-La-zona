
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

    // AMMO - PISTOL/SMG CALIBERS
    { id: 'ammo_9x18_fmj', name: 'Caja 9x18mm Mak FMJ (20)', type: 'Ammo', weight: 1, cost: 35, maxStack: 10, effect: 'Estándar Ruso. Barato.' },
    { id: 'ammo_9x18_hp', name: 'Caja 9x18mm Mak HP (20)', type: 'Ammo', weight: 1, cost: 60, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_762x25_fmj', name: 'Caja 7.62x25mm FMJ (20)', type: 'Ammo', weight: 1, cost: 80, maxStack: 10, effect: 'Perforante natural (+1 Atq).' },
    { id: 'ammo_762x25_hp', name: 'Caja 7.62x25mm HP (20)', type: 'Ammo', weight: 1, cost: 110, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_762x25_ap', name: 'Caja 7.62x25mm AP (20)', type: 'Ammo', weight: 1, cost: 200, maxStack: 10, effect: '+3 Atq, +5 Daño vs Blindaje.' },
    { id: 'ammo_357_fmj', name: 'Caja .357 Magnum FMJ (20)', type: 'Ammo', weight: 1.2, cost: 90, maxStack: 10, effect: 'Alto retroceso.' },
    { id: 'ammo_357_hp', name: 'Caja .357 Magnum HP (20)', type: 'Ammo', weight: 1.2, cost: 130, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_357_ap', name: 'Caja .357 Magnum AP (20)', type: 'Ammo', weight: 1.2, cost: 250, maxStack: 10, effect: '+3 Atq, +5 Daño vs Blindaje.' },
    { id: 'ammo_45_hp', name: 'Caja .45 ACP HP (20)', type: 'Ammo', weight: 1.2, cost: 100, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_45_ap', name: 'Caja .45 ACP AP (20)', type: 'Ammo', weight: 1.2, cost: 180, maxStack: 10, effect: '+3 Atq, +5 Daño vs Blindaje.' },
    { id: 'ammo_46x30_ap', name: 'Caja 4.6x30mm AP (20)', type: 'Ammo', weight: 0.8, cost: 120, maxStack: 10, effect: 'Estándar Perforante (+2 Atq).' },
    { id: 'ammo_46x30_hp', name: 'Caja 4.6x30mm HP (20)', type: 'Ammo', weight: 0.8, cost: 100, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_57x28_ap', name: 'Caja 5.7x28mm AP (20)', type: 'Ammo', weight: 0.8, cost: 140, maxStack: 10, effect: 'Estándar Perforante (+2 Atq).' },
    { id: 'ammo_57x28_hp', name: 'Caja 5.7x28mm HP (20)', type: 'Ammo', weight: 0.8, cost: 110, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },

    // AMMO - RIFLE CALIBERS
    { id: 'ammo_545_fmj', name: 'Caja 5.45x39mm FMJ (20)', type: 'Ammo', weight: 1, cost: 90, maxStack: 10, effect: 'Estándar Ruso.' },
    { id: 'ammo_545_hp', name: 'Caja 5.45x39mm HP (20)', type: 'Ammo', weight: 1, cost: 140, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_545_ap', name: 'Caja 5.45x39mm AP (20)', type: 'Ammo', weight: 1, cost: 200, maxStack: 10, effect: '+3 Atq, +5 Daño vs Blindaje.' },
    { id: 'ammo_556_hp', name: 'Caja 5.56x45mm HP (20)', type: 'Ammo', weight: 1, cost: 180, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_556_ap', name: 'Caja 5.56x45mm AP (20)', type: 'Ammo', weight: 1, cost: 250, maxStack: 10, effect: '+3 Atq, +5 Daño vs Blindaje.' },
    { id: 'ammo_762x39_fmj', name: 'Caja 7.62x39mm FMJ (20)', type: 'Ammo', weight: 1.5, cost: 120, maxStack: 10, effect: 'Mayor daño base.' },
    { id: 'ammo_762x39_hp', name: 'Caja 7.62x39mm HP (20)', type: 'Ammo', weight: 1.5, cost: 200, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_762x39_ap', name: 'Caja 7.62x39mm AP (20)', type: 'Ammo', weight: 1.5, cost: 350, maxStack: 10, effect: '+3 Atq, +5 Daño vs Blindaje.' },
    { id: 'ammo_9x39_sp5', name: 'Caja 9x39mm SP-5 (20)', type: 'Ammo', weight: 1.5, cost: 350, maxStack: 10, effect: '+3 Daño vs Bestias. Subsónica.' },
    { id: 'ammo_9x39_sp6', name: 'Caja 9x39mm SP-6 (20)', type: 'Ammo', weight: 1.5, cost: 450, maxStack: 10, effect: 'AP: Ignora armadura media.' },
    { id: 'ammo_308_hp', name: 'Caja .308 Win HP (20)', type: 'Ammo', weight: 2, cost: 280, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_308_ap', name: 'Caja .308 Win AP (20)', type: 'Ammo', weight: 2, cost: 450, maxStack: 10, effect: '+3 Atq, +5 Daño vs Blindaje.' },
    { id: 'ammo_762x54r_fmj', name: 'Caja 7.62x54R FMJ (20)', type: 'Ammo', weight: 2, cost: 140, maxStack: 10, effect: 'Potencia soviética.' },
    { id: 'ammo_762x54r_hp', name: 'Caja 7.62x54R HP (20)', type: 'Ammo', weight: 2, cost: 260, maxStack: 10, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_762x54r_ap', name: 'Caja 7.62x54R AP (20)', type: 'Ammo', weight: 2, cost: 350, maxStack: 10, effect: '+3 Atq, +5 Daño vs Blindaje.' },

    // AMMO - SNIPER & ANTI-MATERIAL
    { id: 'ammo_338_fmj', name: 'Caja .338 Lapua FMJ (10)', type: 'Ammo', weight: 2, cost: 1000, maxStack: 5, effect: 'Rango extremo.' },
    { id: 'ammo_338_hp', name: 'Caja .338 Lapua HP (10)', type: 'Ammo', weight: 2, cost: 1500, maxStack: 5, effect: '+5 Daño vs Sin Armadura.' },
    { id: 'ammo_338_ap', name: 'Caja .338 Lapua AP (10)', type: 'Ammo', weight: 2, cost: 2500, maxStack: 5, effect: '+3 Atq, +5 Daño vs Blindaje.' },
    { id: 'ammo_127x55_fmj', name: 'Caja 12.7x55mm FMJ (10)', type: 'Ammo', weight: 3, cost: 3000, maxStack: 5, effect: 'Demolición urbana.' },
    { id: 'ammo_127x55_ap', name: 'Caja 12.7x55mm AP (10)', type: 'Ammo', weight: 3, cost: 6000, maxStack: 5, effect: '+5 Atq, +10 Daño vs Blindaje.' },
    { id: 'ammo_127x108', name: 'Caja 12.7x108mm AP (10)', type: 'Ammo', weight: 3.5, cost: 4000, maxStack: 5, effect: 'Variante Rusa. +5 Atq, +10 Daño vs Blindaje.' },
    { id: 'ammo_145x114', name: 'Caja 14.5x114mm API (10)', type: 'Ammo', weight: 4, cost: 5000, maxStack: 5, effect: 'Perforante Incendiaria. +1d6 fuego.' },
    { id: 'ammo_20mm', name: 'Caja 20mm HE (10)', type: 'Ammo', weight: 5, cost: 8000, maxStack: 3, effect: 'Explosiva. Daño en radio 5 pies.' },

    // MEDICAL & FOOD
    { id: 'venda', name: 'Venda Aséptica', type: 'Medical', weight: 0.1, cost: 20, maxStack: 10, effect: 'Detiene Sangrado. Estabiliza (CD 10).' },
    { id: 'medkit_basico', name: 'Kit Médico AI-2', type: 'Medical', weight: 1, cost: 100, maxStack: 5, effect: 'Cura 1d4+1 HP.' },
    { id: 'medkit_avanzado', name: 'Kit Militar IFAK', type: 'Medical', weight: 1, cost: 300, maxStack: 3, effect: 'Cura 2d4+2 HP y elimina Sangrado.' },
    { id: 'morfina', name: 'Morfina', type: 'Medical', weight: 0.1, cost: 150, maxStack: 5, effect: '5 HP Temp. Elimina Dolor.' },
    { id: 'kit_cirugia', name: 'Kit Cirugía', type: 'Medical', weight: 2, cost: 800, maxStack: 1, effect: 'Repara Fractura (Medicina CD 15).' },
    { id: 'antirrad', name: 'Antirrad', type: 'Medical', weight: 0.1, cost: 400, maxStack: 5, effect: 'Reduce 1d4 Radiación. Causa Fatiga.' },
    { id: 'estimulante', name: 'Estimulante Combate', type: 'Medical', weight: 0.1, cost: 500, maxStack: 5, effect: 'Acción extra. Luego Fatiga.' },
    { id: 'agua', name: 'Agua Purificada (1L)', type: 'Food', weight: 1, cost: 20, maxStack: 5, effect: '1 día de agua. Esencial.' },
    { id: 'lata', name: 'Carne Enlatada', type: 'Food', weight: 1, cost: 80, maxStack: 5, effect: '2 días de comida. Nutritiva.' },
    { id: 'vodka', name: 'Vodka / Alcohol', type: 'Food', weight: 2, cost: 30, maxStack: 3, effect: '+1 Moral. -1 DES por 1 hora.' },
    { id: 'racion_mre', name: 'Ración Militar (MRE)', type: 'Food', weight: 1, cost: 50, maxStack: 10, effect: '1 día de comida. +1 HP en descanso corto.' },
    { id: 'cafe', name: 'Café / Energizante', type: 'Food', weight: 0.5, cost: 40, maxStack: 10, effect: 'Elimina 1 nivel Fatiga temporalmente (4 horas).' },
    { id: 'tabletas_purif', name: 'Tabletas Purificadoras', type: 'Food', weight: 0.1, cost: 100, maxStack: 10, effect: 'Purifica 10L de agua contaminada.' },

    // COMBAT CONSUMABLES
    { id: 'estimulante_militar', name: 'Estimulante Militar (Adrenalina)', type: 'Medical', weight: 0.1, cost: 500, maxStack: 5, effect: '+2 FUE y DES, Ventaja en Iniciativa. Duración 10 min.' },
    { id: 'psicoestimulante', name: 'Psicoestimulante', type: 'Medical', weight: 0.1, cost: 800, maxStack: 5, effect: '+2 INT y SAB, Ventaja en Percepción. Duración 10 min.' },
    { id: 'anestesico', name: 'Anestésico de Combate', type: 'Medical', weight: 0.1, cost: 400, maxStack: 5, effect: 'Inmune a Dolor (ignora hasta -10 HP). Duración 5 min.' },
    { id: 'antitoxina', name: 'Antitoxina Avanzada', type: 'Medical', weight: 0.1, cost: 600, maxStack: 5, effect: 'Inmunidad a Veneno. Duración 1 hora.' },
    { id: 'inhibidor_rad', name: 'Inhibidor de Radiación', type: 'Medical', weight: 0.1, cost: 1000, maxStack: 5, effect: 'Reduce absorción de radiación 50%. Duración 8 horas.' },
    { id: 'suero_regen', name: 'Suero Regenerativo', type: 'Medical', weight: 0.1, cost: 2000, maxStack: 3, effect: 'Regenera 1 HP/turno. Duración 1 minuto.' },
    { id: 'nanokit', name: 'Nanokit Médico', type: 'Medical', weight: 0.5, cost: 5000, maxStack: 1, effect: 'Cura 4d8+4 HP instantáneo.' },

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
    { id: 'detector_anomalo', name: 'Detector Anomalías', type: 'Tech', weight: 1.5, cost: 1500, maxStack: 1, effect: 'Detecta anomalías invisibles a 30 pies.' },
    { id: 'detector_estabilidad', name: 'Detector Estabilidad', type: 'Tech', weight: 2, cost: 3500, maxStack: 1, effect: 'Señala dirección y distancia a anomalías a 60 pies.' },
    { id: 'analizador_esencia', name: 'Analizador de Esencia', type: 'Tech', weight: 2, cost: 8000, maxStack: 1, effect: 'Identifica tipo y Tier de artefacto a 120 pies.' },

    // LIGHTS
    { id: 'lampara_led', name: 'Lámpara LED', type: 'Tool', weight: 0.5, cost: 150, maxStack: 1, effect: 'Luz brillante 60 pies.' },
    { id: 'linterna_plasma', name: 'Linterna Plasma', type: 'Tool', weight: 0.5, cost: 600, maxStack: 1, effect: 'Luz fría anómala, sin calor (segura en gas).' },

    // TOOLS
    { id: 'kit_cerrajero', name: 'Kit de Cerrajero', type: 'Tool', weight: 1, cost: 300, maxStack: 1, effect: '+2 en abrir cerraduras mecánicas.' },
    { id: 'kit_hacker', name: 'Kit de Hacker', type: 'Tool', weight: 2, cost: 2000, maxStack: 1, effect: '+2 en descifrar sistemas electrónicos.' },
    { id: 'kit_demoliciones', name: 'Kit de Demoliciones', type: 'Tool', weight: 5, cost: 1500, maxStack: 1, effect: 'Necesario para colocar explosivos avanzados.' },
    { id: 'pda_tactica', name: 'PDA Táctica', type: 'Tool', weight: 0.5, cost: 3000, maxStack: 1, effect: 'GPS, radio, notas. +1 Investigación.' },
    { id: 'binoculares', name: 'Binoculares', type: 'Tool', weight: 1, cost: 200, maxStack: 1, effect: 'Visión x8. Percepción a distancia.' },
    { id: 'brujula_mapa', name: 'Brújula y Mapa', type: 'Tool', weight: 0.1, cost: 50, maxStack: 1, effect: 'Navegación básica.' },
    { id: 'cuerda', name: 'Cuerda (15m)', type: 'Tool', weight: 3, cost: 30, maxStack: 3, effect: 'Escalada, trampas.' },
    { id: 'grilletes', name: 'Grilletes', type: 'Tool', weight: 1, cost: 40, maxStack: 3, effect: 'Retiene prisioneros.' },
    { id: 'cinta_americana', name: 'Cinta Americana', type: 'Tool', weight: 0.5, cost: 20, maxStack: 5, effect: 'Reparaciones temporales.' },

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
