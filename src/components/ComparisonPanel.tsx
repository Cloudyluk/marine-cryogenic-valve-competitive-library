import type { ValveSeries } from '../data/types'

export function ComparisonPanel({ items, onRemove, onOpenCompare }: { items: ValveSeries[]; onRemove: (id: string) => void; onOpenCompare: () => void }) {
  if (!items.length) return null
  return <section className="comparison-bar" aria-label="对比清单"><div className="compare-count">已选对比（{items.length}）</div><div className="compare-items">{items.map((item) => <article key={item.id}><strong>{item.brand} · {item.model}</strong><small>{item.type}｜{item.minTemperature ?? '待确认'}{item.minTemperature !== null ? '°C' : ''}｜{item.pressure}</small><button aria-label={`移除 ${item.brand} ${item.model}`} onClick={() => onRemove(item.id)}>×</button></article>)}</div><button className="compare-action" onClick={onOpenCompare} disabled={items.length < 2}>开始对比</button></section>
}
