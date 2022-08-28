<script setup lang="ts">
import { onMounted } from 'vue'
import { t } from 'i18next'
import {
  generalStore,
  updateDrawer,
  updateShowNavbar,
  toggleSearchModal,
} from '@store:index'
import { localizePath } from '@util:utilities'
import { useStore } from '@nanostores/vue'

const $generalStore = useStore(generalStore)
interface Menu {
  title: string
  link: string
  dataCypress: string
}
const navMenus: Menu[] = [
  {
    title: 'about',
    link: '/#about',
    dataCypress: 'about',
  },
  {
    title: 'experience',
    link: '/#jobs',
    dataCypress: 'jobs',
  },
  {
    title: 'work',
    link: '/#projects',
    dataCypress: 'projects',
  },
  {
    title: 'last-articles',
    link: '/#last3articles',
    dataCypress: 'last3articles',
  },
  {
    title: 'contact',
    link: '/#contact',
    dataCypress: 'contact',
  },
  {
    title: 'blog',
    link: '/blog',
    dataCypress: 'blog',
  },
]
const addEventToClassName = (
  className: string,
  func: Function,
  event = 'click',
): void => {
  const elements = Array.from(document.querySelectorAll(className))
  elements.forEach((element) => element.addEventListener(event, () => func()))
}

onMounted(() => {
  addEventToClassName('close-menu-dummy', closeMenu)
})

const openSearchBox = (): void => {
  toggleSearchModal()
  updateDrawer(false)
  if (!$generalStore.value.searchModal) return
  const searchBox: HTMLInputElement = document.querySelector(
    '#search-box',
  ) as HTMLInputElement
  if (searchBox) searchBox.focus()
}

const closeMenu = (): void => {
  updateDrawer(false)
  setTimeout(() => {
    updateShowNavbar(true)
  }, 2000)
}
</script>

<template>
  <ul
    class="menu-list"
    :class="$generalStore.drawer ? 'block' : 'hidden'"
    data-cypress="menu"
  >
    <li class="mb-6 lg:mb-0">
      <div
        v-if="!$generalStore.showSide"
        class="cursor-pointer text-lightest-slate hover:text-gray-600"
      >
        <!-- <SvgIcon
          name="search"
          class="mt-3 cursor-pointer"
          @click="openSearchBox()"
        /> -->
        Search
      </div>
    </li>
    <li>
      <ol
        class="order-list mt-8 items-center space-y-6 lg:mt-0 lg:flex lg:w-auto lg:flex-initial lg:space-x-8 lg:space-y-0"
      >
        <li v-for="(menu, i) in navMenus" :key="i">
          <a :href="localizePath(menu.link)" class="close-menu-dummy">
            {{ t('menus.' + menu.title) }}
          </a>
        </li>
      </ol>
    </li>
    <li>
      <slot name="language-selector"></slot>
    </li>
    <li>
      <a
        href="files/yuniel_acosta_cv.pdf"
        target="_blank"
        class="resume-button"
      >
        {{ t('resume') }}
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.menu-list {
  @apply mt-8 block w-full flex-grow origin-top-right items-center
  space-y-6 overflow-y-auto font-bold uppercase tracking-wide lg:mt-0 lg:flex
  lg:w-auto lg:flex-initial lg:space-x-8 lg:space-y-0;
}
</style>
