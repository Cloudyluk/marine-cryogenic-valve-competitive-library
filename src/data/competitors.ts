import { sources } from './sources'
import type { ValveSeries } from './types'

const newayCommon = {
  brand: '纽威（Neway）', region: '中国' as const, applications: ['LNG 运输船', 'FGSS', 'LNG 装卸', 'BOG'], media: ['LNG', 'LPG'], minTemperature: -196,
  classSocieties: ['CCS', 'ABS', 'DNV', 'LR'], evidence: '公开证实' as const, verifiedAt: '2026-08-14',
  sources: [sources.newayShipping], construction: ['加长阀颈', '低温适用材料', '按阀型配置阀座/启闭件'],
  accessories: ['手动、气动或液动驱动（按系列）', '阀位反馈/限位（按项目）'], standards: ['ISO 21011', 'BS 6364', 'GB/T 24925（项目适用时）'],
}

export const valveSeries: ValveSeries[] = [
  { ...newayCommon, id: 'neway-cryo-gate', model: 'Cryogenic Gate Valve', modelKind: '公开产品名称', type: '闸阀', pressure: 'Class 150–2500（公开目录范围）', size: '1/2–56 in（公开目录范围）', connection: ['BW', 'SW', 'RF'], sources: [sources.newayGate, sources.newayShipping], notes: ['公开资料描述为低温闸阀；单阀材质、压力温度额定值和证书需按型号确认。'] },
  { ...newayCommon, id: 'neway-cryo-globe', model: 'Cryogenic Globe Valve', modelKind: '公开产品名称', type: '截止阀', pressure: 'Class 150–2500（公开目录范围）', size: '1/2–28 in（公开目录范围）', connection: ['BW', 'SW', 'RF'], sources: [sources.newayGlobe, sources.newayShipping], notes: ['公开资料描述为低温截止阀；节流能力与执行机构按具体型号确认。'] },
  { ...newayCommon, id: 'neway-top-entry-ball', model: 'Top Entry Cryogenic Floating Ball Valve', modelKind: '公开产品名称', type: '球阀', pressure: 'Class 150–1500（公开目录范围）', size: '3/8–4 in（公开目录范围）', connection: ['SW', 'BW', 'RF'], sources: [sources.newayBall, sources.newayShipping], construction: ['上装式结构', '加长阀颈', '阀腔防超压设计（按型号）'], notes: ['公开产品页面为上装式低温浮动球阀；防火、防静电和泄压结构以数据表/订单规格为准。'] },
  { ...newayCommon, id: 'neway-triple-offset-butterfly', model: 'Cryogenic Triple Offset Butterfly Valve', modelKind: '公开产品名称', type: '蝶阀', pressure: 'Class 150–1500（公开目录范围）', size: '3–72 in（公开目录范围）', connection: ['Wafer', 'Lug', 'RF', 'BW'], sources: [sources.newayButterfly, sources.newayShipping], construction: ['三偏心结构', '加长阀颈', '双向密封（按型号）'], notes: ['公开目录列出低温三偏心蝶阀；软/金属密封、操作方式与船用认可需按项目确认。'] },
  { id: 'furui-low-temp-valves', brand: '富瑞阀门', region: '中国', model: '低温阀门（产品中心分类）', modelKind: '公开产品系列', type: '低温阀门系列', applications: ['LNG 燃料储罐', 'FGSS', 'LNG 装备'], media: ['LNG'], minTemperature: null, pressure: '待厂家确认', size: '待厂家确认', connection: ['待厂家确认'], classSocieties: [], evidence: '公开证实', verifiedAt: '2026-08-14', sources: [sources.furui], construction: ['待厂家确认'], accessories: ['待厂家确认'], standards: ['待厂家确认'], notes: ['公开产品中心可确认低温阀门产品分类；页面未据此填写具体订货型号或数值参数。'] },
  { id: 'parker-bestobell-marine', brand: 'Parker Bestobell', region: '欧洲', model: 'Marine Bestobell Cryogenic Valves', modelKind: '公开产品系列', type: '低温阀门系列', applications: ['LNG 运输', '燃料气系统', '低温储运'], media: ['LNG'], minTemperature: null, pressure: '待厂家确认', size: '待厂家确认', connection: ['待厂家确认'], classSocieties: [], evidence: '公开证实', verifiedAt: '2026-08-14', sources: [sources.parker], construction: ['待厂家确认'], accessories: ['待厂家确认'], standards: ['待厂家确认'], notes: ['Parker 官方页面确认船用 Bestobell 低温阀应用；单个型号的结构、压力和认证须查具体数据表。'] },
  { id: 'klinger-westad-butterfly', brand: 'KLINGER Westad', region: '欧洲', model: 'Cryogenic Butterfly Valves for LNG Tankers', modelKind: '公开产品系列', type: '蝶阀', applications: ['LNG 运输船', 'LNG 货物系统'], media: ['LNG'], minTemperature: null, pressure: '待厂家确认', size: '待厂家确认', connection: ['待厂家确认'], classSocieties: [], evidence: '公开证实', verifiedAt: '2026-08-14', sources: [sources.klinger], construction: ['低温蝶阀结构（具体型式待厂家确认）'], accessories: ['待厂家确认'], standards: ['待厂家确认'], notes: ['公开新闻页确认其 LNG 运输船低温蝶阀产品；数值参数及船级社证书须向厂家索取。'] },
  { id: 'omb-lng-valves', brand: 'OMB Valves', region: '欧洲', model: 'LNG Cryogenic Valves', modelKind: '公开产品系列', type: '低温阀门系列', applications: ['LNG 运输船', 'LNG 接收站', 'LNG 储存'], media: ['LNG'], minTemperature: null, pressure: '待厂家确认', size: '待厂家确认', connection: ['待厂家确认'], classSocieties: [], evidence: '公开证实', verifiedAt: '2026-08-14', sources: [sources.omb], construction: ['待厂家确认'], accessories: ['待厂家确认'], standards: ['待厂家确认'], notes: ['OMB 官方 LNG 页面确认其低温/低温阀应用范围；本库不将其泛化为每种阀型或具体型号。'] },
]
