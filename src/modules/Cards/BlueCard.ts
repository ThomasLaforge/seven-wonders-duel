import { PlayableCard } from "../Card";
import { Cost, CardType } from "../defs";

export interface BlueCardReward {
    victoryPoints: number
}

export class BlueCard extends PlayableCard<BlueCardReward> {

    constructor(
        name: string,
        cost: Cost,
        reward: BlueCardReward,
        age: number
    ){
        super(name, cost, reward, age, CardType.Blue)
    }

    get victoryPoints(){
        return this.reward.victoryPoints
    }

}