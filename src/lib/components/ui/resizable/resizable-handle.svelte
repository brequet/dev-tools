<script lang="ts">
	import { PaneResizer, type PaneResizerProps } from "paneforge";
	import GripVertical from "lucide-svelte/icons/grip-vertical";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		withHandle = false,
		...restProps
	}: PaneResizerProps & { withHandle?: boolean } = $props();
</script>

<PaneResizer
	class={cn(
		"bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:-left-1 after:-right-1 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:-top-1 data-[direction=vertical]:after:-bottom-1 data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:right-0 [&[data-direction=vertical]>div]:rotate-90",
		className
	)}
	{...restProps}
>
	{#if withHandle}
		<div
			class="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-sm border"
		>
			<GripVertical class="h-2.5 w-2.5" />
		</div>
	{/if}
</PaneResizer>
