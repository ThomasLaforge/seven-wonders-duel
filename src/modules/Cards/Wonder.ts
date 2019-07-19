import { Cost, Resource, Power } from "../defs";
import { PlayableCard, SevenWonderCard } from "../Card";

export interface WonderReward {
    money?: number,
    discardMoney?: number,
    discardRareResource?: boolean,
    discardBaseResource?: boolean,
    military?: number,
    victoryPoints?: number,
    resources?: Resource[],
    powers?: Power
}

export class Wonder extends SevenWonderCard<WonderReward> {
    
    constructor(
        name: string,
        cost: Cost,
        reward: WonderReward,
        public buildCard?: PlayableCard<any>
    ){
        super(name, cost, reward)
    }

    build(buildCard: PlayableCard<any>){
        this.buildCard = buildCard
    }

    get built(){
        return !!this.buildCard
    }

}