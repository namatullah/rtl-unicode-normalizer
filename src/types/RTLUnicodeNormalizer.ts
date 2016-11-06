import {Character} from "./character";
export class RTLUnicodeNormalizer {

    private source: string;
    private destinationCharacters: Character[];
    private isStartingRTL: boolean;

    constructor(source: string) {
        this.source = source;
        this.parse();
    }

    private parse(): Character[] {

        if (this.destinationCharacters && this.destinationCharacters.length > 0) {
            return this.destinationCharacters;
        }

        let tempData: Character[] = [];

        for (let i = 0; i < this.source.length; i++) {
            // console.log('>>', str.charCodeAt(i).toString(16));

            try {
                let text = new Character({
                    before: Character.calculateBeforeCode(this.source, i),
                    self: Character.calculateSelfCode(this.source, i),
                    after: Character.calculateAfterCode(this.source, i)
                });

                tempData.push(text);
            } catch (e) {
                console.error(e);
            }
        }

        this.isStartingRTL = tempData[0].isRTL();


        // See which part of the string we need to reverse
        if (this.isStartingRTL) {
            tempData.reverse();
        }

        let startingLTR: number = -1;
        let endingLTR: number = -1;
        for (let i = 0; i < tempData.length; i++) {

            if (tempData[i].getCode() != '20' && this.chooseIfRTL(tempData[i].isRTL()) && startingLTR == -1) {
                // Starting position detected
                startingLTR = i;
            }
            if (
                (
                    tempData[i].getCode() == '20' && startingLTR != -1 && i != tempData.length - 1 && !this.chooseIfRTL(tempData[i + 1].isRTL())
                ) || (
                    i == tempData.length - 1 && startingLTR != -1
                )
            ) {
                // Ending position detected, process the reversal
                endingLTR = tempData[i].getCode() == '20' ? i - 1 : i;

                for (let j = 0, k = startingLTR, l = endingLTR; j < (endingLTR - startingLTR ) / 2; j++, k++, l--) {
                    let temp = tempData[k];
                    tempData[k] = tempData[l];
                    tempData[l] = temp;
                }

                // Reset RTL variables
                startingLTR = -1;
                endingLTR = -1;
            }
        }

        this.destinationCharacters = tempData;

        return this.destinationCharacters;
    }

    toHexArray(): string[] {
        return undefined;
    }

    toNumberArray(): number[] {
        return undefined;
    }

    toString(): string {

        let tempResult = '';
        for (let i = 0; i < this.destinationCharacters.length; i++) {
            try {
                tempResult += this.destinationCharacters[i].getCharacter();
            } catch (e) {
                console.error(e);
            }
        }
        return tempResult;
    }

    private chooseIfRTL(condition) {
        return this.isStartingRTL ? !condition : condition;
    }
}