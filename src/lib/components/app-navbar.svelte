<script lang="ts">
	import { goto } from '$app/navigation';
	import GithubIcon from '$lib/assets/github-icon.svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { navItems } from '$lib/navigation';
	import { House, Search } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';

	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}

	function navigateTo(href: string) {
		open = false;
		goto(href);
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<div class="flex flex-row items-center justify-between gap-4">
	<div>
		<Sidebar.Trigger />

		<Button variant="ghost" size="icon" href={'/'}>
			<House class="h-4 w-4" />
			<span class="sr-only">Go to home page</span>
		</Button>

		<Button class="w-80 justify-start" variant="secondary" onclick={() => (open = true)}>
			<Search />
			Search
			<span class="rounded-md border p-1">Ctrl + k</span>
		</Button>
	</div>
	<a
		href="https://github.com/brequet/dev-tools"
		target="_blank"
		rel="noopener noreferrer"
		class="block h-6 w-6 text-gray-600 hover:text-gray-900"
	>
		<GithubIcon />
	</a>
</div>

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Tools">
			{#each navItems as navItem (navItem.title)}
				<Command.Item onclick={() => navigateTo(navItem.href)}>
					<div class="flex items-center gap-4">
						<navItem.icon size="20" class="text-primary" />
						<div class="flex flex-col">
							<span class="text-base font-medium text-primary-foreground">
								{navItem.title}
							</span>
							<span class="text-sm text-muted-foreground">
								{navItem.description}
							</span>
						</div>
					</div>
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
