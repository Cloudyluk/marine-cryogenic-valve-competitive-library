import type { EvidenceLevel } from '../data/types'

export function StatusTag({ value }: { value: EvidenceLevel }) {
  const className = value === '公开证实' ? 'verified' : value === '公开资料推断' ? 'inferred' : 'pending'
  return <span className={`status-tag ${className}`}>{value}</span>
}
