<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { navItems, type NavItem } from '$lib/navigation';
	import { cn } from '$lib/utils';

	import { base } from '$app/paths';
	let {
		currentTool
	}: {
		currentTool: NavItem | undefined;
	} = $props();
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<a
			class="h-8 items-center rounded-md px-2 text-xl font-bold text-sidebar-foreground"
			href={base}
		>
			📐 Dev Tools
		</a>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navItems as navItem (navItem.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								class={cn(
									'relative', // Required for absolute positioning
									navItem.href == currentTool?.href &&
										'before:absolute before:right-0 before:top-0 before:h-full before:w-1.5 before:bg-primary'
								)}
							>
								{#snippet child({ props })}
									<a href={base + navItem.href} {...props}>
										<navItem.icon />
										<span>{navItem.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
