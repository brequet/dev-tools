<script lang="ts">
	import CodeViewer from '$lib/components/code-viewer.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { processText, type FormatterResult } from '$lib/services/formatter';
	import { localStore } from '$lib/store/localStore.svelte';
	import { cn } from '$lib/utils';

	const formattingOptions = [{ value: 'Format' }, { value: 'Minify' }];
	let selectedFormattingOption = localStore(
		'text-formatter.formattingOption',
		formattingOptions[0].value
	);

	const spacingOptions = [{ value: '2' }, { value: '4' }, { value: '8' }];
	let selectedSpacingOption = localStore('text-formatter.spacing', spacingOptions[0].value);

	let inputText = $state('');

	let output: FormatterResult = $derived(
		processText(
			inputText,
			selectedFormattingOption.value as 'Format' | 'Minify',
			Number(selectedSpacingOption.value)
		)
	);
</script>

<div class="space-y-4">
	<div class="flex gap-4">
		<Select.Root type="single" name="formattingOption" bind:value={selectedFormattingOption.value}>
			<Select.Trigger class="w-[180px]">{selectedFormattingOption.value}</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.GroupHeading>Formatting Option</Select.GroupHeading>
					{#each formattingOptions as option (option.value)}
						<Select.Item value={option.value} label={option.value}>
							{option.value}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>

		{#if selectedFormattingOption.value === 'Format'}
			<Select.Root type="single" name="spacing" bind:value={selectedSpacingOption.value}>
				<Select.Trigger class="w-[180px]">{selectedSpacingOption.value} Spaces</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.GroupHeading>Spacing</Select.GroupHeading>
						{#each spacingOptions as option (option.value)}
							<Select.Item value={option.value} label={`${option.value} Spaces`}>
								{option.value}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		{/if}
	</div>

	<Textarea
		bind:value={inputText}
		placeholder="Paste your JSON or XML here..."
		rows={15}
		class={cn(
			'font-mono',
			inputText.length > 0 && output.error && 'focus:ring-red-500 focus-visible:ring-red-500'
		)}
	/>

	{#if inputText.length > 0}
		{#if output.error}
			<Alert.Root variant="destructive">
				<Alert.Title>Invalid Format</Alert.Title>
				<Alert.Description class="whitespace-pre-wrap">{output.error}</Alert.Description>
			</Alert.Root>
		{:else if output.text}
			<CodeViewer code={output.text} language={output.language} />
		{/if}
	{/if}
</div>
