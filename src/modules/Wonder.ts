import { Cost, Reward } from "./defs";
import { PlayableCard, SevenWonderCard } from "./Card";

export class Wonder extends SevenWonderCard {
    
    constructor(
        name: string,
        cost: Cost,
        public reward: Reward,
        public buildCard?: PlayableCard
    ){
        super(name, cost)
    }

    build(buildCard: PlayableCard){
        this.buildCard = buildCard
    }

    get built(){
        return !!this.buildCard
    }
}