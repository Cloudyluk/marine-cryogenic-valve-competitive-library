import type { FilterState, ValveSeries } from '../data/types'

export function filterSeries(items: ValveSeries[], filters: FilterState) {
  const q = filters.query.trim().toLowerCase()
  return items.filter((item) => {
    const searchable = [item.brand, item.model, item.type, ...item.applications, ...item.media].join(' ').toLowerCase()
    return (!q || searchable.includes(q))
      && (!filters.brand || item.brand === filters.brand)
      && (!filters.region || item.region === filters.region)
      && (!filters.type || item.type === filters.type)
      && (!filters.application || item.applications.includes(filters.application))
      && (filters.minTemperature === null || (item.minTemperature !== null && item.minTemperature <= filters.minTemperature))
      && (!filters.classSociety || item.classSocieties.includes(filters.classSociety))
  })
}

export function toggleComparison(ids: string[], id: string) {
  if (ids.includes(id)) return ids.filter((value) => value !== id)
  return ids.length === 4 ? ids : [...ids, id]
}
