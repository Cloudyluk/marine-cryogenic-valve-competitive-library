export type EvidenceLevel = '公开证实' | '公开资料推断' | '待厂家确认'

export interface SourceLink {
  label: string
  url: string
}

export interface ValveSeries {
  id: string
  brand: string
  region: '中国' | '欧洲' | '北美'
  model: string
  modelKind: '公开产品系列' | '公开产品名称'
  type: string
  applications: string[]
  media: string[]
  minTemperature: number | null
  pressure: string
  size: string
  connection: string[]
  classSocieties: string[]
  evidence: EvidenceLevel
  verifiedAt: string
  sources: SourceLink[]
  construction: string[]
  accessories: string[]
  standards: string[]
  notes: string[]
}

export interface FilterState {
  query: string
  brand: string
  region: string
  type: string
  application: string
  minTemperature: number | null
  classSociety: string
}

export const defaultFilters: FilterState = {
  query: '', brand: '', region: '', type: '', application: '', minTemperature: null, classSociety: '',
}
