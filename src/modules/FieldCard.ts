import { AnyPlayableCard } from "./Card";

export interface Position {
    col: number,
    row: number
}

export class FieldCard {
    constructor(
        public card: AnyPlayableCard,
        public visible: boolean,
    ){}

    discover(){
        this.visible = true
    }

    is(c: FieldCard){
        return this.card.is(c.card)
    }
    isNot(c: FieldCard){
        return !this.is(c)
    }
}
