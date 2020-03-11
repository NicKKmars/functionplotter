//Classi
/*
    Grafico(Colore linea, stringa funzione)
*/
function Grafico(color, fString) {
    this.color=color;
    this.fString=fString;
    this.f= function(x){
        return eval(this.fString);
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
    //pattern (espressioni regolari/regex) e manipolazione delle stringhe
    func = func.replace(/\^/g, "**");
    //trasformazione dei logaritmi
    let pattern_log=  /log/g;
    func = func.replace(pattern_log, "Math.log");

    //trasformazione dei logaritmi in base naturale (e)
    let pattern_ln= /ln\(\w*\)?/;
    while(func.includes("ln")){
        res = pattern_ln.exec(func);
        if(res.toString().includes(")")){
            func = func.replace(res,"(Math.log"+/\(.*\)/.exec(res.toString())+")/(Math.log(Math.E))");
        }
        else{
            let i = func.indexOf(res.toString())+2;
            let ch = func.charAt(i);
            let replacement = "";
            while(ch!=")"){
                replacement=replacement+func.charAt(i);
                i++;
                ch = func.charAt(i);
            }
            replacement=replacement+")";
            func = func.replace("ln"+replacement,"(Math.log"+replacement+")/(Math.log(Math.E))");
        }
    }
    console.log(func);
    console.log("ciao");
    try{
        let x=0;
        eval(func);
        //immissione funzione nel grafico
        grafici.push(new Grafico(currColor, func));
    } catch(e){
        alert("La funzione inserita non è valida");
    }
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
            let c=function(i){
                return i*u/(width/2);
            }
            let r=function(x){
                return -(grafici[j].f(x))*(width/(2*u));
            }
            
            if(Math.abs(r(c(i)))==Infinity) {
                ctx.moveTo(i+1, r(c(i+1)));
            } else {
                ctx.lineTo(i, r(c(i)));
            }
            ctx.stroke();
        }
        ctx.closePath();
    }   
}

setInterval(drawGraph, 1000/60);

drawAxes();