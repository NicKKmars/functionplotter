var f = "(x^345)";
f = f.replace(/\w*\^\w*/.exec(f),"Math.pow("+/\w*/.exec(f.split("^")[0])+","+/\w*/.exec(f.split("^")[1])+")");