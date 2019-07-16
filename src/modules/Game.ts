import { Player } from "./Player";
import { Field } from "./Field";
import { Technology } from "./defs";
import { MilitaryField } from "./MilitaryField";
import { shuffle } from 'lodash'
import { Wonder } from "./Wonder";
import { Card } from "./Card";

export class Game {

    constructor(
        public players: Player[],
        public fields: Field[],
        public technologiesStock: Technology[],
        public militaryField = new MilitaryField(players),
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
    playWonder(w: Wonder, p: Player){
        this.militaryField.checkPenalties()
    }

    playCard(c: Card, p: Player){
        this.militaryField.checkPenalties()
    }

    /**
     * Getters
     */
    get lastField(){
        return this.fields[this.fields.length - 1]
    }

}