import { useMemo, useState } from 'react'
import type { BrandProfile } from '../data/types'
import { SourceLinks } from './SourceLinks'

export function BrandDirectoryView({ profiles, onOpen }: { profiles: BrandProfile[]; onOpen: (profile: BrandProfile) => void }) {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('')
  const regions = [...new Set(profiles.map((profile) => profile.headquarters.includes('China') || profile.headquarters.includes('中国') ? '中国' : profile.headquarters.includes('Korea') ? '韩国' : profile.headquarters.includes('Japan') ? '日本' : profile.headquarters.includes('France') || profile.headquarters.includes('Germany') || profile.headquarters.includes('Italy') ? '欧洲' : '其他'))]
  const visible = useMemo(() => profiles.filter((profile) => {
    const content = [profile.brand, profile.officialName, profile.headquarters, ...profile.productFamilies, ...profile.marineLngPositioning, ...profile.marketCoverage].join(' ').toLowerCase()
    const profileRegion = profile.headquarters.includes('China') || profile.headquarters.includes('中国') ? '中国' : profile.headquarters.includes('Korea') ? '韩国' : profile.headquarters.includes('Japan') ? '日本' : profile.headquarters.includes('France') || profile.headquarters.includes('Germany') || profile.headquarters.includes('Italy') ? '欧洲' : '其他'
    return (!query || content.includes(query.toLowerCase())) && (!region || region === profileRegion)
  }), [profiles, query, region])
  return <section className="workspace brand-workspace"><div className="workspace-heading"><div><p>公司、工厂与市场</p><h1>品牌情报</h1></div><span>{visible.length} 个竞品品牌档案</span></div><div className="directory-toolbar"><label>搜索品牌或业务<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="品牌、产品族、总部或市场" /></label><label>地区<select value={region} onChange={(event) => setRegion(event.target.value)}><option value="">全部地区</option>{regions.map((value) => <option key={value}>{value}</option>)}</select></label></div><div className="brand-directory">{visible.map((profile) => <article key={profile.brand} className="brand-card"><div><p>{profile.officialName}</p><h2>{profile.brand}</h2></div><dl><div><dt>总部/主体</dt><dd>{profile.headquarters}</dd></div><div><dt>主要产品族</dt><dd>{profile.productFamilies.join('、')}</dd></div><div><dt>船用 / LNG 定位</dt><dd>{profile.marineLngPositioning.join('、')}</dd></div></dl><button className="profile-button" onClick={() => onOpen(profile)}>查看完整档案</button><SourceLinks sources={profile.sources} heading="" /></article>)}</div>{!visible.length && <div className="empty-state"><h2>没有匹配的品牌档案</h2><p>请清除地区或关键词，查看全部资料。</p></div>}</section>
}
