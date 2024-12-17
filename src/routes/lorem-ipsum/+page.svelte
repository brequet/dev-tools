<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import ReadableCopyable from '$lib/components/ui/readable-copyable.svelte';
	import * as Select from '$lib/components/ui/select';
	import { generateLoremIpsum, type SizingOption } from '$lib/services/lorem-ipsum';

	let sizeInput = $state(20);

	const sizingOptions: SizingOption[] = ['Words', 'Phrases', 'Paragraphs'];
	let selectedFormattingOption = $state(sizingOptions[0]);

	let generatedText = $derived(generateLoremIpsum(sizeInput, selectedFormattingOption));
</script>

<div class="space-y-4">
	<div class="flex flex-row space-x-2 align-baseline">
		<Input
			id="size"
			type="number"
			bind:value={sizeInput}
			placeholder="Enter size"
			class="w-[150px]"
		/>

		<Select.Root type="single" name="jsonSpacing" bind:value={selectedFormattingOption}>
			<Select.Trigger class="w-[180px]">{selectedFormattingOption}</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.GroupHeading>Sizing Options</Select.GroupHeading>
					{#each sizingOptions as formattingOption}
						<Select.Item value={formattingOption} label={formattingOption}>
							{formattingOption}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>

	{#if generatedText.length > 0}
		<ReadableCopyable input={generatedText} />
	{/if}
</div>
