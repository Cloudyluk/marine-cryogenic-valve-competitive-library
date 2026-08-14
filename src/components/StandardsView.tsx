import type { StandardReference } from '../data/standards'

export function StandardsView({ items }: { items: StandardReference[] }) {
  const categories = [...new Set(items.map((item) => item.category))]
  return <section className="workspace standards-workspace"><div className="workspace-heading"><div><p>选型与验收参考</p><h1>标准索引</h1></div><span>仅作资料导航，不替代项目规范</span></div><div className="standards-list">{categories.map((category) => <section key={category}><h2>{category}</h2>{items.filter((item) => item.category === category).map((item) => <article key={item.id}><strong>{item.code}</strong><div><h3>{item.title}</h3><p>{item.role}</p><small>{item.note}</small></div></article>)}</section>)}</div></section>
}
