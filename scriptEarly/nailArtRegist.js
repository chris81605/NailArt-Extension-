(() => {
    window.modSC2DataManager.getModLoadController().addLifeTimeCircleHook(
        'nailArt',
        {
            ModLoaderLoadEnd: async () => {
                const logger = window.modUtils.getLogger();
                const maplebirchMod = window.modUtils.getAnyModByNameNoAlias('maplebirch');
                
                if (maplebirchMod) {
                    
                    maplebirch.modList.pushUnique("美甲拓展");
                    maplebirch.tool.addTo('MenuSmall', 'nailArtButton');
                    logger.log('[nailArt] Maplebirch 已註冊 nailArt');
                
                } else {
                    logger.error('[nailArt] 未檢測到 Maplebirch');
                }
            },
        }
    );
})();