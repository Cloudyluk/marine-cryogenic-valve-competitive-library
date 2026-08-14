export interface StandardReference {
  id: string
  code: string
  category: '低温基础' | '船用 LNG' | '阀门型式' | '测试与认证'
  title: string
  role: string
  note: string
}

export const standardReferences: StandardReference[] = [
  { id: 'iso-21011', code: 'ISO 21011', category: '低温基础', title: '低温用阀门', role: '低温阀的设计、制造与试验参考。', note: '实际适用版本、压力等级与附加试验以项目规格书为准。' },
  { id: 'bs-6364', code: 'BS 6364', category: '低温基础', title: '低温用阀门规范', role: '用于评估低温阀结构、材料及试验要求的常用参考。', note: '资料页提及该标准不等于单一产品已取得型式认可。' },
  { id: 'gbt-24925', code: 'GB/T 24925', category: '低温基础', title: '低温阀门技术条件', role: '中国低温阀选型与验收的技术条件参考。', note: '应结合设计温度、介质、压力与项目补充要求使用。' },
  { id: 'igf-code', code: 'IGF Code', category: '船用 LNG', title: '国际气体燃料船舶安全规则', role: 'LNG 燃料船 FGSS 与相关系统的船用安全规则参考。', note: '最终由船旗国、船级社和项目规范确定适用条款。' },
  { id: 'api-598', code: 'API 598', category: '测试与认证', title: '阀门检验与试验', role: '阀门压力试验与检验的通用参考。', note: '低温性能、耐火或逸散排放试验通常需要另行规定。' },
  { id: 'iso-10497', code: 'ISO 10497', category: '测试与认证', title: '阀门耐火型式试验', role: '耐火要求阀门的型式试验参考。', note: '仅在项目明确要求耐火性能时适用，且需核验对应型号报告。' },
  { id: 'asme-b165', code: 'ASME B16.5', category: '阀门型式', title: '管法兰及法兰管件', role: '法兰连接尺寸与压力等级的接口参考。', note: '连接标准不替代阀门主体的低温、船级社或材料认证。' },
]
