//background.js
importScripts('regworker.js');

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    /*chrome.storage.local.get(['rules'], function (result) {
        if (result.rules) {
            const rules = result.rules.map(rule => new Rule(rule.Regex, rule.Redirect));
            for (let rule of rules) {
                console.log('Checking rule:', rule);
                if (rule.match(tab.url)) {
                    console.log('Matched rule:', rule);
                    const redirectUrl = rule.getRedirect(tab.url);
                    console.log('Redirecting to:', redirectUrl);
                    chrome.tabs.update(tabId, {url: redirectUrl});
                    break;
                }
            }
        } else {
            console.log('No rules found in storage.');
        }
    });*/
    
    let testreg=/https?:\/\/(www\.)?mindmapper\.cc\/(.+?)\//;
    let testreg2=/\/^https?:\/\/(www.)?mindmanager\.(cc|cn)\/(.+?)\//;
    console.log(testreg,testreg2);
});