import { DEFAULT_START_MONEY, Technology, MONEY_FOR_EACH_VP, TECHNOLOGIES_MULTIPLICATOR, CardType, NB_SCIENCE_BADGES, ScienceBadge } from "./defs";
import { Wonder } from "./Cards/Wonder";
import { CardCollection } from "./CardCollection";

import uniq from 'lodash/uniq'
import { GreenCard } from "./Cards/GreenCard";

export class Player {

    public wonders?: Wonder[]

    constructor(
        public id: string,
        public pseudo: string,
        public money = DEFAULT_START_MONEY,
        public cards = new CardCollection(),
        public technologies: Technology[] = []
    ) {}

    pay(amount: number){
        if(this.money < amount){
            throw `can't pay cause amount (${amount}) is supperior to money (${this.money})`
        }
        this.money -= amount
    }
    lose = this.pay
    
    earn(amount: number){
        this.money += amount
    }

    getScore(){
        return this.moneyScore 
            + this.technologiesScore 
            + this.cards.getScore()
    }

    get moneyScore(){
        return Math.floor(this.money / MONEY_FOR_EACH_VP) 
    }

    get technologiesScore(){
        let score = 0

        if(this.technologies.includes(Technology.SevenPoints)){
            score += 7
        }
        if(this.technologies.includes(Technology.TechnologiesMultiplicator)){
            score += TECHNOLOGIES_MULTIPLICATOR * this.technologies.length
        }

        return score
    }

    getAttack(){
        return this.cards.getAttack()
    }

    hasAllScienceBadges(){
        const cardBadges = this.cards.getCardsByType(CardType.Green)
            .reduce( (all: ScienceBadge[], c: GreenCard) => {
                if(c.reward.scienceBadge || c.reward.scienceBadge === 0){
                    return all.concat(c.reward.scienceBadge)
                }
                else {
                    throw "card without reward technology";
                }
            }, []) 
        const uniqBadges = uniq(cardBadges)
        let nbDifferentBadges = uniqBadges.length
        
        if(this.technologies.includes(Technology.ScienceBadge)){
            nbDifferentBadges++ 
        }

        return nbDifferentBadges >= NB_SCIENCE_BADGES
    }

    is(p: Player){
        return this.id === p.id
    }
    isNot(p: Player){
        return !this.is(p)
    }

}