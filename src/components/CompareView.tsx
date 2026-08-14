import type { ValveSeries } from '../data/types'
import { SourceLinks } from './SourceLinks'

const fields: { label: string; value: (item: ValveSeries) => string }[] = [
  { label: '品牌 · 型号 / 系列', value: (item) => `${item.brand} · ${item.model}` },
  { label: '阀型', value: (item) => item.type },
  { label: '应用场景', value: (item) => item.applications.join('、') },
  { label: '介质', value: (item) => item.media.join('、') },
  { label: '最低温度', value: (item) => item.minTemperature === null ? '待厂家确认' : `${item.minTemperature}°C` },
  { label: '压力范围', value: (item) => item.pressure },
  { label: '口径', value: (item) => item.size },
  { label: '连接', value: (item) => item.connection.join('、') },
  { label: '结构/技术要点', value: (item) => item.construction.join('、') },
  { label: '典型配件', value: (item) => item.accessories.join('、') },
  { label: '参考标准', value: (item) => item.standards.join('、') },
  { label: '船级社', value: (item) => item.classSocieties.length ? item.classSocieties.join('、') : '待厂家确认' },
  { label: '资料状态', value: (item) => item.evidence },
  { label: '核验日期', value: (item) => item.verifiedAt },
]

export function CompareView({ items, onRemove, onDetail }: { items: ValveSeries[]; onRemove: (id: string) => void; onDetail: (item: ValveSeries) => void }) {
  return <section className="workspace compare-workspace"><div className="workspace-heading"><div><p>参数矩阵</p><h1>对比中心</h1></div><span>{items.length ? `当前已选 ${items.length} 个产品` : '从选型库加入产品后开始对比'}</span></div>
    {!items.length ? <div className="empty-state"><h2>尚未选择对比产品</h2><p>返回选型库，勾选一至四个产品后即可横向比较。</p></div> : <div className="compare-matrix"><table><thead><tr><th>比较字段</th>{items.map((item) => <th key={item.id}><strong>{item.brand}</strong><span>{item.model}</span><button onClick={() => onRemove(item.id)} aria-label={`移除 ${item.brand} ${item.model}`}>移除</button></th>)}</tr></thead><tbody>{fields.map((field) => <tr key={field.label}><th>{field.label}</th>{items.map((item) => <td key={item.id}>{field.label === '品牌 · 型号 / 系列' ? <button className="text-button" onClick={() => onDetail(item)}>{field.value(item)}</button> : field.value(item)}</td>)}</tr>)}<tr><th>官方资料</th>{items.map((item) => <td key={item.id}><SourceLinks sources={item.sources} heading="" /></td>)}</tr></tbody></table></div>}</section>
}
