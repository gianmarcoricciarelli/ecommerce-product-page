import type { Ref } from "vue";
import { onMounted, onUnmounted, ref } from "vue";

const MOBILE_THRESHOLD = 375;

export function useDetectMobileDevice(domElement: Element): { isMobile: Ref<boolean> } {
    const isMobile = ref(false);

    let observer: ResizeObserver | undefined;

    onMounted(() => {
        observer = new ResizeObserver(([entry]: ResizeObserverEntry[]): void => {
            if (entry.contentRect.width > MOBILE_THRESHOLD) {
                isMobile.value = false;
            } else {
                isMobile.value = true;
            }
        });
        observer.observe(domElement);
    });
    onUnmounted(() => {
        observer.disconnect();
        observer = undefined;
    });

    return {
        isMobile,
    };
}
