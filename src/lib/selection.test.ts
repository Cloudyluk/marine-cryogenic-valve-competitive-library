import { describe, expect, it } from 'vitest'
import { valveSeries } from '../data/competitors'
import { profileForBrand } from '../data/brandProfiles'
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

describe('competitive coverage', () => {
  it('keeps brand and public model or series on every international record', () => {
    expect(valveSeries.length).toBeGreaterThanOrEqual(20)
    expect(new Set(valveSeries.map((item) => item.brand)).size).toBeGreaterThanOrEqual(12)
    expect(valveSeries.every((item) => item.brand.trim().length > 0 && item.model.trim().length > 0 && item.sources.length > 0)).toBe(true)
  })

  it('retains source-backed named LNG products for the established marine brands', () => {
    const namedProducts = valveSeries.map((item) => item.model)
    expect(namedProducts).toEqual(expect.arrayContaining([
      'Parker Bestobell Cryogenic Globe Valves',
      'KLINGER Westad Cryoseal 2X',
      'OMB FGT',
      'OMB FGL',
      'OMB CR-TOB',
    ]))
  })

  it('maps every product brand to a source-backed brand profile', () => {
    expect(valveSeries.every((item) => {
      const profile = profileForBrand(item.brand)
      return Boolean(profile?.officialName && profile.sources.length && profile.verifiedAt)
    })).toBe(true)
  })
})
