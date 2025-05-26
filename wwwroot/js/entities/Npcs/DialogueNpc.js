import { Npc } from "./Npc.js";

export class Npc extends Npc {
    constructor(scene, x, y, name, spritesheet, dialogue) {
        super(scene, x, y, name, spritesheet);

        this.dialogue = dialogue;
    }
}