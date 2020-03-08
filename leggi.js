//Pagina che consente la sperimentazione delle regex - da integrare con l'applicazione principale (app.js)
function convert(){
    f=document.getElementById("f_input").value;
    f=exp_converter(f);
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


