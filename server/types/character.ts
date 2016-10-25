import {alphabets} from "../alphabets/dariSrc";
import {mappings} from "../mappings/mapDariUCS";
import {Family} from "./family";

export interface IRawCharacterAlphabet {
    id: number,
    name: string,
    isBeforeSticky: boolean;
    isAfterSticky: boolean;
    canStart: boolean;
    canEnd: boolean;
}

export interface IRawCharacterMapping {
    id: number,
    code: string;
}

export class Character {
    private beforeSticky: boolean;
    private afterSticky: boolean;
    private start: boolean;
    private end: boolean;

    private familyCode: string;
    private code: string;
    private chosen: IRawCharacterAlphabet;
    private self: Family;
    private before: Family | undefined;
    private after: Family | undefined;

    constructor(config: {
        before?: string,
        after?: string,
        self: string
    }) {
        this.before = !config.before ?
            undefined :
            new Family(alphabets[config.before].characters, mappings[config.before].characters);

        this.after = !config.after ?
            undefined :
            new Family(alphabets[config.after].characters, mappings[config.after].characters);

        this.self = new Family(alphabets[config.self].characters, mappings[config.self].characters);

        this.familyCode = config.self;

        this.identify();
    }

    identify() {

        this.chooseIfOneLetterWord();

        this.chooseIfAtBeginningNonSticky();
        this.chooseIfAtBeginningSticky();

        this.chooseIfAtEndNonSticky();
        this.chooseIfAtEndSticky();

        this.chooseIfInMiddleBeforeStickyAfterSticky();
        this.chooseIfInMiddleBeforeStickyAfterNonSticky();
        this.chooseIfInMiddleBeforeNonStickyAfterSticky();
        this.chooseIfInMiddleBeforeNonStickyAfterNonSticky();

        this.code = mappings[this.familyCode].characters.find((m)=> {
            return m.id == this.chosen.id;
        }).code;

        // Fill in the fields
        this.afterSticky = this.chosen.isAfterSticky;
        this.beforeSticky = this.chosen.isBeforeSticky;
        this.start = this.chosen.canStart;
        this.end = this.chosen.canEnd;

    }

    private chooseIfInMiddleBeforeNonStickyAfterSticky() {
        if (this.chosen) {
            return;
        }
        if (!this.isAtBeginning() && !this.isAtBeginning()) {
            if (
                !this.before.isAfterSticky() &&
                this.self.isAfterSticky() &&
                this.after.isBeforeSticky()
            ) {

                this.self.alphabet.forEach((c)=> {
                    if (!c.isBeforeSticky && c.isAfterSticky) {
                        this.chosen = c;
                    }
                });
            }
        }
    }

    private chooseIfInMiddleBeforeNonStickyAfterNonSticky() {
        if (this.chosen) {
            return;
        }
        if (!this.isAtBeginning() && !this.isAtBeginning()) {
            if (!this.before.isAfterSticky() && !this.self.isAfterSticky()) {

                this.self.alphabet.forEach((c)=> {
                    if (!c.isBeforeSticky && !c.isAfterSticky) {
                        this.chosen = c;
                    }
                });
            }
        }
    }

    private chooseIfInMiddleBeforeStickyAfterNonSticky() {
        if (this.chosen) {
            return;
        }
        if (!this.isAtBeginning() && !this.isAtBeginning()) {
            if (
                this.before.isAfterSticky() &&
                this.self.isBeforeSticky() && !this.self.isAfterSticky()
            ) {

                this.self.alphabet.forEach((c)=> {
                    if (c.isBeforeSticky && !c.isAfterSticky) {
                        this.chosen = c;
                    }
                });
            }
        }
    }

    private chooseIfInMiddleBeforeStickyAfterSticky() {
        if (this.chosen) {
            return;
        }
        if (!this.isAtBeginning() && !this.isAtBeginning()) {
            if (
                this.before.isAfterSticky() &&
                this.self.isBeforeSticky() &&
                this.self.isAfterSticky() &&
                this.after.isBeforeSticky()
            ) {

                this.self.alphabet.forEach((c)=> {
                    if (c.isBeforeSticky && c.isAfterSticky) {
                        this.chosen = c;
                    }
                });
            }
        }
    }

    private chooseIfAtBeginningSticky() {
        if (this.chosen) {
            return;
        }
        if (this.isAtBeginning()) {
            if (this.self.isAfterSticky() && this.after.isBeforeSticky()) {
                this.self.alphabet.forEach((c)=> {
                    if (c.canStart && c.isAfterSticky) {
                        this.chosen = c;
                    }
                });
            }
        }
    }

    private chooseIfAtEndSticky() {
        if (this.chosen) {
            return;
        }
        if (this.isAtEnd()) {
            if (this.before.isAfterSticky() && this.self.isBeforeSticky()) {
                this.self.alphabet.forEach((c)=> {
                    if (c.canEnd && c.isBeforeSticky) {
                        this.chosen = c;
                    }
                });
            }
        }
    }

    private chooseIfAtBeginningNonSticky() {
        if (this.chosen) {
            return;
        }
        if (this.isAtBeginning()) {
            if (!this.self.isAfterSticky()) {
                this.self.alphabet.forEach((c)=> {
                    if (c.canStart && !c.isAfterSticky) {
                        this.chosen = c;
                    }
                });
            }
        }
    }

    private chooseIfAtEndNonSticky() {
        if (this.chosen) {
            return;
        }
        if (this.isAtEnd()) {
            if (!this.before.isAfterSticky()) {
                this.self.alphabet.forEach((c)=> {
                    if (c.canEnd && !c.isBeforeSticky) {
                        this.chosen = c;
                    }
                });
            }
        }
    }


    private chooseIfOneLetterWord() {
        if (this.chosen) {
            return;
        }
        if (this.isAtBeginning()) {
            if (this.isAtEnd()) {
                this.self.alphabet.forEach((c)=> {
                    if (c.canEnd && c.canStart) {
                        this.chosen = c;
                    }
                });
            }
        }
    }

    private isAtBeginning() {
        return !this.before;
    }

    private isAtEnd() {
        return !this.after;
    }

    isBeforeSticky(): boolean {
        return this.beforeSticky;
    }

    isAfterSticky(): boolean {
        return this.afterSticky;
    }

    canStart(): boolean {
        return this.start;
    }

    canEnd(): boolean {
        return this.end;
    }

    getCode(): string {
        return this.code;
    }

    getCharacter(): string {
        return String.fromCharCode(parseInt(this.code, 16));
    }

    static calculateBeforeCode (str, index) {
        return index == 0 ? undefined : str.charCodeAt(index - 1).toString(16);
    }
    static calculateSelfCode (str, index) {
        return str.charCodeAt(index).toString(16);
    }
    static calculateAfterCode (str, index) {
        return index == str.length - 1 ? undefined : str.charCodeAt(index + 1).toString(16);
    }
}