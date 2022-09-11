<template>
<div
			v-if="isOpen"
			@click.self="isOpen = false"
			@keyup.esc="isOpen = false"
			class="search-box-container"
		>
			<div
				class="flex justify-center items-center fixed top-5 lg:top-20 p-2.5 md:p-5 md:right-3 z-50 cursor-pointer text-md md:text-2xl"
				@click="isOpen = false"
			>
				<svg width="1em" height="1em" viewBox="0 0 36 36">
					<path
						fill="currentColor"
						d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm8 22.1a1.4 1.4 0 0 1-2 2l-6-6l-6 6.02a1.4 1.4 0 1 1-2-2l6-6.04l-6.17-6.22a1.4 1.4 0 1 1 2-2L18 16.1l6.17-6.17a1.4 1.4 0 1 1 2 2L20 18.08Z"
						class="clr-i-solid clr-i-solid-path-1"
					></path>
					<path fill="none" d="M0 0h36v36H0z"></path>
				</svg>
				<span class="my-0 md:mt-0.5">(ESC)</span>
			</div>
			<div
				class="absolute top-14 md:top-24 flex items-center justify-center shadow-xl w-3/4 md:w-1/2"
			>
				<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
				<input
					id="search-box"
					type="search"
					v-model="query"
					@keyup="performSearch()"
					@keyup.esc="isOpen = false"
					autofocus
					class="block p-4 pl-10 w-full text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-light-navy dark:border-lightest-navy dark:placeholder-gray-400 dark:text-lightest-slate dark:focus:ring-green-500 dark:focus:border-green-500"
					:placeholder="t('search-placeholder')"
					required
				/>
			</div>
			<div class="search-wrapper" v-if="query && query !== null">
				<h3
					class="text-center text-2xl md:text-5xl border-b border-green-500 text-lightest-slate mb-10"
				>
					{{
						results.length > 0 ? `Search phrase match ${results.length} elements` : `Search Results`
					}}
				</h3>
				<div class="overflow-y-auto">
					<div class="flex flex-col mb-2">
						<article v-if="results.length > 0" v-for="article in results" :key="article.id">
							<h2 class="text-3xl md:text-4xl text-center md:text-justify font-bold normal-case">
								<a :href="localizePath(article.url)" class="inline-link"> {{ article.title }}</a>
							</h2>
							<div class="flex flex-col lg:flex-row mb-16">
								<img
									:alt="article.title"
									class="object-cover lg:w-1/3 border border-green-500"
									:src="article.cover"
								/>
								<div class="text-justify m-4 md:mx-10 md:my-5 normal-case">
									{{ article.description }}
									<a :href="localizePath(article.url)" class="font-bold uppercase inline-link">{{
										t('read')
									}}</a>
								</div>
							</div>
						</article>
					</div>
					<div
						v-if="query && results.length === 0"
						class="flex flex-col justify-center items-center"
					>
						<svg width="10em" height="10em" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
							></path>
						</svg>
						<p class="text-light-slate text-2xl my-5">No values found</p>
					</div>
				</div>
			</div>
		</div>
</template>

<script setup lang="ts">
import { t } from 'i18next'
import { onMounted, PropType, Ref, ref, watch, computed } from 'vue'
import Fuse from 'fuse.js'
import { Article } from '../../models/Article'
import { localizePath } from '../../util/utilities'
import { useStore } from '@nanostores/vue';
import { generalStore, updateSearchModal } from '../../store'
const $generalStore = useStore(generalStore)

const isOpen = computed({
	get: () => $generalStore.value.searchModal,
	set: (value) => updateSearchModal(value)
})

const query = ref('')
const results = ref(Array<Article>())
const props = defineProps({
	articles: {
		type: Array as PropType<Article[]>,
		required: true
	}
})

let fuse: Fuse<Article>

const options = {
	keys: ['title', 'description', 'content', 'tags', 'categories']
}
watch(isOpen, (value) => {
	if (value) {
		query.value = ''
		results.value = []
	}
})

onMounted(() => {
	fuse = new Fuse(props.articles, options)
})

const performSearch = () => {
	if (query.value.length > 0) {
		results.value = fuse.search(query.value).map((result) => result.item)
	} else {
		results.value = []
	}
}

</script>

<style lang="scss">
.search-box-container {
	z-index: 50;
	@apply inset-0 h-screen w-full min-h-screen min-w-full absolute flex items-center justify-center bg-navy/95 backdrop-blur-xl;
}

.search-wrapper {
	z-index: 200;
	@apply flex flex-col items-center justify-center shadow-xl mx-2 md:mx-0 md:w-3/4 h-3/4 bg-navy/70 border-2 border-lightest-navy p-10
    rounded-md  absolute top-44 bg-blend-soft-light overflow-y-auto;
}
</style>
