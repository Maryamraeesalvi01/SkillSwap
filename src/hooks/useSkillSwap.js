import { useContext } from 'react';
import { SkillSwapContext } from '../context/SkillSwapContext';

export const useSkillSwap = () => {
  const ctx = useContext(SkillSwapContext);
  if (!ctx) throw new Error('useSkillSwap must be used inside SkillSwapProvider');
  return ctx;
};