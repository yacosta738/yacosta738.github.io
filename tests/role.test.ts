import { assert, expect, test } from 'vitest'
import { IRole, Role } from '../src/models/Job'
import { range } from '../src/utils/role-range'

const role: IRole = new Role({
	role: 'Senior Software Engineer',
	startDate: '2020-01-01',
	endDate: '2020-12-31',
	achievements: ['Achievement 1', 'Achievement 2']
})

test('range role dates', () => {
	const rangeDate = range(role)
	expect(rangeDate).toBe('Wed Jan 01 2020 - Thu Dec 31 2020')
	assert.equal(rangeDate, 'Wed Jan 01 2020 - Thu Dec 31 2020')
})

test('range role dates with no end date', () => {
	const rangeDate = range({ ...role, endDate: '' })
	expect(rangeDate).toBe('Wed Jan 01 2020 - Present')
	assert.equal(rangeDate, 'Wed Jan 01 2020 - Present')
})
