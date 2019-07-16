// la servante ecarlate
// the handmaid tale
export const NB_PLAYER = 2
export const PENALTIES_STEPS = 2
export const DEFAULT_START_MONEY = 7
export const MONEY_FOR_EACH_VP = 3          // Win 1 Victory Point foreach 3 gold at end of the game
export const TECHNOLOGIES_MULTIPLICATOR = 3 // Technologies to mulitply nb technologies to get victory points
export const FIRST_MILITARY_STEP = 3
export const SECOND_MILITARY_STEP = 6
export const MAX_ATTACK = 9
export const NB_SCIENCE_BADGES = 7

export enum BasicResource {
    Stone = 0,
    Brique = 1,
    Wood = 2
}

export enum AdvancedResource {
    Papyrus = 3,
    Elixir = 4
}

export type Resource = BasicResource | AdvancedResource

export enum CardType {
    Yellow = 0, // Economie
    Blue = 1, // Monuments
    Green = 2, // Science
    Red = 3, // Armées
    Purple = 4, // Guildes
    Resource = 5,  // Ressources
}

export enum Technology {
    SevenPoints,
    TechnologiesMultiplicator,
    ScienceBadge
}

export interface Cost {
    resources?: Resource[],
    money?: number
}
export interface Reward {
    money?: number,
    military?: number,
    victoryPoints?: number,
    resources?: Resource[],
    discount?: Resource[],
    technology?: Technology
}