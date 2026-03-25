# 通用回合制游戏

## 核心要素
- Actor 游戏参与者（玩家、AI、GM、裁判、OB、系统），可在 Battle/Turn 的任意阶段参与。
- ActorOperate 由 Actor 的子类定义，可根据身份与回合状态动态限制“哪些操作可以被该 Actor 发起”。
- Turn 由 Battle 组织；Battle = 多轮 Turn 组成，Turn 的阶段划分由扩展包注册的状态机定义，框架只提供生命周期钩子。

## EventFlow
- 面向触发链：任意操作会生成 Event，Event 会按优先级进入队列并驱动触发链执行，可插入/中断其他 Event。
- 支持回滚：EventFlow 维护事件栈 + Action 变更记录，AI 预测或规则要求重算时可精确恢复到任意历史节点。
- 组件原生响应：CardInstance 的组件通过触发器监听 Event（如 GiveDamage、ReceiveDamage），执行动作并推导新 Event，使所有逻辑统一走事件管线。
- 顺序控制：触发器索引按照“监听域 + Zone 顺序 + Trigger 序号”排序，支持墓地、牌堆等全局 Zone 监听，并在卡牌移动/顺序变化时动态更新优先级。
- 性能约束：触发器使用桶式索引 + 指令集 Action，实现单层批处理，避免深度回调带来的额外开销。
- 示例流程：从抽牌到出牌/攻击/结束回合的事件链路见 `doc/对战流程.md`。

## ActorOperate
- 描述 Actor 在特定情境下可执行的操作集合，包含前置条件、可见性以及需要触发的 Event 列表。
- 通过扩展包可定义“己方主阶段可出牌”“对方仅能宣告陷阱是否触发”等差异化操作，并与 Turn 状态机联动。

## Table / Player
- BattleTable 负责管理静态的 Actor 与 Zone 数据，并与 EventFlow 同步顺序变更。
- Battle 聚焦 Player（通常对应参与战斗的核心 Actor 视角），持有 BattleTable 但以 Player 维度驱动回合、胜负、资源等逻辑。
- Player 与 Actor 可解耦：一个 Player 绑定一个主要 Actor，也可以切换或代理不同 Actor，便于扩展 GM/旁观者等身份。

# 通用卡牌

## Zone
- 框架仅提供基础 `card_list` 抽象，通用行为（有序/无序、公开/隐藏、容量限制）由扩展层实现。
- Zone 负责维护自身顺序，并在卡牌移动或顺序改变时通知 EventFlow 更新相关触发器的排序键，确保事件响应顺序与实际 Zone 顺序一致。

## Card / CardInstance
- Card 定义模板数据，CardInstance 是运行时实体。
- CardInstance 由若干组件组成，每个组件仅包含 **数据 + 触发器 + 动作** 三部分：
    - 数据：攻击/防御/生命/资源等可序列化字段。
    - 触发器：声明监听的事件类型、匹配条件、优先级（含 Zone 顺序）。
    - 动作：引用框架内建指令或脚本化逻辑，执行后返回状态变更记录，并可生成后续事件。
- 典型组件示例：Stats（攻防生命）、Ability（主动/被动/触发）、State（沉默、冻结等）、Cost（资源消耗校验）。所有组件都通过 EventFlow 协调，实现“防御组件响应伤害→派生受伤事件→被动组件跟进处理”的完整链路。

# 炉石扩展包
- zones
    - HandZone 手牌
    - BattlefieldZone 场地
    - DeckZone 牌堆
    - HeroZone 英雄
    - WeaponZone 武器
    - SecretsZone 奥秘
- actors
    - player
    - ai
    - gm

# 待明确/风险点
- Event/EventFlow 数据结构与指令集需要最终定稿（字段、优先级、回滚数据量等）。
- 默认组件（Stats/Ability/State/Cost）的字段和可复用程度仍需结合首个 Demo（如炉石）进一步验证。
- 触发器索引的实现方式（排序 vs. 堆 vs. B 树）与性能权衡需要在原型中压测。
