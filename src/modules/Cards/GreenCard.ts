import { PlayableCard } from "../Card";
import { Cost, CardType, ScienceBadge } from "../defs";

import {oc} from 'ts-optchain'

export interface GreenCardReward {
    victoryPoints?: number,
    scienceBadge: ScienceBadge
}

export class GreenCard extends PlayableCard<GreenCardReward> {

    constructor(
        name: string,
        cost: Cost,
        reward: GreenCardReward,
        age: number
    ){
        super(name, cost, reward, age, CardType.Green)
    }

    get victoryPoints(): number {
        return oc(this).reward.victoryPoints(0)
    }

    get scienceBadge(){
        return this.reward.scienceBadge
    }

}