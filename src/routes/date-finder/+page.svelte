<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	let year = $state(new Date().getFullYear());
	let dayOfYear = $state(128);
	let errorMessage = $state('');

	function getDateFromDay(year: number, dayOfYear: number): string {
		const date = new Date(year, 0, 1);
		date.setDate(date.getDate() + dayOfYear - 1);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		return `${day}/${month}/${year}`;
	}

	function validateDayOfYear() {
		const maxDays = new Date(year, 1, 29).getDate() === 29 ? 366 : 365;
		if (dayOfYear < 1 || dayOfYear > maxDays) {
			errorMessage = `Please enter a valid day of the year (1 - ${maxDays}).`;
		} else {
			errorMessage = '';
		}
	}
</script>

<div class="container mx-auto space-y-6 p-4">
	<h2 class="text-3xl font-bold">Date Finder</h2>
	<div class="grid w-full items-center gap-4">
		<div class="flex flex-col space-y-1.5">
			<Label for="year">Year</Label>
			<Input id="year" type="number" bind:value={year} placeholder="Enter year" />
		</div>

		<div class="flex flex-col space-y-1.5">
			<Label class="font-medium" for="dayOfYear">Day of the Year:</Label>
			<Input
				type="number"
				bind:value={dayOfYear}
				oninput={validateDayOfYear}
				class={cn(errorMessage && 'focus:ring-red-500 focus-visible:ring-red-500')}
				placeholder="Enter day of the year"
				min="1"
				max="366"
			/>

			{#if errorMessage}
				<p class="text-red-500">{errorMessage}</p>
			{/if}
		</div>
	</div>
	<p class="mt-6 text-lg font-medium text-foreground/90">
		Date: {errorMessage ? 'Invalid input' : getDateFromDay(year, dayOfYear)}
	</p>
</div>
