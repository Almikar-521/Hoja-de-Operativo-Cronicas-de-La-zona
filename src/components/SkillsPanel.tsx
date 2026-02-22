
import React from 'react';
import { CharacterState, Attribute } from '../types';
import { SKILLS_LIST, TRAITS_CATALOG } from '../constants';
import { getModifier, formatModifier } from '../utils';

interface Props {
  char: CharacterState;
  onToggleSkill: (skillId: string) => void;
  pb: number;
}

export const SkillsPanel: React.FC<Props> = ({ char, onToggleSkill, pb }) => {
  
  // Find background trait to determine automatic proficiencies
  const bgTrait = TRAITS_CATALOG.find(t => t.id === char.background);
  const bgProficiencies = bgTrait?.grantsProficiency || [];

  // Helper to determine Adv/Disadv from Mutations
  const getMutationEffect = (skillId: string) => {
      // Advantage Logic
      if (skillId === 'sleight_hand' && char.mutations.includes('mut_spider_fingers')) return 'adv';
      if (skillId === 'stealth' && char.mutations.includes('mut_living_shadow')) return 'adv';
      if (skillId === 'intimidation' && char.mutations.includes('mut_glass_skin')) return 'adv';
      if (skillId === 'survival' && char.mutations.includes('mut_prey_scent')) return 'adv'; // "track" usually survival

      // Disadvantage Logic
      if (skillId === 'acrobatics' && char.mutations.includes('mut_bark_skin')) return 'dis';
      
      return null;
  };

  return (
    <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg flex flex-col">
      <h3 className="text-yellow-500 font-bold border-b border-gray-700 pb-2 mb-2 text-sm uppercase tracking-wider">Habilidades</h3>
      
      <div className="space-y-0.5">
        {SKILLS_LIST.map(skill => {
          const isManuallyProficient = char.skillProficiencies.includes(skill.id);
          const isBgProficient = bgProficiencies.includes(skill.id);
          const isProficient = isManuallyProficient || isBgProficient;

          const attrMod = getModifier(char.attributes[skill.attr]);
          const total = attrMod + (isProficient ? pb : 0);
          
          const mutEffect = getMutationEffect(skill.id);

          return (
            <div key={skill.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-800/50 hover:bg-gray-800/30 group">
               <div className="flex items-center gap-2 relative">
                 <div 
                   onClick={() => !isBgProficient && onToggleSkill(skill.id)}
                   className={`w-2.5 h-2.5 rounded-full border cursor-pointer transition-colors ${
                       isBgProficient ? 'bg-yellow-700 border-yellow-700 cursor-default opacity-80' : 
                       isManuallyProficient ? 'bg-yellow-500 border-yellow-500 shadow-sm shadow-yellow-500/30' : 'border-gray-600 group-hover:border-gray-500'
                   }`}
                   title={isBgProficient ? 'Concedido por Trasfondo' : ''}
                 ></div>
                 <span className={`truncate ${isBgProficient ? 'text-yellow-200/90' : isManuallyProficient ? 'text-white' : 'text-gray-400'}`}>
                     {skill.name}
                 </span>
                 
                 {/* Mutation Indicator */}
                 {mutEffect === 'adv' && (
                     <span className="ml-1 text-[9px] text-green-500 font-bold border border-green-900 bg-green-900/20 px-1 rounded" title="Ventaja por Mutación">▲</span>
                 )}
                 {mutEffect === 'dis' && (
                     <span className="ml-1 text-[9px] text-red-500 font-bold border border-red-900 bg-red-900/20 px-1 rounded" title="Desventaja por Mutación">▼</span>
                 )}
               </div>
               <div className="flex items-center gap-2">
                   <span className="text-[9px] text-gray-600 font-mono w-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">{skill.attr}</span>
                   <span className={`font-bold font-mono w-6 text-right ${total >= 0 ? 'text-gray-200' : 'text-red-400'}`}>
                     {total >= 0 ? `+${total}` : total}
                   </span>
               </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-700">
         <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 uppercase tracking-wide">Percepción Pasiva</span>
            <span className="text-white font-bold font-mono text-sm bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
              {10 + getModifier(char.attributes.WIS) + (char.skillProficiencies.includes('perception') || bgProficiencies.includes('perception') ? pb : 0)}
            </span>
         </div>
      </div>
    </div>
  );
};
