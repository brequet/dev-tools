<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		ResizablePaneGroup,
		ResizablePane,
		ResizableHandle
	} from '$lib/components/ui/resizable';
	import { localStore } from '$lib/store/localStore.svelte';
	import { marked } from 'marked';

	let markdown = $state('# Hello World\n\nStart typing your **Markdown** here...\n');

	let renderedHtml = $derived(marked.parse(markdown) as string);

	let editorSize = localStore('markdown-viewer.editorSize', 50);

	function onEditorResize(size: number) {
		editorSize.value = size;
	}
</script>

<div class="flex h-[calc(100vh-10rem)] flex-col gap-2">
	<ResizablePaneGroup direction="horizontal" class="rounded-lg border">
		<ResizablePane defaultSize={editorSize.value} minSize={20} onResize={onEditorResize}>
			<div class="flex h-full flex-col">
				<div class="border-b px-4 py-2">
					<Label class="text-sm font-medium">Editor</Label>
				</div>
				<textarea
					bind:value={markdown}
					class="h-full w-full resize-none bg-transparent p-4 font-mono text-sm outline-none"
					placeholder="Type your Markdown here..."
					spellcheck="false"
				></textarea>
			</div>
		</ResizablePane>

		<ResizableHandle withHandle />

		<ResizablePane defaultSize={100 - editorSize.value} minSize={20}>
			<div class="flex h-full flex-col">
				<div class="border-b px-4 py-2">
					<Label class="text-sm font-medium">Preview</Label>
				</div>
				<div class="prose dark:prose-invert h-full max-w-none overflow-auto p-4">
					{@html renderedHtml}
				</div>
			</div>
		</ResizablePane>
	</ResizablePaneGroup>
</div>
