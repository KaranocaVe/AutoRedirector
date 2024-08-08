class Rule {
    constructor(Regex, Redirect) {
        this.Regex = new RegExp(Regex);
        this.Redirect = Redirect;
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


async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


async function DownloadRulesFromWeb(url) {
    let rules = [];
    let text = await fetchData(url);
    let lines = text.split('\n');
    for (let line of lines) {
        if (line.length === 0 || line.startsWith('#')) {

        } else if (line.startsWith('^')) {
            console.log('Rule:', line);
            let rule = Rule.fromString(line);
            if (rule) {
                rules.push(rule);
            }
        } else {
            console.log('Invalid rule:', line);
        }
    }
    StoreRules(rules);
}

function StoreRules(rules) {
    chrome.storage.local.set({rules: rules}, function () {
        console.log('Rules stored');
    });
}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
DownloadRulesFromWeb('https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/Redirect/Redirect.conf')
    }
);