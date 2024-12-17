<script lang="ts">
	import CopyToClipboardButton from '../copy-to-clipboard-button.svelte';
	import { Textarea } from './textarea';

	let { input, class: className = '' } = $props<{
		input: string;
		class?: string;
	}>();
</script>

<div class="relative">
	<Textarea
		rows={15}
		class={`relative overflow-x-auto rounded-lg p-4 ${className}`}
		value={input}
	/>
	<CopyToClipboardButton class="absolute right-2 top-2" text={input} />
</div>
