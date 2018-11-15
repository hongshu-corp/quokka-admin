import { buildSearchForm } from '@/components/smartAnt/helpers/bulder.js'
import data from './data/schema.js'

const mockT = jest.fn(x => x)

describe('buildSearchForm', () => {
  it('only name and email can be searched', () => {
    const result = buildSearchForm(data, mockT)

    console.log(result)
  })
})
