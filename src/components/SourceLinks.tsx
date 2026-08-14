import type { SourceLink } from '../data/types'

export function SourceLinks({ sources, heading = '公开来源' }: { sources: SourceLink[]; heading?: string }) {
  if (!sources.length) return null
  return <section className="source-links"><h3>{heading}</h3>{sources.map((source) => <a className="source-link" key={source.url} href={source.url} target="_blank" rel="noreferrer">官网资料：{source.label} ↗</a>)}</section>
}
