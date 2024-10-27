<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';
	// Import additional languages
	import 'prismjs/components/prism-java';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-markup';
	import 'prismjs/components/prism-typescript';

	import CopyToClipboardButton from './copy-to-clipboard-button.svelte';

	let {
		code,
		language = 'javascript',
		class: className = ''
	} = $props<{
		code: string;
		language?: string;
		class?: string;
	}>();

	let highlightedCode: string = $state('');

	$effect(() => {
		// Ensure the language is loaded
		if (!Prism.languages[language]) {
			language = 'plaintext';
		}

		// Highlight the code
		highlightedCode = Prism.highlight(code, Prism.languages[language], language);
	});
</script>

<div class="relative">
	<pre class={`relative overflow-x-auto rounded-lg p-4 ${className}`} data-language={language}><code
			class={`language-${language} font-mono text-sm`}>{@html highlightedCode}</code
		></pre>
	{#if code}
		<CopyToClipboardButton class="absolute right-2 top-2" text={code} />
	{/if}
</div>

<style>
	pre {
		margin: 0;
		background-color: rgb(40, 44, 52);
	}

	:global(pre code) {
		background: none;
		padding: 0;
	}
</style>
