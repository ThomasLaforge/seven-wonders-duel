import { PlayableCard } from "../Card";
import { Cost, CardType } from "../defs";

export interface RedCardReward {
    military: number
}

export class RedCard extends PlayableCard<RedCardReward> {

    constructor(
        name: string,
        cost: Cost,
        reward: RedCardReward,
        age: number
    ){
        super(name, cost, reward, age, CardType.Red)
    }

    get nbAttack(){
        return this.reward.military
    }

}