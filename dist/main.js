require("./main.css");
var $8zHUo$jquery = require("jquery");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "ELAComponent", () => $374619ad53c39f72$export$7d7b0a4f3545c86);


function $bf4fccc564339d13$export$c1fdfb880e73617c(baseConfig, userConfig) {
    const config = JSON.parse(JSON.stringify(userConfig));
    return Object.assign({}, baseConfig, config);
}


const $1c6e8ed5a2de04d1$var$keysMap = {
    ctrlKey: "ctrl",
    shiftKey: "shift",
    altKey: "alt"
};
function $1c6e8ed5a2de04d1$export$d800d03c526eec1c(e) {
    const key = e.keyCode > 18 ? e.code.replace(/^Key/, "") : "";
    const specialPart = Object.entries($1c6e8ed5a2de04d1$var$keysMap).reduce((result, [key, name])=>e[key] ? result.concat(name) : result, []);
    return [
        ...specialPart,
        key
    ].filter(Boolean).join("+").toUpperCase();
}




const $374619ad53c39f72$var$HELPER_ACTIVE_CLASS = "ela-active";
const $374619ad53c39f72$var$TOOLTIP_INVERTED_CLASS = "ela-inverted";
const $374619ad53c39f72$var$UPDATE_SERVICE_ATTRS_INTERVAL = 3000;
const $374619ad53c39f72$var$TEST_ID_ATTR = "data-test-id";
const $374619ad53c39f72$var$TEST_PARAMS_ATTR = "data-test-params";
const $374619ad53c39f72$var$PSEUDO_ID_ATTR = "data-test-pseudo-id";
const $374619ad53c39f72$var$PSEUDO_NAME_ATTR = "data-test-pseudo-name";
const $374619ad53c39f72$var$defaultConfig = {
    customSelectorPrefix: "%",
    pseudoSelectorPrefix: "%%",
    activateShortcut: "ctrl+alt+l",
    relocateShortcut: "ctrl+alt+p",
    pseudoSelectorMap: {}
};
function $374619ad53c39f72$export$7d7b0a4f3545c86(userConfig) {
    const config = (0, $bf4fccc564339d13$export$c1fdfb880e73617c)($374619ad53c39f72$var$defaultConfig, userConfig);
    const { customSelectorPrefix: customSelectorPrefix, pseudoSelectorPrefix: pseudoSelectorPrefix, pseudoSelectorMap: pseudoSelectorMap } = config;
    let attachInterval;
    document.addEventListener("keydown", onKeyDown);
    document.body.style.setProperty("--custom-prefix", `'${customSelectorPrefix}'`);
    document.body.style.setProperty("--pseudo-prefix", `'${pseudoSelectorPrefix}'`);
    return function destroy() {
        onHelperToggle(false);
        document.removeEventListener("keydown", onKeyDown);
    };
    ///
    function onKeyDown(e) {
        const shortcut = (0, $1c6e8ed5a2de04d1$export$d800d03c526eec1c)(e);
        switch(shortcut){
            case config.activateShortcut.toUpperCase():
                onHelperToggle();
                break;
            case config.relocateShortcut.toUpperCase():
                onTooltipPositionToggle();
                break;
        }
    }
    function onHelperToggle(value = !document.body.classList.contains($374619ad53c39f72$var$HELPER_ACTIVE_CLASS)) {
        if (value) {
            document.body.classList.add($374619ad53c39f72$var$HELPER_ACTIVE_CLASS);
            document.addEventListener("click", onGlobalClick);
            attachInterval = setInterval(attachServiceAttrs, $374619ad53c39f72$var$UPDATE_SERVICE_ATTRS_INTERVAL);
            attachServiceAttrs();
        } else {
            document.body.classList.remove($374619ad53c39f72$var$HELPER_ACTIVE_CLASS);
            document.removeEventListener("click", onGlobalClick);
            clearInterval(attachInterval);
        }
    }
    function onTooltipPositionToggle() {
        document.body.classList.toggle($374619ad53c39f72$var$TOOLTIP_INVERTED_CLASS);
    }
    function onGlobalClick(event) {
        const targetEl = event.target;
        if (targetEl?.hasAttribute($374619ad53c39f72$var$TEST_ID_ATTR) || targetEl?.hasAttribute($374619ad53c39f72$var$PSEUDO_ID_ATTR)) {
            event.preventDefault();
            event.stopPropagation();
            if (event.ctrlKey) {
                const isPseudo = targetEl.hasAttribute($374619ad53c39f72$var$PSEUDO_ID_ATTR);
                const parents = (0, ($parcel$interopDefault($8zHUo$jquery)))(targetEl).parents().filter((i, parentEl)=>parentEl.hasAttribute($374619ad53c39f72$var$TEST_ID_ATTR) || isPseudo && parentEl.hasAttribute($374619ad53c39f72$var$PSEUDO_ID_ATTR)).toArray();
                const pseudoQuery = [
                    ...parents.reverse(),
                    targetEl
                ].map((el)=>extractPseudoSelector(el)).join(" ");
                copyToClipboard(pseudoQuery);
            } else {
                const pseudoSelector = extractPseudoSelector(targetEl);
                copyToClipboard(pseudoSelector);
            }
        }
    }
    ///
    function attachServiceAttrs() {
        attachPseudoAttrs();
        attachParamsAttrs();
    }
    function attachPseudoAttrs() {
        for(let pseudoSelector in pseudoSelectorMap){
            const rawSelector = pseudoSelectorMap[pseudoSelector];
            const selector = rawSelector.replace(/=?\$name/gi, "");
            const pseudoId = pseudoSelector.replace(/=\$name/gi, "");
            (0, ($parcel$interopDefault($8zHUo$jquery)))(selector).each((index, el)=>{
                el.setAttribute($374619ad53c39f72$var$PSEUDO_ID_ATTR, pseudoId);
                if (rawSelector.includes("$name") && !el.hasAttribute($374619ad53c39f72$var$PSEUDO_NAME_ATTR)) setPseudoNameAttr(el, selector);
                if (!el.hasAttribute($374619ad53c39f72$var$TEST_PARAMS_ATTR)) setTestParamsAttr(el);
            });
        }
    }
    function attachParamsAttrs() {
        const elements = (0, ($parcel$interopDefault($8zHUo$jquery)))(`[${$374619ad53c39f72$var$TEST_ID_ATTR}]`).toArray();
        for (let el of elements){
            if (el.hasAttribute($374619ad53c39f72$var$TEST_PARAMS_ATTR)) continue;
            setTestParamsAttr(el);
        }
    }
    function setPseudoNameAttr(el, selector) {
        const innerSelector = selector.replace(":has", " :is").replace(/^[^\s]+\s/, "");
        switch(true){
            /* Name from Text Content */ case selector.includes(":contains()"):
                {
                    const targetSelector = innerSelector.replaceAll(":contains()", "");
                    const [targetEl] = targetSelector ? (0, ($parcel$interopDefault($8zHUo$jquery)))(el).find(targetSelector).toArray() : [
                        el
                    ];
                    const containedText = (targetEl ?? el).textContent.trim().replace(/\s+/g, " ");
                    const name = `"${containedText}"`;
                    el.setAttribute($374619ad53c39f72$var$PSEUDO_NAME_ATTR, name);
                    break;
                }
            /* Name from an Attr */ case selector.includes("["):
                {
                    const foundEls = innerSelector ? (0, ($parcel$interopDefault($8zHUo$jquery)))(el).find(innerSelector).toArray() : [
                        el
                    ];
                    const [, nameAttr] = /\[([a-z0-9_\-]+)\]/.exec(innerSelector);
                    const name = foundEls.map((targetEl)=>`"${targetEl.getAttribute(nameAttr)}"`).join("|");
                    el.setAttribute($374619ad53c39f72$var$PSEUDO_NAME_ATTR, name);
                    break;
                }
        }
    }
    function setTestParamsAttr(el) {
        const paramsList = el.getAttributeNames().map((attrName)=>/^data-test-(?<paramName>.+)-spec$/.exec(attrName)).filter(Boolean).map((match)=>`${match.groups.paramName}=${el.getAttribute(match.input)}`);
        if (paramsList.length) el.setAttribute($374619ad53c39f72$var$TEST_PARAMS_ATTR, `%(${paramsList.join(",")})`);
    }
    function extractPseudoSelector(el) {
        const { content: content } = window.getComputedStyle(el, "::before");
        return content.slice(1, -1).replace(/\\/g, "");
    }
    function copyToClipboard(text) {
        navigator.clipboard?.writeText(text);
    }
}




//# sourceMappingURL=main.js.map
