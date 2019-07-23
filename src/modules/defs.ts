import { BlueCardReward } from "./Cards/BlueCard";
import { GreenCardReward } from "./Cards/GreenCard";
import { YellowCard, YellowCardReward } from "./Cards/YellowCard";
import { GuildReward } from "./Cards/GuildCard";
import { RedCardReward } from "./Cards/RedCard";
import { WonderReward } from "./Cards/Wonder";
import { ResourceCardReward } from "./Cards/ResourceCard";
import { RareResourceCardReward } from "./Cards/RareResourceCard";

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
export const NB_TECHNOLOGIES_AT_START = 5
export const NB_TECHNOLOGIES = 9

export enum BasicResource {
    Stone = 0,
    Brique = 1,
    Wood = 2
}

export enum AdvancedResource {
    Papyrus = 3,
    Glass = 4
}

export type Resource = BasicResource | AdvancedResource

export enum CardType {
    Yellow = 0, // Economie
    Blue = 1, // Monuments
    Green = 2, // Science
    Red = 3, // Armées
    Guild = 4,
    Resource = 5,  // Ressources,
    RareResource = 6
}

export enum OthersConstructionType {
    Wonder = 7
}

export type ConstructionType = CardType | OthersConstructionType

export enum Technology {
    SevenPoints = 0,
    TechnologiesMultiplicator = 1,
    TakeTechnologyInReserve = 2,
    ScienceBadge = 3
}

export enum ScienceBadge {
    Globe = 0,
    Wheel = 1,
    SunHour = 2,
    Cooking = 3,
    Geometry = 4,
    Write = 5
}

export enum Power {
    PlayAgain = 0,
    ChoseOneScienceFromThreeInBank = 1,
    GetCardFromDiscard = 2,
    GetCardVisibleButNotAccessible = 3
}

export interface Cost {
    resources?: Resource[],
    money?: number
}

export type Reward = 
    YellowCardReward | 
    BlueCardReward | 
    GreenCardReward |
    RedCardReward |
    ResourceCardReward |
    RareResourceCardReward |
    GuildReward |
    WonderReward