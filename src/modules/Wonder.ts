import { Cost, Reward } from "./defs";
import { Card } from "./Card";

export class Wonder {
    
    constructor(
        public name: string,
        public cost: Cost,
        public reward: Reward,
        public buildCard?: Card
    ){}

    build(buildCard: Card){
        this.buildCard = buildCard
    }

    get built(){
        return !!this.buildCard
    }
}