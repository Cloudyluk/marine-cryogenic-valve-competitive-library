import { describe, expect, it } from 'vitest'
import { valveSeries } from '../data/competitors'
import { profileForBrand } from '../data/brandProfiles'
import { standardReferences } from '../data/standards'
import { defaultFilters } from '../data/types'
import { filterSeries, sortSeries, toggleComparison } from './selection'

describe('filterSeries', () => {
  it('keeps only −196 °C ball valves when both filters are selected', () => {
    const filters = { query: '', brand: '', region: '', type: '球阀', application: '', minTemperature: -196, classSociety: '' }
    expect(filterSeries(valveSeries, filters).every((item) => item.type === '球阀' && item.minTemperature !== null && item.minTemperature <= -196)).toBe(true)
  })

  it('matches a keyword against brand, model, application and medium', () => {
    expect(filterSeries(valveSeries, { ...defaultFilters, query: 'FGSS' }).length).toBeGreaterThan(0)
    expect(filterSeries(valveSeries, { ...defaultFilters, query: '液化气体' }).length).toBeGreaterThan(0)
  })

  it('sorts by evidence level without dropping product identifiers', () => {
    const sorted = sortSeries(valveSeries, 'evidence')
    expect(sorted[0]).toMatchObject({ brand: expect.any(String), model: expect.any(String) })
  })
})

describe('toggleComparison', () => {
  it('limits the comparison set to four entries', () => {
    expect(toggleComparison(['a', 'b', 'c', 'd'], 'e')).toEqual(['a', 'b', 'c', 'd'])
  })
})

describe('competitive coverage', () => {
  it('provides a navigable standard index with category and use boundary', () => {
    expect(standardReferences).toEqual(expect.arrayContaining([
      expect.objectContaining({ code: 'ISO 21011', category: '低温基础', role: expect.any(String), note: expect.any(String) }),
    ]))
  })

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
      'OMB CR-FGT',
      'OMB CR-TOB',
      'Parker Bestobell Cryoreg Cryogenic Pressure Regulator',
    ]))
  })

  it('maps every product brand to a source-backed brand profile', () => {
    expect(valveSeries.every((item) => {
      const profile = profileForBrand(item.brand)
      return Boolean(profile?.officialName && profile.sources.length && profile.verifiedAt)
    })).toBe(true)
  })

  it('includes the identified marine LNG competitors and named valve lines', () => {
    const namedProducts = valveSeries.map((item) => item.model)
    expect(namedProducts).toEqual(expect.arrayContaining([
      'S&S Valve Cryogenic Valves for LNG Carrier / FLNG / FSRU',
      'NAKAKITA Cryogenic (LNG) Butterfly Valve',
      'HEROSE Type 03841 Cryogenic Globe / Globe-Check Valve',
      'Mt.H HND-FGC (CC11C) 2-Way Cryogenic Pneumatic Control Valve',
      'CRYOSTAR VP Marine LNG Fuelling and Bunkering Equipment',
      'Tsunny Marine Cryogenic Gate Valve (Flanged Type)',
    ]))
  })

  it('keeps enriched company and manufacturing context for newly added competitors', () => {
    expect(profileForBrand('HEROSE')?.headquarters).toContain('Bad Oldesloe')
    expect(profileForBrand('CRYOSTAR')?.headquarters).toContain('Hésingue')
    expect(profileForBrand('CRYOSTAR')?.marketCoverage.join(' ')).toContain('7 个业务中心')
    expect(profileForBrand('Qublock Technology')?.manufacturing.join(' ')).toContain('Korea')
    expect(profileForBrand('Tsunny Group')?.marketCoverage.join(' ')).toContain('国际贸易')
  })

  it('keeps Cryostar marine-LNG equipment as a solution record with its official scope', () => {
    const cryostar = valveSeries.find((item) => item.id === 'cryostar-marine-bunkering')

    expect(cryostar).toMatchObject({
      construction: expect.arrayContaining(['泵、压缩机、换热器、再液化与再气化方案（官方手册）']),
      standards: expect.arrayContaining(['PED 97/23/CE Module H/H1（方案资料）', 'ATEX（方案资料）']),
    })
    expect(cryostar?.pressure).toBe('待厂家确认')
  })

  it('retains official model-level specifications recovered from competitor datasheets', () => {
    const fisher = valveSeries.find((item) => item.id === 'emerson-easy-e')
    const mccanna = valveSeries.find((item) => item.id === 'flowserve-mccanna')
    const gwc = valveSeries.find((item) => item.id === 'gwc-floating-ball')
    const raysGlobe = valveSeries.find((item) => item.id === 'rays-cryo-globe')
    const heroseSafety = valveSeries.find((item) => item.id === 'herose-06012-06016')
    const fisherIc2 = valveSeries.find((item) => item.id === 'emerson-fisher-ic2')
    const worcester = valveSeries.find((item) => item.id === 'flowserve-worcester')
    const gwcTopEntry = valveSeries.find((item) => item.id === 'gwc-trunnion-top-entry')
    const habonim = valveSeries.find((item) => item.id === 'habonim-c74')
    const mecaPy4 = valveSeries.find((item) => item.id === 'meca-inox-py4-cy')
    const kitz = valveSeries.find((item) => item.id === 'kitz-lng')
    const ombCrFgt = valveSeries.find((item) => item.id === 'omb-cr-fgt')
    const ombCrFgl = valveSeries.find((item) => item.id === 'omb-cr-fgl')
    const ombCrTob = valveSeries.find((item) => item.id === 'omb-cr-tob')
    const ombFgt = valveSeries.find((item) => item.id === 'omb-fgt')
    const ombFgl = valveSeries.find((item) => item.id === 'omb-fgl')
    const parkerCryoreg = valveSeries.find((item) => item.id === 'parker-bestobell-cryoreg')
    const cryoseal = valveSeries.find((item) => item.id === 'klinger-westad-cryoseal-2x')
    expect(fisher).toMatchObject({ minTemperature: -198, size: 'NPS 1–30（公开产品页）', connection: ['法兰式'] })
    expect(mccanna).toMatchObject({ pressure: 'PN20–110；Class 150–600（公开产品页）', size: 'DN15–200 / NPS 1/2–6（公开产品页）' })
    expect(gwc?.size).toBe('1/2–6 in / DN15–150（公开产品页）')
    expect(raysGlobe).toMatchObject({ pressure: 'Class 150–2500；PN10–420（公开产品页）', size: 'NPS 1/2–24 / DN15–600（公开产品页）' })
    expect(heroseSafety).toMatchObject({ size: 'GW 1/4、3/8、1/2 in（公开产品页）', pressure: 'PN63；整定压力 1–55 bar（公开产品页）' })
    expect(fisherIc2).toMatchObject({ minTemperature: -269, pressure: 'Class 600（公开新闻稿）', size: 'NPS 1–4 / DN25–100（公开新闻稿）' })
    expect(worcester).toMatchObject({ minTemperature: -253, pressure: '法兰式 Class 150–300；三片式 Class 600（公开产品页）' })
    expect(gwcTopEntry).toMatchObject({ minTemperature: -196, pressure: 'ANSI Class 150–2500（公开产品页）', size: '1/2–64 in / DN15–1600（公开产品页）' })
    expect(habonim).toMatchObject({ size: '1/2–8 in（公开产品页）', pressure: 'Class 300 / 50 bar / 750 psi（公开产品页）' })
    expect(mecaPy4).toMatchObject({ minTemperature: -196, size: 'DN08–150（公开产品资料）', pressure: 'PN25–100（按口径，公开产品资料）' })
    expect(kitz).toMatchObject({ minTemperature: -196, construction: expect.arrayContaining(['闸阀、截止阀、止回阀、球阀（官网产品线表述）']) })
    expect(ombCrFgt).toMatchObject({ minTemperature: -196, pressure: 'Class 150–2500（公开产品页）', size: '1/4–2 in（公开产品页）' })
    expect(ombCrFgt?.standards).toEqual(expect.arrayContaining(['API 602', 'ISO 15761', 'API 624（逸散性排放）', 'ISO 15848（逸散性排放）']))
    expect(ombCrFgl).toMatchObject({ minTemperature: -196, pressure: 'Class 150–2500（公开产品页）', size: '1/4–2 in（公开产品页）' })
    expect(ombCrTob).toMatchObject({ minTemperature: -196, pressure: 'Class 150–900（公开产品页）', size: '3–96 in（公开产品页）' })
    expect(ombFgt).toMatchObject({ type: '闸阀', pressure: 'Class 150–2500（公开产品页）', size: '1/4–4 in（公开产品页）' })
    expect(ombFgl).toMatchObject({ type: '截止阀', pressure: 'Class 150–4500（公开产品页）', size: '1/4–2 in（公开产品页）' })
    expect(parkerCryoreg).toMatchObject({ minTemperature: -196, pressure: '最高 25 bar / 360 psi（端连接相关，公开目录）', size: 'DN15（公开目录）' })
    expect(cryoseal?.construction).toEqual(expect.arrayContaining(['ASTM A351 CF3M/CF8M 阀体', 'ASTM A351 CF8M Stellite 堆焊阀板']))
  })
})
