class Rule {
    constructor(Regex, Redirect) {
        this.Regex = new RegExp(Regex);
        this.Redirect = Redirect;
        console.log('Rule:', this.Regex, '->', this.Redirect);
    }

    static fromString(ruleString) {
        const parts = ruleString.split(' ');
        if (parts.length !== 4 || parts[1] !== 'url' || parts[2] !== '302') {
            console.error('Invalid rule:', ruleString);
            return null;
        }
        return new Rule(parts[0], parts[3]);
    }

    match(url) {
        return this.Regex.test(url);
    }

    getRedirect(url) {
        return url.replace(this.Regex, this.Redirect);
    }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
/*let temp= DownloadRulesFromWeb('https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/Redirect/Redirect.conf')
    .then(rules => StoreRules(rules));*/
    }
);