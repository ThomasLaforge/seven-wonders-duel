import { AnyPlayableCard } from "./Card";

/*
| X |   | X |   | X |
|   | X |   | T |   |
|   |   | U |   |   |

NB: Each direct friend line have a distinct number of elements and are in different parity
Here U is accessible cause no child
But T is not accessible cause one child (U)
 */
export class Field {

    constructor(
        public cards: (AnyPlayableCard | null)[][]
    ){}

    removeCard(c: AnyPlayableCard){
        const {row, col} = this.getPosition(c)
        this.cards[row][col] = null
    }

    isEmpty(){
        return this.cards.reduce( (nbCard, line) => 
            nbCard + line.filter(c => c !== null).length
        , 0) === 0
    }

    isPlayable(c: AnyPlayableCard){
        return this.hasNoChilds(c)
    }

    getCustomArrayPosition(c: AnyPlayableCard){
        const customArray = this.customArray
        let row = customArray.findIndex(l => l.findIndex(card => card && card.is(c)) !== -1)
        const col = customArray[row].findIndex(card => card && card.is(c))
        return { row, col }
    }

    getPosition(c: AnyPlayableCard){
        let row = this.cards.findIndex(l => l.findIndex(card => card && card.is(c)) !== -1)
        const col = this.cards[row].findIndex(card => card && card.is(c))
        return { row, col }
    }

    /**
     * 
     * [A, B, C, D]
     * [E, F, G]
     * 
     * TO:
     * [ A,     null,    B,      null,  C,      null,   D    ]
     * [ null,  E,       null,   F,     null,   G,      null ]
     *
     */

    get customArray(){ // With null spacers between cards        
        const { nbCol, nbRow } = this
        let arr: (AnyPlayableCard | null)[][] = []
        
        for (let i = 0; i < nbRow; i++) {
            let newRow: (AnyPlayableCard | null)[] = this.cards[i].slice(0,1)
            for (let j = 1; j < nbCol; j++) {
                newRow.push(null)
                newRow.push(this.cards[i][j])
            }

            const nbDiffCol = nbCol - this.cards[i].length
            const arrToAdd: (AnyPlayableCard | null)[] = [ 
                ...Array(nbDiffCol).fill(null), 
                ...newRow,
                ...Array(nbDiffCol).fill(null)
            ]
            arr.push(arrToAdd)
        }
        
        return arr
    }

    hasNoChilds(c: AnyPlayableCard){
        const customArray = this.customArray
        const {row, col} = this.getCustomArrayPosition(c)

        if(row === this.nbRow - 1){
            return true
        } 
        else {
            const hasNoLeftChild = (col === 0) || (customArray[row + 1][col - 1] === null)
            const hasNoRightChild = (col === this.nbCol - 1) || (customArray[row + 1][col + 1] === null)
    
            return hasNoLeftChild && hasNoRightChild
        }

    }

    isCardVisible(c: AnyPlayableCard){
        const { row } = this.getPosition(c)
        return row % 2 === 0 || this.hasNoChilds(c)
    }

    get nbCol(){
        return this.cards.reduce( (maxCol, line) => maxCol >= line.length ? maxCol : line.length, 0)
    }
    get nbRow(){
        return this.cards.length
    }

}