import { useMemo, useState } from 'react'
import { BrandProfileDialog } from './components/BrandProfileDialog'
import { profileForBrand } from './data/brandProfiles'
import { valveSeries } from './data/competitors'
import { brandProfiles } from './data/brandProfiles'
import { standardReferences } from './data/standards'
import { defaultFilters, type BrandProfile, type FilterState, type SortKey, type ValveSeries } from './data/types'
import { BrandDirectoryView } from './components/BrandDirectoryView'
import { CompareView } from './components/CompareView'
import { ComparisonPanel } from './components/ComparisonPanel'
import { LibraryView } from './components/LibraryView'
import { StandardsView } from './components/StandardsView'
import { ValveDetail } from './components/ValveDetail'
import { filterSeries, sortSeries, toggleComparison } from './lib/selection'

type ViewName = 'library' | 'compare' | 'brands' | 'standards'

export function App() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [comparedIds, setComparedIds] = useState<string[]>([])
  const [detail, setDetail] = useState<ValveSeries | null>(null)
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null)
  const [activeView, setActiveView] = useState<ViewName>('library')
  const [sortKey, setSortKey] = useState<SortKey>('relevance')
  const results = useMemo(() => sortSeries(filterSeries(valveSeries, filters), sortKey), [filters, sortKey])
  const compared = valveSeries.filter((item) => comparedIds.includes(item.id))
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => setFilters((current) => ({ ...current, [key]: value }))

  return <div className="site-shell">
    <header className="site-header">
      <button className="wordmark" onClick={() => setActiveView('library')} aria-label="返回选型库顶部">船用低温阀门 <span>·</span> 竞争产品选型库</button>
      <nav aria-label="站内导航">{([{ id: 'library', label: '选型库' }, { id: 'compare', label: '对比中心' }, { id: 'brands', label: '品牌情报' }, { id: 'standards', label: '标准索引' }] as const).map((item) => <a key={item.id} href={`#${item.id}`} aria-current={activeView === item.id ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActiveView(item.id) }}>{item.label}</a>)}</nav>
      <button className="clear-button" onClick={() => { setFilters(defaultFilters); setSortKey('relevance') }}>清除筛选</button>
    </header>
    <main id="top">
      <section className="notice" aria-label="使用提示">参数用于竞品初选，以项目数据表、船级社认可及单阀证书为准。</section>
      {activeView === 'library' && <LibraryView filters={filters} items={valveSeries} results={results} comparedIds={comparedIds} sortKey={sortKey} onChange={updateFilter} onReset={() => { setFilters(defaultFilters); setSortKey('relevance') }} onSort={setSortKey} onCompare={(id) => setComparedIds((current) => toggleComparison(current, id))} onDetail={setDetail} />}
      {activeView === 'compare' && <CompareView items={compared} onRemove={(id) => setComparedIds((current) => current.filter((value) => value !== id))} onDetail={setDetail} />}
      {activeView === 'brands' && <BrandDirectoryView profiles={brandProfiles} onOpen={setBrandProfile} />}
      {activeView === 'standards' && <StandardsView items={standardReferences} />}
      <section className="info-section" id="method"><h2>数据说明</h2><p>“公开产品名称”对应厂商公开页面的产品名称；“公开产品系列”表示厂商公开产品线，不能替代订货型号。所有数据均保留来源和核验日期。品牌档案仅收录厂商官网或官方 PDF 已披露的信息；“官网未披露”不代表不存在。</p></section>
    </main>
    {activeView !== 'compare' && <ComparisonPanel items={compared} onRemove={(id) => setComparedIds((current) => current.filter((value) => value !== id))} onOpenCompare={() => setActiveView('compare')} />}
    {detail && <ValveDetail item={detail} onClose={() => setDetail(null)} onProfile={() => setBrandProfile(profileForBrand(detail.brand) ?? null)} />}
    {brandProfile && <BrandProfileDialog profile={brandProfile} onClose={() => setBrandProfile(null)} />}
  </div>
}
