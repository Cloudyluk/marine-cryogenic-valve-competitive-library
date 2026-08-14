import { useEffect, useRef } from 'react'
import type { BrandProfile } from '../data/types'
import { SourceLinks } from './SourceLinks'

const List = ({ title, values }: { title: string; values: string[] }) => <section><h3>{title}</h3><ul>{values.map((value) => <li key={value}>{value}</li>)}</ul></section>

export function BrandProfileDialog({ profile, onClose }: { profile: BrandProfile; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (typeof dialog?.showModal === 'function') dialog.showModal()
    else dialog?.setAttribute('open', '')
    return () => { if (typeof dialog?.close === 'function') dialog.close(); else dialog?.removeAttribute('open') }
  }, [])
  return <dialog ref={ref} role="dialog" aria-label="品牌档案" className="detail-dialog profile-dialog" onClose={onClose}><button className="dialog-close" aria-label="关闭品牌档案" onClick={onClose}>×</button><div className="detail-kicker">竞争品牌档案 · 核验日期 {profile.verifiedAt}</div><h2>{profile.brand}</h2><p className="official-name">{profile.officialName}</p><section className="profile-location"><h3>公司与主要制造基地</h3><p><strong>总部/主体地址：</strong>{profile.headquarters}</p><ul>{profile.manufacturing.map((value) => <li key={value}>{value}</li>)}</ul></section><List title="公开产品系列" values={profile.productFamilies} /><List title="船用 / LNG 相关定位" values={profile.marineLngPositioning} /><List title="公开市场与服务覆盖" values={profile.marketCoverage} /><List title="信息说明" values={profile.notes} /><SourceLinks sources={profile.sources} heading="官方来源" /></dialog>
}
