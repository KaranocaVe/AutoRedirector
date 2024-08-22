class rule{
    constructor(Regex,Redirect) {
        this.Regex = new RegExp(Regex);
        this.Redirect = Redirect;
    }
    match(url) {
        return this.Regex.test(url);
    }
    getRedirect(url) {
        return url.replace(this.Regex,this.Redirect);
    }
}