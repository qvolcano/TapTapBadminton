import { FairyGuiView } from "../../game/FairyView";

export class MainView extends FairyGuiView {
    constructor() {
        super("main", "MainView");
    }

    open(): void {
        super.open();
        this.component?.getChild("btn_start")?.addClickListener(() => {
            this.context.framework.viewManager.create("game");
            this.close();
        }, this);
    }

    close(): void {
        super.close();
    }
}