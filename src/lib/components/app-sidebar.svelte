<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { navItems } from '$lib/navigation';
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<a class="h-8 items-center rounded-md px-2 text-xl font-bold text-sidebar-foreground" href="/">
			🪛 Dev Tools
		</a>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navItems as navItem (navItem.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={navItem.href} {...props}>
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
