import { Cost, Reward } from "./defs";
import { Card, SevenWonderCard } from "./Card";

export class Wonder extends SevenWonderCard {
    
    constructor(
        name: string,
        cost: Cost,
        public reward: Reward,
        public buildCard?: Card
    ){
        super(name, cost)
    }

    build(buildCard: Card){
        this.buildCard = buildCard
    }

    get built(){
        return !!this.buildCard
    }
}