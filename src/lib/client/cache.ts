// I hope this system isn't too cursed

function getClientCache() {
    const global = (window as any);

    if(!global.firetellCache) {
        global.firetellCache = {};
    }

    return global.firetellCache;
}

export function clientCache<T extends Function>(func: T): T {
    // TODO: figure out a better way to distinguish the functions. They may conflict
    const funcId = func.toString();

    function resFunc() {
        const argKey = Array.from(arguments).toString();
        const key = funcId + "_" + argKey;

        const cache = getClientCache();

        if(cache[key] !== undefined) {
            return cache[key];
        }
        
        const res = func(...arguments);

        cache[key] = res;
        return res;
    };

    return resFunc as unknown as T;
}
