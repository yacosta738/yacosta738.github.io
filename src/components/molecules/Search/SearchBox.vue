<script setup lang="ts">
import { computed, defineProps, type PropType, ref } from "vue";
import SearchTrigger from "./SearchTrigger.vue";
import SearchResults from "./SearchResults.vue";
import type { Article } from "@models:Article.ts";
import type {
	DocSearchTranslation,
	ModalTranslations,
} from "@i18n:search-translation.ts";
import { useFuse } from "@vueuse/integrations/useFuse";
import type { UseFuseOptions } from "@vueuse/integrations";
import Modal from "../Modal/Modal.vue";

const props = defineProps({
	id: {
		type: String,
		default: () => crypto.randomUUID(),
	},
	articles: {
		type: Array as PropType<Array<Article>>,
		required: true,
	},
	translations: {
		type: Object as PropType<DocSearchTranslation>,
		required: true,
	},
});

const searchString = ref("");

const options = computed<UseFuseOptions<Article>>(() => ({
	fuseOptions: {
		keys: ["title", "description", "author", "tags", "categories", "content"],
		includeMatches: true,
		threshold: 0.3,
		useExtendedSearch: true,
	},
}));

const { results } = useFuse(searchString, props.articles, options);

function getPlatformType() {
	const userAgent = navigator?.userAgent.toLowerCase() ?? "Unknown";

	if (userAgent.includes("windows")) {
		return "Windows";
	}
	if (userAgent.includes("mac")) {
		return "MacOS";
	}
	if (userAgent.includes("linux")) {
		return "Linux";
	}
	return "Unknown";
}

const platformType = getPlatformType();
const isShowModal = ref(false);

function closeModal() {
	isShowModal.value = false;
}

const modal = ref(props.translations.modal);
const searchBox = ref(modal.value?.searchBox);

function showModal() {
	isShowModal.value = true;
}
const getModalTranslations = (
	value: ModalTranslations,
	key: string,
): string => {
	if (!value) return "";
	return value[key].toString();
};
</script>

<template>
	<SearchTrigger :target="id" :text="translations.button" @toggle="showModal" />
	<!-- Main modal -->
	<Modal v-if="isShowModal" @close="closeModal">
		<template #header>
			<h3 class="text-xl font-semibold">
				{{ getModalTranslations(searchBox as ModalTranslations, 'placeholder') }}
			</h3>
		</template>
		<template #body>
			<div class="p-4 md:p-5 space-y-4">
				<div class="flex flex-col">
					<div class="p-1">
						<label for="search-input" class="mb-2 text-sm font-medium sr-only">Search</label>
						<div class="relative">
							<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<svg
									class="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								id="search-input"
								v-model="searchString"
								type="search"
								class="block caret-green-500 w-full p-4 ps-10 text-sm text-light-slate border border-gray-300 rounded-lg bg-navy/50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
								:placeholder="getModalTranslations(searchBox as ModalTranslations, 'placeholder')"
								required
							/>
							<kbd
								class="absolute end-2.5 bottom-2.5 px-2 py-1.5 text-xs font-semibold text-light-slate bg-lightest-navy border border-light-navy rounded-lg"
								>Esc</kbd
							>
						</div>
					</div>
					<SearchResults
						:results="results"
						:no-recent-searches-text="
							getModalTranslations(modal?.startScreen as ModalTranslations, 'noRecentSearchesText')
						"
					/>
				</div>
			</div>
		</template>
		<template #footer>
			<span>
				<kbd
					class="px-2 py-1.5 text-xs font-semibold text-light-slate bg-lightest-navy border border-light-navy rounded-lg"
				>
					{{ platformType === 'MacOS' ? '⌘' : 'Ctrl' }}</kbd
				>
				+
				<kbd
					class="px-2 py-1.5 text-xs font-semibold text-light-slate bg-lightest-navy border border-light-navy rounded-lg"
					>K</kbd
				>
				{{ getModalTranslations(modal?.footer as ModalTranslations, 'shortcutLabel') }}
			</span>
			<span class="mx-2"
				><kbd
					class="px-2 py-1.5 text-xs font-semibold text-light-slate bg-lightest-navy border border-light-navy rounded-lg"
					>Esc</kbd
				>
				{{ getModalTranslations(modal?.footer as ModalTranslations, 'closeText') }}
			</span>
		</template>
	</Modal>
</template>
