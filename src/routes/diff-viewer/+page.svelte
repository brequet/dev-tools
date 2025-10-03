<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { formatJson } from '$lib/services/json';
	import { formatXml } from '$lib/services/xml';
	import { localStore } from '$lib/store/localStore.svelte';
	import { createPatch } from 'diff';
	import * as Diff2Html from 'diff2html';
	import 'diff2html/bundles/css/diff2html.min.css';

	type OutputFormatType = 'line-by-line' | 'side-by-side';

	const outputFormatOptions: {
		value: OutputFormatType;
		label: string;
	}[] = [
		{ value: 'line-by-line', label: 'Line by Line' },
		{ value: 'side-by-side', label: 'Side by Side' }
	];

	let leftContent = $state('');
	let rightContent = $state('');
	let selectedOutputFormat = localStore(
		'diff-viewer.outputFormat',
		outputFormatOptions[0].value as OutputFormatType
	);

	let formatIfPossibleFlag = localStore('diff-viewer.formatIfPossible', true);

	interface DiffResult {
		html: string;
		text: string;
		isDiff: boolean;
		formattable: boolean;
	}

	let diffResult = $derived(getDiffAsHtml(leftContent, rightContent));

	function getDiffAsHtml(leftContent: string, rightContent: string): DiffResult {
		// Try JSON first
		const jsonLeft = formatJson(leftContent);
		const jsonRight = formatJson(rightContent);

		const xmlLeft = formatXml(leftContent);
		const xmlRight = formatXml(rightContent);

		const isJson = jsonLeft.error == null && jsonRight.error == null;
		const isXml = xmlLeft.error == null && xmlRight.error == null;
		const areContentsFormattable = isJson || isXml;

		let diffString: string;
		if (formatIfPossibleFlag.value && areContentsFormattable) {
			if (isJson) {
				diffString = createDiff(jsonLeft.text, jsonRight.text);
			} else if (isXml) {
				diffString = createDiff(xmlLeft.text, xmlRight.text);
			} else {
				diffString = createDiff(leftContent, rightContent);
			}
		} else {
			diffString = createDiff(leftContent, rightContent);
		}

		const diffHtml = Diff2Html.html(diffString, {
			drawFileList: false,
			matching: 'lines',
			outputFormat: selectedOutputFormat.value
		});

		return {
			html: diffHtml,
			text: diffString,
			isDiff: diffString.includes('@@'),
			formattable: areContentsFormattable
		};
	}

	function createDiff(oldText: string, newText: string): string {
		const diff = createPatch('', oldText || '', newText || '', '', '', { context: 3 });
		return diff;
	}
</script>

<div class="space-y-4">
	<div class="flex justify-between">
		<div class="flex items-center space-x-2">
			<Switch bind:checked={formatIfPossibleFlag.value} id="formatFlag" />
			<Label for="formatFlag">Format compared contents if possible</Label>
		</div>

		<Select.Root
			type="single"
			name="outputFormat"
			onValueChange={(v) => (selectedOutputFormat.value = v as OutputFormatType)}
		>
			<Select.Trigger class="w-[180px]"
				>{selectedOutputFormat.value === 'line-by-line'
					? 'Line by Line'
					: 'Side by Side'}</Select.Trigger
			>
			<Select.Content>
				<Select.Group>
					<Select.GroupHeading>Display Format</Select.GroupHeading>
					{#each outputFormatOptions as option}
						<Select.Item value={option.value} label={option.label}>{option.label}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="space-y-1">
			<Label class="text-sm font-medium">Original Text</Label>
			<Textarea
				bind:value={leftContent}
				autofocus
				placeholder="Enter original text..."
				rows={15}
				class="font-mono"
			/>
		</div>
		<div class="space-y-1">
			<Label class="text-sm font-medium">Modified Text</Label>
			<Textarea
				bind:value={rightContent}
				placeholder="Enter modified text..."
				rows={15}
				class="font-mono"
			/>
		</div>
	</div>

	{#if leftContent !== '' || rightContent !== ''}
		<div>
			{#if diffResult.isDiff}
				<div class="relative">{@html diffResult.html}</div>
				{#if !diffResult.formattable}
					<p class="text-sm text-muted-foreground">
						The contents of the two texts are not formattable.
					</p>
				{/if}
			{:else}
				<p class="text-sm text-foreground">No differences found between the two blocks.</p>
			{/if}
		</div>
	{/if}
</div>
