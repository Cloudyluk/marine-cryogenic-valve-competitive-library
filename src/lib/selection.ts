import type { FilterState, SortKey, ValveSeries } from '../data/types'

const evidenceRank = { '公开证实': 0, '公开资料推断': 1, '待厂家确认': 2 } as const

export function filterSeries(items: ValveSeries[], filters: FilterState) {
  const q = filters.query.trim().toLowerCase()
  return items.filter((item) => {
    const searchable = [item.brand, item.model, item.type, ...item.applications, ...item.media, ...item.standards, ...item.notes].join(' ').toLowerCase()
    return (!q || searchable.includes(q))
      && (!filters.brand || item.brand === filters.brand)
      && (!filters.region || item.region === filters.region)
      && (!filters.type || item.type === filters.type)
      && (!filters.application || item.applications.includes(filters.application))
      && (filters.minTemperature === null || (item.minTemperature !== null && item.minTemperature <= filters.minTemperature))
      && (!filters.classSociety || item.classSocieties.includes(filters.classSociety))
  })
}

export function sortSeries(items: ValveSeries[], key: SortKey) {
  if (key === 'relevance') return items
  return [...items].sort((left, right) => {
    if (key === 'brand') return left.brand.localeCompare(right.brand, 'zh-CN') || left.model.localeCompare(right.model, 'zh-CN')
    if (key === 'temperature') return (left.minTemperature ?? Infinity) - (right.minTemperature ?? Infinity)
    return evidenceRank[left.evidence] - evidenceRank[right.evidence]
  })
}

export function toggleComparison(ids: string[], id: string) {
  if (ids.includes(id)) return ids.filter((value) => value !== id)
  return ids.length === 4 ? ids : [...ids, id]
}
