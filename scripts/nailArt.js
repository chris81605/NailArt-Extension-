// =====================
// NailArt 初始化函數
// =====================
function initNailArtVars() {
    V.nailArt ??= {};

    // 手部
    V.nailArt.hand ??= { style: "default", show: true, z: 260 };

    // 指甲
    V.nailArt.nails ??= { style: "nails", show: true, z: 270 };

    // 指甲底色
    V.nailArt.colorEnabled ??= true;
    V.nailArt.color ??= "#ff6699";

    // 指甲裝飾
    V.nailArt.art ??= { style: "nailArt", show: true, z: 280 };
    V.nailArt.artColorEnabled ??= true;
    V.nailArt.artColor ??= "#00ffff";
    
    // 指甲裝飾2
    V.nailArt.art2 ??= { style: "nailArt2", show: true, z: 285 };
    V.nailArt.art2ColorEnabled ??= true;
    V.nailArt.art2Color ??= "#00ffff";

    // 手持物
    V.nailArt.item ??= { style: "handItem", show: true, z: 255 };
    V.nailArt.itemAccColorEnabled ??= true;
    V.nailArt.itemAccColor ??= "#ffffff";
    V.nailArt.itemAccBlendMode ??= 'hard-light';
    
    // 手持物2
    V.nailArt.item2 ??= { style: "handItem2", show: true, z: 255 };
    V.nailArt.item2AccColorEnabled ??= true;
    V.nailArt.item2AccColor ??= "#ffffff";
    V.nailArt.item2AccBlendMode ??= 'hard-light';

    // 手持物3
    V.nailArt.item3 ??= { style: "handItem3", show: true, z: 255 };
    V.nailArt.item3AccColorEnabled ??= true;
    V.nailArt.item3AccColor ??= "#ffffff";
    V.nailArt.item3AccBlendMode ??= 'hard-light';

    // 手持物4
    V.nailArt.item4 ??= { style: "handItem4", show: true, z: 255 };
    V.nailArt.item4AccColorEnabled ??= true;
    V.nailArt.item4AccColor ??= "#ffffff";
    V.nailArt.item4AccBlendMode ??= 'hard-light';
    
    // back 層
    V.nailArt.handBack ??= { z: 230 };
    V.nailArt.nailsBack ??= { z: 240 };
    V.nailArt.nailArtBack ??= { z: 250 };
    V.nailArt.nailArt2Back ??= { z: 255 };

    // 染色參數
    V.nailArt.colorBlendMode ??= 'hard-light';
    
    // 座標偏移
    V.nailArt.offsetX ??= 0;
    V.nailArt.offsetY ??= 0;
    
    // 套用預設旗標
    V.nailArt.applyDefaultFlag ??= false;
}

// =====================
// 檢測資源有效性函數
// =====================
setup.handAssets = setup.handAssets || {};

async function detectHandAssets() {
    if (!V.nailArt?.hand?.style) return;

    const style = V.nailArt.hand.style;
    const base = `img/hands/${style}`;
    const cache = {};

    async function exists(path) {
        try {
            const img = await window.modUtils.getImage(path);
            return img !== undefined;
        } catch {
            return false;
        }
    }

    // ===== 正面 =====
    cache.hand = await exists(`${base}/hands.png`);
    cache.nails = await exists(`${base}/nails/${V.nailArt.nails?.style}.png`);
    cache.nailArt = await exists(`${base}/nailArt/${V.nailArt.art?.style}.png`);
    cache.nailArt2 = await exists(`${base}/nailArt2/${V.nailArt.art2?.style}.png`);

    cache.handItem = await exists(`${base}/item/${V.nailArt.item?.style}.png`);
    cache.handItemAcc = await exists(`${base}/item/${V.nailArt.item?.style}Acc.png`);

    cache.handItem2 = await exists(`${base}/item2/${V.nailArt.item2?.style}.png`);
    cache.handItem2Acc = await exists(`${base}/item2/${V.nailArt.item2?.style}Acc.png`);

    cache.handItem3 = await exists(`${base}/item3/${V.nailArt.item3?.style}.png`);
    cache.handItem3Acc = await exists(`${base}/item3/${V.nailArt.item3?.style}Acc.png`);

    cache.handItem4 = await exists(`${base}/item4/${V.nailArt.item4?.style}.png`);
    cache.handItem4Acc = await exists(`${base}/item4/${V.nailArt.item4?.style}Acc.png`);

    // ===== 背面 =====
    cache.handBack = await exists(`${base}/handsBack.png`);
    cache.nailsBack = await exists(`${base}/nails/${V.nailArt.nails?.style}Back.png`);
    cache.nailArtBack = await exists(`${base}/nailArt/${V.nailArt.art?.style}Back.png`);
    cache.nailArt2Back = await exists(`${base}/nailArt2/${V.nailArt.art2?.style}Back.png`);

    cache.handItemBack = await exists(`${base}/item/${V.nailArt.item?.style}Back.png`);
    cache.handItem2Back = await exists(`${base}/item2/${V.nailArt.item2?.style}Back.png`);
    cache.handItem3Back = await exists(`${base}/item3/${V.nailArt.item3?.style}Back.png`);
    cache.handItem4Back = await exists(`${base}/item4/${V.nailArt.item4?.style}Back.png`);

    setup.handAssets = cache;
}

// =====================
//變數初始化與檢測相關文件
// =====================
async function initNailArtSystem() {
    initNailArtVars();        // 初始化變數
    await detectHandAssets(); // 檔案存在檢測
}

// =====================
// Passage 開始時初始化
// =====================
$(document).one(':passagestart', () => {
    initNailArtSystem();
});

// =====================
// 讀檔時初始化
// =====================
Save.onLoad.add(() => {
    initNailArtSystem();
});


// =====================
// 圖層定義
// =====================
(() => {
    const model = Renderer.CanvasModels?.main;
    if (!model?.layers) return;
    if (!modUtils.getMod('maplebirch')) return;

    const layers = {
        hand: {
            filters: ["tan"],
            srcfn() {
                if (!V.nailArt.hand.show) return null;
                return `img/hands/${V.nailArt.hand.style}/hands.png`;
            },
            showfn() {
                return V.nailArt.hand.show && setup.handAssets?.hand;
            },
            zfn() { return V.nailArt.hand.z; },
            animation: "idle"
        },

        nails: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.nails.show) return null;
                return `img/hands/${V.nailArt.hand.style}/nails/${V.nailArt.nails.style}.png`;
            },
            showfn() {
                return V.nailArt.nails.show && setup.handAssets?.nails;
            },
            zfn() { return V.nailArt.nails.z; },
            animation: "idle"
        },

        nailArt: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.art.show) return null;
                return `img/hands/${V.nailArt.hand.style}/nailArt/${V.nailArt.art.style}.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.art.show
                    && setup.handAssets?.nailArt;
            },
            zfn() { return V.nailArt.art.z; },
            animation: "idle"
        },

        nailArt2: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.art2.show) return null;
                return `img/hands/${V.nailArt.hand.style}/nailArt2/${V.nailArt.art2.style}.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.art2.show
                    && setup.handAssets?.nailArt2;
            },
            zfn() { return V.nailArt.art2.z; },
            animation: "idle"
        },

        handBack: {
            filters: ["tan"],
            srcfn() {
                if (!V.nailArt.hand.show) return null;
                return `img/hands/${V.nailArt.hand.style}/handsBack.png`;
            },
            showfn() {
                return V.nailArt.hand.show && setup.handAssets?.handBack;
            },
            zfn() { return V.nailArt.handBack.z; },
            animation: "idle"
        },

        nailsBack: {
            srcfn() {
                if (!V.nailArt.hand.show) return null;
                return `img/hands/${V.nailArt.hand.style}/nails/${V.nailArt.nails.style}Back.png`;
            },
            showfn() {
                return V.nailArt.nails.show && setup.handAssets?.nailsBack;
            },
            zfn() { return V.nailArt.nailsBack.z; },
            animation: "idle"
        },

        nailArtBack: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.art.show) return null;
                return `img/hands/${V.nailArt.hand.style}/nailArt/${V.nailArt.art.style}Back.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.art.show
                    && setup.handAssets?.nailArtBack;
            },
            zfn() { return V.nailArt.nailArtBack.z; },
            animation: "idle"
        },

        nailArt2Back: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.art2.show) return null;
                return `img/hands/${V.nailArt.hand.style}/nailArt2/${V.nailArt.art2.style}Back.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.art2.show
                    && setup.handAssets?.nailArt2Back;
            },
            zfn() { return V.nailArt.nailArt2Back.z; },
            animation: "idle"
        },

        handItem: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.item.show) return null;
                return `img/hands/${V.nailArt.hand.style}/item/${V.nailArt.item.style}.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.item.show
                    && setup.handAssets?.handItem;
            },
            zfn() { return V.nailArt.item.z; },
            animation: "idle"
        },

        handItemAcc: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.item.show || !V.nailArt.itemAccColorEnabled) return null;
                return `img/hands/${V.nailArt.hand.style}/item/${V.nailArt.item.style}Acc.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.item.show
                    && V.nailArt.itemAccColorEnabled
                    && setup.handAssets?.handItemAcc;
            },
            zfn() { return V.nailArt.item.z; },
            animation: "idle"
        },

        handItem2: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.item2.show) return null;
                return `img/hands/${V.nailArt.hand.style}/item2/${V.nailArt.item2.style}.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.item2.show
                    && setup.handAssets?.handItem2;
            },
            zfn() { return V.nailArt.item2.z; },
            animation: "idle"
        },

        handItem2Acc: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.item2.show || !V.nailArt.item2AccColorEnabled) return null;
                return `img/hands/${V.nailArt.hand.style}/item2/${V.nailArt.item2.style}Acc.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.item2.show
                    && V.nailArt.item2AccColorEnabled
                    && setup.handAssets?.handItem2Acc;
            },
            zfn() { return V.nailArt.item2.z; },
            animation: "idle"
        },

        handItem3: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.item3.show) return null;
                return `img/hands/${V.nailArt.hand.style}/item3/${V.nailArt.item3.style}.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.item3.show
                    && setup.handAssets?.handItem3;
            },
            zfn() { return V.nailArt.item3.z; },
            animation: "idle"
        },

        handItem3Acc: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.item3.show || !V.nailArt.item3AccColorEnabled) return null;
                return `img/hands/${V.nailArt.hand.style}/item3/${V.nailArt.item3.style}Acc.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.item3.show
                    && V.nailArt.item3AccColorEnabled
                    && setup.handAssets?.handItem3Acc;
            },
            zfn() { return V.nailArt.item3.z; },
            animation: "idle"
        },

        handItem4: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.item4.show) return null;
                return `img/hands/${V.nailArt.hand.style}/item4/${V.nailArt.item4.style}.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.item4.show
                    && setup.handAssets?.handItem4;
            },
            zfn() { return V.nailArt.item4.z; },
            animation: "idle"
        },

        handItem4Acc: {
            srcfn() {
                if (!V.nailArt.hand.show || !V.nailArt.item4.show || !V.nailArt.item4AccColorEnabled) return null;
                return `img/hands/${V.nailArt.hand.style}/item4/${V.nailArt.item4.style}Acc.png`;
            },
            showfn() {
                return V.nailArt.hand.show
                    && V.nailArt.item4.show
                    && V.nailArt.item4AccColorEnabled
                    && setup.handAssets?.handItem4Acc;
            },
            zfn() { return V.nailArt.item4.z; },
            animation: "idle"
        }
    };

    maplebirch.char.use(layers);
})();

// =====================
// 染色管線（含 Back 層）
// =====================
(() => {
    function createNailColorStep(layerName, colorVar) {
        return {
            name: layerName + "ColorStep",
            condition(layer) {
                return layer.name === layerName && V.nailArt?.[colorVar + "Enabled"];
            },
            render(image, layer) {
                const color = V.nailArt?.[colorVar];
                if (!color) return image;

                let blendMode = 'multiply';

                // 手持物Acc使用獨立模式
                if (layerName === "handItemAcc") {
                    blendMode = V.nailArt?.itemAccBlendMode ?? 'multiply';
                } else if (layerName === "handItem2Acc") {    
                    blendMode = V.nailArt?.item2AccBlendMode ?? 'multiply';
                } else if (layerName === "handItem3Acc") {
                    blendMode = V.nailArt?.item3AccBlendMode ?? 'multiply';
                } else if (layerName === "handItem4Acc") {
                    blendMode = V.nailArt?.item4AccBlendMode ?? 'multiply';
                } else {
                    blendMode = V.nailArt?.colorBlendMode ?? 'multiply';
                }

                const canvas = Renderer.createCanvas(image.width, image.height);
                return Renderer.composeOverCutout(image, color, blendMode, canvas).canvas;
            }
        };
    }

    // 註冊圖層與對應顏色變數
    const layerMap = {
        nails: "color",
        nailsBack: "color",
        nailArt: "artColor",
        nailArt2: "art2Color",
        nailArtBack: "artColor",
        handItemAcc: "itemAccColor",
        handItem2Acc: "item2AccColor",
        handItem3Acc: "item3AccColor",
        handItem4Acc: "item4AccColor"
    };

    for (const layer in layerMap) {
        const step = createNailColorStep(layer, layerMap[layer]);
        const existingIndex = Renderer.RenderingPipeline.findIndex(s => s.name === step.name);
        if (existingIndex >= 0) {
            Renderer.RenderingPipeline[existingIndex] = step;
        } else {
            const index = Renderer.RenderingPipeline.findIndex(s => s.name === "BlendColor");
            if (index >= 0) Renderer.RenderingPipeline.splice(index, 0, step);
            else Renderer.RenderingPipeline.push(step);
        }
    }
})();

// =====================
// 重繪函式
// =====================
function nailAtrRefresh(useFullRedraw = true, delay = 50) {
    setTimeout(async () => {

        // 重新檢測資源有效性
        await detectHandAssets();

        if (useFullRedraw) { 
            Renderer.CanvasModelCaches = {};
        }
        else { 
            Renderer.ImageCaches = {};
            Renderer.ImageErrors = {};
            Renderer.lastAnimation.invalidateCaches(); 
            Renderer.lastAnimation.redraw(); 
        }
              
        Wikifier.wikifyEval('<<updatesidebarimg>>');

    }, delay);
}

// =====================
// setup 初始化
// =====================
setup.handStyles ??= {};

// ------------------------------------------------------
// 註冊函數
// ------------------------------------------------------
function registerHandStyle(key, config) {
    if (setup.handStyles[key]) {
        console.warn(`HandStyle "${key}" 已存在，將被覆蓋`);
    }

    let metadata = null;

    if (config.metadata) {
        metadata = {
            short: config.metadata.short ?? config.name,
            author: config.metadata.author ?? "Unknown",
            version: config.metadata.version ?? "1.0",
            tags: Array.isArray(config.metadata.tags)
                ? config.metadata.tags
                : null,
            description: config.metadata.description ?? "無",
            preview: config.metadata.preview ?? null
        };
    }

    setup.handStyles[key] = {
        name: config.name,
        nails: config.nails ?? {},
        art: config.art ?? {},
        art2: config.art2 ?? {},
        item: config.item ?? {},
        itemAcc: config.itemAcc ?? {},
        item2: config.item2 ?? {},
        item2Acc: config.item2Acc ?? {},
        item3: config.item3 ?? {},
        item3Acc: config.item3Acc ?? {},
        item4: config.item4 ?? {},
        item4Acc: config.item4Acc ?? {},
        defaults: config.defaults ?? {},
        metadata: metadata
    };
}

// ===== 使用js註冊範例 =====
/*
registerHandStyle("default", {
    name: "預設",
    nails: { nails: "基本指甲" },
    art: { nailArt: "基本美甲" },
    art2: { nailArt: "基本美甲" },
    item: { handItem: "基本手持物" },
    item2: { handItem: "基本手持物" },
    item3: { handItem: "基本手持物" },
    item4: { handItem: "基本手持物" },
    defaults: {
        hand: { show: true, z: 260 },
        nails: { show: true, colorEnabled: true, color: "#ff6699", z: 270, blendMode: "hard-light" },
        art: { show: true, colorEnabled: true, color: "#00ffff", z: 280, blendMode: "hard-light" },
        art2: { show: true, colorEnabled: true, color: "#00ffff", z: 280, blendMode: "hard-light" },
        item: { show: true, z: 255 },
        itemAcc: { colorEnabled: true, color: "#ffffff", blendMode: "hard-light" },
        item2: { show: true, z: 255 },
        item2Acc: { colorEnabled: true, color: "#ffffff", blendMode: "hard-light" }
    }
});
*/

// =====================
// 套用手部樣式 Defaults
// =====================
function applyHandStyleDefaults(styleKey) {
    const style = setup.handStyles[styleKey];
    if (!style?.defaults) return;
    if (V?.nailArt?.applyDefaultFlag == false) return;

    const d = style.defaults;

    // hand
    if (d.hand) Object.assign(V.nailArt.hand, d.hand);
    
    if (d.handBack) Object.assign(V.nailArt.handBack, d.handBack);

    // nails
    if (d.nails) {
        Object.assign(V.nailArt.nails, { 
            show: d.nails.show ?? true, 
            z: d.nails.z ?? V.nailArt.nails.z 
        });
        if (d.nails.style !== undefined) V.nailArt.nails.style = d.nails.style;
        V.nailArt.colorEnabled = d.nails.colorEnabled ?? V.nailArt.colorEnabled;
        V.nailArt.color = d.nails.color ?? V.nailArt.color;
        V.nailArt.colorBlendMode = d.nails.blendMode ?? V.nailArt.colorBlendMode;
    }
    
    if (d.nailsBack) {
        Object.assign(V.nailArt.nailsBack, {            
            z: d.nailsBack.z ?? V.nailArt.nailsBack.z 
        });    
    }
    

    // art
    if (d.art) {
        Object.assign(V.nailArt.art, { show: d.art.show ?? true, z: d.art.z ?? V.nailArt.art.z });
        if (d.art.style !== undefined) V.nailArt.art.style = d.art.style;
        V.nailArt.artColorEnabled = d.art.colorEnabled ?? V.nailArt.artColorEnabled;
        V.nailArt.artColor = d.art.color ?? V.nailArt.artColor;
        V.nailArt.artColorBlendMode = d.art.blendMode ?? V.nailArt.artColorBlendMode;
    }
    
    if (d.artBack) {
        Object.assign(V.nailArt.nailArtBack, { z: d.artBack.z ?? V.nailArt.nailArtBack.z });        
    }

    // art2
    if (d.art2) {
        Object.assign(V.nailArt.art2, { show: d.art2.show ?? true, z: d.art2.z ?? V.nailArt.art2.z });
        if (d.art2.style !== undefined) V.nailArt.art2.style = d.art2.style;
        V.nailArt.art2ColorEnabled = d.art2.colorEnabled ?? V.nailArt.art2ColorEnabled;
        V.nailArt.art2Color = d.art2.color ?? V.nailArt.art2Color;
        V.nailArt.art2ColorBlendMode = d.art2.blendMode ?? V.nailArt.art2ColorBlendMode;
    }
    
    if (d.art2Back) {
        Object.assign(V.nailArt.nailArt2Back, { z: d.art2Back.z ?? V.nailArt.nailArt2Back.z });        
    }

    // item1
    if (d.item) {
        Object.assign(V.nailArt.item, { show: d.item.show ?? true, z: d.item.z ?? V.nailArt.item.z });
        if (d.item.style !== undefined) V.nailArt.item.style = d.item.style;
    }
    if (d.itemAcc) {
        V.nailArt.itemAccColorEnabled = d.itemAcc.colorEnabled ?? V.nailArt.itemAccColorEnabled;
        V.nailArt.itemAccColor = d.itemAcc.color ?? V.nailArt.itemAccColor;
        V.nailArt.itemAccBlendMode = d.itemAcc.blendMode ?? V.nailArt.itemAccBlendMode;
    }

    // item2
    if (d.item2) {
        Object.assign(V.nailArt.item2, { show: d.item2.show ?? true, z: d.item2.z ?? V.nailArt.item2.z });
        if (d.item2.style !== undefined) V.nailArt.item2.style = d.item2.style;
    }
    if (d.item2Acc) {
        V.nailArt.item2AccColorEnabled = d.item2Acc.colorEnabled ?? V.nailArt.item2AccColorEnabled;
        V.nailArt.item2AccColor = d.item2Acc.color ?? V.nailArt.item2AccColor;
        V.nailArt.item2AccBlendMode = d.item2Acc.blendMode ?? V.nailArt.item2AccBlendMode;
    }

    // item3
    if (d.item3) {
        Object.assign(V.nailArt.item3, { show: d.item3.show ?? true, z: d.item3.z ?? V.nailArt.item3.z });
        if (d.item3.style !== undefined) V.nailArt.item3.style = d.item3.style;
    }
    if (d.item3Acc) {
        V.nailArt.item3AccColorEnabled = d.item3Acc.colorEnabled ?? V.nailArt.item3AccColorEnabled;
        V.nailArt.item3AccColor = d.item3Acc.color ?? V.nailArt.item3AccColor;
        V.nailArt.item3AccBlendMode = d.item3Acc.blendMode ?? V.nailArt.item3AccBlendMode;
    }

    // item4
    if (d.item4) {
        Object.assign(V.nailArt.item4, { show: d.item4.show ?? true, z: d.item4.z ?? V.nailArt.item4.z });
        if (d.item4.style !== undefined) V.nailArt.item4.style = d.item4.style;
    }
    if (d.item4Acc) {
        V.nailArt.item4AccColorEnabled = d.item4Acc.colorEnabled ?? V.nailArt.item4AccColorEnabled;
        V.nailArt.item4AccColor = d.item4Acc.color ?? V.nailArt.item4AccColor;
        V.nailArt.item4AccBlendMode = d.item4Acc.blendMode ?? V.nailArt.item4AccBlendMode;
    }

    V.nailArt.applyDefaultFlag = false;
}

// =====================
// 手詳細資訊 UI 宏
// =====================
Macro.add("handInfoUI", {
    handler() {
        const currentKey = V?.nailArt?.hand?.style;
        const style = setup.handStyles?.[currentKey];

        const container = document.createElement("div");
        container.style.padding = "12px";
        container.style.border = "1px solid #444";
        container.style.background = "#111";
        container.style.marginBottom = "10px";
        container.style.fontSize = "14px";
        container.style.color = "#eee";
        container.style.borderRadius = "4px";

        if (!style) {
            container.innerHTML = "<p>未選擇手樣式</p>";
            this.output.appendChild(container);
            return;
        }

        const meta = style.metadata;

        // 標題
        const title = document.createElement("div");
        title.innerText = '詳細資訊';
        title.style.fontWeight = "bold";
        title.style.fontSize = "16px";
        title.style.color = "#FFD700";
        title.style.marginBottom = "10px";
        container.appendChild(title);

        // 左右容器
        const flexContainer = document.createElement("div");
        flexContainer.style.display = "flex";
        flexContainer.style.gap = "12px";

        // 左側預覽
        const left = document.createElement("div");
        left.style.flex = "0 0 auto";
        if (meta?.preview) {
            const img = document.createElement("img");
            img.src = `img/hands/${V?.nailArt?.hand?.style}/${meta.preview}.png`;
            img.style.maxWidth = "120px";
            img.style.border = "1px solid #333";
            img.style.borderRadius = "3px";
            left.appendChild(img);
        } else {
            left.innerHTML = "<p>無預覽圖</p>";
        }

        // 右側資訊
        const right = document.createElement("div");
        right.style.flex = "1";
        right.style.display = "flex";
        right.style.flexDirection = "column";
        right.style.gap = "6px";

        function createRow(label, value) {
            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.gap = "6px";
            row.style.alignItems = "flex-start";
            row.innerHTML = `<strong style="color:#FFD700">${label}：</strong>${value}`;
            return row;
        }

        if (meta) {
            if (meta.short) right.appendChild(createRow("名稱", meta.short));
            if (meta.author) right.appendChild(createRow("作者", meta.author));
            if (meta.version) right.appendChild(createRow("版本", meta.version));            
            if (meta.tags) right.appendChild(createRow("標籤", meta.tags.join(", ")));
            if (meta.description) right.appendChild(createRow("說明", meta.description));
        }

        flexContainer.appendChild(left);
        flexContainer.appendChild(right);

        container.appendChild(flexContainer);

        this.output.appendChild(container);
    }
});

// =====================
// 手部 UI 宏 (整合預設套用功能)
// =====================
Macro.add('handUI', {
    handler() {
        initNailArtVars();

        const container = document.createElement('div');
        container.style.padding = "12px";
        container.style.border = "1px solid #444";
        container.style.background = "#111";
        container.style.marginBottom = "10px";
        container.style.fontSize = "14px";
        
        // 標題
        const title = document.createElement("div");
        title.innerText = '設定';
        title.style.fontWeight = "bold";
        title.style.fontSize = "16px";
        title.style.color = "#FFD700";
        title.style.marginBottom = "10px";
        container.appendChild(title);
                
        // 說明文字
        const description = document.createElement("div");
        description.innerText = 
        `手部件為總開關，關閉後將隱藏所有部件。
        可調整顯示、顏色與位置設定。
        疊加順序建議保持預設。
        部件選單為空代表該手型無此部件。`;

        description.style.fontSize = "13px";
        description.style.color = "#aaa";
        description.style.padding = "0";      
        description.style.background = "transparent";
        description.style.border = "none";
        
        container.appendChild(description);

        function createRow() {
            const row = document.createElement('div');
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.gap = "10px";
            row.style.marginBottom = "8px";
            return row;
        }

        function createSection(title) {
            const sec = document.createElement('div');
            sec.style.borderTop = "1px solid #333";
            sec.style.marginTop = "12px";
            sec.style.paddingTop = "8px";

            const t = document.createElement('div');
            t.innerText = title;
            t.style.fontWeight = "bold";
            t.style.marginBottom = "6px";
            t.style.color = "#FFD700";

            sec.appendChild(t);
            return sec;
        }
        
        function createLabel(text) {
            const label = document.createElement('div');
            label.textContent = text;
            label.style.width = "120px";     // 固定寬度
            label.style.flexShrink = "0";
            label.style.textAlign = "left"; 
            return label;
        }

        // =====================
        // 手部樣式選單
        // =====================
        const handSection = createSection("手部設定");
        const handRow = createRow();
        const handLabel = createLabel("手樣式：");
        const handSelect = document.createElement('select');
        
        for (const key in setup.handStyles) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.innerText = setup.handStyles[key].name;
            handSelect.appendChild(opt);
        }
        handSelect.value = V.nailArt.hand.style;
        handSelect.addEventListener('change', () => {
            V.nailArt.hand.style = handSelect.value;
            nailAtrRefresh();
        });
        
        handRow.appendChild(handLabel);
        handRow.appendChild(handSelect);
        handSection.appendChild(handRow);
        container.appendChild(handSection);

        // =====================
        // 部件樣式選單
        // =====================
        const styleSection = createSection("部件樣式");

        const nailStyleRow = createRow();
        const artStyleRow = createRow();
        const art2StyleRow = createRow();
        const itemStyleRow = createRow();
        const item2StyleRow = createRow();
        const item3StyleRow = createRow();
        const item4StyleRow = createRow();

        const nailStyleSelect = document.createElement('select');
        const artStyleSelect = document.createElement('select');
        const art2StyleSelect = document.createElement('select');
        const itemStyleSelect = document.createElement('select');
        const item2StyleSelect = document.createElement('select');
        const item3StyleSelect = document.createElement('select');
        const item4StyleSelect = document.createElement('select');

        nailStyleRow.appendChild(createLabel("指甲樣式："));
        nailStyleRow.appendChild(nailStyleSelect);

        artStyleRow.appendChild(createLabel("美甲樣式："));
        artStyleRow.appendChild(artStyleSelect);

        art2StyleRow.appendChild(createLabel("美甲樣式2："));
        art2StyleRow.appendChild(art2StyleSelect);

        itemStyleRow.appendChild(createLabel("手持物樣式："));
        itemStyleRow.appendChild(itemStyleSelect);

        item2StyleRow.appendChild(createLabel("手持物2樣式："));
        item2StyleRow.appendChild(item2StyleSelect);
        
        item3StyleRow.appendChild(createLabel("手持物3樣式："));
        item3StyleRow.appendChild(item3StyleSelect);
        
        item4StyleRow.appendChild(createLabel("手持物4樣式："));
        item4StyleRow.appendChild(item4StyleSelect);
        
        styleSection.appendChild(nailStyleRow);
        styleSection.appendChild(artStyleRow);
        styleSection.appendChild(art2StyleRow);
        styleSection.appendChild(itemStyleRow);
        styleSection.appendChild(item2StyleRow);
        styleSection.appendChild(item3StyleRow);
        styleSection.appendChild(item4StyleRow);

        container.appendChild(styleSection);

        // =====================
        // 重建部件選單並套用 defaults
        // =====================
        function rebuildStyleOptions() {
            const current = setup.handStyles[V.nailArt.hand.style];
            if (!current) return;

            // 套用 Defaults
            applyHandStyleDefaults(V.nailArt.hand.style);

            const STYLE_CONFIG = [
                { key: "nails", select: nailStyleSelect },
                { key: "art", select: artStyleSelect },
                { key: "art2", select: art2StyleSelect },
                { key: "item", select: itemStyleSelect },
                { key: "item2", select: item2StyleSelect },
                { key: "item3", select: item3StyleSelect },
                { key: "item4", select: item4StyleSelect }
            ];

            STYLE_CONFIG.forEach(layer => {
                const data = current[layer.key];
                if (!data) return;

                layer.select.innerHTML = "";

                for (const key in data) {
                    const opt = document.createElement('option');
                    opt.value = key;
                    opt.innerText = data[key];
                    layer.select.appendChild(opt);
                }

                if (!data[V.nailArt[layer.key].style]) {
                    V.nailArt[layer.key].style = Object.keys(data)[0];
                }

                layer.select.value = V.nailArt[layer.key].style;
            });

            nailAtrRefresh(false);
        }

        rebuildStyleOptions();

        handSelect.addEventListener('change', () => {
            V.nailArt.hand.style = handSelect.value;
            V.nailArt.applyDefaultFlag = true;
            rebuildStyleOptions();   
            Wikifier.wikifyEval('<<replace "#nailArtContainer">><<handInfoUI>><<handUI>><</replace>>');        
        });

        nailStyleSelect.addEventListener('change', () => {
            V.nailArt.nails.style = nailStyleSelect.value;
            nailAtrRefresh(false);
        });

        artStyleSelect.addEventListener('change', () => {
            V.nailArt.art.style = artStyleSelect.value;
            nailAtrRefresh(false);
        });
        
        art2StyleSelect.addEventListener('change', () => {
            V.nailArt.art2.style = art2StyleSelect.value;
            nailAtrRefresh(false);
        });

        itemStyleSelect.addEventListener('change', () => {
            V.nailArt.item.style = itemStyleSelect.value;
            nailAtrRefresh(false);
        });
        
        item2StyleSelect.addEventListener('change', () => {
            V.nailArt.item2.style = item2StyleSelect.value;
            nailAtrRefresh(false);
        });
        
        item3StyleSelect.addEventListener('change', () => {
            V.nailArt.item3.style = item3StyleSelect.value;
            nailAtrRefresh(false);
        });
        
        item4StyleSelect.addEventListener('change', () => {
            V.nailArt.item4.style = item4StyleSelect.value;
            nailAtrRefresh(false);
        });

        
        // =====================
        // 部件染色
        // =====================        
        
        const titleSection = createSection('部件染色');            
                       
        function buildColorSection({
            title,
            colorVar,
            enabledVar
        }) {
            const row = createRow();

            // 左側文字
            // row.appendChild(document.createTextNode(title + " "));
            row.appendChild(createLabel(title));

            const colorInput = document.createElement('input');
            colorInput.type = "text";
            colorInput.value = V.nailArt[colorVar];

            const toggle = document.createElement('input');
            toggle.type = "checkbox";
            toggle.checked = V.nailArt[enabledVar];

            toggle.addEventListener('change', () => {
                V.nailArt[enabledVar] = toggle.checked;
                nailAtrRefresh();
            });

            row.appendChild(colorInput);
            row.appendChild(document.createTextNode(" 啟用 "));
            row.appendChild(toggle);

            $(colorInput).spectrum({
                theme: "sp-dark",
                color: V?.nailArt?.[colorVar] ?? "#ffffff",
                showInput: true,
                showPalette: true,
                showInitial: true,
                showSelectionPalette: true,
                maxSelectionSize: 8,
                preferredFormat: "hsl",
                chooseText: "選擇",
                cancelText: "取消",
                change: (color) => {
                    V.nailArt[colorVar] = color.toHexString();
                    nailAtrRefresh();
                }
            });

            // 🔥 加到同一個大區塊
            titleSection.appendChild(row);
        }
        
        buildColorSection({
            title: "指甲染色",
            colorVar: "color",
            enabledVar: "colorEnabled"
        });

        buildColorSection({
            title: "美甲染色",
            colorVar: "artColor",
            enabledVar: "artColorEnabled"
        });

        buildColorSection({
            title: "美甲2染色",
            colorVar: "art2Color",
            enabledVar: "art2ColorEnabled"
        });

        buildColorSection({
            title: "手持物染色",
            colorVar: "itemAccColor",
            enabledVar: "itemAccColorEnabled"
        });

        buildColorSection({
            title: "手持物2染色",
            colorVar: "item2AccColor",
            enabledVar: "item2AccColorEnabled"
        });
        
        buildColorSection({
            title: "手持物3染色",
            colorVar: "item3AccColor",
            enabledVar: "item3AccColorEnabled"
        });
        
        buildColorSection({
            title: "手持物4染色",
            colorVar: "item4AccColor",
            enabledVar: "item4AccColorEnabled"
        });
        
        container.appendChild(titleSection); 

        // =====================
        // 染色模式
        // =====================
        
        const blendLabel = createSection('染色模式');
              
        // 可用的染色混合模式列表
        const blendSection = createSection('染色模式');

        const BLEND_MODES = [
            'normal','multiply','screen','overlay','lighten','darken',
            'color-dodge','color-burn','hard-light','soft-light',
            'difference','exclusion','hue','saturation','color','luminosity'
        ];

        function buildBlendControl({ labelText, targetVar }) {

            const row = createRow();

            const select = document.createElement('select');

            BLEND_MODES.forEach(mode => {
            const opt = document.createElement('option');
            opt.value = mode;
            opt.innerText = mode;
            select.appendChild(opt);
            });

            select.value = V.nailArt[targetVar] ?? 'multiply';

            select.addEventListener('change', () => {
                V.nailArt[targetVar] = select.value;
                nailAtrRefresh();
            });

            row.appendChild(createLabel(labelText, 160));
            row.appendChild(select);

            blendSection.appendChild(row);
        }

        buildBlendControl({
            labelText: "指甲／美甲染色模式:",
            targetVar: "colorBlendMode"
        });

        buildBlendControl({
            labelText: "手持物染色模式:",
            targetVar: "itemAccBlendMode"
        });

        buildBlendControl({
            labelText: "手持物2染色模式:",
            targetVar: "item2AccBlendMode"
        });
        
        buildBlendControl({
            labelText: "手持物3染色模式:",
            targetVar: "item3AccBlendMode"
        });
        
        buildBlendControl({
            labelText: "手持物4染色模式:",
            targetVar: "item4AccBlendMode"
        });

        container.appendChild(blendSection);

        // =====================
        // 顯示控制
        // =====================
        const displaySection = createSection("顯示控制");  

        const displayRow = createRow();
        displayRow.style.flexWrap = "wrap";  // 允許換行
        displayRow.style.gap = "12px";       // 每個勾選框之間間距

        [
            { key: 'hand', label: '手' },
            { key: 'nails', label: '指甲' },
            { key: 'art', label: '美甲' },
            { key: 'art2', label: '美甲2' },
            { key: 'item', label: '手持物' },
            { key: 'item2', label: '手持物2' },
            { key: 'item3', label: '手持物3' },
            { key: 'item4', label: '手持物4' }
        ].forEach(layer => {
            // 建立每組 checkbox + label 的容器
            const itemContainer = document.createElement('div');
            itemContainer.style.display = "flex";
            itemContainer.style.alignItems = "center";
            itemContainer.style.gap = "4px";   // 勾選框和文字間距

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = V.nailArt[layer.key]?.show ?? true;
            checkbox.addEventListener('change', () => {
                V.nailArt[layer.key].show = checkbox.checked;
                nailAtrRefresh(false);
            });

            const label = document.createElement('span');
            label.textContent = layer.label;

            itemContainer.appendChild(checkbox);
            itemContainer.appendChild(label);

            displayRow.appendChild(itemContainer);
        });

        displaySection.appendChild(displayRow);
        container.appendChild(displaySection);
        


        // =====================
        // Z 值控制
        // =====================
        const zSection = createSection("圖層 Z 值調整");

        [
            { key: "hand", label: "手部" },
            { key: "nails", label: "指甲" },
            { key: "art", label: "美甲" },
            { key: "art2", label: "美甲2" },          
            { key: "handBack", label: "手部Back" },
            { key: "nailsBack", label: "指甲Back" },
            { key: "nailArtBack", label: "美甲Back" },
            { key: "nailArt2Back", label: "美甲2Back" },
            { key: "item", label: "手持物" },
            { key: "item2", label: "手持物2" },
            { key: "item3", label: "手持物3" },
            { key: "item4", label: "手持物4" }
        ].forEach(layer => {
            const row = createRow();

            // 使用 createLabel 產生固定寬度標籤
            const labelDiv = createLabel(layer.label + " Z：");
            row.appendChild(labelDiv);

            const input = document.createElement('input');
            input.type = "number";
            input.min = 0;
            input.max = 1000;
            input.value = V.nailArt[layer.key]?.z ?? 0;
            input.style.width = "60px";

            input.addEventListener('input', () => {
                V.nailArt[layer.key].z = parseInt(input.value);
                nailAtrRefresh(false);
            });

            row.appendChild(input);
            zSection.appendChild(row);
        });

        container.appendChild(zSection);

        this.output.appendChild(container);
    }
});

// =====================
// 座標偏移管線
// =====================
(() => {
    const handLayers = ["hand", "handBack", "nailsBack", "nails", "nailArtBack", "nailArt2", "nailArt2Back", "nailArt", "handItem", "handItemAcc", "handItem2", "handItem2Acc", "handItem3", "handItem3Acc", "handItem4", "handItem4Acc"];

    const RenderingStepHandOffset = {
        name: "handLayerOffset",
        condition(layer) {
            return handLayers.includes(layer.name);
        },
        render(image, layer) {
            // 取偏移值，默認 0
            const offsetX = V.nailArt?.offsetX || 0;
            const offsetY = V.nailArt?.offsetY || 0;
            if (!offsetX && !offsetY) return image;

            const canvas = Renderer.createCanvas(image.width, image.height);
            const ctx = canvas;
            ctx.clearRect(0, 0, image.width, image.height);
            ctx.drawImage(image, offsetX, offsetY);
            return canvas.canvas;
        }
    };

    // 插入 pipeline 最後（確保染色/亮度/混色都已完成）
    Renderer.RenderingPipeline.push(RenderingStepHandOffset);
})();

// =====================
// 座標 UI 宏
// =====================
Macro.add('handOffsetUI', {
    handler() {
        initNailArtVars();

        const container = document.createElement('div');
        container.style.padding = "12px";
        container.style.border = "1px solid #444";
        container.style.background = "#111";
        container.style.marginBottom = "10px";
        container.style.fontSize = "14px";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "8px";

        // 標題
        const sectionTitle = document.createElement('div');
        sectionTitle.innerText = "手部偏移設定";
        sectionTitle.style.fontWeight = "bold";
        sectionTitle.style.marginBottom = "6px";
        sectionTitle.style.color = "#FFD700";
        container.appendChild(sectionTitle);

        function createRow(labelText, value, onInput) {
            const row = document.createElement('div');
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.gap = "8px";

            // 標籤
            const label = document.createElement('label');
            label.textContent = labelText;

            // 滑塊
            const input = document.createElement('input');
            input.type = 'range';
            input.min = -50;
            input.max = 50;
            input.step = 0.1;  // 細微調整
            input.value = value;
            input.style.flex = "1";

            // 數字框
            const numberInput = document.createElement('input');
            numberInput.type = 'number';
            numberInput.min = -50;
            numberInput.max = 50;
            numberInput.step = 0.1;
            numberInput.value = value;
            numberInput.style.width = "60px";

            // 聯動事件
            input.addEventListener('input', () => {
                numberInput.value = input.value;
                onInput(parseFloat(input.value));
            });

            numberInput.addEventListener('input', () => {
                input.value = numberInput.value;
                onInput(parseFloat(numberInput.value));
            });

            row.appendChild(label);
            row.appendChild(input);
            row.appendChild(numberInput);
            return row;
        }

        // X 偏移
        const rowX = createRow("X 偏移: ", V.nailArt.offsetX || 0, val => {
            V.nailArt.offsetX = val;
            nailAtrRefresh(true);
        });

        // Y 偏移
        const rowY = createRow("Y 偏移: ", V.nailArt.offsetY || 0, val => {
            V.nailArt.offsetY = val;
            nailAtrRefresh(true);
        });

        container.appendChild(rowX);
        container.appendChild(rowY);

        this.output.appendChild(container);
    }
});
