//Pagina che consente la sperimentazione delle regex - da integrare con l'applicazione principale (app.js)
function convert(){
    f=document.getElementById("f_input").value;
    f=exp_converter(f);
    f=log_converter(f);
    document.getElementById("output").innerHTML=f;
}

//Conversione delle espressioni esponenziali contenute nella funzione in ingresso in elementi interpretabili in javascript
function exp_converter(f){

    let p1 = /[a-zA-Z0-9()]*\^[a-zA-Z0-9()]*/;

    while(f.includes("^")){
        let res = p1.exec(f).toString();
        let base = res.split("^")[0];
        let pow = res.split("^")[1];
        if(base.includes(")") && !base.includes("(")){
            let i = f.indexOf(base+"^")-1;
            let ch = f.charAt(i);
            while(ch!="("){
                base = ch + base;
                i--;
                ch = f.charAt(i);
            }
            base = "("+base;
        }
        if(pow.includes("(") && !pow.includes(")")){
            let i = f.indexOf("^"+pow)+3;
            let ch = f.charAt(i);
            while(ch!=")"){
                pow = pow + ch;
                i++;
                ch = f.charAt(i);
            }
            pow = pow+")";
        }
        f=f.replace(base+"^"+pow, "Math.pow("+base+","+pow+")");
    }
    return f;
}


function log_converter(f){
    //trasformazione di log in Math.log
    let pattern_log=  /log/g;
    f = f.replace(pattern_log, "Math.log");

    //trasformazione di ln utilizzando la formula del cambio di base dei logaritmi
    let pattern_ln= /ln\(\w*\)?/;
    while(f.includes("ln")){
        res = pattern_ln.exec(f);
        if(res.toString().includes(")")){
            f = f.replace(res,"(Math.log"+/\(.*\)/.exec(res.toString())+")/(Math.log(Math.E))");
        }
        else{
            let i = f.indexOf(res.toString())+2;
            let ch = f.charAt(i);
            let replacement = "";
            while(ch!=")"){
                replacement=replacement+f.charAt(i);
                i++;
                ch = f.charAt(i);
            }
            replacement=replacement+")";
            f = f.replace("ln"+replacement,"(Math.log"+replacement+")/(Math.log(Math.E))");
        }
    }
    return f;
}
