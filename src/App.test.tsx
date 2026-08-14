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
