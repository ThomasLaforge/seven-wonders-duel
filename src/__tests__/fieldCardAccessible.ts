import { Field } from "../modules/Field";
import { CardType } from "../modules/defs";
import { CardFactory } from "../modules/Cards/CardFactory";

describe('field card accessible', () => {
  
    const nullCard = CardFactory.create(CardType.Yellow, {name: ''} )
    const cardOne = CardFactory.create(CardType.Yellow, {name: 'one'} )
    const cardTwo = CardFactory.create(CardType.Yellow, {name: 'two'} )

    const simpleField = new Field([
        [ nullCard, nullCard, nullCard ],
        [ nullCard, cardOne ],
        [ cardTwo ],
    ])

    test('card one is not playable', () => {
        expect(simpleField.isPlayable(cardOne)).toBe(false)
    })
    
    test('card two is playable', () => {
        expect(simpleField.isPlayable(cardTwo)).toBe(true)
    })

    test('card one is not playable', () => {
        simpleField.removeCard( cardTwo )
        expect(simpleField.isPlayable(cardOne)).toBe(true)
    })

})