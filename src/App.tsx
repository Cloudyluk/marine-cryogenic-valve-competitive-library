import { useMemo, useState } from 'react'
import { valveSeries } from './data/competitors'
import { defaultFilters, type FilterState, type ValveSeries } from './data/types'
import { ComparisonPanel } from './components/ComparisonPanel'
import { FilterPanel } from './components/FilterPanel'
import { ResultsTable } from './components/ResultsTable'
import { ValveDetail } from './components/ValveDetail'
import { filterSeries, toggleComparison } from './lib/selection'

export function App() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [comparedIds, setComparedIds] = useState<string[]>([])
  const [detail, setDetail] = useState<ValveSeries | null>(null)
  const results = useMemo(() => filterSeries(valveSeries, filters), [filters])
  const compared = valveSeries.filter((item) => comparedIds.includes(item.id))
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => setFilters((current) => ({ ...current, [key]: value }))

  return <div className="site-shell">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="返回选型库顶部">船用低温阀门 <span>·</span> 竞争产品选型库</a>
      <nav aria-label="站内导航"><a href="#library">选型库</a><a href="#standards">标准索引</a><a href="#method">数据说明</a></nav>
      <button className="clear-button" onClick={() => setFilters(defaultFilters)}>清除筛选</button>
    </header>
    <main id="top">
      <section className="notice" aria-label="使用提示">参数用于竞品初选，以项目数据表、船级社认可及单阀证书为准。</section>
      <section className="workbench" id="library">
        <FilterPanel filters={filters} items={valveSeries} onChange={updateFilter} onReset={() => setFilters(defaultFilters)} />
        <div className="results-area">
          <div className="section-heading"><div><p>竞争情报库</p><h1>{results.length} 个公开资料条目</h1></div><span>品牌与型号/系列均为必填字段</span></div>
          <ResultsTable items={results} comparedIds={comparedIds} onCompare={(id) => setComparedIds((current) => toggleComparison(current, id))} onDetail={setDetail} />
        </div>
      </section>
      <section className="info-section" id="standards"><h2>标准索引</h2><p>低温阀产品通常需结合 ISO 21011、BS 6364、GB/T 24925，以及阀型、耐火、逸散排放和船舶项目规则综合判断；具体适用标准以项目规格书为准。</p></section>
      <section className="info-section" id="method"><h2>数据说明</h2><p>“公开产品名称”对应厂商公开页面的产品名称；“公开产品系列”表示厂商公开产品线，不能替代订货型号。所有数据均保留来源和核验日期。</p></section>
    </main>
    <ComparisonPanel items={compared} onRemove={(id) => setComparedIds((current) => current.filter((value) => value !== id))} />
    {detail && <ValveDetail item={detail} onClose={() => setDetail(null)} />}
  </div>
}
