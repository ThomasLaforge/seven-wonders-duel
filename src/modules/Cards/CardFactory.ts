import { CardType } from "../defs";
import { BlueCard } from "./BlueCard";
import { GreenCard } from "./GreenCard";
import { RedCard } from "./RedCard";
import { RareResourceCard } from "./RareResourceCard";
import { YellowCard } from "./YellowCard";
import { GuildCard } from "./GuildCard";

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