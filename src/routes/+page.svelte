<script>
	import * as Card from '$lib/components/ui/card';
	import { BASE_PATH, navItems } from '$lib/navigation';
</script>

<div class="container mx-auto p-4">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each navItems as navItem (navItem.title)}
			<a href={BASE_PATH + navItem.href} class="block no-underline">
				<Card.Root class="h-full transition-transform hover:scale-[1.02]">
					<Card.Header>
						<Card.Title class="flex flex-col gap-y-4">
							<navItem.icon size="30" class="text-primary" />
							<span>{navItem.title}</span>
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">
							{navItem.description}
						</p>
					</Card.Content>
				</Card.Root>
			</a>
		{/each}
	</div>
</div>
