import { useEffect, useRef } from 'react'
import type { ValveSeries } from '../data/types'
import { StatusTag } from './StatusTag'

const List = ({ title, values }: { title: string; values: string[] }) => <section><h3>{title}</h3><ul>{values.map((value) => <li key={value}>{value}</li>)}</ul></section>

export function ValveDetail({ item, onClose, onProfile }: { item: ValveSeries; onClose: () => void; onProfile: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (typeof dialog?.showModal === 'function') dialog.showModal()
    else dialog?.setAttribute('open', '')
    return () => {
      if (typeof dialog?.close === 'function') dialog.close()
      else dialog?.removeAttribute('open')
    }
  }, [])
  return <dialog ref={ref} role="dialog" aria-label="产品详情" className="detail-dialog" onClose={onClose}><button className="dialog-close" aria-label="关闭详情" onClick={onClose}>×</button><div className="detail-kicker">{item.brand} · {item.modelKind}</div><h2>{item.model}</h2><StatusTag value={item.evidence} /><p className="detail-meta">核验日期：{item.verifiedAt}　阀型：{item.type}</p><button className="profile-button" onClick={onProfile}>查看品牌档案</button><div className="spec-grid"><div><span>最低温度</span><strong>{item.minTemperature === null ? '待厂家确认' : `${item.minTemperature}°C`}</strong></div><div><span>压力范围</span><strong>{item.pressure}</strong></div><div><span>口径</span><strong>{item.size}</strong></div><div><span>连接</span><strong>{item.connection.join('、')}</strong></div></div><List title="产品构成/技术要点" values={item.construction} /><List title="典型配件" values={item.accessories} /><List title="参考标准" values={item.standards} /><section><h3>待核实项与使用说明</h3><ul>{item.notes.map((note) => <li key={note}>{note}</li>)}</ul></section><section><h3>公开来源</h3>{item.sources.map((source) => <a className="source-link" key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</section></dialog>
}
