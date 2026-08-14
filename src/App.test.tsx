import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

it('filters by valve type and opens a selected product detail', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.selectOptions(screen.getByLabelText('阀型'), '球阀')
  await user.click(screen.getAllByRole('button', { name: '查看详情' })[0])
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(screen.getByText('公开来源')).toBeInTheDocument()
})

it('keeps brand and model in the comparison list', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getAllByLabelText('加入对比')[0])
  expect(screen.getByText(/纽威（Neway） · Cryogenic Gate Valve/)).toBeInTheDocument()
})

it('opens the associated brand profile from a product detail', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getAllByRole('button', { name: '查看详情' })[0])
  await user.click(screen.getByRole('button', { name: '查看品牌档案' }))
  expect(screen.getByRole('dialog', { name: '品牌档案' })).toBeInTheDocument()
  expect(screen.getByText('Neway Valve (Suzhou) Co., Ltd.')).toBeInTheDocument()
})

it('searches products and shows an explicit no-results reset action', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.type(screen.getByLabelText('搜索产品或品牌'), 'not-a-valve')
  expect(screen.getByRole('button', { name: '重置条件' })).toBeInTheDocument()
})

it('opens comparison centre with brand and model for selected products', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getAllByLabelText('加入对比')[0])
  await user.click(screen.getAllByLabelText('加入对比')[1])
  await user.click(screen.getByRole('button', { name: '开始对比' }))
  expect(screen.getByRole('heading', { name: '对比中心' })).toBeInTheDocument()
  expect(screen.getByText(/纽威（Neway） · Cryogenic Gate Valve/)).toBeInTheDocument()
})

it('opens the brand directory with official source links', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('link', { name: '品牌情报' }))
  expect(screen.getByRole('heading', { name: '品牌情报' })).toBeInTheDocument()
  expect(screen.getAllByRole('link', { name: /官网资料/ })[0]).toHaveAttribute('target', '_blank')
})
