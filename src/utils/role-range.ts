import { t } from 'i18next'
import { Role } from '../models/Job'

export const range = (rol: Role): string => {
	const date = rol?.startDate ? new Date(rol.startDate) : new Date()
	return `${date.toDateString()} - ${
		rol.endDate ? new Date(rol.endDate).toDateString() : t('current')
	}`
}
