//Classi
/*
    Grafico(Colore linea, stringa funzione)
*/
function Grafico(color, fString) {
    this.color=color;
    this.fString=fString;
    this.f= function(x){
        try{
            return eval(this.fString);
        } catch(e){
            console.log("Funzione non valida");
        }
    };
};


//Acquisizione elementi html
var canv=document.getElementById("canv");
var ctx=canv.getContext("2d");
var slider = document.getElementById("myRange");
var lineColor = document.getElementById("lineColor");


//definizione costanti
const width=canv.width;
const height=canv.height;
const ratio=width/height;

//definizione variabili
var currColor=lineColor.value;
var grafici=[];

//Definisce l'intervallo in cui viene mostrato il grafico [-u; u]
var initU=6.28;
var u = initU;      

//Traslazione origine del grafico al centro (L'asse y rimane invertita)
let tX = width * 0.5,
tY = height * 0.5;
ctx.translate(tX, tY);
ctx.translate(0.5, 0.5);

//EVENTI
lineColor.addEventListener('input', () => {
    console.log(lineColor.value);
    currColor=lineColor.value;
    if(grafici.length>0)
        grafici[grafici.length-1].color=currColor;
});

//Zoom con rotella
canv.addEventListener('wheel',function(event){
    //Rotella su
    if (event.deltaY < 0) {
        u--;
        ctx.clearRect(-tX, -tY, width, height);
        drawAxes();
    }
    //Rotella giù
    else if (event.deltaY > 0) {
        u++;
        ctx.clearRect(-tX, -tY, width, height);
        drawAxes();
    }
    return false; 
}, false);

//Disegno di una nuova funzione
function entryPoint(){
    let func = document.getElementById("f-tbox").value;
    //Elaborazione stringa in input dall'utente, la variabile locale func è quella da modificare, in modo
    //che l'interprete di javascript sia in grado di calcolarne i valori, il tutto tramite 
    //pattern (espressioni regolari/regex)
    let p1=/\(?\w*\)?\^\(?\w*\)?/;
    let p2=/\b(?:(?! )\w)+\b/;
    let p3=/\w*/;
    func = func.replace(p1.exec(func),"Math.pow("+p2.exec(func.split("^")[0])+","+p3.exec(func.split("^")[1])+")");
    document.getElementById("f-tbox").value=func;
    grafici.push(new Grafico(currColor, func));
}

function drawAxes(){
    //Intervallo di rappresentazione
    ctx.font = "15px Arial";
    ctx.fillText(Math.round(-u*100)/100, -width/2+10, -10);
    ctx.fillText(Math.round(u*100)/100, width/2-40, -10);

    ctx.beginPath();
    ctx.strokeStyle='#888';
    ctx.moveTo(-width/2, 0);
    ctx.lineTo(width/2, 0);
    
    ctx.moveTo(0, -height/2);
    ctx.lineTo(0, height/2);
    
    //Griglia
    var num=6;  //Numero linee
    for(let i=0; i<num; i++){
        let x_comp=width*i/num-width/2;
        //SPERIMENTALE
        //ctx.fillText(u/(num/2), x_comp, -10);
        //FINE
        ctx.moveTo(x_comp, -height/2);
        ctx.lineTo(x_comp, height/2);
    }
    for(let i=0; i<num; i++){
        let y_comp = height*i/num-height/2;
        //SPERIMENTALE
        //ctx.fillText(Math.round(-u*100)/100, -width/2+10, -10);
        //FINE
        ctx.moveTo(-width/2, y_comp);
        ctx.lineTo(width/2, y_comp);
    }
    ctx.stroke();
    ctx.closePath();
}


function drawGraph(){
    for(let j=0; j<grafici.length; j++){
        ctx.beginPath();
        ctx.strokeStyle = grafici[j].color;
        ctx.moveTo(-10000, 0);
        for(let i=-width/2; i<width/2; i++){
            let x=i*u/(width/2);
            ctx.lineTo(i, -(grafici[j].f(x))*(width/(2*u)));
            ctx.stroke();
        }
        ctx.closePath();
    }   
}

setInterval(drawGraph, 1000/60);

drawAxes();