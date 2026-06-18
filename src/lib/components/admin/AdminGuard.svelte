<script lang="ts">
	import { browser } from '$app/environment';
	import { messages } from '$lib/i18n';

	let {
		children
	}: {
		children: import('svelte').Snippet;
	} = $props();

	const expectedPin = import.meta.env.PUBLIC_ADMIN_PIN ?? 'the8';
	const storageKey = 'the8-admin-auth';

	let authed = $state(false);
	let pin = $state('');
	let error = $state('');

	$effect(() => {
		if (browser && sessionStorage.getItem(storageKey) === '1') {
			authed = true;
		}
	});

	const login = () => {
		if (pin === expectedPin) {
			sessionStorage.setItem(storageKey, '1');
			authed = true;
			error = '';
		} else {
			error = 'PIN non valido';
		}
	};

	const logout = () => {
		sessionStorage.removeItem(storageKey);
		authed = false;
		pin = '';
	};
</script>

{#if authed}
	<div class="admin-guard">
		<button type="button" class="admin-guard__out" onclick={logout}>{$messages.admin.logout}</button>
		{@render children()}
	</div>
{:else}
	<form class="admin-login container" onsubmit={(e) => { e.preventDefault(); login(); }}>
		<h1>{$messages.admin.title}</h1>
		<p class="admin-login__hint">{$messages.admin.pin}</p>
		<input type="password" bind:value={pin} autocomplete="current-password" />
		{#if error}<p class="admin-login__err">{error}</p>{/if}
		<button type="submit">{$messages.admin.login}</button>
	</form>
{/if}

