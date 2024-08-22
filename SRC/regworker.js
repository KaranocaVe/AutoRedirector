export class Rule {
    constructor(Regex,Redirect) {
        try {
            this.Regex = Regex;
            this.Redirect = Redirect;
        }catch (e){
            console.error('Failed to create rule:', e);
        }
    }
    match(url) {
        let reg=new RegExp(this.Regex);
        return reg.test(url);
    }
    getRedirect(url) {
        let reg=new RegExp(this.Regex);
        return url.replace(reg,this.Redirect);
    }
}

export class RulesGroup {
    constructor(src, srctext) {
        this.src = src;
        this.DataTimeStamp = new Date();
        this.rules = [];
        for (let line of srctext) {
            let keys=line.toString().split(' ');
            this.rules.push(new Rule(keys[0],keys[1]));
        }
    }
}