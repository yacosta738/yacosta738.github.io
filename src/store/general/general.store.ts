import { atom } from 'nanostores'
const SHOW_ADS_BANNER = 'SHOW_ADS_BANNER'
const getShowAdsBanner = (): boolean => {
	const adsBanner: string | null = localStorage.getItem(SHOW_ADS_BANNER)
	if (adsBanner === null) {
		localStorage.setItem(SHOW_ADS_BANNER, 'true')
		return true
	}
	return adsBanner === 'true'
}

export interface IGeneralStore {
	drawer: boolean
	showNavbar: boolean
	showAdsBanner: boolean
	showSide: boolean
	loading: boolean
	firstTimeLoading: boolean
	swStatus: string
	searchModal: boolean
}

const generalStore = atom<IGeneralStore>({
	drawer: false,
	showNavbar: true,
	showAdsBanner: getShowAdsBanner(),
	showSide: true,
	loading: false,
	firstTimeLoading: true,
	swStatus: 'pending',
	searchModal: false
})

const updateShowNavbar = (showNavbar: boolean) => {
	generalStore.set({ ...generalStore.get(), showNavbar })
}

const toggleShowAdsBanner = () => {
	const { showAdsBanner } = generalStore.get()
	localStorage.setItem(SHOW_ADS_BANNER, String(!showAdsBanner))
	generalStore.set({ ...generalStore.get(), showAdsBanner: !showAdsBanner })
}

const updateDrawer = (drawer: boolean) => {
	generalStore.set({ ...generalStore.get(), drawer })
}
const toggleDrawer = () => {
	updateDrawer(!generalStore.get().drawer)
}

const updateSearchModal = (searchModal: boolean) => {
	generalStore.set({ ...generalStore.get(), searchModal })
}

export {
	generalStore,
	updateDrawer,
	updateShowNavbar,
	toggleDrawer,
	updateSearchModal,
	toggleShowAdsBanner
}
