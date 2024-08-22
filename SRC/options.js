import {RuleGroupPool} from "./storage.js";
import {Updater} from "./updater.js";

async function loadRules() {
    const pool = await RuleGroupPool.getInstance();
    const content = pool.pool;
    console.log('Loaded rules:', content);
    const container=document.getElementById('rulesContainer');
    for (let group of content) {
        const groupElement=document.createElement('div');
        groupElement.classList.add('group');
        const titleElement=document.createElement('h2');
        titleElement.textContent=group.rules.src;
        groupElement.appendChild(titleElement);
        const rulesElement=document.createElement('ul');
        for (let rule of group.rules.rules) {
            const ruleElement=document.createElement('li');
            ruleElement.textContent=rule.Regex.toString()+' -> '+rule.Redirect;
            rulesElement.appendChild(ruleElement);
        }
        groupElement.appendChild(rulesElement);
        container.appendChild(groupElement);
    }
}

async function submitButton() {
    const url=document.getElementById('urlInput').value;
    console.log('Adding rules from:', url);
    if (url) {
        await Updater.AddFromURL(url);
        console.log('Added rules from:', url);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    loadRules();
    document.getElementById('submitButton').addEventListener('click',async () => {
        await submitButton();
    });
});