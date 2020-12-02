import * as fs from "fs";
import * as path from "path";

export class CacheService {
    private static FILE_PATH = path.join(__dirname, './.cache.json');

    private static _INSTANCE: CacheService;

    public static get INSTANCE(): CacheService {
        if (CacheService._INSTANCE === undefined) {
            CacheService._INSTANCE = new CacheService()
        }
        return this._INSTANCE
    }

    private readonly cache: Record<string, string> = {};

    private constructor() {
        try {
            this.cache = JSON.parse(fs.readFileSync(CacheService.FILE_PATH, 'utf8'))
        } catch (e) {
            this.cache = {};
        }
    }

    public getItem(key: string): string | undefined {
        return this.cache[key];
    }

    public setItem(key: string, value: string): void {
        this.cache[key] = value;
        this.persist();
    }

    private persist(): void {
        fs.writeFileSync(CacheService.FILE_PATH, JSON.stringify(this.cache));
    }
}
