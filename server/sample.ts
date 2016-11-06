import {RTLConverter} from "./types/RTLConverter";

export default class Sample {
    public static init() {
        // let str = "These are موسی حیدری and نعمت together.";
        // let str = "علی و نعمت همراه با شریف Foad and Baktash هستیم همینجا در MiDS";
        // let str = "This is starting موسی و نعمت هستند در میدز";
        // let str = "۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹";
        // let str = "Kabul نعمت الله and موسی";
        let str = "ده ملګرو ملتونو ده کارپوهانو یو نوی رپورټ وایي، په افغانستان کې 45 زره اورپکی له افغان ځواکونو سره جنګیږی";
        // let str = "قصطنطنیه څرنګه خرنګه چرنگه";
        // let str = "میای";
        // let str = "شما موفقانه 2,134 افغانی را به 792078778 ارسال روان کردید.";

        // for(var i=0;i<str.length;i++){
        //     var a = str.charCodeAt(i).toString(16);
        //     console.log(a);
        //     console.log(String.fromCharCode(parseInt(a,16)));
        // }

        console.log((new RTLConverter(str)).toString());
    }
}