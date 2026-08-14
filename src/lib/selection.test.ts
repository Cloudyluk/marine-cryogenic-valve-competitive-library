import { describe, expect, it } from 'vitest'
import { valveSeries } from '../data/competitors'
import { filterSeries, toggleComparison } from './selection'

describe('filterSeries', () => {
  it('keeps only −196 °C ball valves when both filters are selected', () => {
    const filters = { query: '', brand: '', region: '', type: '球阀', application: '', minTemperature: -196, classSociety: '' }
    expect(filterSeries(valveSeries, filters).every((item) => item.type === '球阀' && item.minTemperature !== null && item.minTemperature <= -196)).toBe(true)
  })
})

describe('toggleComparison', () => {
  it('limits the comparison set to four entries', () => {
    expect(toggleComparison(['a', 'b', 'c', 'd'], 'e')).toEqual(['a', 'b', 'c', 'd'])
  })
})
