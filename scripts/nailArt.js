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
    
    // 動畫幀開關
    V.nailArt.disableAnimation ??= false;
    
    // 座標偏移
    V.nailArt.offsetX ??= 0;
    V.nailArt.offsetY ??= 0;
    // 縮放
    V.nailArt.scale ??= 1;
    V.nailArt.scaleCenterOffsetX ??= 0;
    V.nailArt.scaleCenterOffsetY ??= 0;
    
    // 圖層遮罩
    V.nailArt.mask ??= {};

    // 啟用遮罩
    V.nailArt.mask.enabled ??= false;
    
    // 排除圖層名稱，每行一個 layer.name
    V.nailArt.mask.excludeLayerNamesText ??= "";

    // 指定作用 Z 值，多個用逗號或換行分隔
    V.nailArt.mask.zListText ??= "20\n35\n70\n70\n95\n67";

    // 遮罩框位置與大小
    // x / y / w / h 是「每一幀內部」的座標
    // 512x256 雙幀圖時，單幀是 256x256
    V.nailArt.mask.x ??= 140;
    V.nailArt.mask.y ??= 3;
    V.nailArt.mask.w ??= 106;
    V.nailArt.mask.h ??= 180;
    
    // 遮罩內容偏移
    V.nailArt.mask.offsetX ??= 0;
    V.nailArt.mask.offsetY ??= 0;
    
    // 遮罩作用範圍，幀內座標
    V.nailArt.mask.scopeX ??= 128;
    V.nailArt.mask.scopeY ??= 0;
    V.nailArt.mask.scopeW ??= 125;
    V.nailArt.mask.scopeH ??= 192;
    
    // 顯示框：可當裝飾框
    V.nailArt.mask.showFrame ??= false;
    V.nailArt.mask.frameZ ??= 230;
    V.nailArt.mask.borderColor ??= "#ff0000";
    V.nailArt.mask.borderWidth ??= 3;
    V.nailArt.mask.borderRadius ??= 10;

    // 作用範圍預覽框：只供調整，不參與遮罩
    V.nailArt.mask.showScopeFrame ??= false;
    V.nailArt.mask.scopeBorderColor ??= "#00aaff";
    V.nailArt.mask.scopeBorderWidth ??= 2;
    
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
    setTimeout(()=>{initNailArtSystem();}, 0);    
});

// =====================
// 動畫幀開關判斷
// =====================
function nailArtAnimationMode() {
    return V?.nailArt?.disableAnimation ? null : "idle";
}

// =====================
// 遮罩外框圓滑
// =====================
function roundRect(ctx, x, y, w, h, r) {
    r = Math.max(0, Math.min(r, Math.min(w, h) / 2));

    ctx.beginPath();        
    ctx.moveTo(x + r, y);

    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);

    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);

    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);

    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);       
        
    ctx.closePath();
}

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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
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
            animationfn: () => nailArtAnimationMode(),
        },
        
        handMaskFrame: {
            srcfn() {
                const m = V.nailArt?.mask;
                const offsetX = Number(m.offsetX ?? 0);
                const offsetY = Number(m.offsetY ?? 0);

                if (!m?.enabled || (!m.showFrame && !m.showScopeFrame)) {
                    return null;
                }

                const width = 512;
                const height = 256;

                const frameCount = 2;
                const frameW = width / frameCount;

                const canvas = Renderer.createCanvas(width, height);
                const ctx = canvas;

                ctx.clearRect(0, 0, width, height);

                // 作用範圍預覽框：藍色虛線
                if (m.showScopeFrame) {
                    const scopeX = Number(m.scopeX ?? 0);
                    const scopeY = Number(m.scopeY ?? 0);
                    const scopeW = Number(m.scopeW ?? frameW);
                    const scopeH = Number(m.scopeH ?? height);

                    ctx.save();
                    ctx.strokeStyle = m.scopeBorderColor ?? "#00aaff";
                    ctx.lineWidth = Number(m.scopeBorderWidth ?? 1);
                    ctx.setLineDash([4, 3]);

                    for (let i = 0; i < frameCount; i++) {
                        ctx.strokeRect(
                            i * frameW + scopeX,
                            scopeY,
                            scopeW,
                            scopeH
                        );
                    }

                    ctx.restore();
                }

                // 顯示框：紅色實線，可當裝飾框
                if (m.showFrame) {
                    const x = Number(m.x ?? 0);
                    const y = Number(m.y ?? 0);
                    const w = Number(m.w ?? 128);
                    const h = Number(m.h ?? 256);
                    const radius = Number(m.borderRadius ?? 10);

                    ctx.save();
                    ctx.strokeStyle = m.borderColor ?? "#ff0000";
                    ctx.lineWidth = Number(m.borderWidth ?? 1);
                    ctx.lineJoin = "round";
                    ctx.lineCap = "round";
                    ctx.setLineDash([]);

                    for (let i = 0; i < frameCount; i++) {
                        roundRect(
                            ctx,
                            i * frameW + x + offsetX,
                            y + offsetY,
                            w,
                            h,
                            radius
                        );
                        ctx.stroke();
                    }

                    ctx.restore();
                }

                return canvas.canvas;
            },

            showfn() {
                return V.nailArt?.mask?.enabled && V.nailArt?.mask?.showFrame;
            },

            zfn() {
                return V.nailArt?.mask?.frameZ ?? 999;
            },

            animationfn: () => nailArtAnimationMode(),
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

function nailAtrRefresh(useFullRedraw = true, delay = 50, detectAssets = true) {
    setTimeout(async () => {

        if (detectAssets) {
            await detectHandAssets();
        }

        Renderer.CanvasModelCaches = {};
        Renderer.ImageCaches = {};
        Renderer.ImageErrors = {};

        if (useFullRedraw) {
            Renderer.lastAnimation?.stop?.();

            if (typeof Renderer.animateLayersAgain === "function") {
                Renderer.animateLayersAgain();
            } else {
                Renderer.lastAnimation?.invalidateCaches?.();
                Renderer.lastAnimation?.redraw?.();
            }
        } else {
            Renderer.lastAnimation?.invalidateCaches?.();
            Renderer.lastAnimation?.redraw?.();
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
        console.warn(`[nailsArts]HandStyle "${key}" 已存在，將被覆蓋`);
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
        
        const title = document.createElement("div");
        title.innerText = '設定';
        title.style.fontWeight = "bold";
        title.style.fontSize = "16px";
        title.style.color = "#FFD700";
        title.style.marginBottom = "10px";
        container.appendChild(title);
                
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
        
        function createLabel(text, width = 120) {
            const label = document.createElement('div');
            label.textContent = text;
            label.style.width = width + "px";
            label.style.flexShrink = "0";
            label.style.textAlign = "left"; 
            return label;
        }

        let openedAccordion = null;

        function createAccordionSection(title) {
            const wrap = document.createElement('div');
            wrap.style.borderTop = "1px solid #333";
            wrap.style.marginTop = "12px";

            const header = document.createElement('div');
            header.style.cursor = "pointer";
            header.style.padding = "8px 0";
            header.style.fontWeight = "bold";
            header.style.color = "#FFD700";

            const body = document.createElement('div');
            body.style.paddingTop = "6px";
            body.style.display = "none";

            function close() {
                body.style.display = "none";
                header.textContent = "▶ " + title;
            }

            function open() {
                if (openedAccordion && openedAccordion.close !== close) {
                    openedAccordion.close();
                }

                body.style.display = "block";
                header.textContent = "▼ " + title;
                openedAccordion = { close };
            }

            header.addEventListener('click', () => {
                if (body.style.display === "none") {
                    open();
                } else {
                    close();
                    openedAccordion = null;
                }
            });

            close();

            wrap.appendChild(header);
            wrap.appendChild(body);

            return { wrap, body };
        }

        function createNumberInput(value, width = 60) {
            const input = document.createElement('input');
            input.type = "text";
            input.inputMode = "numeric";
            input.pattern = "-?[0-9]*";
            input.value = value;
            input.style.width = width + "px";
            return input;
        }

        // =====================
        // 手部設定
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
        
        handRow.appendChild(handLabel);
        handRow.appendChild(handSelect);
        handSection.appendChild(handRow);
        container.appendChild(handSection);

        // =====================
        // 顯示控制：移到手部設定下
        // =====================
        const displaySection = createSection("顯示控制");  

        const displayRow = createRow();
        displayRow.style.flexWrap = "wrap";
        displayRow.style.gap = "12px";

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
            const itemContainer = document.createElement('div');
            itemContainer.style.display = "flex";
            itemContainer.style.alignItems = "center";
            itemContainer.style.gap = "4px";

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
        // 部件樣式選單：摺疊
        // =====================
        const styleAcc = createAccordionSection("部件樣式");
        const styleSection = styleAcc.body;

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

        container.appendChild(styleAcc.wrap);

        // =====================
        // 重建部件選單並套用 defaults
        // =====================
        function rebuildStyleOptions() {
            const current = setup.handStyles[V.nailArt.hand.style];
            if (!current) return;

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
        // 部件染色：摺疊
        // =====================        
        const colorAcc = createAccordionSection("部件染色");
        const titleSection = colorAcc.body;
                       
        function buildColorSection({
            title,
            colorVar,
            enabledVar
        }) {
            const row = createRow();

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

            titleSection.appendChild(row);
        }
        
        buildColorSection({ title: "指甲染色", colorVar: "color", enabledVar: "colorEnabled" });
        buildColorSection({ title: "美甲染色", colorVar: "artColor", enabledVar: "artColorEnabled" });
        buildColorSection({ title: "美甲2染色", colorVar: "art2Color", enabledVar: "art2ColorEnabled" });
        buildColorSection({ title: "手持物染色", colorVar: "itemAccColor", enabledVar: "itemAccColorEnabled" });
        buildColorSection({ title: "手持物2染色", colorVar: "item2AccColor", enabledVar: "item2AccColorEnabled" });
        buildColorSection({ title: "手持物3染色", colorVar: "item3AccColor", enabledVar: "item3AccColorEnabled" });
        buildColorSection({ title: "手持物4染色", colorVar: "item4AccColor", enabledVar: "item4AccColorEnabled" });
        
        container.appendChild(colorAcc.wrap); 

        // =====================
        // 染色模式：摺疊
        // =====================
        const blendAcc = createAccordionSection("染色模式");
        const blendSection = blendAcc.body;

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

        container.appendChild(blendAcc.wrap);

        // =====================
        // Z 值控制：摺疊 + 整體調整 + 細部調整
        // =====================
        const zAcc = createAccordionSection("圖層 Z 值調整");
        const zSection = zAcc.body;

        const zLayers = [
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
        ];

        const globalZRow = createRow();
        globalZRow.appendChild(createLabel("整體 Z 偏移："));

        const globalZInput = createNumberInput(0);
        const globalZBtn = document.createElement('button');
        globalZBtn.textContent = "套用";

        globalZBtn.addEventListener('click', () => {
            const delta = parseInt(globalZInput.value, 10);
            if (Number.isNaN(delta) || delta === 0) return;

            zLayers.forEach(layer => {
                if (!V.nailArt[layer.key]) return;
                V.nailArt[layer.key].z = Number(V.nailArt[layer.key].z || 0) + delta;
            });

            nailAtrRefresh(false);
            Wikifier.wikifyEval('<<replace "#nailArtContainer">><<handInfoUI>><<handUI>><</replace>>');
        });

        globalZRow.appendChild(globalZInput);
        globalZRow.appendChild(globalZBtn);
        zSection.appendChild(globalZRow);

        const zHint = document.createElement('div');
        zHint.textContent = "整體 Z 偏移會把下方所有圖層一起加減；細部 Z 可單獨調整。";
        zHint.style.color = "#aaa";
        zHint.style.fontSize = "12px";
        zHint.style.marginBottom = "8px";
        zSection.appendChild(zHint);

        zLayers.forEach(layer => {
            const row = createRow();

            const labelDiv = createLabel(layer.label + " Z：");
            row.appendChild(labelDiv);

            const input = createNumberInput(V.nailArt[layer.key]?.z ?? 0);

            input.addEventListener('input', () => {
                const value = parseInt(input.value, 10);
                if (Number.isNaN(value)) return;

                V.nailArt[layer.key].z = value;
                nailAtrRefresh(false);
            });

            row.appendChild(input);
            zSection.appendChild(row);
        });

        container.appendChild(zAcc.wrap);

        this.output.appendChild(container);
    }
});

// =====================
// 縮放管線：支援左右雙幀動畫圖
// =====================
(() => {
    const handLayers = [
        "hand", "handBack",
        "nails", "nailsBack",
        "nailArt", "nailArtBack",
        "nailArt2", "nailArt2Back",
        "handItem", "handItemAcc",
        "handItem2", "handItem2Acc",
        "handItem3", "handItem3Acc",
        "handItem4", "handItem4Acc"
    ];

    const RenderingStepHandScale = {
        name: "handLayerScale",

        condition(layer) {
            return handLayers.includes(layer.name);
        },

        render(image, layer) {
            const scale = Math.max(0.5, Math.min(2, Number(V.nailArt?.scale ?? 1)));

            if (scale === 1) {
                return image;
            }

            const width = image.width;
            const height = image.height;

            const frameCount = 2;
            const frameW = width / frameCount;
            const frameH = height;

            const canvas = Renderer.createCanvas(width, height);
            const ctx = canvas;

            ctx.clearRect(0, 0, width, height);

            /*高品質縮放?
            ctx.imageSmoothingEnabled = true;

            if ("imageSmoothingQuality" in ctx) {
                ctx.imageSmoothingQuality = "high";
            }
            */

            for (let i = 0; i < frameCount; i++) {

                const sx = i * frameW;
                const sy = 0;

                const sw = frameW;
                const sh = frameH;

                const dw = Math.round(frameW * scale);
                const dh = Math.round(frameH * scale);

                /* 每幀以自身中心縮放
                const dx = Math.round(
                    i * frameW + (frameW - dw) / 2
                );

                const dy = Math.round(
                    (frameH - dh) / 2
                );
                */
                // 手動設定放大中心
                const centerOffsetX = Number(V.nailArt?.scaleCenterOffsetX ?? 0);
                const centerOffsetY = Number(V.nailArt?.scaleCenterOffsetY ?? 0);

                const dx = Math.round(
                    i * frameW + (frameW - dw) / 2 + centerOffsetX * scale
                );

                const dy = Math.round(
                    (frameH - dh) / 2 + centerOffsetY * scale
                );

                ctx.drawImage(
                    image,
                    sx, sy, sw, sh,
                    dx, dy, dw, dh
                );
            }

            return canvas.canvas;
        }
    };

    const oldIndex = Renderer.RenderingPipeline.findIndex(
        s => s.name === RenderingStepHandScale.name
    );

    if (oldIndex >= 0) {
        Renderer.RenderingPipeline[oldIndex] = RenderingStepHandScale;
    } else {
        const offsetIndex = Renderer.RenderingPipeline.findIndex(
            s => s.name === "handLayerOffset"
        );

        if (offsetIndex >= 0) {
            Renderer.RenderingPipeline.splice(
                offsetIndex,
                0,
                RenderingStepHandScale
            );
        } else {
            Renderer.RenderingPipeline.push(
                RenderingStepHandScale
            );
        }
    }
})();

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
    Renderer.RenderingPipeline =
        Renderer.RenderingPipeline.filter(
            s => s.name !== "handLayerOffset"
        );

    Renderer.RenderingPipeline.push(RenderingStepHandOffset);
})();

// =====================
// 指定 Z 值遮罩管線
// 只有 Z 值完全符合清單的圖層會被遮罩
// 作用範圍外保持原圖，作用範圍內只保留顯示框內
// =====================
(() => {
    function getMaskZList() {
        return String(V.nailArt?.mask?.zListText ?? "")
            .split(/[\s,，]+/)
            .map(v => v.trim())
            .filter(v => v !== "")
            .map(v => Number(v))
            .filter(v => Number.isFinite(v));
    }
    
    function getExcludeLayerNames() {
        return String(V.nailArt?.mask?.excludeLayerNamesText ?? "")
            .split(/[\n,，]+/)
            .map(v => v.trim())
            .filter(Boolean);
    }

    function isExcludedLayer(layer) {
        const name = String(layer?.name ?? "");
        if (!name) return false;

        return getExcludeLayerNames().includes(name);
    }
    
    function maskDebugEnabled() {
        return V.debug === 1;
    }

    function getLayerZ(layer) {
        let z = null;
        let source = "none";
        let raw = null;
        let error = null;

        // 1. 優先取 zfn()
        if (typeof layer?.zfn === "function") {
            try {
                raw = layer.zfn();
                const num = Number(raw);

                if (Number.isFinite(num)) {
                    z = num;
                    source = "zfn";
                }
            } catch (e) {
                error = e;
            }
        }

        // 2. zfn 無效時，改取 layer.z
        if (z === null && layer?.z !== undefined) {
            raw = layer.z;
            const num = Number(raw);

            if (Number.isFinite(num)) {
                z = num;
                source = "z";
            }
        }

        // 3. debug 只輸出，不影響結果
        if (maskDebugEnabled()) {
            console.log("[nailsArts][getLayerZ]", {
                name: layer?.name ?? "(no name)",
                z,
                source,
                raw,
                error,
                layer
            });
        }

        return z;
    }

    const RenderingStepNailArtZListMask = {
        name: "nailArtZListMask",

        condition(layer) {
            const m = V.nailArt?.mask;            
            
            if (!m?.enabled) return false;
            
            if (maskDebugEnabled()) {
                console.log("[nailsArts][Mask condition layer]", layer)
            };
            
            if (layer.name === "handMaskFrame") return false;

            if (isExcludedLayer(layer)) return false;

            const z = getLayerZ(layer);
            if (z === null) return false;

            return getMaskZList().includes(z);
        },

        render(image, layer) {
            const m = V.nailArt.mask;
            const offsetX = Number(m.offsetX ?? 0);
            const offsetY = Number(m.offsetY ?? 0);

            const width = image.width;
            const height = image.height;

            const frameCount = 2;
            const frameW = width / frameCount;
            const frameH = height;

            const x = Number(m.x ?? 0);
            const y = Number(m.y ?? 0);
            const w = Number(m.w ?? frameW);
            const h = Number(m.h ?? frameH);

            const scopeX = Number(m.scopeX ?? 0);
            const scopeY = Number(m.scopeY ?? 0);
            const scopeW = Number(m.scopeW ?? frameW);
            const scopeH = Number(m.scopeH ?? frameH);

            const canvas = Renderer.createCanvas(width, height);
            const ctx = canvas;

            ctx.clearRect(0, 0, width, height);

            // 先畫完整原圖，讓作用範圍外保持不變
            ctx.drawImage(image, 0, 0);

            for (let i = 0; i < frameCount; i++) {
                const frameX = i * frameW;

                // 清掉作用範圍
                ctx.clearRect(
                    frameX + scopeX,
                    scopeY,
                    scopeW,
                    scopeH
                );

                // 只把「圓角顯示框」內畫回來
                ctx.save();

                roundRect(
                    ctx,
                    frameX + x + offsetX,
                    y + offsetY,
                    w,
                    h,
                    Number(m.borderRadius ?? 10)
                );

                ctx.clip();

                ctx.drawImage(
                    image,
                    frameX, 0, frameW, frameH,
                    frameX + offsetX,
                    offsetY,
                    frameW,
                    frameH
                );

                ctx.restore();
            }

            return canvas.canvas;
        }
    };
    
    // 移除舊的遮罩管線（避免重複註冊）
    Renderer.RenderingPipeline = Renderer.RenderingPipeline.filter(
        s => s.name !== "nailArtZListMask"
    );

    // 放在最後
    Renderer.RenderingPipeline.push(RenderingStepNailArtZListMask);
    
    if (maskDebugEnabled()) {
        console.log(
            "[nailsArts][Pipeline Order]",
            Renderer.RenderingPipeline.map(s => s.name)
        );
    }
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

        const sectionTitle = document.createElement('div');
        sectionTitle.innerText = "手部偏移及縮放設定";
        sectionTitle.style.fontWeight = "bold";
        sectionTitle.style.marginBottom = "6px";
        sectionTitle.style.color = "#FFD700";
        container.appendChild(sectionTitle);

        function createRow(labelText, value, onInput) {
            const row = document.createElement('div');
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.gap = "8px";

            const label = document.createElement('label');
            label.textContent = labelText;

            const input = document.createElement('input');
            input.type = 'range';
            input.min = -100;
            input.max = 100;
            input.step = 1;
            input.value = value;
            input.style.flex = "1";

            const numberInput = document.createElement('input');
            numberInput.type = 'number';
            numberInput.min = -100;
            numberInput.max = 100;
            numberInput.step = 1;
            numberInput.value = value;
            numberInput.style.width = "60px";

            // input：只更新值，不重繪
            input.addEventListener('input', () => {
                numberInput.value = input.value;
                onInput(parseFloat(input.value), false);
            });

            // change：放開滑桿後才重繪
            input.addEventListener('change', () => {
                numberInput.value = input.value;
                onInput(parseFloat(input.value), true);
            });

            numberInput.addEventListener('input', () => {
                input.value = numberInput.value;
                onInput(parseFloat(numberInput.value), false);
            });

            numberInput.addEventListener('change', () => {
                input.value = numberInput.value;
                onInput(parseFloat(numberInput.value), true);
            });

            row.appendChild(label);
            row.appendChild(input);
            row.appendChild(numberInput);

            return row;
        }

        const rowX = createRow("X 偏移: ", V.nailArt.offsetX || 0, (val, redraw) => {
            if (Number.isNaN(val)) return;
            V.nailArt.offsetX = val;

            if (redraw) {
                nailAtrRefresh(true, 50, false);
            }
        });

        const rowY = createRow("Y 偏移: ", V.nailArt.offsetY || 0, (val, redraw) => {
            if (Number.isNaN(val)) return;
            V.nailArt.offsetY = val;

            if (redraw) {
                nailAtrRefresh(true, 50, false);
            }
        });

        const rowScale = createRow("縮放: ", V.nailArt.scale ?? 1, (val, redraw) => {
            if (Number.isNaN(val)) return;
            V.nailArt.scale = Math.max(0.5, Math.min(2, val));

            if (redraw) {
                nailAtrRefresh(true, 50, false);
            }
        });

        rowScale.querySelector('input[type="range"]').min = 0.5;
        rowScale.querySelector('input[type="range"]').max = 2;
        rowScale.querySelector('input[type="range"]').step = 0.05;

        rowScale.querySelector('input[type="number"]').min = 0.5;
        rowScale.querySelector('input[type="number"]').max = 2;
        rowScale.querySelector('input[type="number"]').step = 0.05;

        const animRow = createRow("停用動畫：", "", () => {});
        animRow.innerHTML = "";

        const animLabel = document.createElement('label');
        animLabel.textContent = "縮放相容模式：";

        const animCheckbox = document.createElement('input');
        animCheckbox.type = 'checkbox';
        animCheckbox.checked = V.nailArt.disableAnimation;

        animCheckbox.addEventListener('change', () => {
            V.nailArt.disableAnimation = animCheckbox.checked;
            nailAtrRefresh(true, 50, false);
        });

        const note = document.createElement('span');
        note.style.color = "#aaa";
        note.style.fontSize = "12px";
        note.textContent = "縮放時出現動畫閃爍、邊緣裁切或位置異常，調整縮放中心後仍出現動畫異常，可嘗試啟用。一般情況下建議保持關閉。";

        const centerNote = document.createElement('div');
        centerNote.style.color = "#aaa";
        centerNote.style.fontSize = "12px";
        centerNote.style.lineHeight = "1.4";
        centerNote.textContent = "若縮放後手部位置不正確、邊緣被裁切或動畫顯示異常，可調整縮放中心 X / Y 嘗試修正。";

        const centerXRow = createRow("縮放中心 X: ", V.nailArt.scaleCenterOffsetX ?? 0, (val, redraw) => {
            if (Number.isNaN(val)) return;
            V.nailArt.scaleCenterOffsetX = val;

            if (redraw) {
                nailAtrRefresh(true, 50, false);
            }
        });

        const centerXRange = centerXRow.querySelector('input[type="range"]');
        const centerXNumber = centerXRow.querySelector('input[type="number"]');

        centerXRange.min = -100;
        centerXRange.max = 100;

        centerXNumber.min = -100;
        centerXNumber.max = 100;

        const centerYRow = createRow("縮放中心 Y: ", V.nailArt.scaleCenterOffsetY ?? 0, (val, redraw) => {
            if (Number.isNaN(val)) return;
            V.nailArt.scaleCenterOffsetY = val;

            if (redraw) {
                nailAtrRefresh(true, 50, false);
            }
        });

        const centerYRange = centerYRow.querySelector('input[type="range"]');
        const centerYNumber = centerYRow.querySelector('input[type="number"]');

        centerYRange.min = -100;
        centerYRange.max = 100;

        centerYNumber.min = -100;
        centerYNumber.max = 100;

        animRow.appendChild(animLabel);
        animRow.appendChild(animCheckbox);
        animRow.appendChild(note);

        const resetScaleBtn = document.createElement('button');
        resetScaleBtn.textContent = '重設縮放設定';

        resetScaleBtn.addEventListener('click', () => {
            V.nailArt.scale = 1;
            V.nailArt.scaleCenterOffsetX = 0;
            V.nailArt.scaleCenterOffsetY = 0;
            V.nailArt.disableAnimation = false;

            nailAtrRefresh(true, 50, false);

            Wikifier.wikifyEval(
                '<<replace "#nailArtOffsetContainer">><<handOffsetUI>><</replace>>'
            );
        });

        resetScaleBtn.style.marginTop = "6px";
        resetScaleBtn.style.width = "fit-content";

        const scaleTitle = document.createElement('div');
        scaleTitle.textContent = "縮放設定";
        scaleTitle.style.fontWeight = "bold";
        scaleTitle.style.color = "#FFD700";

        container.appendChild(scaleTitle);

        container.appendChild(rowScale);
        container.appendChild(centerNote);
        container.appendChild(centerXRow);
        container.appendChild(centerYRow);
        container.appendChild(animRow);
        container.appendChild(resetScaleBtn);

        const offsetTitle = document.createElement('div');
        offsetTitle.textContent = "位置偏移";
        offsetTitle.style.fontWeight = "bold";
        offsetTitle.style.color = "#FFD700";
        offsetTitle.style.marginTop = "8px";

        container.appendChild(offsetTitle);

        container.appendChild(rowX);
        container.appendChild(rowY);

        this.output.appendChild(container);
    }
});

// =====================
// 遮罩 UI 宏
// 預設展開第 ① 段，同時只展開一個段落
// 使用 setup.nailArtMaskUIOpenSection 記錄目前展開狀態
// =====================
Macro.add('handMaskUI', {
    handler() {
        initNailArtVars();

        setup.nailArtMaskUIOpenSection ??= "z";

        const m = V.nailArt.mask;

        const container = document.createElement('div');
        container.style.padding = "12px";
        container.style.border = "1px solid #444";
        container.style.background = "#111";
        container.style.marginBottom = "10px";
        container.style.fontSize = "14px";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "8px";

        const title = document.createElement('div');
        title.textContent = "圖層遮罩設定";
        title.style.fontWeight = "bold";
        title.style.color = "#FFD700";
        container.appendChild(title);

        const desc = document.createElement('div');
        desc.style.color = "#aaa";
        desc.style.fontSize = "12px";
        desc.style.lineHeight = "1.5";
        desc.innerHTML =
            "⚠ <span style='color:#ff5555;font-weight:bold;font-size:15px;'>實驗性功能：</span><br>" +
            "此功能仍在測試中，可能導致顯示異常、相容性問題或其他未知錯誤，建議先備份存檔後再使用。<br><br>" +

            "ⓘ <span style='color:#FFD700;font-weight:bold;font-size:15px;'>使用說明</span><br>" +

            "此功能會裁切指定 Z 值的圖層。<br>" +
            "主要用於適配不同人模專用美甲的顯示效果。<br><br>" +

            "使用流程：<br>" +
            "① 指定需要處理的 <b>Z 值</b>。<br>" +
            "② 設定<b>顯示框</b>（紅色實線），只保留框內內容。<br>" +           
            "③ 設定<b>作用範圍</b>（藍色虛線）。<br><br>" +

            "<span style='color:#ff8888'>紅色實線</span>＝顯示框，可作為裝飾框保留顯示。<br>" +
            "<span style='color:#66ccff'>藍色虛線</span>＝作用範圍，只供預覽，不參與裝飾。";
        container.appendChild(desc);

        function refresh() {
            nailAtrRefresh(true, 50, false);
        }

        function rebuildUI() {
            Wikifier.wikifyEval(
                '<<replace "#nailArtMaskContainer">><<handMaskUI>><</replace>>'
            );
        }

        function createRow(labelText) {
            const row = document.createElement('div');
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.gap = "8px";

            const label = document.createElement('label');
            label.textContent = labelText;
            label.style.width = "140px";
            label.style.flexShrink = "0";

            row.appendChild(label);
            return row;
        }

        function createNote(parent, html) {
            const note = document.createElement('div');
            note.style.color = "#aaa";
            note.style.fontSize = "12px";
            note.style.lineHeight = "1.5";
            note.innerHTML = html;
            parent.appendChild(note);
            return note;
        }

        function createAccordionSection(id, titleText) {
            const wrap = document.createElement('div');
            wrap.style.borderTop = "1px solid #333";
            wrap.style.marginTop = "8px";
            wrap.style.paddingTop = "6px";

            const header = document.createElement('div');
            header.style.cursor = "pointer";
            header.style.fontWeight = "bold";
            header.style.color = "#FFD700";
            header.style.padding = "6px 0";

            const opened = setup.nailArtMaskUIOpenSection === id;
            header.textContent = (opened ? "▼ " : "▶ ") + titleText;

            const body = document.createElement('div');
            body.style.display = opened ? "block" : "none";
            body.style.paddingTop = "4px";

            header.addEventListener('click', () => {
                setup.nailArtMaskUIOpenSection =
                    setup.nailArtMaskUIOpenSection === id ? "" : id;

                rebuildUI();
            });

            wrap.appendChild(header);
            wrap.appendChild(body);
            container.appendChild(wrap);

            return body;
        }

        function createNumberRow(parent, labelText, key, min, max, step = 1) {
            const row = createRow(labelText);

            const range = document.createElement('input');
            range.type = "range";
            range.min = min;
            range.max = max;
            range.step = step;
            range.value = m[key];
            range.style.flex = "1";

            const num = document.createElement('input');
            num.type = "number";
            num.min = min;
            num.max = max;
            num.step = step;
            num.value = m[key];
            num.style.width = "70px";

            range.addEventListener('input', () => {
                num.value = range.value;
                m[key] = Number(range.value);
            });

            range.addEventListener('change', () => {
                refresh();
            });

            num.addEventListener('input', () => {
                range.value = num.value;
                m[key] = Number(num.value);
            });

            num.addEventListener('change', () => {
                refresh();
            });

            row.appendChild(range);
            row.appendChild(num);
            parent.appendChild(row);
        }

        // =====================
        // 基本開關：不摺疊
        // =====================
        const basicTitle = document.createElement('div');
        basicTitle.textContent = "基本開關";
        basicTitle.style.fontWeight = "bold";
        basicTitle.style.color = "#FFD700";
        basicTitle.style.marginTop = "8px";
        container.appendChild(basicTitle);

        const enableRow = createRow("啟用遮罩：");
        const enabled = document.createElement('input');
        enabled.type = "checkbox";
        enabled.checked = m.enabled;

        enabled.addEventListener('change', () => {
            m.enabled = enabled.checked;
            refresh();
        });

        enableRow.appendChild(enabled);
        container.appendChild(enableRow);

        const frameRow = createRow("顯示裝飾框：");
        const showFrame = document.createElement('input');
        showFrame.type = "checkbox";
        showFrame.checked = m.showFrame;

        showFrame.addEventListener('change', () => {
            m.showFrame = showFrame.checked;
            refresh();
        });

        frameRow.appendChild(showFrame);
        container.appendChild(frameRow);

        const scopeFrameRow = createRow("顯示作用範圍框：");
        const showScopeFrame = document.createElement('input');
        showScopeFrame.type = "checkbox";
        showScopeFrame.checked = m.showScopeFrame;

        showScopeFrame.addEventListener('change', () => {
            m.showScopeFrame = showScopeFrame.checked;
            refresh();
        });

        scopeFrameRow.appendChild(showScopeFrame);
        container.appendChild(scopeFrameRow);

        createNote(
            container,
            "裝飾框是紅色實線，可保留在畫面上當外框使用。<br>" +
            "作用範圍框是藍色虛線，只用來幫助調整遮罩範圍。"
        );

        // =====================
        // ① Z 值
        // =====================
        const zSection = createAccordionSection("z", "① 要遮罩的 Z 值");

        createNote(
            zSection,
            "只有這裡列出的 Z 值圖層會被遮罩。<br>" +
            "每行一個數字，也可以用逗號分隔。<br>" +
            "例如：<code>20,35,67,70,95</code>"
        );

        const zText = document.createElement('textarea');
        zText.value = m.zListText || "";
        zText.rows = 4;
        zText.style.width = "100%";
        zText.style.boxSizing = "border-box";
        zText.style.background = "#222";
        zText.style.color = "#eee";
        zText.style.border = "1px solid #555";

        zText.addEventListener('change', () => {
            m.zListText = zText.value;
            refresh();
        });

        zSection.appendChild(zText);
        
        createNote(
            zSection,
            "排除清單中的圖層即使 Z 值命中，也不會被遮罩。<br>" +
            "每行一個 layer.name，也可以用逗號分隔。"
        );

        const excludeText = document.createElement('textarea');
        excludeText.value = m.excludeLayerNamesText || "";
        excludeText.rows = 4;
        excludeText.style.width = "100%";
        excludeText.style.boxSizing = "border-box";
        excludeText.style.background = "#222";
        excludeText.style.color = "#eee";
        excludeText.style.border = "1px solid #555";

        excludeText.addEventListener('change', () => {
            m.excludeLayerNamesText = excludeText.value;
            refresh();
        });

        zSection.appendChild(excludeText);

        // =====================
        // ② 顯示框
        // =====================
        const displaySection = createAccordionSection("display", "② 顯示框：保留下來的區域");

        createNote(
            displaySection,
            "紅色實線框內的圖像會被保留。<br>" +
            "紅色框外、但仍在作用範圍內的圖像會被清掉。<br>" +
            "這個框也可以當作裝飾框顯示。"
        );

        createNumberRow(displaySection, "顯示框 X：", "x", -256, 512, 1);
        createNumberRow(displaySection, "顯示框 Y：", "y", -256, 512, 1);
        createNumberRow(displaySection, "顯示框寬 W：", "w", 1, 512, 1);
        createNumberRow(displaySection, "顯示框高 H：", "h", 1, 512, 1);
        createNumberRow(displaySection, "顯示框偏移 X：", "offsetX", -256, 256, 1);
        createNumberRow(displaySection, "顯示框偏移 Y：", "offsetY", -256, 256, 1);

        // =====================
        // ③ 作用範圍
        // =====================
        const scopeSection = createAccordionSection("scope", "③ 作用範圍：允許遮罩處理的區域");

        createNote(
            scopeSection,
            "藍色虛線框代表作用範圍。<br>" +
            "遮罩只會在這個範圍內生效。<br>" +
            "作用範圍外不會被清除，也不會被裁切。<br>" +
            "若只想處理右半邊，通常 X 可設為 128。"
        );

        createNumberRow(scopeSection, "範圍 X：", "scopeX", -256, 512, 1);
        createNumberRow(scopeSection, "範圍 Y：", "scopeY", -256, 512, 1);
        createNumberRow(scopeSection, "範圍寬 W：", "scopeW", 1, 512, 1);
        createNumberRow(scopeSection, "範圍高 H：", "scopeH", 1, 512, 1);

        // =====================
        // ④ 裝飾框設定
        // =====================
        const frameSection = createAccordionSection("frame", "④ 裝飾框設定");

        createNote(
            frameSection,
            "這裡控制紅色顯示框的外觀與 Z 值。<br>" +
            "如果只想預覽裁切位置，不想顯示外框，可以關閉「顯示裝飾框」。"
        );

        createNumberRow(frameSection, "裝飾框 Z：", "frameZ", -1000, 3000, 1);
        createNumberRow(frameSection, "裝飾框線寬：", "borderWidth", 1, 20, 1);
        createNumberRow(frameSection, "裝飾框圓角：", "borderRadius", 0, 50, 1);

        const colorRow = createRow("裝飾框顏色：");
        const colorInput = document.createElement('input');
        colorInput.type = "text";
        colorInput.value = m.borderColor ?? "#ff0000";

        colorInput.addEventListener('change', () => {
            m.borderColor = colorInput.value;
            refresh();
        });

        colorRow.appendChild(colorInput);
        frameSection.appendChild(colorRow);

        if (typeof $ !== "undefined" && $.fn?.spectrum) {
            $(colorInput).spectrum({
                theme: "sp-dark",
                color: m.borderColor ?? "#ff0000",
                showInput: true,
                showPalette: true,
                showInitial: true,
                preferredFormat: "hex",
                chooseText: "選擇",
                cancelText: "取消",
                change: color => {
                    m.borderColor = color.toHexString();
                    refresh();
                }
            });
        }

        // =====================
        // ⑤ 作用範圍預覽框設定
        // =====================
        const previewSection = createAccordionSection("preview", "⑤ 作用範圍預覽框設定");

        createNote(
            previewSection,
            "這裡只控制藍色虛線預覽框。<br>" +
            "它只用來顯示作用範圍，不會影響實際裁切結果，也不適合作為裝飾。"
        );

        createNumberRow(previewSection, "預覽框線寬：", "scopeBorderWidth", 1, 20, 1);

        const scopeColorRow = createRow("預覽框顏色：");
        const scopeColorInput = document.createElement('input');
        scopeColorInput.type = "text";
        scopeColorInput.value = m.scopeBorderColor ?? "#00aaff";

        scopeColorInput.addEventListener('change', () => {
            m.scopeBorderColor = scopeColorInput.value;
            refresh();
        });

        scopeColorRow.appendChild(scopeColorInput);
        previewSection.appendChild(scopeColorRow);

        if (typeof $ !== "undefined" && $.fn?.spectrum) {
            $(scopeColorInput).spectrum({
                theme: "sp-dark",
                color: m.scopeBorderColor ?? "#00aaff",
                showInput: true,
                showPalette: true,
                showInitial: true,
                preferredFormat: "hex",
                chooseText: "選擇",
                cancelText: "取消",
                change: color => {
                    m.scopeBorderColor = color.toHexString();
                    refresh();
                }
            });
        }

        // =====================
        // 快捷
        // =====================
        const presetTitle = document.createElement('div');
        presetTitle.textContent = "快捷設定";
        presetTitle.style.fontWeight = "bold";
        presetTitle.style.color = "#FFD700";
        presetTitle.style.marginTop = "8px";
        container.appendChild(presetTitle);

        const presetRow = document.createElement('div');
        presetRow.style.display = "flex";
        presetRow.style.flexWrap = "wrap";
        presetRow.style.gap = "8px";

        const resetBtn = document.createElement('button');
        resetBtn.textContent = "重設遮罩";
        resetBtn.addEventListener('click', () => {
            m.enabled = false;

            m.zListText = "20\n35\n70\n70\n95\n67";

            m.scopeX = 128;
            m.scopeY = 0;
            m.scopeW = 125;
            m.scopeH = 192;

            m.x = 140;
            m.y = 3;
            m.w = 106;
            m.h = 180;
            m.offsetX = 0;
            m.offsetY = 0;

            m.showFrame = false;
            m.frameZ = 230;
            m.borderColor = "#ff0000";
            m.borderWidth = 3;
            m.borderRadius = 10;

            m.showScopeFrame = false;
            m.scopeBorderColor = "#00aaff";
            m.scopeBorderWidth = 2;

            setup.nailArtMaskUIOpenSection = "z";

            refresh();
            rebuildUI();
        });

        presetRow.appendChild(resetBtn);
        container.appendChild(presetRow);

        this.output.appendChild(container);
    }
});

// =====================
// Canvas Layer Inspector
// 點 Z：加入遮罩 Z 清單
// 點 Name：查看該圖層詳細資料
// =====================
Macro.add("canvasLayerInspector", {
    handler() {
        const container = document.createElement("div");
        container.style.padding = "10px";
        container.style.border = "1px solid #444";
        container.style.background = "#111";
        container.style.color = "#eee";
        container.style.fontSize = "12px";
        container.style.marginBottom = "10px";

        const title = document.createElement("div");
        title.textContent = "Canvas Layer Inspector";
        title.style.fontWeight = "bold";
        title.style.color = "#FFD700";
        title.style.marginBottom = "8px";
        container.appendChild(title);

        const note = document.createElement("div");
        note.innerHTML =
            "顯示目前實際送進畫布的圖層資料。<br>" +
            "點擊 <b style='color:#66ccff'>Z 欄位</b> 可加入 NailArt 遮罩清單。<br>" +
            "點擊 <b style='color:#FFD700'>Name 欄位</b> 可查看圖層詳細資料。";
        note.style.color = "#aaa";
        note.style.lineHeight = "1.4";
        note.style.marginBottom = "8px";
        container.appendChild(note);

        const btnRow = document.createElement("div");
        btnRow.style.display = "flex";
        btnRow.style.flexWrap = "wrap";
        btnRow.style.gap = "8px";
        btnRow.style.marginBottom = "8px";

        const refreshBtn = document.createElement("button");
        refreshBtn.textContent = "重新整理";

        const copyBtn = document.createElement("button");
        copyBtn.textContent = "複製 JSON";

        const onlyHitLabel = document.createElement("label");
        onlyHitLabel.style.display = "flex";
        onlyHitLabel.style.alignItems = "center";
        onlyHitLabel.style.gap = "4px";

        const onlyHitCheckbox = document.createElement("input");
        onlyHitCheckbox.type = "checkbox";

        onlyHitLabel.appendChild(onlyHitCheckbox);
        onlyHitLabel.appendChild(document.createTextNode("只顯示命中遮罩 Z 的圖層"));

        btnRow.appendChild(refreshBtn);
        btnRow.appendChild(copyBtn);
        btnRow.appendChild(onlyHitLabel);
        container.appendChild(btnRow);

        const detailBox = document.createElement("pre");
        detailBox.style.display = "none";
        detailBox.style.whiteSpace = "pre-wrap";
        detailBox.style.wordBreak = "break-all";
        detailBox.style.background = "#050505";
        detailBox.style.border = "1px solid #333";
        detailBox.style.padding = "8px";
        detailBox.style.maxHeight = "260px";
        detailBox.style.overflow = "auto";
        detailBox.style.marginBottom = "8px";
        container.appendChild(detailBox);

        const output = document.createElement("div");
        output.style.maxHeight = "520px";
        output.style.overflow = "auto";
        output.style.border = "1px solid #333";
        output.style.background = "#080808";
        output.style.padding = "6px";
        container.appendChild(output);

        function getMaskZList() {
            return String(V.nailArt?.mask?.zListText ?? "")
                .split(/[\s,，]+/)
                .map(v => v.trim())
                .filter(v => v !== "")
                .map(v => Number(v))
                .filter(v => Number.isFinite(v));
        }

        function setMaskZList(list) {
            V.nailArt.mask.zListText = [...new Set(
                list
                    .map(v => Number(v))
                    .filter(v => Number.isFinite(v))
            )].join("\n");
        }

        function addZToMaskList(z) {
            if (!Number.isFinite(z)) return false;

            const list = getMaskZList();

            if (!list.includes(z)) {
                list.push(z);
                setMaskZList(list);
                return true;
            }

            return false;
        }

        function getLayerZ(layer) {
            if (typeof layer?.zfn === "function") {
                try {
                    const z = Number(layer.zfn());
                    if (Number.isFinite(z)) return z;
                } catch (e) {}
            }

            if (layer?.z !== undefined) {
                const z = Number(layer.z);
                if (Number.isFinite(z)) return z;
            }

            return null;
        }

        function getLayerSrc(layer) {
            if (typeof layer?.src === "string") {
                return layer.src.split("#")[0];
            }

            if (typeof layer?.srcfn === "function") {
                try {
                    const src = layer.srcfn();
                    if (typeof src === "string") return src.split("#")[0];
                } catch (e) {}
            }

            return "";
        }

        function getLayerData() {
            const layers = Renderer.lastCall?.[1] || [];
            const zList = getMaskZList();

            return layers.map((layer, index) => {
                const z = getLayerZ(layer);
                const src = getLayerSrc(layer);
                const hit = z !== null && zList.includes(z);

                return {
                    index,
                    maskHit: hit,
                    name: layer?.name || "",
                    z,
                    show: layer?.show,
                    animation: layer?.animation ?? "",
                    alpha: layer?.alpha ?? "",
                    blend: layer?.blendMode ?? "",
                    width: layer?.width ?? "",
                    height: layer?.height ?? "",
                    src,
                    raw: layer
                };
            });
        }

        function showLayerDetail(row) {
            detailBox.style.display = "block";
            detailBox.textContent = JSON.stringify({
                index: row.index,
                maskHit: row.maskHit,
                name: row.name || "(無名)",
                z: row.z,
                show: row.show,
                animation: row.animation,
                alpha: row.alpha,
                blend: row.blend,
                width: row.width,
                height: row.height,
                src: row.src,
                keys: row.raw ? Object.keys(row.raw) : []
            }, null, 2);
        }

        function render() {
            output.innerHTML = "";

            let data = getLayerData();

            if (onlyHitCheckbox.checked) {
                data = data.filter(row => row.maskHit);
            }

            if (!data.length) {
                output.textContent = "沒有圖層資料。請先讓角色圖重繪一次。";
                return;
            }

            const table = document.createElement("table");
            table.style.width = "100%";
            table.style.borderCollapse = "collapse";

            const headers = [
                "#",
                "Mask",
                "Name",
                "Z",
                "Show",
                "Anim",
                "Alpha",
                "Blend",
                "Size",
                "Src"
            ];

            const thead = document.createElement("thead");
            const headRow = document.createElement("tr");

            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                th.style.position = "sticky";
                th.style.top = "0";
                th.style.background = "#111";
                th.style.color = "#FFD700";
                th.style.borderBottom = "1px solid #666";
                th.style.padding = "4px";
                th.style.textAlign = "left";
                th.style.whiteSpace = "nowrap";
                headRow.appendChild(th);
            });

            thead.appendChild(headRow);
            table.appendChild(thead);

            const tbody = document.createElement("tbody");

            data.forEach(row => {
                const tr = document.createElement("tr");

                if (row.maskHit) {
                    tr.style.background = "rgba(80, 255, 80, 0.12)";
                }

                const values = [
                    row.index,
                    row.maskHit ? "✓" : "",
                    row.name || "(無名)",
                    row.z ?? "",
                    row.show,
                    row.animation,
                    row.alpha,
                    row.blend,
                    `${row.width}×${row.height}`,
                    row.src
                ];

                values.forEach((value, i) => {
                    const td = document.createElement("td");
                    td.textContent = String(value);
                    td.style.borderBottom = "1px solid #222";
                    td.style.padding = "4px";
                    td.style.verticalAlign = "top";
                    td.style.wordBreak = "break-all";

                    // Mask 欄
                    if (i === 1 && row.maskHit) {
                        td.style.color = "#7CFF7C";
                        td.style.fontWeight = "bold";
                    }

                    // Name 欄：點擊查看詳細資料 + 複製圖層名稱
                    if (i === 2) {
                        td.style.color = "#FFD700";
                        td.style.cursor = "pointer";
                        td.title = "點擊查看詳細資料，並複製圖層名稱";

                        td.addEventListener("click", e => {
                            e.stopPropagation();

                            showLayerDetail(row);

                            const name = row.name || "";
                            if (!name) return;

                            if (typeof copyToClipboard === "function") {
                                const textarea = document.createElement("textarea");
                                textarea.value = name;
                                textarea.style.display = "none";

                                container.appendChild(textarea);
                                copyToClipboard(textarea, name);
                                textarea.remove();
                            } else if (navigator.clipboard?.writeText) {
                                navigator.clipboard.writeText(name);
                            }

                            const oldText = td.textContent;
                            td.textContent = `${name} ✓`;

                            setTimeout(() => {
                                td.textContent = oldText;
                            }, 800);
                        });
                    }

                    // Z 欄：點擊加入遮罩清單
                    if (i === 3) {
                        if (row.z !== null) {
                            td.style.cursor = row.maskHit ? "default" : "pointer";
                            td.style.color = row.maskHit ? "#7CFF7C" : "#66ccff";
                            td.style.fontWeight = "bold";
                            td.title = row.maskHit
                                ? "此 Z 已在遮罩清單"
                                : `點擊加入 Z=${row.z}`;

                            td.addEventListener("click", e => {
                                e.stopPropagation();

                                if (row.maskHit) return;

                                const added = addZToMaskList(row.z);

                                if (added) {
                                    nailAtrRefresh(true, 50, false);
                                    render();
                                }
                            });
                        }
                    }

                    tr.appendChild(td);
                });

                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            output.appendChild(table);
        }

        refreshBtn.addEventListener("click", render);
        onlyHitCheckbox.addEventListener("change", render);

        copyBtn.addEventListener("click", () => {
            const json = JSON.stringify(
                getLayerData().map(row => {
                    const copy = { ...row };
                    delete copy.raw;
                    return copy;
                }),
                null,
                2
            );

            if (typeof copyToClipboard === "function") {
                const textarea = document.createElement("textarea");
                textarea.value = json;
                container.appendChild(textarea);
                copyToClipboard(textarea, json);
                textarea.remove();
            } else if (navigator.clipboard) {
                navigator.clipboard.writeText(json);
            }

            copyBtn.textContent = "已複製";
            setTimeout(() => {
                copyBtn.textContent = "複製 JSON";
            }, 1000);
        });

        this.output.appendChild(container);

        render();
    }
});