var f = "(x^345)";
f = f.replace(/\w*\^\w*/.exec(f),"Math.pow("+/\b(?:(?!goose)\w)+\b/.exec(f.split("^")[0])+","+/\w*/.exec(f.split("^")[1])+")");