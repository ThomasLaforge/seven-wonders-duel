import { PlayableCard, BlueCard, RedCard } from "./Card";
import { CardType } from "./defs";

export class CardCollection {

    constructor(
        public cards: PlayableCard[] = []
    ){}

    getAttack(){
        return this.getCardsByType(CardType.Red).reduce( (nbAttack, c: RedCard) => nbAttack + c.nbAttack, 0 )
    }

    getScore(){
        return this.getBlueScore()
    }

    getBlueScore(){
        return this.getCardsByType(CardType.Blue).reduce( (sum, c: BlueCard) => sum + c.victoryPoints, 0)
    }

    getCardsByType(type: CardType){
        return this.cards.filter(c => c.type === type)
    }
}