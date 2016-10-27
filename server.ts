///<reference path="typings/express/index.d.ts"/>
import * as express from 'express';
import Index from "./server/index";
var app = express();
Index.init();
app.listen(3000,()=>{
    console.log('Listening of port 3000');
});