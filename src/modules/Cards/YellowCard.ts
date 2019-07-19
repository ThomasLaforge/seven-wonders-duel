import { PlayableCard } from "../Card";
import { Cost, CardType, Resource, ConstructionType } from "../defs";

export interface YellowCardReward {
    resources?: Resource[],
    money?: number,
    goldBy?: { amount: number, type: ConstructionType },
    victoryPoints?: number,
    discount?: Resource[]
}

export class YellowCard extends PlayableCard<YellowCardReward> {

    constructor(
        name: string,
        cost: Cost,
        reward: YellowCardReward,
        age: number
    ){
        super(name, cost, reward, age, CardType.Resource)
    }

}