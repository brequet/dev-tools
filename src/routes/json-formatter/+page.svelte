<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Select from '$lib/components/ui/select';

	interface OutputJson {
		text: string;
		error: string | null;
	}

	const jsonSpacingOptions = [{ value: '2' }, { value: '4' }, { value: '8' }];
	let selectJsonSpacingOption = $state(jsonSpacingOptions[0].value);

	let minifyFlag = $state(false);

	let inputJson = $state('');
	let outputJson: OutputJson = $derived(minifyFlag ? minifyJson(inputJson) : formatJson(inputJson));

	function formatJson(inputJson: string) {
		let outputJson: OutputJson = { text: '', error: null };
		try {
			const parsed = JSON.parse(inputJson);
			outputJson.text = JSON.stringify(parsed, null, Number(selectJsonSpacingOption));
		} catch (e) {
			outputJson.error = e instanceof Error ? e.message : 'Invalid JSON';
		}
		return outputJson;
	}

	function minifyJson(inputJson: string) {
		let outputJson: OutputJson = { text: '', error: null };
		try {
			const parsed = JSON.parse(inputJson);
			outputJson.text = JSON.stringify(parsed);
		} catch (e) {
			outputJson.error = e instanceof Error ? e.message : 'Invalid JSON';
		}
		return outputJson;
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(outputJson.text);
	}
</script>

<div class="container mx-auto space-y-6 p-4">
	<h2 class="text-3xl font-bold">JSON Formatter</h2>
	<div class="space-y-4">
		<div class="flex flex-wrap justify-between">
			<Select.Root type="single" name="jsonSpacing" bind:value={selectJsonSpacingOption}>
				<Select.Trigger class="w-[180px]">{selectJsonSpacingOption}</Select.Trigger>
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
			class="font-mono"
		/>

		<div class="relative">
			<Textarea value={outputJson.text} readonly rows={15} class="font-mono" />
			{#if outputJson}
				<Button
					variant="outline"
					size="sm"
					class="absolute right-2 top-2"
					onclick={copyToClipboard}
				>
					Copy
				</Button>
			{/if}
		</div>

		{#if inputJson.length > 0 && outputJson.error}
			<Alert.Root variant="destructive">
				<Alert.Description>{outputJson.error}</Alert.Description>
			</Alert.Root>
		{/if}
	</div>
</div>
