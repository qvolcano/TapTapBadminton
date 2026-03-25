// 定义两个不同的类型
type ViewFactory<K, T extends IView = IView> = (context?: K) => T;
type ViewConstructor<K, T extends IView = IView> = new (context?: K) => T;

// 修改 ViewCtor 类型为联合类型
type ViewCtor<K, T extends IView = IView> = ViewFactory<K, T> | ViewConstructor<T>;

/**
 * 视图接口基类，强制实现 open/close。
 */
export abstract class IView {
    context: any;
    abstract open(...args: any[]): void;
    abstract close(): void;
}


/**
 * 简单的视图管理器，负责注册、打开与关闭。
 */
export class ViewManager {
    private static _instance: ViewManager;
    context: any;
    static get instance(): ViewManager {
        if (!this._instance) {
            this._instance = new ViewManager();
        }
        return this._instance;
    }

    private readonly registry = new Map<string, ViewCtor<any, IView>>();
    private readonly views = new Map<string, IView>();

    setContext(context: any) {
        this.context = context;
    }
    register(name: string, viewCtor: ViewCtor<typeof this.context>): void {
        this.registry.set(name, viewCtor);
    }

    create(name: string, viewCtor: ViewCtor<typeof this.context>): void {
        if (viewCtor == null) {
            viewCtor = this.registry.get(name);
        }
        let view = this.createView(viewCtor);
        view.context = this.context;
        this.views.set(name, view);
        view.open();
    }

    remove(name: string): void {
        const view = this.views.get(name);
        view?.close();
    }

    private createView(viewCtor: ViewCtor<typeof this.context>): IView {
        // 判断 viewCtor 是否为类构造函数
        if (this.isViewConstructor(viewCtor)) {
            return new viewCtor(this.context);
        } else {
            return viewCtor(this.context);
        }
    }

    // 类型守卫函数：检查是否为构造函数
    private isViewConstructor<T extends IView>(
        ctor: ViewCtor<any, T>
    ): ctor is ViewConstructor<T> {
        // 构造函数通常具有 prototype 属性且其 constructor 指向自身
        return !!(ctor.prototype && ctor.prototype.constructor === ctor);
    }
}
