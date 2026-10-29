import { Chapter } from '../types';
import { PHYSICS_NOTES, physicsNotes } from './physicsNotes';
import { CHEMISTRY_NOTES, chemistryNotes } from './chemistryNotes';
import { MATHS_NOTES, mathsNotes } from './mathsNotes';

export {
  PHYSICS_NOTES,
  physicsNotes,
  CHEMISTRY_NOTES,
  chemistryNotes,
  MATHS_NOTES,
  mathsNotes,
};

export const ALL_CHAPTERS: Chapter[] = [
  ...PHYSICS_NOTES,
  ...CHEMISTRY_NOTES,
  ...MATHS_NOTES,
];

export default ALL_CHAPTERS;
