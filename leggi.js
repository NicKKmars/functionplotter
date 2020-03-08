//Pagina che consente la sperimentazione delle regex - da integrare con l'applicazione principale (app.js)
function converti_funzione(){
    var f = document.getElementById("f_input").value;
    let p1=/\w*\^\w*/;
    let p2=/\b(?:(?! )\w)+\b/;
    let p3=/\w*/;
    f = f.replace(p1.exec(f),"Math.pow("+p2.exec(f.split("^")[0])+","+p3.exec(f.split("^")[1])+")");
    document.getElementById("f_input").value = f;
}


//Stringa con goose
//f.replace(/\w*\^\w*/.exec(f),"Math.pow("+/\b(?:(?!goose)\w)+\b/.exec(f.split("^")[0])+","+/\w*/.exec(f.split("^")[1])+")");