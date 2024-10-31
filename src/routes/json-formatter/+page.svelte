<script lang="ts">
	import CodeViewer from '$lib/components/code-viewer.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { formatJson, minifyJson } from '$lib/services/json';
	import { localStore } from '$lib/store/localStore.svelte';
	import { cn } from '$lib/utils';

	const formattingOptions = [{ value: 'Format' }, { value: 'Minify' }];
	let selectedFormattingOption = localStore(
		'json-formatter.formattingOption',
		formattingOptions[0].value
	);

	const jsonSpacingOptions = [{ value: '2' }, { value: '4' }, { value: '8' }];
	let selectedJsonSpacingOption = localStore(
		'json-formatter.jsonSpacing',
		jsonSpacingOptions[0].value
	);

	let inputJson = $state('');
	let outputJson = $derived(
		selectedFormattingOption.value === 'Minify'
			? minifyJson(inputJson)
			: formatJson(inputJson, Number(selectedJsonSpacingOption.value))
	);
</script>

<div class="space-y-4">
	<div class="flex gap-4">
		<Select.Root type="single" name="jsonSpacing" bind:value={selectedFormattingOption.value}>
			<Select.Trigger class="w-[180px]">{selectedFormattingOption.value}</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.GroupHeading>Formatting Option</Select.GroupHeading>
					{#each formattingOptions as formattingOption}
						<Select.Item value={formattingOption.value} label={formattingOption.value}>
							{formattingOption.value}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>

		{#if selectedFormattingOption.value === 'Format'}
			<Select.Root type="single" name="jsonSpacing" bind:value={selectedJsonSpacingOption.value}>
				<Select.Trigger class="w-[180px]">{selectedJsonSpacingOption.value}</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.GroupHeading>JSON Spacing</Select.GroupHeading>
						{#each jsonSpacingOptions as spacingOption}
							<Select.Item value={spacingOption.value} label={`${spacingOption.value}`}>
								{spacingOption.value}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		{/if}
	</div>

	<Textarea
		bind:value={inputJson}
		placeholder="Paste your JSON here..."
		rows={15}
		class={cn(
			'font-mono',
			inputJson.length > 0 && outputJson.error && 'focus:ring-red-500 focus-visible:ring-red-500'
		)}
	/>

	{#if inputJson.length > 0 && outputJson.error}
		<Alert.Root variant="destructive">
			<Alert.Description>The provided JSON is not valid: {outputJson.error}</Alert.Description>
		</Alert.Root>
	{:else if inputJson.length > 0 && !outputJson.error}
		<CodeViewer code={outputJson.text} language="json" />
	{/if}
</div>
