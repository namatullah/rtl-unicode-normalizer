import {IRawCharacterAlphabet, IRawCharacterMapping} from "./character";
interface IRawFamily {
    characters: {
        alphabet: IRawCharacterAlphabet[],
        mapping: IRawCharacterMapping[]
    };
}
interface IFamily extends IRawFamily {
    canStart(): boolean;
    canEnd(): boolean;
    isBeforeSticky(): boolean;
    isAfterSticky(): boolean;
}

export class Family implements IFamily {

    characters: {alphabet: IRawCharacterAlphabet[]; mapping: IRawCharacterMapping[]};

    constructor(alphabet: IRawCharacterAlphabet[], mapping: IRawCharacterMapping[]) {
        this.characters = {
            alphabet: alphabet,
            mapping: mapping
        };
    }

    get alphabet(): IRawCharacterAlphabet[] {
        return this.characters.alphabet;
    }

    get mapping(): IRawCharacterMapping[] {
        return this.characters.mapping;
    }

    canStart(): boolean {
        for (let i = 0; i < this.characters.alphabet.length; i++) {
            if (this.characters.alphabet[i].canStart) {
                return true;
            }
        }
        return false;
    }

    canEnd(): boolean {
        for (let i = 0; i < this.characters.alphabet.length; i++) {
            if (this.characters.alphabet[i].canEnd) {
                return true;
            }
        }
        return false;
    }

    isBeforeSticky(): boolean {
        for (let i = 0; i < this.characters.alphabet.length; i++) {
            if (this.characters.alphabet[i].isBeforeSticky) {
                return true;
            }
        }
        return false;
    }

    isAfterSticky(): boolean {
        for (let i = 0; i < this.characters.alphabet.length; i++) {
            if (this.characters.alphabet[i].isAfterSticky) {
                return true;
            }
        }
        return false;
    }

}
