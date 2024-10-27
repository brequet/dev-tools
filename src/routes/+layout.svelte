<script lang="ts">
	import { page } from '$app/stores';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import ToolPage from '$lib/components/tool-page.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { getNavItem } from '$lib/navigation';
	import '../app.css';

	let { children } = $props();

	let currentSegment = $derived($page.url.pathname.split('/').filter(Boolean).at(-1) || '');
	let currentTool = $derived(getNavItem(currentSegment));
</script>

<Sidebar.Provider>
	<AppSidebar {currentTool} />
	<main class="h-screen flex-1 overflow-y-auto p-6">
		{#if currentTool != null}
			<ToolPage {currentTool}>
				{@render children?.()}
			</ToolPage>
		{:else}
			{@render children?.()}
		{/if}
	</main>
</Sidebar.Provider>
