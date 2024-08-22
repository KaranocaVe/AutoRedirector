import { Rule } from "./regworker.js";
import { RulesGroup } from "./regworker.js";

let tempdata;

export class RuleGroupPool {
    static instance;

     constructor() {
        if (RuleGroupPool.instance) {
            return RuleGroupPool.instance;
        }
        this.pool = []; // 初始化 pool 属性
        this.LoadFromStorage();
        RuleGroupPool.instance = this;
    }

    AddRuleGroup(rulesGroup) {
        for (let check of this.pool) {
            if (check.src === rulesGroup.src) {
                return;
            }
        }
        this.pool.push(rulesGroup);
        this.SaveToStorage();
    }
    
    async LoadFromStorage() {
        let data = await chrome.storage.sync.get(['pool']);
        if (data.pool) {
            this.pool = JSON.parse(data.pool);
        }
    }
    
    async SaveToStorage() {
        await chrome.storage.sync.set({pool: JSON.stringify(this.pool)});
    }
}