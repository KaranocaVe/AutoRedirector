// 从 chrome.storage.local 中读取规则
function loadRules() {
    chrome.storage.local.get(['rules'], function(result) {
        if (result.rules) {
            displayRules(result.rules);
        } else {
            console.log('No rules found in storage.');
        }
    });
}

// 将规则添加到网页的 DOM 中
function displayRules(rules) {
    const rulesContainer = document.createElement('div');
    rulesContainer.id = 'rulesContainer';
    document.body.appendChild(rulesContainer);

    rules.forEach(rule => {
        const ruleElement = document.createElement('div');
        ruleElement.textContent = `Regex: ${rule.Regex}, Redirect: ${rule.Redirect}`;
        rulesContainer.appendChild(ruleElement);
    });
}

// 页面加载时调用 loadRules 函数
document.addEventListener('DOMContentLoaded', loadRules);