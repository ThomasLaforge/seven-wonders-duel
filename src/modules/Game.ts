import shuffle from 'lodash/shuffle'

import { Player } from "./Player";
import { Field } from "./Field";
import { Technology, CardType } from "./defs";
import { MilitaryField } from "./MilitaryField";
import { Wonder } from "./Cards/Wonder";
import { AnyPlayableCard } from "./Card";

export class Game {

    constructor(
        public players: Player[],
        public fields: Field[],
        public technologiesStock: Technology[],
        public militaryField = new MilitaryField(players),
        public discard: AnyPlayableCard[] = [],
        shufflePlayers = true
    ){
        shufflePlayers && this.shufflePlayers()
    }

    shufflePlayers(){
        this.players = shuffle(this.players)
    }

    /**
     * Game Infos
     */
    getWinner(){
        if(this.isGameOver()){
            // get players
            const p1 = this.players[0]
            const p2 = this.players[1]

            if(this.endByScience()){
                return this.players.find(p => p.hasAllScienceBadges())
            }
            else if(this.isEndByMilitary()){
                return this.militaryField.getWinner()
            }
            else if(this.isEndByNoCards()){
                const p1score = this.getScore(p1)
                const p2score = this.getScore(p2)
    
                if( p1score > p2score){
                    return p1
                }
                else if( p2score > p1score){
                    return p2
                }
                // Equality
                else {
                    if(p1.money !== p2.money){
                        return p1.money > p2.money ? p1 : p2
                    }
                    else {
                        Math.random() > 0.5 ? p1 : p2
                    }
                }
            }
            
        }
        else {
            throw Error('game is not over yet !')
        }
    }

    isEndByNoCards(){
        return !this.isEndByMilitary() && !this.endByScience() && this.lastField.isEmpty()
    }
    isEndByMilitary(){
        return this.militaryField.isGameOver()
    }
    endByScience(){
        return this.players.filter(p => p.hasAllScienceBadges()).length > 0 
    }
    isGameOver(){
        return (
            this.endByScience()  || // la  suprématie scientifique
            this.isEndByMilitary() || // la suprématie militaire 
            this.isEndByNoCards()     // la  victoire civile
        )
    }

    getScore(p: Player){
        return p.getScore() 
            + this.militaryField.getScore(p)
    }

    /**
     * Plays
     */
playWonder(w: Wonder, p: Player, c: AnyPlayableCard){
        if(!this.isAfordable(w)){
            throw "wonder not afordable";
        }
        this.militaryField.checkPenalties()
    }
    
    playCard(c: AnyPlayableCard, p: Player){
        if(!this.currentField.isPlayable(c)){
            throw "can't play this wonder";
        }
        this.militaryField.checkPenalties()
    }

    discardCard(c: AnyPlayableCard, p: Player){
        this.discard.push(c)
        this.currentField.removeCard(c)
        const nbMoneyToWin = 2 + p.cards.getCardsByType(CardType.Yellow).length
        p.earn(nbMoneyToWin)
    }

    /**
     * Cost stuff
     */

    isAfordable(construction: Wonder | AnyPlayableCard){
        const isAnyPlayableCard = !(construction instanceof Wonder)
        if(isAnyPlayableCard && this.isLinked(construction as AnyPlayableCard)){
            return true
        }

        const cost = construction.cost

        return true
    }

    isLinked(c: AnyPlayableCard){
        return this
    }

    /**
     * Getters
     */
    get lastField(){
        return this.fields[this.fields.length - 1]
    }

    get currentField(){
        const field = this.fields.find(f => !f.isEmpty())
        if(!field){
            throw "no current field";
        }
        return field
    }
}