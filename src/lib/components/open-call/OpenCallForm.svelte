<script>
  import { schools, schoolMatches } from '$lib/data/schools.js';
  import { t, locale } from '$lib/i18n';

  let step = 1;
  const totalSteps = 3;

  let firstName = '';
  let lastName = '';
  let email = '';
  let phonePrefix = '+39';
  let phoneNumber = '';
  let city = '';
  let school = '';
  let portfolioUrl = '';
  let instagram = '';
  let message = '';
  let privacy = false;
  let submitted = false;
  let touched = false;

  $: emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  $: phoneOk = phoneNumber.replace(/\D/g, '').length >= 6;
  $: schoolOk = school.trim().length > 1;
  $: schoolKnown = schoolOk && schoolMatches(school);

  $: step1Ok =
    firstName.trim() &&
    lastName.trim() &&
    emailOk &&
    message.trim().length >= 20;

  $: step2Ok = phoneOk && city.trim() && schoolOk;

  $: canSubmit = step1Ok && step2Ok && privacy;

  $: stepLabel = $t('openCall.stepOf')
    .replace('{current}', String(step))
    .replace('{total}', String(totalSteps));

  /** @param {SubmitEvent} e */
  function handleSubmit(e) {
    e.preventDefault();
    touched = true;
    if (!canSubmit) return;
    submitted = true;
  }

  function nextStep() {
    touched = true;
    if (step === 1 && !step1Ok) return;
    if (step === 2 && !step2Ok) return;
    if (step < totalSteps) step += 1;
  }

  function prevStep() {
    if (step > 1) step -= 1;
  }

  /** @param {Event} e */
  function onFileChange(e) {
    const input = /** @type {HTMLInputElement} */ (e.currentTarget);
    const file = input.files?.[0];
    if (file && file.size > 10 * 1024 * 1024) {
      input.value = '';
      alert($locale === 'en' ? 'PDF max 10 MB' : 'PDF max 10 MB');
    }
  }
</script>

<form class="open-call-form" on:submit={handleSubmit} novalidate>
  {#if submitted}
    <p class="open-call-form__success" role="status">{$t('openCall.success')}</p>
  {:else}
    <div class="open-call-form__progress" aria-live="polite">
      <p class="open-call-form__step-label">{stepLabel}</p>
      <div class="open-call-form__step-dots" aria-hidden="true">
        {#each Array(totalSteps) as _, i}
          <span class="open-call-form__dot" class:open-call-form__dot--active={i + 1 === step} class:open-call-form__dot--done={i + 1 < step}></span>
        {/each}
      </div>
    </div>

    {#if step === 1}
      <header class="open-call-form__step-head">
        <p class="open-call-form__step-code">// 01</p>
        <h3 class="open-call-form__step-title">{$t('openCall.step1Title')}</h3>
        <p class="open-call-form__step-sub">{$t('openCall.step1Subtitle')}</p>
        <p class="open-call-form__step-lede">{$t('openCall.step1Lede')}</p>
      </header>

      <div class="open-call-form__grid">
        <label class="open-call-form__field">
          <span class="open-call-form__label">{$t('openCall.firstName')}</span>
          <input type="text" name="firstName" bind:value={firstName} required autocomplete="given-name" />
        </label>

        <label class="open-call-form__field">
          <span class="open-call-form__label">{$t('openCall.lastName')}</span>
          <input type="text" name="lastName" bind:value={lastName} required autocomplete="family-name" />
        </label>

        <label class="open-call-form__field open-call-form__field--wide">
          <span class="open-call-form__label">{$t('openCall.email')}</span>
          <input
            type="email"
            name="email"
            bind:value={email}
            required
            autocomplete="email"
            aria-invalid={touched && !emailOk}
          />
          {#if touched && email && !emailOk}
            <span class="open-call-form__hint open-call-form__hint--warn">{$t('openCall.emailInvalid')}</span>
          {:else if emailOk}
            <span class="open-call-form__hint">{$t('openCall.emailValid')}</span>
          {/if}
        </label>

        <label class="open-call-form__field open-call-form__field--wide">
          <span class="open-call-form__label">{$t('openCall.message')}</span>
          <textarea name="message" bind:value={message} rows="6" required minlength="20" placeholder={$locale === 'en' ? 'Your story, motivations and vision…' : 'La tua storia, motivazioni e visione…'}></textarea>
        </label>
      </div>
    {:else if step === 2}
      <header class="open-call-form__step-head">
        <p class="open-call-form__step-code">// 02</p>
        <h3 class="open-call-form__step-title">{$t('openCall.step2Title')}</h3>
        <p class="open-call-form__step-sub">{$t('openCall.step2Subtitle')}</p>
        <p class="open-call-form__step-lede">{$t('openCall.step2Lede')}</p>
      </header>

      <div class="open-call-form__grid">
        <div class="open-call-form__field open-call-form__field--phone">
          <span class="open-call-form__label">{$t('openCall.phone')}</span>
          <div class="open-call-form__phone-row">
            <label class="open-call-form__phone-prefix">
              <span class="visually-hidden">{$t('openCall.phonePrefix')}</span>
              <input type="text" name="phonePrefix" bind:value={phonePrefix} inputmode="tel" />
            </label>
            <input
              type="tel"
              name="phoneNumber"
              bind:value={phoneNumber}
              placeholder="333 1234567"
              required
              autocomplete="tel-national"
              aria-invalid={touched && !phoneOk}
            />
          </div>
          {#if touched && phoneNumber && !phoneOk}
            <span class="open-call-form__hint open-call-form__hint--warn">{$t('openCall.phoneInvalid')}</span>
          {/if}
        </div>

        <label class="open-call-form__field">
          <span class="open-call-form__label">{$t('openCall.city')}</span>
          <input type="text" name="city" bind:value={city} required autocomplete="address-level2" />
        </label>

        <label class="open-call-form__field open-call-form__field--wide">
          <span class="open-call-form__label">{$t('openCall.school')}</span>
          <input
            type="text"
            name="school"
            bind:value={school}
            list="open-call-schools"
            required
            autocomplete="organization"
          />
          <datalist id="open-call-schools">
            {#each schools as name}
              <option value={name}></option>
            {/each}
          </datalist>
          <span class="open-call-form__hint">{$t('openCall.schoolHint')}</span>
          {#if schoolOk}
            <span class="open-call-form__hint" class:open-call-form__hint--warn={!schoolKnown}>
              {schoolKnown ? $t('openCall.schoolValid') : $t('openCall.schoolUnknown')}
            </span>
          {/if}
        </label>

        <label class="open-call-form__field open-call-form__field--wide">
          <span class="open-call-form__label">{$t('openCall.portfolioUrl')}</span>
          <input type="url" name="portfolioUrl" bind:value={portfolioUrl} placeholder="https://" inputmode="url" />
        </label>

        <label class="open-call-form__field">
          <span class="open-call-form__label">{$t('openCall.instagram')}</span>
          <input type="text" name="instagram" bind:value={instagram} placeholder="@username" />
        </label>

        <label class="open-call-form__field open-call-form__field--wide">
          <span class="open-call-form__label">{$t('openCall.portfolioFile')}</span>
          <input type="file" name="portfolio" accept="application/pdf,.pdf" on:change={onFileChange} />
        </label>
      </div>
    {:else}
      <header class="open-call-form__step-head">
        <p class="open-call-form__step-code">// 03</p>
        <h3 class="open-call-form__step-title">{$t('openCall.step3Title')}</h3>
        <p class="open-call-form__step-sub">{$t('openCall.step3Subtitle')}</p>
        <p class="open-call-form__step-lede">{$t('openCall.step3Lede')}</p>
      </header>

      <div class="open-call-form__commitment">
        <p>{$t('openCall.step3Commitment')}</p>
      </div>

      <label class="open-call-form__check open-call-form__field--wide">
        <input type="checkbox" name="privacy" bind:checked={privacy} required />
        <span>{$t('openCall.privacy')}</span>
      </label>
    {/if}

    <div class="open-call-form__nav">
      {#if step > 1}
        <button type="button" class="open-call-form__back" on:click={prevStep}>
          {$t('openCall.back')}
        </button>
      {/if}

      {#if step < totalSteps}
        <button
          type="button"
          class="open-call-form__submit"
          disabled={step === 1 ? !step1Ok : !step2Ok}
          on:click={nextStep}
        >
          {$t('openCall.next')}
        </button>
      {:else}
        <button type="submit" class="open-call-form__submit" disabled={!canSubmit}>
          {$t('openCall.submit')}
        </button>
      {/if}
    </div>
  {/if}
</form>

<style>
  .open-call-form {
    width: 100%;
    max-width: none;
  }

  .open-call-form__progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid color-mix(in srgb, var(--accent-gold) 22%, var(--story-border));
    width: 100%;
  }

  .open-call-form__step-label {
    margin: 0;
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    color: var(--story-text-muted);
  }

  .open-call-form__step-dots {
    display: flex;
    gap: 0.4rem;
  }

  .open-call-form__dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--story-text-muted) 35%, transparent);
    transition: background 0.25s ease, transform 0.25s ease;
  }

  .open-call-form__dot--active {
    background: var(--accent-gold);
    transform: scale(1.2);
  }

  .open-call-form__dot--done {
    background: color-mix(in srgb, var(--accent-gold) 55%, transparent);
  }

  .open-call-form__step-head {
    margin-bottom: 1.75rem;
  }

  .open-call-form__step-code {
    margin: 0 0 0.35rem;
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    color: color-mix(in srgb, var(--accent-gold) 80%, var(--story-text-muted));
  }

  .open-call-form__step-title {
    margin: 0 0 0.35rem;
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 3vw, 1.75rem);
    font-weight: var(--weight-medium);
    letter-spacing: -0.02em;
    text-transform: none;
    color: var(--story-text);
  }

  .open-call-form__step-sub {
    margin: 0 0 0.5rem;
    font-size: var(--editorial-body);
    font-style: italic;
    color: color-mix(in srgb, var(--story-text) 78%, transparent);
  }

  .open-call-form__step-lede {
    margin: 0;
    font-size: var(--editorial-body);
    line-height: 1.5;
    color: var(--story-text-muted);
    max-width: 34rem;
  }

  .open-call-form__commitment {
    margin-bottom: 1.75rem;
    padding: 1.25rem 0;
    border-top: 1px solid var(--story-border);
    border-bottom: 1px solid var(--story-border);
  }

  .open-call-form__commitment p {
    margin: 0;
    font-size: var(--editorial-body);
    line-height: 1.6;
    color: var(--story-text-muted);
    max-width: 36rem;
  }

  .open-call-form__grid {
    display: grid;
    gap: 1.35rem;
  }

  @media (min-width: 900px) {
    .open-call-form__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .open-call-form__field {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .open-call-form__field--wide {
    grid-column: 1 / -1;
  }

  .open-call-form__label {
    font-family: var(--font-body);
    font-size: var(--type-label);
    letter-spacing: 0.03em;
    text-transform: none;
    color: var(--story-text-muted);
  }

  .open-call-form__field input,
  .open-call-form__field textarea {
    width: 100%;
    padding: 0.65rem 0;
    border: none;
    border-bottom: 1px solid var(--story-border);
    background: transparent;
    color: var(--story-text);
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: 1.4;
    transition: border-color 0.25s ease;
  }

  .open-call-form__field input:focus,
  .open-call-form__field textarea:focus {
    outline: none;
    border-bottom-color: var(--accent-gold);
  }

  .open-call-form__field input[aria-invalid='true'] {
    border-bottom-color: color-mix(in srgb, #e85d5d 70%, var(--story-border));
  }

  .open-call-form__field textarea {
    resize: vertical;
    min-height: 7rem;
  }

  .open-call-form__phone-row {
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    gap: 0.75rem;
    align-items: end;
  }

  .open-call-form__hint {
    font-family: var(--font-body);
    font-size: var(--type-label);
    letter-spacing: 0.02em;
    text-transform: none;
    color: color-mix(in srgb, var(--accent-gold) 80%, var(--story-text-muted));
  }

  .open-call-form__hint--warn {
    color: color-mix(in srgb, #e8a85d 85%, var(--story-text-muted));
  }

  .open-call-form__check {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    font-size: var(--editorial-body);
    line-height: 1.45;
    color: var(--story-text-muted);
    cursor: pointer;
  }

  .open-call-form__check input {
    margin-top: 0.2rem;
    accent-color: var(--accent-gold);
  }

  .open-call-form__nav {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: flex-end;
  }

  .open-call-form__back {
    padding: 0.85rem 1.35rem;
    border: 1px solid var(--story-border);
    background: transparent;
    color: var(--story-text-muted);
    font-family: var(--font-body);
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    cursor: pointer;
    transition: border-color 0.25s ease, color 0.25s ease;
  }

  .open-call-form__back:hover {
    border-color: color-mix(in srgb, var(--story-text) 35%, var(--story-border));
    color: var(--story-text);
  }

  .open-call-form__submit {
    padding: 0.85rem 1.75rem;
    border: 1px solid color-mix(in srgb, var(--accent-gold) 55%, var(--story-text));
    background: color-mix(in srgb, var(--accent-gold) 10%, transparent);
    color: var(--story-text);
    font-family: var(--font-body);
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    cursor: pointer;
    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      transform 0.25s var(--ease-ribbit);
  }

  .open-call-form__submit:hover:not(:disabled) {
    background: color-mix(in srgb, var(--accent-gold) 18%, transparent);
    border-color: var(--accent-gold);
    transform: translateY(-2px);
  }

  .open-call-form__submit:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .open-call-form__success {
    margin: 0;
    padding: 1.25rem 0;
    font-family: var(--font-body);
    font-size: 0.78rem;
    line-height: 1.6;
    letter-spacing: 0.04em;
    color: var(--story-text);
    border-top: 1px solid var(--story-border);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
