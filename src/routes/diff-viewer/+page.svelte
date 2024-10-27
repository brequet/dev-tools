<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { createPatch } from 'diff';
	import * as Diff2Html from 'diff2html';
	import 'diff2html/bundles/css/diff2html.min.css';

	type OutputFormatType = 'line-by-line' | 'side-by-side';

	const outputFormatOptions = [
		{ value: 'line-by-line', label: 'Line by Line' },
		{ value: 'side-by-side', label: 'Side by Side' }
	];

	let leftContent = $state('');
	let rightContent = $state('');
	let selectedOutputFormat = $state(outputFormatOptions[0].value as OutputFormatType);
	let diffContainer: string = $derived.by(() => {
		return getDiffAsHtml(leftContent, rightContent);
	});

	function getDiffAsHtml(leftContent: string, rightContent: string): string {
		const diffString = createDiff(leftContent, rightContent);
		const diffHtml = Diff2Html.html(diffString, {
			drawFileList: false,
			matching: 'lines',
			outputFormat: selectedOutputFormat
		});

		return diffHtml;
	}

	function createDiff(oldText: string, newText: string): string {
		const diff = createPatch('file.txt', oldText || '', newText || '', '', '', { context: 3 });
		return diff;
	}
</script>

<div class="space-y-4">
	<div class="flex justify-end">
		<Select.Root type="single" name="outputFormat" bind:value={selectedOutputFormat}>
			<Select.Trigger class="w-[180px]"
				>{selectedOutputFormat === 'line-by-line' ? 'Line by Line' : 'Side by Side'}</Select.Trigger
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
		<div class="space-y-2">
			<h3 class="text-sm font-medium">Original Text</h3>
			<Textarea
				bind:value={leftContent}
				placeholder="Enter original text..."
				rows={15}
				class="font-mono"
			/>
		</div>
		<div class="space-y-2">
			<h3 class="text-sm font-medium">Modified Text</h3>
			<Textarea
				bind:value={rightContent}
				placeholder="Enter modified text..."
				rows={15}
				class="font-mono"
			/>
		</div>
	</div>

	<div class="rounded-lg border bg-card text-card-foreground shadow-sm">
		<div class="relative">{@html diffContainer}</div>
	</div>
</div>
