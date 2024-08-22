import { Rule } from "./regworker.js";
import { RulesGroup } from "./regworker.js";

export class RuleGroupPool {
    static instance;

    constructor() {
        if (RuleGroupPool.instance) {
            return RuleGroupPool.instance;
        }
        this.pool = []; // 初始化 pool 属性
        this.loadFromStorage();
        RuleGroupPool.instance = this;
    }

    static async getInstance() {
        if (!RuleGroupPool.instance) {
            RuleGroupPool.instance = new RuleGroupPool();
            await RuleGroupPool.instance.loadFromStorage();
        }
        return RuleGroupPool.instance;
    }

    static async AddRuleGroup(rulesGroup) {
        let temp = await RuleGroupPool.getInstance();
        for (let check of temp.pool) {
            if (check.src === rulesGroup.src) {
                check.rules = rulesGroup;
                await this.saveToStorage();
                return;
            }
        }
        temp.pool.push(rulesGroup);
        await this.saveToStorage();
    }

    async loadFromStorage() {
        let data = await chrome.storage.sync.get(['pool']);
        if (data.pool) {
            this.pool = JSON.parse(data.pool);
            console.log('Loaded pool:', this.pool);
        }
    }

    static async saveToStorage() {
        let temp = await RuleGroupPool.getInstance();
        await chrome.storage.sync.set({ pool: JSON.stringify(temp.pool) });
        console.log('Saved pool:', temp.pool);
    }
}