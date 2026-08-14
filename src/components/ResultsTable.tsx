import type { ValveSeries } from '../data/types'
import { StatusTag } from './StatusTag'

interface Props { items: ValveSeries[]; comparedIds: string[]; onCompare: (id: string) => void; onDetail: (item: ValveSeries) => void }
const temperature = (value: number | null) => value === null ? '待厂家确认' : `${value}°C`

export function ResultsTable({ items, comparedIds, onCompare, onDetail }: Props) {
  if (!items.length) return <div className="empty-state"><h2>没有符合条件的产品</h2><p>可尝试清除最低温度或船级社筛选，查看资料覆盖范围。</p></div>
  return <div className="table-scroll"><table className="result-table"><thead><tr><th>对比</th><th>品牌</th><th>型号 / 系列</th><th>阀型</th><th>最低温度</th><th>压力范围</th><th>船级社</th><th>资料状态</th><th>操作</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><input aria-label="加入对比" type="checkbox" checked={comparedIds.includes(item.id)} onChange={() => onCompare(item.id)} disabled={!comparedIds.includes(item.id) && comparedIds.length === 4} /></td><td>{item.brand}</td><td><strong>{item.model}</strong><small>{item.modelKind}</small></td><td>{item.type}</td><td>{temperature(item.minTemperature)}</td><td>{item.pressure}</td><td>{item.classSocieties.length ? item.classSocieties.join('、') : '待厂家确认'}</td><td><StatusTag value={item.evidence} /></td><td><button className="text-button" onClick={() => onDetail(item)}>查看详情</button></td></tr>)}</tbody></table></div>
}
