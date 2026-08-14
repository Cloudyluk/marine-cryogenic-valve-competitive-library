# 船用低温阀门竞争产品选型库｜项目交接包

**交接状态：** 暂停于可发布状态  
**最后发布提交：** `2613b20 补全 RAYS 低温阀产品目录`  
**线上预览：** https://cloudyluk.github.io/marine-cryogenic-valve-competitive-library/  
**代码仓库：** https://github.com/Cloudyluk/marine-cryogenic-valve-competitive-library （私有仓库；Pages 公开）

## 1. 项目目标与边界

本项目是一个静态 GitHub Pages 选型知识库，用于梳理**已有竞争对手**的船用 LNG／低温阀产品。它支持品牌、阀型、应用、介质、最低温度、压力等级和船级社筛选，并支持多产品参数对比。

数据边界必须持续遵守：

- 仅采用制造商官网或制造商签发的数据表；
- 对比条目必须同时有品牌和明确的官方产品名称/系列名；
- 只填写官网明确公开的参数；未披露字段写 `待厂家确认`；
- 不把“适用于 LNG”推断为具体的温度、压力、尺寸、船级社认证或订货型号；
- 官网字段互相矛盾时，保留原文冲突并写入 `notes`，不自行统一换算或裁决。

## 2. 当前已交付

- 选型库、详情面板、品牌目录、标准索引、筛选、参数对比、官网链接功能均已上线。
- 当前静态目录含 **102 条**产品/系列记录；所有新补产品均绑定官网来源。
- 以下品牌已按独立批次补录并分别发布：Habonim、OMB Valves、Parker Bestobell、纽威（Neway）、GWC Italia、Meca-Inox、RAYS Flow Control。
- 最近一批 RAYS 已通过聚焦覆盖测试、完整测试及生产构建后发布。

## 3. 未完成工作队列（按优先级）

### P0：完成“现有公司完整目录”核验

仍未完成全品牌官网盘点。需要逐家浏览现有 `valveSeries` 和 `brandProfiles` 中代表品牌的官网目录，记录每个公开低温产品名，并判定：

1. `complete against accessible official catalog`；
2. `has missing named products`；
3. `officially published as generic series only`；或
4. `no accessible official model index`。

盘点结果写入：`docs/superpowers/audits/2026-08-15-remaining-brand-catalog-inventory.md`。

优先顺序：

1. KLINGER Westad、KITZ；
2. Emerson Fisher、Baker Hughes Masoneilan、Flowserve McCANNA/Worcester；
3. S&S Valve、NAKAKITA SEISAKUSHO、HEROSE；
4. Mt.H Control Valves、Qublock Technology、Tsunny Group、Bray、ADAMS Armaturen、富瑞阀门；
5. 最后复查 CRYOSTAR 等已有条目是否有同品牌遗漏。

### P1：对每个确认有缺口的品牌做独立发布批次

每个品牌必须独立完成并推送，不能把多家未经核验的数据混为一批：

1. 收集官网产品名和直接 URL；
2. 在 `src/lib/selection.test.ts` 先写该品牌的缺口覆盖测试，运行确认红灯；
3. 在 `src/data/sources.ts` 加来源，在 `src/data/competitors.ts` 加一条对应记录；
4. 补齐官网已经明确的温度、压力、尺寸、连接、结构、附件、标准和证书；
5. 运行验证并提交发布。

### P2：最终完整性边界

完成全品牌核验后，在 `src/lib/selection.test.ts` 加入所有记录均具备品牌、型号和 HTTPS 官网来源的数据完整性测试，并提交最终审计说明。

## 4. 工作区与关键文件

| 用途 | 位置 |
| --- | --- |
| 产品主数据 | `src/data/competitors.ts` |
| 官网来源清单 | `src/data/sources.ts` |
| 品牌公司/工厂/市场资料 | `src/data/brandProfiles.ts` |
| 数据结构 | `src/data/types.ts` |
| 筛选与比较逻辑 | `src/lib/selection.ts` |
| 回归测试 | `src/lib/selection.test.ts`、`src/App.test.tsx` |
| 已批准的实施计划 | `docs/superpowers/plans/2026-08-15-existing-competitor-catalog-completion.md` |
| 设计与数据口径 | `docs/superpowers/specs/2026-08-15-existing-competitor-catalog-completion-design.md` |

## 5. 每个批次的验收与发布清单

在仓库根目录执行：

    npm run test -- --run src/lib/selection.test.ts
    npm run test -- --run
    npm run build
    git diff --check
    git add src/data/sources.ts src/data/competitors.ts src/lib/selection.test.ts
    git commit -m "补全 <品牌> 低温阀产品目录"
    git -c http.version=HTTP/1.1 push origin main

发布后等待 GitHub Pages 构建完成，再访问线上预览。不要修改 `dist/` 作为数据源。

## 6. 已知风险与待确认项

- 现有目录中的部分早期记录来自公开“系列/解决方案”页，不一定对应可订购的唯一型号；必须依靠 `modelKind` 与 `notes` 区分。
- 船级社证书高度依赖尺寸、材料、执行机构和订单配置。未有官网直接证据时不能补写 CCS、ABS、DNV、LR。
- OMB C-230 CRYO 页面存在 DN 与英寸字段并列不一致；已在记录备注中原样标注，勿自行修订。
- Habonim C74 官网页面的英寸与 DN 口径有不一致，已保留待订单确认。
- RAYS 新增批次的多个产品只公开产品名与局部结构/标准；其余参数刻意保持 `待厂家确认`。

## 7. 接手建议

先从 P0 的 KLINGER Westad 与 KITZ 开始，完成审计文件；若无新命名产品，仅写明“官网仅公开通用系列”，不要为了扩充数量新增虚构型号。随后按 P1 的测试先行流程处理第一个确有命名缺口的品牌。
