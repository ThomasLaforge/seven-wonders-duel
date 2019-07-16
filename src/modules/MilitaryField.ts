import { NB_PLAYER, PENALTIES_STEPS, SECOND_MILITARY_STEP, FIRST_MILITARY_STEP, MAX_ATTACK } from "./defs";
import { Player } from "./Player";

export class MilitaryField {

    constructor(
        public players: Player[],
        // [ player1_firstStep, player1_secondStep, player2_firstStep, player2_secondStep ]
        public penalties: boolean[] = Array(NB_PLAYER * PENALTIES_STEPS).fill(false)
    ){}

    checkPenalties(){
        this.players.forEach( (p, i) => {
            if(this.getAttackDifference(p) < -SECOND_MILITARY_STEP && !this.penalties[i * NB_PLAYER + 1]){
                p.lose(5)
                this.penalties[i * NB_PLAYER + 1] = true                
            }
            else if(this.getAttackDifference(p) < -FIRST_MILITARY_STEP && !this.penalties[i * NB_PLAYER + 0]){
                p.lose(2)
                this.penalties[i * NB_PLAYER + 0] = true
            }
        })
    }

    getScore(p: Player){
        if(this.getAttackDifference(p) >= SECOND_MILITARY_STEP){
            return 10
        }
        else if(this.getAttackDifference(p) >= FIRST_MILITARY_STEP){
            return 5
        }
        else {
            return 0
        }
    }

    getAttackDifference(p: Player){
        return p.getAttack() - this.getOpponent(p).getAttack()
    }

    getOpponent(player: Player){
        return this.players.find(p => p.isNot(player))
    }

    playerHasWon(p: Player){
        return p.getAttack() >= MAX_ATTACK
    }

    getWinner(){
        return this.players.find(p => this.playerHasWon(p))
    }

    isGameOver(){
        return this.players.filter(p => this.playerHasWon(p)).length > 0
    }

}