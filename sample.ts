import {Character} from "./server/types/character";
let str = "افغانستان";

for (let i = 0; i < str.length; i++) {
    try {
        console.log(new Character({
            before: Character.calculateBeforeCode(str, i),
            self: Character.calculateSelfCode(str, i),
            after: Character.calculateAfterCode(str, i)
        }).getCharacter());
    } catch (e) {
        console.error(e);
    }
}