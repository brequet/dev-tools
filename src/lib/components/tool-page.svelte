<script lang="ts">
	import { type NavItem } from '$lib/navigation';
	import type { Snippet } from 'svelte';

	let {
		children,
		currentTool
	}: {
		children: Snippet;
		currentTool: NavItem;
	} = $props();
</script>

<svelte:head>
    <title>{currentTool.title}</title> 
</svelte:head>

<div class="container mx-auto p-4">
	<h2 class="text-3xl font-bold">{currentTool?.title}</h2>
	<p class="text-lg text-muted-foreground">
		{currentTool?.description}
	</p>
	<div class="mt-6">
		{@render children?.()}
	</div>
</div>
