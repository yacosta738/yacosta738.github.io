<template>
	<div>
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			class="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
			@click="isOpen = true"
		>
			<path
				fill="currentColor"
				d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
			></path>
		</svg>

		<div
			v-if="isOpen"
			@click.self="isOpen = false"
			@keyup.esc="isOpen = false"
			class="search-box-container"
		>
			<div
				class="flex justify-center items-center fixed top-5 md:top-24 p-2.5 md:p-5 md:right-3 z-50 cursor-pointer text-2xl"
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
			<div class="search-box">
				<svg width="1em" height="1em" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
					></path>
				</svg>
				<input
					id="search-box"
					type="text"
					v-model="query"
					@keyup="performSearch()"
					@keyup.esc="isOpen = false"
					autofocus
					class="w-full border-none outline-none text-xl bg-transparent appearance-none"
				/>
			</div>
			<div class="search-wrapper" v-if="query && query !== null">
				<h3
					class="text-center text-2xl md:text-5xl border-b border-green-500 text-lightest-slate mb-10"
				>
					{{
						results.length > 0 ? `Search phrase match ${results.length} pages` : `Search Results`
					}}
				</h3>
				<div class="overflow-y-auto">
					<div
						v-if="results.length > 0"
						v-for="article in results"
						:key="article.title"
						class="flex flex-col mb-2"
					>
						<article v-for="article in articles" :key="article.title">
							<h2 class="text-3xl md:text-4xl text-center md:text-justify font-bold tracking-wider">
								<a :href="localizePath(article.url)" class="inline-link"> {{ article.title }}</a>
							</h2>
							<div class="flex flex-col lg:flex-row mb-16">
								<img
									:alt="article.title"
									class="object-cover lg:w-1/3 border border-green-500"
									:src="article.cover"
								/>
								<div class="text-justify m-4 md:mx-10 md:my-5">
									{{ article.description }}
									<a :href="localizePath(article.url)" class="font-bold uppercase inline-link"
										>{{t('read')}}</a
									>
								</div>
							</div>
						</article>
					</div>
					<div
						v-if="query && results.length === 0"
						class="flex flex-col justify-center items-center"
					>
						<svg width="1em" height="1em" viewBox="0 0 24 24">
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
	</div>
</template>

<script setup lang="ts">
	import { t} from 'i18next'
import { onMounted, PropType, Ref, ref, watch } from 'vue'
import Fuse from 'fuse.js'
import { Article } from '../../models/Article'
import { localizePath } from '../../util/utilities'
const isOpen = ref(false)
const query = ref('')
const results: Ref<Article[]> = ref([])
const props = defineProps({
	articles: {
		type: Array as PropType<Article[]>,
		required: true
	}
})

let fuse: Fuse<Article> | undefined
const options = {
	includeScore: true,
	keys: ['title', 'description', 'content']
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
		results.value = fuse?.search(query.value).map((result) => result.item) ?? []
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

.search-box {
	z-index: 200;
	@apply bg-navy bg-opacity-70 border-2 border-dark-navy rounded-md p-2
    absolute top-16 md:top-24 flex items-center justify-center shadow-xl w-3/4 md:w-1/2;
}

.search-wrapper {
	z-index: 200;
	@apply flex flex-col items-center justify-center shadow-xl mx-2 md:mx-0 md:w-3/4 h-3/4 border-2 border-dark-navy bg-opacity-70 p-10
    rounded-md bg-navy absolute top-44 bg-blend-soft-light overflow-y-auto;
}
</style>
