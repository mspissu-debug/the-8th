<script>
  /** @type {string} */
  export let emailLabel = 'La tua email';

  /** @type {string} */
  export let submitLabel = 'Iscriviti';

  /** @type {string} */
  export let successMessage = 'Grazie. Ti scriveremo all’apertura dell’Open Call.';

  /** @type {string} */
  export let inputId = 'newsletter-email';

  let email = '';
  let submitted = false;

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    submitted = true;
  }
</script>

<form class="newsletter-form" on:submit={handleSubmit}>
  {#if submitted}
    <p class="newsletter-form__success" role="status">{successMessage}</p>
  {:else}
    <label class="newsletter-form__label" for={inputId}>{emailLabel}</label>
    <div class="newsletter-form__row">
      <input
        id={inputId}
        type="email"
        name="email"
        placeholder="nome@email.com"
        bind:value={email}
        required
        autocomplete="email"
      />
      <button type="submit" class="newsletter-form__submit">{submitLabel}</button>
    </div>
  {/if}
</form>

<style>
  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .newsletter-form__label {
    font-size: var(--editorial-eyebrow);
    font-weight: var(--weight-medium);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--newsletter-label, rgba(236, 235, 228, 0.5));
  }

  .newsletter-form__row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid var(--newsletter-border, rgba(236, 235, 228, 0.25));
    padding-bottom: 0.65rem;
  }

  @media (min-width: 520px) {
    .newsletter-form__row {
      flex-direction: row;
      align-items: baseline;
      gap: 2rem;
    }
  }

  .newsletter-form__row input {
    flex: 1;
    min-width: 0;
    padding: 0.6rem 0.85rem;
    border: none;
    background: transparent;
    color: var(--newsletter-input, var(--color-linen));
    font-family: var(--font-body);
    font-size: var(--editorial-body);
  }

  .newsletter-form__row input::placeholder {
    color: var(--newsletter-placeholder, rgba(236, 235, 228, 0.35));
    font-style: italic;
  }

  .newsletter-form__row input:focus {
    outline: none;
  }

  .newsletter-form__submit {
    padding: 0;
    border: none;
    background: none;
    color: var(--sign-cta);
    font-family: var(--font-body);
    font-size: var(--editorial-eyebrow);
    font-weight: var(--weight-medium);
    letter-spacing: 0.02em;
    text-transform: none;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
  }

  .newsletter-form__submit:hover {
    opacity: 0.7;
  }

  .newsletter-form__success {
    margin: 0;
    font-size: var(--editorial-body);
    color: var(--newsletter-input, var(--color-linen));
    font-style: italic;
    line-height: 1.6;
  }
</style>
