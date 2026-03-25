# 卡牌游戏开发项目 (Kapai)

一个基于TypeScript和Egret引擎的卡牌游戏项目。

## 开发计划

### 核心功能模块

1. **游戏核心DOM系统**
   - 游戏场景管理
   - 卡牌渲染引擎
   - 动画系统
   - 事件处理机制

2. **Demo游戏原型**
   - 基础卡牌对战逻辑
   - 简单的回合制系统
   - 卡牌抽取和使用机制
   - 基础AI对手

3. **简易UI框架**
   - 响应式布局系统
   - 通用UI组件库
   - 主题和样式管理
   - 交互反馈系统

4. **技能脚本编辑器**
   - 可视化技能编辑界面
   - 脚本语法解析器
   - 技能效果预览
   - 技能数据导入导出

5. **数据库模块**
   - 卡牌数据管理
   - 玩家进度存储
   - 游戏配置管理
   - 本地数据缓存

## 开发命令

### 调试
```bash
npm run dev
```

### 构建
```bash
npm run build
```

### 预览
```bash
npm run preview
```

## 文档

- 代码风格与约定：`doc/代码风格与约定.md`
- 对战流程（抽牌→出牌→攻击→结束回合）：`doc/对战流程.md`
- 产品文档（当前功能点总览）：`doc/产品文档.md`

## 技术栈

- **游戏引擎**: Egret Engine
- **开发语言**: TypeScript
- **构建工具**: Vite
- **UI框架**: EUI (Egret UI)
- **动画**: DragonBones

## 项目结构

```
src/
├── core/           # 游戏核心系统
├── ui/             # UI框架和组件
├── game/           # 游戏逻辑
├── editor/         # 技能编辑器
├── data/           # 数据管理
└── utils/          # 工具函数
```



## WindowManager
### open() ,close(),register
管理window弹出的队列与堆栈
IWindow
FairyWindow

## ViewManager
### create(),remove()
管理View的创建，对UI层的一个浅包装
IView
FairyView

Window层的window去调用view的创建，进行二次包装
