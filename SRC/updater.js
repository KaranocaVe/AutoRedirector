//updater.js

import {RulesGroup} from "./regworker.js";
import {RuleGroupPool} from "./storage.js";

class Updater {
    static async streamToText(stream) {
        const reader = stream.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = '';
        let done = false;

        while (!done) {
            const {value, done: streamDone} = await reader.read();
            done = streamDone;
            if (value) {
                result += decoder.decode(value, {stream: !done});
            }
        }

        return result;
    }

    static async PreProcess(text) {
        let lines = text.split('\n');
        let rules = [];
        for (let line of lines) {
            if (line.startsWith('#') ||
                line.trim() === '' ||
                line.startsWith('hostname')) {
                continue;
            }
            if (line.includes('302')&&line.includes('url')){
                let blocks = line.split(' ');
                rules.push(blocks[0]+' '+blocks[3]);
            }
        }
        return rules;
    }

    static async AddFromURL(url) {
        let response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch rules from:', url);
            return;
        }
        let data = await response.body
        let text = await this.streamToText(data);
        text = await this.PreProcess(text);
        var CurrentPool = new RuleGroupPool();
        CurrentPool.AddRuleGroup(new RulesGroup(url,text));
    }
}

Updater.AddFromURL("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/Redirect/Redirect.conf")
