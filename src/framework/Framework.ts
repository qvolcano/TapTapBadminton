import { ViewManager } from "./managers/ViewManager";
import { ConfigManager } from "./managers/ConfigManager";

export class Framework {
    readonly viewManager: ViewManager;
    readonly eventManager: egret.EventDispatcher;
    readonly configManager: ConfigManager;
    readonly dataManager: unknown;
    constructor() {
        this.viewManager = new ViewManager();
        this.eventManager = new egret.EventDispatcher();
        this.configManager = new ConfigManager();
        this.dataManager = undefined;
    }
}
