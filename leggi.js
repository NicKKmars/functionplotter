function converti_funzione(){
    var f = document.getElementById("f_input").value;
    f = f.replace(/\w*\^\w*/.exec(f),"Math.pow("+/\b(?:(?!goose)\w)+\b/.exec(f.split("^")[0])+","+/\w*/.exec(f.split("^")[1])+")");
    document.getElementById("f_input").value = f;
}
