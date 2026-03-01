// ===== 註冊老師們提供整合的美甲 =====
// goose模用

registerHandStyle("gooseTest", {
    name: "goose模美甲",
    nails: { nails1: "长甲", nails2: "中长甲", nails3: "短甲", },
    art: { 
        nailArt1: '浅色贴钻（长甲适用）', 
        nailArt2: '浅色贴钻（中长甲适用）', 
        nailArt3: '浅色贴钻（短甲适用）'
    },
    art2: {
        nailArt1: '深色贴钻（长甲适用）', 
        nailArt2: '深色贴钻（中长甲适用）', 
        nailArt3: '深色贴钻（短甲适用）'
    },
    item: { item: "绷带"},
    item2: { itemB1: "宝石戒指", itemB2: "简易戒指", itemB3: "锁链戒指"},
    defaults: {
        hand: { show: true, z: 260 },
        nails: { show: true, style: 'nails1', colorEnabled: true, color: "#fdbfd4", z: 270, blendMode: "hard-light" },
        art: { show: true, style: 'nailArt1', colorEnabled: true, color: "#baffff", z: 280, blendMode: "hard-light" },
        art2: { show: false, style: null, colorEnabled: false, color: "#afffbe", z: 285, blendMode: "hard-light" },
        item: { show: true, z: 290 },
        itemAcc: { colorEnabled: false, color: "#ffffff", blendMode: "hard-light" },
        item2: { show: true, style: 'itemB3', z: 295 },
        item2Acc: { colorEnabled: false, color: "#ffffff", blendMode: "hard-light" }
    },
    metadata: {
        author: "null",
        version: "1.0",
        tags: ["goose"],
        description: 'goose模美甲。',
        preview: 'preview'
    }    
})

registerHandStyle("gooseRabbitDi", {
    name: "兔兔g模甲（低）",
    nails: { 
		nails1: "粉圓甲", 
		nails2: "粉尖甲", 
		nails3: "粉平甲",
		nails4: "染色圓甲",
		nails5: "染色尖甲",
		nails6: "染色平甲",
	},
    art: { 
        nailArt1: '珍珠贴片',
        nailArt2: '跳色（125）', 
        nailArt3: '跳色（24）', 
        nailArt4: '跳色（34）', 
        nailArt5: '法式', 
        nailArt6: '格紋', 
        nailArt7: '果凍',
        nailArt8: '漸層'	,
        nailArt9: '-以下適用尖甲-', 
        nailArt10: '尖｜跳色（125）', 
        nailArt11: '尖｜跳色（24）', 
        nailArt12: '尖｜跳色（34）', 
        nailArt13: '尖｜果凍',
        nailArt14: '尖｜漸層',	
        nailArt15: '-以下適用平甲-',
        nailArt16: '平｜跳色（125）', 
        nailArt17: '平｜跳色（24）', 
        nailArt18: '平｜跳色（34）',
        nailArt19: '平｜法式',  
        nailArt20: '平｜果凍'	
    },
    art2: {
        nailArt1: '珍珠贴片',
        nailArt2: '跳色（125）', 
        nailArt3: '跳色（24）', 
        nailArt4: '跳色（34）', 
        nailArt5: '法式', 
        nailArt6: '格紋', 
        nailArt7: '果凍',
        nailArt8: '漸層'	,
        nailArt9: '-以下適用尖甲-', 
        nailArt10: '尖｜跳色（125）', 
        nailArt11: '尖｜跳色（24）', 
        nailArt12: '尖｜跳色（34）', 
        nailArt13: '尖｜果凍',
        nailArt14: '尖｜漸層',	
        nailArt15: '-以下適用平甲-',
        nailArt16: '平｜跳色（125）', 
        nailArt17: '平｜跳色（24）', 
        nailArt18: '平｜跳色（34）',
        nailArt19: '平｜法式',  
        nailArt20: '平｜果凍'	
    },
    item: { 
		item: "袖子", 
		item1: "露指手套", 
		item2: "绷带"
	},
    item2: { 
		itemB0: "染色手套", 
		itemB1: "白手套", 
		itemB2: "黑手套", 
		itemB3: "红宝石扳指", 
		itemB4: "红宝石戒指", 
		itemB5: "金环戒", 
		itemB6: "钻戒", 
		itemB7: "蕾絲指環（可染）", 
		itemB8: "芭蕾綁線（指）", 
		itemB9: "縫線（指）",
	},
    item3: { 
		itemB0: "染色手套", 
		itemB1: "白手套", 
		itemB2: "黑手套", 
		itemB3: "红宝石扳指", 
		itemB4: "红宝石戒指", 
		itemB5: "金环戒", 
		itemB6: "钻戒", 
		itemB7: "蕾絲指環（可染）", 
		itemB8: "芭蕾綁線（指）", 
		itemB9: "縫線（指）",
	},
    defaults: {
        hand: { show: true, z: 260 }, 
        nails: { show: true, style: 'nails1', colorEnabled: false, color: "#ff6699", z: 280, blendMode: "hard-light" },  
        art: { show: false, style: null, colorEnabled: true, color: "#00A3A3", z: 285, blendMode: "hard-light" },
        art2: { show: false, style: null, colorEnabled: true, color: "#ffffff", z: 290, blendMode: "hard-light" },
        item: { show: true, z: 270 }, 
        itemAcc: { colorEnabled: false, color: "#ffffff", blendMode: "hard-light" },
        item2: { show: true, style: 'itemB3', z: 295 },
        item2Acc: { colorEnabled: true, color: "#8affea", blendMode: "hard-light" },
        item3: { show: true, style: 'itemB7', z: 300 },
        item3Acc: { colorEnabled: true, color: "#00A3A3", blendMode: "hard-light" },
    },
    metadata: {
        author: "兔子 猫鱼",
        version: "2.0",
        tags: ["goose"],
        description: 'goose模美甲展示。感谢猫鱼老师绘制部分美甲图案与装饰物！',
        preview: 'preview'
    }    
})

registerHandStyle("gooseRabbitGao", {
    name: "兔兔g模甲（高）",
    nails: { 
		nails1: "粉圓甲", 
		nails2: "粉尖甲", 
		nails3: "粉平甲",
		nails4: "染色圓甲",
		nails5: "染色尖甲",
		nails6: "染色平甲",
	},
    art: { 
        nailArt1: '珍珠贴片',
        nailArt2: '跳色（125）', 
        nailArt3: '跳色（24）', 
        nailArt4: '跳色（34）', 
        nailArt5: '法式', 
        nailArt6: '格紋', 
        nailArt7: '果凍',
        nailArt8: '漸層',	
        nailArt9: '-以下適用尖甲-', 
        nailArt10: '尖｜跳色（125）', 
        nailArt11: '尖｜跳色（24）', 
        nailArt12: '尖｜跳色（34）', 
        nailArt13: '尖｜果凍',
        nailArt14: '尖｜漸層',	
        nailArt15: '-以下適用平甲-',
        nailArt16: '平｜跳色（125）', 
        nailArt17: '平｜跳色（24）', 
        nailArt18: '平｜跳色（34）',
        nailArt19: '平｜法式',  
        nailArt20: '平｜果凍'
    },
    art2: {
        nailArt1: '珍珠贴片',
        nailArt2: '跳色（125）', 
        nailArt3: '跳色（24）', 
        nailArt4: '跳色（34）', 
        nailArt5: '法式', 
        nailArt6: '格紋', 
        nailArt7: '果凍',
        nailArt8: '漸層',	
        nailArt9: '-以下適用尖甲-', 
        nailArt10: '尖｜跳色（125）', 
        nailArt11: '尖｜跳色（24）', 
        nailArt12: '尖｜跳色（34）', 
        nailArt13: '尖｜果凍',
        nailArt14: '尖｜漸層',	
        nailArt15: '-以下適用平甲-',
        nailArt16: '平｜跳色（125）', 
        nailArt17: '平｜跳色（24）', 
        nailArt18: '平｜跳色（34）',
        nailArt19: '平｜法式',  
        nailArt20: '平｜果凍'
    },
    item: { 
        item: "袖子", 
        item1: "半透明花边袖", 
        item2: "染色花边袖", 
        item3: "露指手套", 
        item4: "绷带", 
        item5: "衬衫袖", 
        item6: "血痕", 
        item7: "桃花手链", 
        item8: "染色大肠发圈",
        itemB2: "萬用袖子（可染）", 
		itemB3: "萬用萌袖（可染）", 
		itemB4: "蕾絲指環（可染）",
		itemB5: "芭蕾綁線（腕）", 
		itemB6: "芭蕾綁線（指）", 
		itemB7: "縫線（腕）",
		itemB8: "縫線（指）",
		itemB9: "球形關節" 
    },
    item2:  { 
        item: "袖子", 
        item1: "半透明花边袖", 
        item2: "染色花边袖", 
        item3: "露指手套", 
        item4: "绷带", 
        item5: "衬衫袖", 
        item6: "血痕", 
        item7: "桃花手链", 
        item8: "染色大肠发圈",
        itemB2: "萬用袖子（可染）", 
		itemB3: "萬用萌袖（可染）", 
		itemB4: "蕾絲指環（可染）",
		itemB5: "芭蕾綁線（腕）", 
		itemB6: "芭蕾綁線（指）", 
		itemB7: "縫線（腕）",
		itemB8: "縫線（指）",
		itemB9: "球形關節" 
    },
    item3: { 
		itemB0: "染色手套", 
		itemB1: "白手套", 
		itemB2: "黑手套", 
		itemB3: "红宝石扳指", 
		itemB4: "红宝石戒指", 
		itemB5: "金环戒", 
		itemB6: "钻戒",
		itemB7: "芭蕾綁線（指）",
		itemB8: "縫線（指）"
	},
    item4: { 
		itemB0: "染色手套", 
		itemB1: "白手套", 
		itemB2: "黑手套", 
		itemB3: "红宝石扳指", 
		itemB4: "红宝石戒指", 
		itemB5: "金环戒", 
		itemB6: "钻戒",
		itemB7: "芭蕾綁線（指）",
		itemB8: "縫線（指）"
},
    defaults: {
        hand: { show: true, z: 260 }, 
        nails: { show: true, style: 'nails1', colorEnabled: true, color: "#ff6699", z: 280, blendMode: "hard-light" },  
        art: { show: false, style: null, colorEnabled: true, color: "#00A3A3", z: 285, blendMode: "hard-light" },
        art2: { show: false, style: null, colorEnabled: true, color: "#ffffff", z: 290, blendMode: "hard-light" },
        item: { show: true, z: 270 }, 
        itemAcc: { colorEnabled: true, color: "#8affea", blendMode: "hard-light" },
        item2: { show: true, style: 'item8', z: 280 },
        item2Acc: { colorEnabled: true, color: "#8affea", blendMode: "hard-light" },
        item3: { show: true, style: 'itemB5', z: 300 },
        item3Acc: { colorEnabled: true, color: "#afdbff", blendMode: "hard-light" },
        item4: { show: true, style: 'itemB3', z: 305 },
        item4Acc: { colorEnabled: true, color: "#afdbff", blendMode: "hard-light" }
    },
    metadata: {
        author: "兔子 猫鱼",
        version: "2.0",
        tags: ["goose"],
        description: 'goose模美甲展示。感谢猫鱼老师绘制部分美甲图案与装饰物！',
        preview: 'preview'
    }    
})

registerHandStyle("goooseHeart", {
    name: "goose模比心手",
    defaults: {
        hand: { show: true, z: 260 },
    },
    metadata: {
        author: "null",
        version: "1.0",
        tags: ["goose"],
        description: 'goose模比心手。',
        preview: 'preview'
    }    
})

registerHandStyle("goooseV", {
    name: "goose模V字手",
    nails: { nails1: "哥特风指甲", nails2: "染色指甲"},
    defaults: {
        hand: { show: true, z: 260 },
        nails: { show: true, style: 'nails1', colorEnabled: true, color: "#ff6699", z: 270, blendMode: "hard-light" },
    },
    metadata: {
        author: "null",
        version: "1.0",
        tags: ["goose"],
        description: 'goose模V字手。',
        preview: 'preview'
    }    
})

registerHandStyle("gooseBang", {
    name: "goose模手枪手",
    defaults: {
        hand: { show: true, z: 260 },
    },
    metadata: {
        author: "null",
        version: "1.0",
        tags: ["goose"],
        description: 'goose模手枪手。',
        preview: 'preview'
    }    
})

registerHandStyle("gooseFace", {
    name: "goose模戳脸手",
    defaults: {
        hand: { show: true, z: 260 },    
    },
    metadata: {
        author: "null",
        version: "1.0",
        tags: ["goose"],
        description: 'goose模戳脸手。',
        preview: 'preview'
    }    
})

registerHandStyle("gooseJian", {
    name: "goose模剪刀手",
    defaults: {
        hand: { show: true, z: 260 },    
    },
    metadata: {
        author: "null",
        version: "1.0",
        tags: ["goose"],
        description: 'goose模剪刀手。',
        preview: 'preview'
    }    
})

/* ========================================================================
   HandStyle 註冊說明 — nss
   ========================================================================

   本區說明第三方開發者如何新增手型樣式，
   以及註冊代碼與資源檔案的對應方式。

   ========================================================================
   一、基本註冊格式
   ========================================================================

   registerHandStyle("樣式ID", {
       name: "顯示名稱",

       nails: { key: "顯示名稱", ... },
       art:   { key: "顯示名稱", ... },
       art2:   { key: "顯示名稱", ... },
       item:  { key: "顯示名稱", ... },
       item2: { key: "顯示名稱", ... },

       defaults: {
           hand: {},
           nails: {},
           art: {},
           art2: {},
           item: {},
           itemAcc: {},
           item2: {},
           item2Acc: {}
       },
       metadata: {          
           author: "作者名",(可選)
           version: "版本號",(可選)
           tags: [],(目前未使用，可為 null)
           description: "一點說明",(可選)
           preview: <string> (預覽圖檔名，不含副檔名)(可選)
       }
   });

   - 樣式ID：
       唯一識別碼，用於切換樣式。
       例如："nss"

   - name：
       UI 顯示名稱。

   - nails / art / art2 / item / item2：
       可選樣式清單。
       key 會對應圖片檔名。
       value 為 UI 顯示文字。


   ========================================================================
   二、本手型註冊內容
   ========================================================================

   ID:
       "nss"

   顯示名稱:
       "nss手"

   可選指甲樣式:
       nails1 → Mean甲
       nails2 → 半透短圓
       nails3 → 長方
       nails4 → 短圓

   可選裝飾樣式:
       nailArt1 → 心
       nailArt2 → 短圓法式
       nailArt3 → 透短法式
       nailArt4 → 長法式
       nailArt5 → 方
       nailArt6 → 亮晶晶
       ...
       
    可選裝飾2樣式: (同上)    

   可選飾品:
       item → 小飾品

   可選第二物件:
       itemB1 → 袖子(可染色)
       itemB2 → 袖子(不可染色)


   ========================================================================
   三、defaults 屬性完整說明
   ========================================================================

   defaults 用於設定此手型的「初始狀態」。

   若未設定某個屬性，將使用系統目前值。

   --------------------------------------------------------
   通用可用屬性
   --------------------------------------------------------

   show (Boolean)
       是否顯示該圖層
       預設值：true

   z (Number)
       圖層堆疊順序
       數值越大越上層

   style (String)
       預設套用的樣式 key
       必須為該分類已註冊的 key 名稱
       若未設定則不改變目前樣式

   colorEnabled (Boolean)
       是否允許染色
       預設值：false

   color (String, Hex)
       預設顏色
       格式："#RRGGBB"

   blendMode (String)
       染色混合模式
       預設值："normal"

   --------------------------------------------------------
   各圖層說明
   --------------------------------------------------------

   hand
       手部底圖
       通常只設定：
           show
           z

   nails
       指甲圖層
       可設定：
           show
           style
           colorEnabled
           color
           z
           blendMode

   art
       第一裝飾圖層
       可設定：
           show
           style
           colorEnabled
           color
           z
           blendMode
   art2
       第二裝飾圖層
       可設定：
           show
           style
           colorEnabled
           color
           z
           blendMode        

   item
       第一手部物件
       通常設定：
           show
           style
           z

   itemAcc
       第一物件附加層
       可設定：
           colorEnabled
           color
           blendMode

   item2
       第二手部物件
       可設定：
           show
           style
           z

   item2Acc
       第二物件附加層
       可設定：
           colorEnabled
           color
           blendMode


   --------------------------------------------------------
   style 預設行為說明
   --------------------------------------------------------

   style 僅在 defaults 中有設定時才會套用。

   若未設定 style：
       不會改變目前已選樣式。

   style 值必須為該分類已註冊的 key，
   否則不會顯示對應圖片。

   範例：

       nails: { style: "nails3" }

   表示預設使用 nails3。


   ========================================================================
   四、本手型 defaults 實際設定
   ========================================================================

   hand:
       show: true
       z: 260

   nails:
       show: true
       style: 'nails4'
       colorEnabled: true
       color: "#ff6699"
       z: 270
       blendMode: "hard-light"

   art:
       show: true
       style: 'nailArt1'
       colorEnabled: true
       color: "#00ffff"
       z: 280
       blendMode: "hard-light"
       
   art2:
       show: false
       style: 'nailArt1'
       colorEnabled: false 
       color: "#00ffff"
       z: 280
       blendMode: "hard-light"    

   item:
       show: true
       z: 290

   itemAcc:
       colorEnabled: false
       color: "#ffffff"
       blendMode: "hard-light"

   item2:
       show: true
       style: "itemB1"
       z: 285

   item2Acc:
       colorEnabled: true
       color: "#ffffff"
       blendMode: "hard-light"


   ========================================================================
   五、blendMode 可選值
   ========================================================================

   'normal'
   'multiply'
   'screen'
   'overlay'
   'lighten'
   'darken'
   'color-dodge'
   'color-burn'
   'hard-light'
   'soft-light'
   'difference'
   'exclusion'
   'hue'
   'saturation'
   'color'
   'luminosity'


   ========================================================================
   六、圖層順序 (z-index)
   ========================================================================

   數值越大越上層。

   本例排序：

       260 hand
       270 nails
       280 art
       285 art2
       285 item2
       290 item


   ========================================================================
   七、資源檔案與代碼對應關係
   ========================================================================

   本例資料夾結構：

       /img/hands/nss/

           hand.png
           handBack.png

           /nails/
               nails1.png
               nails2.png
               nails3.png
               nails4.png
               nails1Back.png
               nails2Back.png
               ...

           /art/
               nailArt1.png
               nailArt2.png
               nailArt1Back.png
               nailArt2Back.png
               ...

           /item/
               item.png
               itemAcc.png

           /item2/
               itemB1.png
               itemB2.png
               itemB1Acc.png
               ...


   對應規則：

   1. 樣式ID
        "nss"
        → 對應資料夾：
          /img/hands/nss/

   2. key 對應圖片名稱

        nails1 → nails1.png
                 nails1Back.png
                 
        nailArt1 → nailArt1.png
                   nailArt1Back.png
                   
        item → item.png
                itemAcc.png
                
        itemB1 → itemB1.png
                  itemB1Acc.png
                    

   3. 最終圖片路徑格式

        /img/hands/{樣式ID}/{分類}/{key}.png

   範例：

        /img/hands/nss/nails/nails1.png
        /img/hands/nss/art/nailArt1.png
        /img/hands/nss/item/item.png
        /img/hands/nss/item2/itemB1.png


   ========================================================================
   八、第三方新增手型流程
   ========================================================================

   步驟 1：
       建立資料夾：
       /img/hands/你的ID/

   步驟 2：
       放入圖片檔案（檔名需與 key 相同）

   步驟 3：
       呼叫 registerHandStyle()

   步驟 4：
       設定 defaults 控制顯示、顏色與圖層順序(可選)
       
   步驟 5：    
       設定 metadata(可選)
   
   步驟 6：         
       檢查各圖層圖片是否都有準備
         * hand/nails/art 需要準備Back圖(不使用請準備透明圖)
         * item/item2 需準備Acc圖(不使用請準備透明圖)
       
   ======================================================================== */