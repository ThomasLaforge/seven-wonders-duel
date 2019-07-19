import omit from 'lodash/omit'
import shuffle from 'lodash/shuffle'
import { PlayableCard, CardFactory } from './Card';
import { Wonder } from './Cards/Wonder';

export abstract class Deck<T> {
    
    constructor(
        public cards: T[],
        initialShuffle = true
    ){
        if(initialShuffle){
            this.cards = shuffle(this.cards)
        }
    }

}

let ALL_CARDS = require('../datas/cards.json').map( (jsonCard: any) => {
    return CardFactory.create(jsonCard.type, omit(jsonCard, ['type'])
})

export class CardDeck extends Deck<PlayableCard<any> {
    
    constructor(cards: PlayableCard<any>[] = ALL_CARDS){
        super(cards)
    }
}

let ALL_WONDERS = require('../datas/wonders.json').map( (wJson: any) => {
    return new Wonder(wJson.name, wJson.cost, wJson.reward)
})

export class WonderDeck extends Deck<Wonder> {
    constructor(cards: Wonder[] = ALL_WONDERS){
        super(cards)
    }
}