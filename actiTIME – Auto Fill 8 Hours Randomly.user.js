// ==UserScript==
// @name         actiTIME – Auto Fill 8 Hours Randomly (Skip Tasks 231 + 232)
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Fill each working day with random times summing to 8h, skip specific tasks
// @match        https://actitime.quodata.de/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const EXCLUDED_TASKS = [231, 232];   // ⬅️ Do NOT fill these tasks

    function waitFor(selector, callback) {
        const el = document.querySelector(selector);
        if (el) { callback(el); return; }
        setTimeout(() => waitFor(selector, callback), 250);
    }

    function randomSplit(total, parts) {
        if (parts <= 1) return [total];

        let cuts = [];
        for (let i = 0; i < parts - 1; i++) cuts.push(Math.random());
        cuts.sort();

        let result = [];
        let last = 0;
        for (let c of cuts) {
            result.push(Math.floor((c - last) * total));
            last = c;
        }
        result.push(total - result.reduce((a,b)=>a + b, 0));

        return result;
    }

    function minutesToHHMM(mins) {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h}:${m.toString().padStart(2,'0')}`;
    }

    function getTaskIdFromInput(input) {
        // Extract number from: timeTrack[438].spentStr[0]
        const match = input.name.match(/timeTrack\[(\d+)\]/);
        return match ? parseInt(match[1], 10) : null;
    }

    function fillDay(day, maxTasks) {
        let inputs = Array.from(
            document.querySelectorAll(`input[name$=".spentStr[${day}]"]`)
        );

        if (inputs.length === 0) return;

        // ⛔ Remove excluded tasks
        inputs = inputs.filter(inp => {
            const id = getTaskIdFromInput(inp);
            return !EXCLUDED_TASKS.includes(id);
        });

        // Apply max tasks/day restriction
        if (maxTasks > 0 && maxTasks < inputs.length)
            inputs = inputs.sort(() => Math.random() - 0.5).slice(0, maxTasks);

        if (inputs.length === 0) return;

        const totalMinutes = 8 * 60;
        const durations = randomSplit(totalMinutes, inputs.length);

        inputs.forEach((inp, idx) => {
            inp.value = minutesToHHMM(durations[idx]);

            inp.dispatchEvent(new Event("input", { bubbles: true }));
            inp.dispatchEvent(new Event("change", { bubbles: true }));
            inp.dispatchEvent(new Event("blur", { bubbles: true }));
        });
    }

    function fillAll() {
        const maxTasks = parseInt(document.getElementById("maxTasksInput").value.trim(), 10);

        for (let day = 0; day <= 6; day++) {
            fillDay(day, maxTasks);
        }

        alert("Filled days with random 8 hours (skipping tasks 231 + 232)");
    }

    function addControls() {
        const bar = document.querySelector(".pagetitle");
        if (!bar) return;

        const container = document.createElement("div");
        container.style.display = "inline-flex";
        container.style.alignItems = "center";
        container.style.gap = "8px";
        container.style.marginLeft = "20px";

        const label = document.createElement("label");
        label.textContent = "Max tasks/day:";
        label.setAttribute("for", "maxTasksInput");
        label.style.fontSize = "14px";
        label.style.fontWeight = "bold";
        label.style.marginRight = "4px";

        const input = document.createElement("input");
        input.id = "maxTasksInput";
        input.type = "number";
        input.min = "0";
        input.placeholder = "0 = all";
        input.style.width = "80px";
        input.style.padding = "4px";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "4px";
        input.value = "0";

        const btn = document.createElement("button");
        btn.textContent = "Auto-Fill 8h Random";
        btn.style.padding = "6px 12px";
        btn.style.background = "#4CAF50";
        btn.style.color = "white";
        btn.style.border = "none";
        btn.style.borderRadius = "4px";
        btn.style.cursor = "pointer";
        btn.onclick = fillAll;

        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(btn);

        bar.appendChild(container);
    }

    waitFor(".pagetitle", addControls);
})();
