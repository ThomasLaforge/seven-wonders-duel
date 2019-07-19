import { CardType, Cost, Reward, AdvancedResource, Resource } from "./defs";
import { BlueCard } from "./Cards/BlueCard";
import { GreenCard } from "./Cards/GreenCard";
import { RedCard } from "./Cards/RedCard";
import { GuildCard } from "./Cards/GuildCard";
import { RareResourceCard } from "./Cards/RareResourceCard";
import { YellowCard } from "./Cards/YellowCard";

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
        public type: CardType
    ){
        super(name, cost, reward)
    }

}

export class CardFactory {

    static create(type: CardType, cJson: any){
      if(type === CardType.Blue) {
        if( !(cJson.reward && cJson.reward.victoryPoints) ){
            throw new Error('no reward victory points in blue card')
        }
        return new BlueCard(cJson.name, cJson.cost, cJson.reward, cJson.age);
      } 
      else if(type === CardType.Green) {
        return new GreenCard(cJson.name, cJson.cost, cJson.reward, cJson.age);
      } 
      else if(type === CardType.Red) {
        if( !(cJson.reward && cJson.reward.military) ){
            throw new Error('no military on red card')
        }
        return new RedCard(cJson.name, cJson.cost, cJson.reward, cJson.age);
      } 
      else if(type === CardType.Resource) {
        return new BlueCard(cJson.name, cJson.cost, cJson.reward, cJson.age);
      } 
      else if(type === CardType.RareResource) {
        return new RareResourceCard(cJson.name, cJson.cost, cJson.reward, cJson.age);
      } 
      else if(type === CardType.Yellow) {
        return new YellowCard(cJson.name, cJson.cost, cJson.reward, cJson.age);
      } 
      else if(type === CardType.Guild) {
        return new GuildCard(cJson.name, cJson.cost, cJson.reward);
      }
      throw Error("impossible to create Card of type : " + type);
    }
}