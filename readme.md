=========================================
   註冊美甲詳細說明 (registerHandStyle)
   =========================================
   格式：
   ```
   registerHandStyle("樣式ID", {
       name: "顯示名稱",

       nails: { key: "顯示名稱", ... },
       art:   { key: "顯示名稱", ... },
       art2:   { key: "顯示名稱", ... },
       item:  { key: "顯示名稱", ... },
       item2: { key: "顯示名稱", ... },
       ...(item3{}/item4{})

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
   ```
   功能：
   - 註冊角色手部樣式，每組樣式包含：
       1. 手部 (hand)：整隻手底圖
       2. 指甲 (nails)：可染色
       3. 美甲裝飾 (art)：可染色
       4. 手持物 (item)：不可染色
       5. 手持物附加染色 (itemAcc)：可染色

   - 可附帶 預設，切換手部樣式時自動套用：
       - 顯示與否 (show)
       - 預設樣式 (style)
       - 染色啟用與顏色 (colorEnabled / color)
       - 染色模式 (blendMode)
       - z 座標 (z)

   =========================================
   注意事項：
   1. 指甲 (nails) 與美甲 (art) 可染色
   2. item 本身不可染色
   3. itemAcc 可染色，僅影響附加層
   4. defaults 可省略未使用值，系統保留現有設定或使用預設值
   5. key 與 internalValue 建議使用英文或數字，避免中文或特殊符號
   6. 註冊js文件名稱與路徑建議：
   ```
   scripts/<xxx>_nailArtRegist.js 
   xxx為任意字串
   ```

   =========================================
   registerHandStyle(key, config) 參數說明：

   1. key (string)
      - 資料夾名稱，對應手部樣式資源資料夾 img/hands/<key>/
      - 建議簡短英文或數字，避免中文、空格或特殊符號

   2. config.name (string)
      - 手部樣式在 UI 下拉選單顯示名稱
      - 例如："玫瑰套裝"

   3. config.nails / config.art(art2) / config.item(item2) (object)
      - 格式：{ internalValue: "UI文字" }
      - internalValue 對應資源檔名，不含副檔名
      - 對應資源位置：
          - hand → img/hands/<key>/hands.png
          - handBack → img/hands/<key>/handsBack.png
          - nails → img/hands/<key>/nails/<internalValue>.png
          - nailsBack → img/hands/<key>/nails/<internalValue>Back.png
          - art(art2)   → img/hands/<key>/nailArt/<internalValue>.png
          - artBack(art2Back) → img/hands/<key>/nailArt/<internalValue>Back.png
          - item(item2)  → img/hands/<key>/item/<internalValue>.png
          - itemAcc(item2Acc) → img/hands/<key>/item/<internalValue>Acc.png

   4. config.defaults (object, 選填)
      - 切換手部樣式時套用的預設設定
      - 可設定以下屬性：
   ```
        hand: {
          show?: boolean        // 是否顯示手部底圖，true/false
          z?: number            // Z 座標，用於控制疊放順序
        }

        nails: {
          show?: boolean        // 是否顯示指甲
          style?: string         // 預設套用的 nails key
          colorEnabled?: boolean// 是否啟用染色
          color?: string        // HEX 或 rgba 顏色值，例如 "#ff99aa"
          z?: number            // Z 座標
          blendMode?: string    // 染色混合模式，例如 "multiply", "overlay", "screen"
        }

        art: {
          show?: boolean
          style?: string
          colorEnabled?: boolean
          color?: string
          z?: number
          blendMode?: string
        }
        
        art2: {} (同art)

        item: {
          show?: boolean
          style?: string
          z?: number
        }

        itemAcc: {
          colorEnabled?: boolean
          color?: string
          blendMode?: string
        }        
        item2: {}, (同item)
        item2Acc:{} (同itemAcc)
        
        item3: {}, (同item)
        item3Acc:{} (同itemAcc)
        
        item4: {}, (同item)
        item4Acc:{} (同itemAcc)
   ```
   - 未設定的值會保留系統現有設定或使用預設值
      - style 僅在 defaults 中有設定時才會套用
        - 若未設定 style，系統不會改變目前已選樣式
        - style 值必須為該分類已註冊的 internalValue
        - 若指定不存在的 key，該圖層將無對應圖片顯示
        
   5. config.metadata: (object, 選填) 
   ```
    ｛
        author: string
        version: string,
        tags: object,
        description: string,
        preview: string → img/hands/<key>/<internalValue>.png
     ｝  
   ```  
   - 未設定的欄位將不顯示
   - 預覽圖副檔名為png  
            
   =========================================
   資源目錄結構：
   ```
   img/
   └── hands/
       ├── <key>/                # 對應 registerHandStyle key
           ├── hands.png          # 手部圖
           ├── handsBack.png      # 手部圖（手持物遮擋）
           └── <internalValue>.png      # 預覽圖(可選)
       ├── <nails/ nailArt/ nailArt2>/    
           ├── <internalValue>.png      # nails / art / item 圖
           └── <internalValue>Back.png  # nails / art / item 圖（手持物遮擋）
       └── <item/ item2~4>/        
           ├── <internalValue>.png      # item圖
           └──  <internalValue>Acc.png   # itemAcc 附加染色層
           
                            
   ```
   
   =========================================
   提示：
   - itemAcc（手持物染色區域） 與 item 同名並加上 "Acc" 後綴
   - nails/art 可配合 blendMode 達成不同染色效果
   - 若未提供 defaults（預設），則使用使用者設定或初始值
   - z 屬性可用於調整手部、指甲、美甲、道具的疊放順序
   - 未使用的圖層建議使用defaults參數關閉或提供透明圖片
   - Back圖不使用需提供透明圖片（例如：沒有手持物單純只有手的情況）
   - 手持物染色不使用時建議使用defaults參數關閉或提供透明圖片
   - 透明圖片可避免不必要的報錯（例如使用者自行開啟不存在的圖層時）
   
=========================================
   染色混合模式 (blendMode) 可選值與效果參考
   （By ChatGPT)
   =========================================
   可用於 nails、art、itemAcc 的 color 與 blendMode 屬性。

   模式列表：
   1. normal
      - 正常覆蓋，不混合底色
      - 適用於完全替換原圖顏色

   2. multiply
      - 底色與上色相乘，會變暗
      - 適合製作陰影、深色染色效果

   3. screen
      - 底色與上色反相相乘，會變亮
      - 適合製作亮色、高光染色效果

   4. overlay
      - 結合 multiply 與 screen
      - 底色亮處變亮、暗處變暗，增加對比
      - 適合強化色彩、營造高光效果

   5. lighten
      - 取底色與上色較亮的顏色
      - 適合增亮部分細節，保留底色

   6. darken
      - 取底色與上色較暗的顏色
      - 適合加深陰影或深色區域

   7. color-dodge
      - 提亮底色，顏色越亮效果越強
      - 適合做強烈高光或反光效果

   8. color-burn
      - 使底色更暗，顏色越暗效果越強
      - 適合做陰影或濃重染色

   9. hard-light
      - 結合 multiply 與 screen，偏強烈光線效果
      - 適合強烈對比、高光、立體感

   10. soft-light
       - 比 hard-light 柔和，增加光線感但不太破壞底色
       - 適合柔和陰影或漸層色彩

   11. difference
       - 取底色與上色差值，顏色反轉效果
       - 適合特殊藝術效果或彩虹效果

   12. exclusion
       - 類似 difference，但效果更柔和
       - 適合 subtle 變化或半透明漸層

   13. hue
       - 只取上色的色相 (Hue)，保留底色明度與飽和度
       - 適合換色但保留材質感

   14. saturation
       - 只取上色飽和度，保留底色明度與色相
       - 適合調整色彩濃淡

   15. color
       - 上色覆蓋底色的色相與飽和度，保留底色明度
       - 常用於染色指甲或美甲，保持手部陰影

   16. luminosity
       - 只取上色明度，保留底色色相與飽和度
       - 適合微調亮度，保持顏色原貌

   =========================================
   使用建議：
   - nails/art/itemAcc：
       - 若希望自然染色：normal / multiply / overlay / soft-light
       - 若希望亮色或高光：screen / color-dodge / lighten
       - 若希望深色或陰影：multiply / color-burn / darken
       - 若希望顏色替換但保留材質：hue / color / saturation
   - 建議先用測試圖片確認效果，再套用到手部樣式
   - Z 座標 (z) 可配合 blendMode 調整重疊效果
=========================================
