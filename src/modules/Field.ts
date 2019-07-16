import { Card } from "./Card";

export interface Position {
    col: number,
    row: number
}

export class FieldCard {
    constructor(
        public card: Card,
        public visible: boolean,
        public position: Position
    ){}

    is(c: FieldCard){
        return this.position.col === c.position.col && this.position.row === c.position.row
    }
    isNot(c: FieldCard){
        return !this.is(c)
    }
}

export class Field {

    constructor(
        public cards: FieldCard[]
    ){}

    takeCard(card: FieldCard){
        this.cards = this.cards.filter(c => c.isNot(card))
    }

    isEmpty(){
        return this.cards.length === 0
    }

}

//  --- --- --- --- ---
// | X |   | X |   |   |
// |   | X |   | X |   |
// |   |   | X |   |   |
// |   |   |   |   |   |