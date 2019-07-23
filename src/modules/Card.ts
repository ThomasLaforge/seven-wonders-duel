import { CardType, Cost, Reward, AdvancedResource, Resource } from "./defs";

export abstract class SevenWonderCard<TReward> {
    constructor(
        public name: string,
        public cost: Cost,
        public reward: TReward
    ){}

    is(c: SevenWonderCard<TReward>){
      return this.name === c.name
    }
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

export abstract class AnyPlayableCard extends PlayableCard<Reward> {}