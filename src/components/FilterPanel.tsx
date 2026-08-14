import type { FilterState, ValveSeries } from '../data/types'

interface Props { filters: FilterState; items: ValveSeries[]; onChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void; onReset: () => void }
const unique = (values: string[]) => [...new Set(values)].sort()

export function FilterPanel({ filters, items, onChange, onReset }: Props) {
  const brands = unique(items.map((item) => item.brand)); const types = unique(items.map((item) => item.type)); const apps = unique(items.flatMap((item) => item.applications)); const societies = unique(items.flatMap((item) => item.classSocieties))
  return <aside className="filter-panel"><div className="filter-title"><h2>筛选条件</h2><button onClick={onReset}>重置</button></div>
    <label>关键词<input value={filters.query} onChange={(event) => onChange('query', event.target.value)} placeholder="品牌、型号或介质" /></label>
    <label>品牌/地区<select aria-label="品牌/地区" value={filters.brand} onChange={(event) => onChange('brand', event.target.value)}><option value="">全部品牌</option>{brands.map((value) => <option key={value}>{value}</option>)}</select></label>
    <label>地区<select value={filters.region} onChange={(event) => onChange('region', event.target.value)}><option value="">全部地区</option><option>中国</option><option>欧洲</option><option>北美</option></select></label>
    <label>阀型<select aria-label="阀型" value={filters.type} onChange={(event) => onChange('type', event.target.value)}><option value="">全部</option>{types.map((value) => <option key={value}>{value}</option>)}</select></label>
    <label>应用场景<select value={filters.application} onChange={(event) => onChange('application', event.target.value)}><option value="">全部</option>{apps.map((value) => <option key={value}>{value}</option>)}</select></label>
    <label>最低温度<select value={filters.minTemperature ?? ''} onChange={(event) => onChange('minTemperature', event.target.value ? Number(event.target.value) : null)}><option value="">全部</option><option value="-196">≤ −196°C</option><option value="-162">≤ −162°C</option></select></label>
    <label>船级社<select value={filters.classSociety} onChange={(event) => onChange('classSociety', event.target.value)}><option value="">全部</option>{societies.map((value) => <option key={value}>{value}</option>)}</select></label>
  </aside>
}
