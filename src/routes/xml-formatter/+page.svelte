<script lang="ts">
	import CodeViewer from '$lib/components/code-viewer.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { formatXml, minifyXml } from '$lib/services/xml';
	import { localStore } from '$lib/store/localStore.svelte';
	import { cn } from '$lib/utils';

	const formattingOptions = [{ value: 'Format' }, { value: 'Minify' }];
	let selectedFormattingOption = localStore(
		'xml-formatter.formattingOption',
		formattingOptions[0].value
	);

	const xmlSpacingOptions = [{ value: '2' }, { value: '4' }, { value: '8' }];
	let selectedXmlSpacingOption = localStore('xml-formatter.xmlSpacing', xmlSpacingOptions[0].value);

	let inputXml = $state('');
	let outputXml = $derived(
		selectedFormattingOption.value === 'Minify'
			? minifyXml(inputXml)
			: formatXml(inputXml, Number(selectedXmlSpacingOption.value))
	);
</script>

<div class="space-y-4">
	<div class="flex gap-4">
		<Select.Root type="single" name="xmlFormatting" bind:value={selectedFormattingOption.value}>
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
			<Select.Root type="single" name="xmlSpacing" bind:value={selectedXmlSpacingOption.value}>
				<Select.Trigger class="w-[180px]">{selectedXmlSpacingOption.value}</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.GroupHeading>XML Spacing</Select.GroupHeading>
						{#each xmlSpacingOptions as spacingOption}
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
		bind:value={inputXml}
		placeholder="Paste your XML here..."
		rows={15}
		class={cn(
			'font-mono',
			inputXml.length > 0 && outputXml.error && 'focus:ring-red-500 focus-visible:ring-red-500'
		)}
	/>

	{#if inputXml.length > 0 && outputXml.error}
		<Alert.Root variant="destructive">
			<Alert.Description>The provided XML is not valid: {outputXml.error}</Alert.Description>
		</Alert.Root>
	{:else if inputXml.length > 0 && !outputXml.error}
		<CodeViewer code={outputXml.text} language="xml" />
	{/if}
</div>
