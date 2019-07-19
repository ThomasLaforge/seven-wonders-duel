import { PlayableCard } from "../Card";
import { Cost, CardType } from "../defs";

export interface RareResourceCardReward {
    resources: []
}

export class RareResourceCard extends PlayableCard<RareResourceCardReward> {

    constructor(
        name: string,
        cost: Cost,
        reward: RareResourceCardReward,
        age: number
    ){
        super(name, cost, reward, age, CardType.RareResource)
    }

}