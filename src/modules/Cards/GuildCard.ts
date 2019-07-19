import { Cost, CardType, ConstructionType } from "../defs";
import { PlayableCard } from "../Card";

export interface GuildReward {
    VpByMostWonders?: number,
    VpByMostGold?: { amount: number, each: number},
    goldAndVpByMost?: { amount: number, types: ConstructionType[] }
}

export class GuildCard extends PlayableCard<GuildReward> {
    
    constructor(
        name: string,
        cost: Cost,
        reward: GuildReward
    ){
        super('guilde des ' + name, cost, reward, 3, CardType.Guild)
    }
}