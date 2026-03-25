export type ConfigKey = string | number;

export interface IConfig {
    get<T = unknown>(key: ConfigKey, defaultValue?: T): T;
}

export class ConfigManager {
    private readonly configs = new Map<string, IConfig>();

    addConfig(name: string, config: IConfig): void {
        this.configs.set(name, config);
    }

    removeConfig(name: string): void {
        this.configs.delete(name);
    }

    hasConfig(name: string): boolean {
        return this.configs.has(name);
    }

    getConfig(name: string): IConfig {
        const config = this.configs.get(name);
        if (!config) {
            throw new Error(`ConfigManager: 未找到配置 ${name}`);
        }
        return config;
    }

    getConfigValue<T = unknown>(name: string, key: ConfigKey, defaultValue?: T): T {
        return this.getConfig(name).get<T>(key, defaultValue);
    }

    addJsonConfig(name: string, data: unknown): JsonConfig {
        const config = new JsonConfig(data);
        this.addConfig(name, config);
        return config;
    }
}

export class JsonConfig implements IConfig {
    private readonly data: any;

    constructor(data: unknown = {}) {
        this.data = data ?? {};
    }

    get<T = unknown>(key: ConfigKey, defaultValue?: T): T {
        const k = String(key);
        if (!k) {
            return defaultValue as T;
        }
        const v = this.data?.[k];
        return (v === undefined ? defaultValue : v) as T;
    }

    getRaw(): unknown {
        return this.data;
    }
}
