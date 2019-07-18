import { CardType, Cost, Reward, AdvancedResource, Resource } from "./defs";

export abstract class SevenWonderCard<TReward> {
    constructor(
        public name: string,
        public cost: Cost,
        public reward: TReward
    ){}
}

export abstract class PlayableCard<TReward> extends SevenWonderCard<TReward> {
    
    constructor(
        name: string,
        cost: Cost,
        reward: TReward,
        public age: number,
        public type: CardType,
        public link?: PlayableCard<Reward>
    ){
        super(name, cost, reward)
    }

}

export class CardFactory {

    static create(type: CardType, cJson: any){
      if(type === CardType.Blue) {
        return new BlueCard(cJson.name, cJson.cost, cJson.reward, cJson.link);
      } 
      else if(type === CardType.Green) {
        return new GreenCard(cJson.name, cJson.cost, cJson.reward, cJson.link);
      } 
      else if(type === CardType.Red) {
        return new RedCard(cJson.name, cJson.cost, cJson.reward, cJson.link);
      } 
      else if(type === CardType.Resource) {
        return new BlueCard(cJson.name, cJson.cost, cJson.reward, cJson.link);
      } 
      else if(type === CardType.Yellow) {
        return new BlueCard(cJson.name, cJson.cost, cJson.reward, cJson.link);
      } 
      else if(type === CardType.Purple) {
        return new BlueCard(cJson.name, cJson.cost, cJson.reward, cJson.link);
      }
      throw Error("impossible to create Card of type : " + type);
    }
}

export class BlueCard extends PlayableCard {

    constructor(
        name: string,
        age: number,
        cost: Cost,
        public reward: Reward,
        link?: PlayableCard
    ){
        super(name, cost, age, CardType.Blue, link)
    }

    get victoryPoints(){
        if( !(this.reward && this.reward.victoryPoints) ){
            throw new Error('no reward victory points in blue card')
        }
        return this.reward.victoryPoints
    }

}

export class RedCard extends PlayableCard {

    constructor(
        name: string,
        cost: Cost,
        reward: Reward,
        link?: PlayableCard
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

export class GreenCard extends PlayableCard {

    constructor(
        name: string,
        cost: Cost,
        reward: Reward,
        link?: PlayableCard
    ){
        super(CardType.Red, name, cost, reward, link)
    }

}

export class ResourceCard extends PlayableCard {

    constructor(
        name: string,
        cost: Cost,
        reward: Reward,
        link?: PlayableCard
    ){
        super(CardType.Resource, name, cost, reward, link)
    }

    isPremium(){
        const advancedResource: Resource[] = [AdvancedResource.Elixir, AdvancedResource.Papyrus]
        if(this.reward.resources && this.reward.resources.length > 0){
            return advancedResource.includes(this.reward.resources[0])
        }
        else {
            throw "no resource on reward";
        }
    }

}

export class GuildCard extends PlayableCard {
    
    constructor(
        name: string,
        cost: Cost

    ){
        super('guilde des ' + name, cost, CardType.Purple)
    }
}