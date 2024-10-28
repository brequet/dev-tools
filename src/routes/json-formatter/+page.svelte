<script lang="ts">
	import CodeViewer from '$lib/components/code-viewer.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { formatJson, minifyJson } from '$lib/services/json';
	import { cn } from '$lib/utils';

	const jsonSpacingOptions = [{ value: '2' }, { value: '4' }, { value: '8' }];
	let selectedJsonSpacingOption = $state(jsonSpacingOptions[0].value);

	let minifyFlag = $state(false);

	let inputJson = $state('');
	let outputJson = $derived(
		minifyFlag ? minifyJson(inputJson) : formatJson(inputJson, Number(selectedJsonSpacingOption))
	);
</script>

<div class="space-y-4">
	<div class="flex flex-wrap justify-between">
		<Select.Root type="single" name="jsonSpacing" bind:value={selectedJsonSpacingOption}>
			<Select.Trigger class="w-[180px]">{selectedJsonSpacingOption}</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.GroupHeading>JSON Spacing</Select.GroupHeading>
					{#each jsonSpacingOptions as spacingOption}
						<Select.Item value={spacingOption.value} label={`${spacingOption.value}`}
							>{spacingOption.value}</Select.Item
						>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>

		<div class="flex items-center space-x-2">
			<Checkbox id="terms" bind:checked={minifyFlag} aria-labelledby="terms-label" />
			<Label
				id="terms-label"
				for="terms"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Minify JSON
			</Label>
		</div>
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
