import { Framework } from "../framework/Framework";
import { IView } from "../framework/managers/ViewManager";

/**
 * FairyGUI 视图：根据包名与组件 id 创建 UI，并挂载到 GRoot。
 */
export class FairyGuiView extends IView {
    component?: fgui.GComponent;
    pkgName: string;
    componentId: string;
    declare context: { framework: Framework }
    constructor(pkgName: string, componentId: string) {
        super();
        this.pkgName = pkgName;
        this.componentId = componentId;
    }

    open(): void {
        let { pkgName, componentId } = this;
        if (this.component && this.component.parent) {
            this.component.removeFromParent();
        }
        const created = fgui.UIPackage.createObject(pkgName, componentId);
        this.component = created ? created.asCom : undefined;
        if (this.component) {
            fgui.GRoot.inst.addChild(this.component);
        }
    }

    close(): void {
        if (this.component && this.component.parent) {
            this.component.removeFromParent();
        }
        this.component = undefined;
    }
}
