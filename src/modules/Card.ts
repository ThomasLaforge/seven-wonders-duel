import { CardType, Cost, Reward, AdvancedResource, Resource } from "./defs";

export abstract class Card {
    
    constructor(
        public type: CardType,
        public name: string,
        public cost: Cost,
        public reward: Reward,
        public link?: Card
    ){}

}

export class BlueCard extends Card {

    constructor(
        name: string,
        cost: Cost,
        reward: Reward,
        link?: Card
    ){
        super(CardType.Blue, name, cost, reward, link)
    }

    get victoryPoints(){
        if( !(this.reward && this.reward.victoryPoints) ){
            throw new Error('no reward victory points in blue card')
        }
        return this.reward.victoryPoints
    }

}

export class RedCard extends Card {

    constructor(
        name: string,
        cost: Cost,
        reward: Reward,
        link?: Card
    ){
        super(CardType.Red, name, cost, reward, link)
    }

    get nbAttack(){
        if( !(this.reward && this.reward.military) ){
            throw new Error('no military on red card')
        }
        return this.reward.military
    }

}

export class GreenCard extends Card {

    constructor(
        name: string,
        cost: Cost,
        reward: Reward,
        link?: Card
    ){
        super(CardType.Red, name, cost, reward, link)
    }

}

export class ResourceCard extends Card {

    constructor(
        name: string,
        cost: Cost,
        reward: Reward,
        link?: Card
    ){
        super(CardType.Resource, name, cost, reward, link)
    }

    isPremium(){
        const advancedResource: Resource[] = [AdvancedResource.Elixir, AdvancedResource.Papyrus]
        return advancedResource.includes(this.reward.resources[0])
    }

}