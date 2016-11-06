# rtl-unicode-normalizer
A configurable package for normalizing contextual forms of RTL characters. Also normalizing texts with both RTL and LTR characters.

Description
-


Installation
-
    npm install rtl-unicode-normalizer
Usage
-

    import {RTLUnicodeNormalizer} from "rtl-unicode-normalizer";
    
    let yourNormalizer = new RTLUnicodeNormalizer(yourString); 
    yourNormalizer.toString(); // <== normalized string
   

API
-

1. `toString()`

2. `toHexArray()`

3. `toNumberArray()`
