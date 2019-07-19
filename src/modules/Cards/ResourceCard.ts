import { PlayableCard } from "../Card";
import { Cost, CardType } from "../defs";

export interface ResourceCardReward {
    resources: []
}

export class ResourceCard extends PlayableCard<ResourceCardReward> {

    constructor(
        name: string,
        cost: Cost,
        reward: ResourceCardReward,
        age: number
    ){
        super(name, cost, reward, age, CardType.Resource)
    }

}