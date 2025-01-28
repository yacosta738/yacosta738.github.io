<template>
	<div class="flex justify-center items-center">
		<div class="bg-gray-900 bg-opacity-90 fixed inset-0 z-40 h-screen w-screen" />
		<div
			ref="modalRef"
			class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-screen"
			tabindex="0"
			aria-hidden="true"
			@click.self="clickOutside"
			@keyup.esc="closeWithEsc"
		>
			<div :class="`${modalSizeClasses[size]}`" class="relative p-4 w-full max-h-full">
				<!-- Modal content -->
				<div class="relative bg-lightest-navy border-light-navy rounded-lg shadow">
					<!-- Modal header -->
					<header
						:class="$slots.header ? 'border-b border-gray-200 dark:border-gray-600' : ''"
						class="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-navy/50"
					>
						<slot name="header" />
						<button
							v-if="!persistent"
							type="button"
							class="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-lightest-slate hover:text-light-slate"
							@click="closeModal"
						>
							<slot name="close-icon">
								<svg
									class="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
							</slot>
							<span class="sr-only">Close modal</span>
						</button>
					</header>
					<!-- Modal body -->
					<slot name="body" />
					<!-- Modal footer -->
					<footer
						v-if="$slots.footer"
						class="bg-navy/50 p-4 border-t border-light-slate/50 text-sm text-light-slate w-full h-full"
					>
						<slot name="footer" />
					</footer>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import type { ModalSize } from "./types";

interface ModalProps {
	notEscapable?: boolean;
	persistent?: boolean;
	size?: ModalSize;
}

const props = withDefaults(defineProps<ModalProps>(), {
	notEscapable: false,
	persistent: false,
	size: "5xl",
});

const emit = defineEmits(["close", "click:outside"]);
const modalSizeClasses = {
	xs: "max-w-xs",
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl",
	"6xl": "max-w-6xl",
	"7xl": "max-w-7xl",
	screen: "max-w-screen",
};

function closeModal() {
	document.body.style.overflow = "auto";
	emit("close");
}

function clickOutside() {
	if (!props.persistent) {
		emit("click:outside");
		closeModal();
	}
}

function closeWithEsc() {
	if (!props.notEscapable && !props.persistent) closeModal();
}

const modalRef: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
	if (modalRef.value) {
		modalRef.value.focus();
		document.body.style.overflow = "hidden";
	}
});

onUnmounted(() => {
	document.body.style.overflow = "auto";
});
</script>
