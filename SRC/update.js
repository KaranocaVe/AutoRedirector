document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', function() {
        const url = document.getElementById('urlInput').value;
        StartAct(url);
    });
});

class Rule {
    constructor(Regex, Redirect) {
        let existingGroups = (Regex.match(/\((?!\?)/g) || []).length;
        let newGroupNumber = existingGroups + 1;
        this.Regex= new RegExp(Regex+ `(.+?)`);
        this.Redirect=Redirect+ `$${newGroupNumber}`;
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
            console.error('Fetch failed:', response.status);
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
    let count = 0;
    for (let line of lines) {
        if (line.length === 0 || line.startsWith('#')) {

        } else if (line.startsWith('^')) {
            console.log('Rule:', line);
            let rule = Rule.fromString(line);
            if (rule) {
                rules.push(rule);
                count++;
            }
        } else {
            console.log('Invalid rule:', line);
        }
    }
    console.log(count, 'rules saved');
    return rules;
}

function StoreRules(rules) {
    let temp = rules.map(rule => ({
        Regex: rule.Regex.toString(),
        Redirect: rule.Redirect
    }));
    chrome.storage.local.set({rules: temp}).then(r =>console.log('Rules saved'));
}

// 定义函数，接受URL作为参数
function StartAct(url) {
    let temp= DownloadRulesFromWeb(url)
        .then(rules => StoreRules(rules));
}
