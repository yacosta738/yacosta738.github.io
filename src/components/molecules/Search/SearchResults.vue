<script setup lang="ts">
import { defineProps, type PropType } from "vue";
import type { Article } from "@models:Article.ts";
import type { FuseResult } from "fuse.js";

defineProps({
	results: {
		type: Array as PropType<Array<FuseResult<Article>>>,
		required: true,
	},
	noRecentSearchesText: {
		type: String,
		default: "No recent searches",
	},
});
</script>

<template>
	<div class="p-2 text-light-slate overflow-y-auto max-h-[500px]">
		<ul class="space-y-2">
			<li
				v-for="result in results"
				:key="result.item.id"
				class="p-2 my-1 border border-green-500/50 cursor-pointer rounded-lg"
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-gray-500 mr-2"
						>
							<path
								d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
							></path>
							<polyline points="14 2 14 8 20 8"></polyline>
						</svg>
						<a :href="`/posts/${result.item.url}`">{{ result.item.title }}</a>
					</div>
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-gray-500 mr-2"
						>
							<polygon
								points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
							></polygon>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-gray-500"
						>
							<rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
							<line x1="3" x2="21" y1="9" y2="9"></line>
							<path d="m9 16 3-3 3 3"></path>
						</svg>
					</div>
				</div>
				<p class="p-1 m-2">{{ result.item.description }}</p>
				<div class="flex justify-start items-center">
					<span
						v-for="tag in result.item.tags"
						:key="tag.id"
						class="flex justify-between items-center text-xs text-green-500 bg-lightest-navy border border-lightest-navy rounded-full px-2 py-1 mr-1"
						><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"
							/>
						</svg>
						{{ tag.data.title }}
					</span>
					<span
						v-for="category in result.item.categories"
						:key="category.id"
						class="flex justify-between items-center text-xs text-green-500 bg-lightest-navy border border-lightest-navy rounded-full px-2 py-1 mr-1"
						><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M7.885 10.23L12 3.463l4.115 6.769zm9.606 11q-1.558 0-2.64-1.08q-1.082-1.083-1.082-2.64q0-1.56 1.082-2.65q1.082-1.09 2.64-1.09t2.649 1.09q1.09 1.09 1.09 2.65q0 1.557-1.09 2.64q-1.09 1.08-2.65 1.08m-13.72-.5v-6.46h6.46v6.46z"
							/>
						</svg>
						{{ category.data.title }}
					</span>
				</div>
			</li>
		</ul>
		<template v-if="results.length === 0">
			<p class="text-center text-light-slate">{{ noRecentSearchesText }}</p>
		</template>
	</div>
</template>

<style scoped></style>
