import {Character} from "./types/character";

export default class Sample {
    public static init() {
        // let str = "These are موسی حیدری and نعمت together.";
        // let str = "موسی و نعمت همراه با شریف Foad and Baktash هستیم همینجا در MiDS";
        let str = "This is starting موسی و نعمت هستند در میدز";

        let data: any[] = [];
        let f: String = '';

        for (let i = 0; i < str.length; i++) {
            // console.log('>>', str.charCodeAt(i).toString(16));

            try {
                let text = new Character({
                    before: Character.calculateBeforeCode(str, i),
                    self: Character.calculateSelfCode(str, i),
                    after: Character.calculateAfterCode(str, i)
                });
                // console.log(text);

                data.push(text);
            } catch (e) {
                console.error(e);
            }
        }


        // Reverse the initial result
        // data.reverse();

        let startingRTL: number = -1;
        let endingRTL: number = -1;
        for (let i = 0; i < data.length; i++) {

            if (data[i].code != '20' && data[i].self.isRTL && startingRTL == -1) {
                // Starting position detected
                startingRTL = i;
            }
            if (
                (
                    data[i].code == '20' && startingRTL != -1 && i != data.length - 1 && !data[i + 1].self.isRTL
                ) || (
                    i == data.length - 1 && startingRTL != -1
                )
            ) {
                // Ending position detected, process the reversal
                endingRTL = data[i].code == '20' ? i - 1 : i;

                for (let j = 0, k = startingRTL, l = endingRTL; j < (endingRTL - startingRTL ) / 2; j++, k++, l--) {
                    let temp = data[k];
                    data[k] = data[l];
                    data[l] = temp;
                }

                // Reset RTL variables
                startingRTL = -1;
                endingRTL = -1;
            }
        }

        // Do a sample concat
        let tempResult = '';
        for (let i = 0; i < data.length; i++) {
            try {
                tempResult += data[i].getCharacter();
            } catch (e) {
            }
        }
        console.log(tempResult);
    }
}