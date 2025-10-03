<script lang="ts">
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type Props = WithoutChildren<WithElementRef<HTMLTextareaAttributes>> & {
		autofocus?: boolean;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		autofocus = false,
		class: className,
		...restProps
	}: Props = $props();

	$effect(() => {
		if (autofocus && ref) {
			ref.focus();
		}
	});
</script>

<textarea
	bind:this={ref}
	class={cn(
		'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:value
	{...restProps}
></textarea>
