# Repository Guidelines

## 项目结构与模块
- `src/`：TypeScript 入口与核心逻辑，含 `main.ts`、`managers/ViewManager.ts` 等。
- `resource/`：静态资源与 `default.res.json` 配置；`libs/` 存放 Egret/EUI 声明与第三方模块。
- `dist/`：Vite 构建输出；`doc/` 存放设计文档；`scripts/` 为自动化脚本；`index.html` 与 `vite.config.js` 定义网页入口和构建配置。
- 新增模块请保持文件名与类名一致的 PascalCase，如 `managers/MyManager.ts`，便于快速定位。

## 构建、调试与开发
- 初始化：`npm install`（建议 Node 18+）。
- 本地调试：`npm run dev` 启动 Vite，实时预览 Egret 入口与资源加载。
- 构建产物：`npm run build` 先进行 `tsc` 类型检查，再由 Vite 输出 `dist/`。
- 产物预览：`npm run preview` 本地 HTTP 预览 `dist/`，确认资源、UI 与动画展示正常。

## 代码风格与命名
- TypeScript 目标 ES2020，统一四空格缩进，保留分号。
- 类/接口/枚举用 PascalCase，函数与变量用 camelCase，事件常量推荐全大写下划线。
- 资源 key 与文件名保持一致；UI 皮肤或布局文件使用小写短横线命名。
- 生命周期入口放在 `Main`，视图/窗口封装集中在 `managers/`，避免在 `main.ts` 写零散业务逻辑。

## 测试与验证
- 当前无自动化测试；提交前至少运行 `npm run build` 确认类型与打包通过。
- 手动验证：运行 `npm run dev`，检查控制台无报错，资源/纹理加载成功，场景与动画按预期显示。
- 新增功能建议提供复现步骤或短录屏，便于评审与回归。

## 提交与 Pull Request
- Git 历史较多简单 `update`，优先使用描述性前缀：`feat: `、`fix: `、`chore: `、`docs: ` 等。
- PR 需包含变更摘要、关联 Issue/需求编号、已运行命令及结果（如 `npm run build`），涉及 UI 请附截图或录屏。
- 避免提交临时调试文件；若调整资源，记得同步更新 `resource/default.res.json` 并在说明中标注来源。


## 代码风格 ##
- 超过20行代码的才需要辅助函数
- 代码必须整洁，规划统一性 > 可读性 > 可维护性 > 性能

## 开发维护 ##
- 每次增加删除修改功能点都必须在产品文档中记录下来