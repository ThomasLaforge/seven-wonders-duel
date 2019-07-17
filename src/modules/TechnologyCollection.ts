import { Technology, NB_TECHNOLOGIES, NB_TECHNOLOGIES_AT_START } from "./defs";
import shuffle from 'lodash/shuffle'
export class ScienceCollection {

    constructor(
        public technologies: Technology[] = new Array(NB_TECHNOLOGIES).fill('').map( (v,i) => i),
        initShuffle = true
    ){
        if(initShuffle){
            this.technologies = shuffle(this.technologies)
        }
    }

    takeInitialGameTechnologies(){
        let picked = this.technologies.slice(0, NB_TECHNOLOGIES_AT_START)
        this.technologies = this.technologies.slice(NB_TECHNOLOGIES_AT_START)
        return picked
    }

}