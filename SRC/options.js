// �� chrome.storage.local �ж�ȡ����
function loadRules() {
    chrome.storage.local.get(['rules'], function(result) {
        if (result.rules) {
            displayRules(result.rules);
        } else {
            console.log('No rules found in storage.');
        }
    });
}

// ��������ӵ���ҳ�� DOM ��
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

// ҳ�����ʱ���� loadRules ����
document.addEventListener('DOMContentLoaded', loadRules);