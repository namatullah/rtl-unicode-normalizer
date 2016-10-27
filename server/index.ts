export default class Index {
    public static init() {
        var str = "!";
        var charCode = str.charCodeAt(0).toString(16)
        console.log(charCode);
        console.log(String.fromCharCode(parseInt(charCode,16)));
    }
}
