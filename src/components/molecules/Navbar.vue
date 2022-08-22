<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  breakpointsTailwind,
  onClickOutside,
  useBreakpoints,
} from '@vueuse/core'
import Menus from './Menus.vue'
import { generalStore, updateDrawer, toggleDrawer, updateShowNavbar } from '@store:index';
import { useStore } from '@nanostores/vue'

const useGeneralStore = useStore(generalStore)
const scrollDirection = ref('DOWN')
const lastScrollPosition = ref(0)

const breakpoints = useBreakpoints(breakpointsTailwind)

const mdAndLarger = breakpoints.greater('md')

const showNavbar = computed({
  get() {
    return useGeneralStore.value.showNavbar
  },
  set(show: boolean) {
    updateShowNavbar(show)
  },
})
watch(mdAndLarger, () => {
  if (useGeneralStore.drawer && mdAndLarger.value) {
    toggleDrawer()
  }
})

const onScroll = () => {
  const currentScrollPosition =
    window.scrollY || document.documentElement.scrollTop
  if (currentScrollPosition < 0 || useGeneralStore.value.drawer) return

  showNavbar.value = currentScrollPosition < lastScrollPosition.value
  scrollDirection.value =
    currentScrollPosition < lastScrollPosition.value ? 'UP' : 'DOWN'
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const navMenu = ref(null)

onClickOutside(navMenu, () => {
  updateDrawer(false)
})
</script>

<template>
  <header
    class="fixed z-50 w-full"
    :class="{
      'navbar--hidden': !showNavbar,
      'navbar--show': scrollDirection === 'UP' && lastScrollPosition !== 0,
    }"
  >
    <nav
      id="acosta-navbar"
      class="relative flex w-full flex-wrap items-center justify-between py-2 md:py-4"
    >
      <a href="/" class="my-0 border-none py-0">
        <img src="/logo.svg" class="my-0 w-12 py-0" alt="logo" />
      </a>
      <div class="z-50 block lg:hidden">
        <svg
          ref="menu-svg"
          class="ham hamRotate ham7"
          :class="{ 'active-menu': useGeneralStore.drawer }"
          viewBox="0 0 100 100"
          width="60"
          @click="toggleDrawer()"
        >
          <path
            class="line top"
            d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
          />
          <path class="line middle" d="m 70,50 h -40" />
          <path
            class="line bottom"
            d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
          />
        </svg>
      </div>
      <div class="hidden lg:block">
        <Menus />
      </div>
      <div
        v-if="useGeneralStore.drawer"
        ref="navMenu"
        :class="{
          'navbar-menu-open': useGeneralStore.drawer,
          'navbar-menu-close': !useGeneralStore.drawer,
        }"
        class="navbar-menu absolute top-0 right-0 z-40 -mx-14 h-screen w-64 flex-grow overflow-y-hidden bg-light-navy px-4 py-8 md:pb-0"
      >
        <Menus />
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.navbar-menu {
  transition: all 530ms ease-out;
}

.navbar-menu-open {
  transform: translateX(0%);
}

.navbar-menu-close {
  transform: translateX(100%);
}

.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.hamRotate.active-menu {
  transform: rotate(45deg);
}

.hamRotate180.active-menu {
  transform: rotate(180deg);
}

.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #64ffda;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham7 {
  .top {
    stroke-dasharray: 40 82;
  }

  .middle {
    stroke-dasharray: 30 111;
  }

  .bottom {
    stroke-dasharray: 20 161;
  }
}

.ham7.active-menu {
  .top {
    stroke-dasharray: 40 82;
    stroke-dashoffset: -62px;
  }

  .middle {
    stroke-dasharray: 40 60;
    stroke-dashoffset: 23px;
  }

  .bottom {
    stroke-dasharray: 40 82;
    stroke-dashoffset: -82px;
  }
}
</style>
