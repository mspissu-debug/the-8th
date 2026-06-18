<!--
  Pattern / Code — diamanti fluorescenti: messaggio Morse visibile solo con UV.
-->
<script>
  /** @type {{ encoded: string, decoded: string, hint: string }} */
  export let morse;

  let uvOn = false;
</script>

<section class="morse" aria-labelledby="morse-heading">
  <div class="morse__head">
    <h2 id="morse-heading" class="morse__title">Il segreto nei diamanti</h2>
    <p class="morse__hint">{morse.hint}</p>
    <button
      type="button"
      class="morse__uv"
      class:morse__uv--on={uvOn}
      on:click={() => (uvOn = !uvOn)}
      aria-pressed={uvOn}
    >
      {uvOn ? 'Spegni UV' : 'Accendi luce UV'}
    </button>
  </div>

  <div class="morse__stage" class:morse__stage--uv={uvOn}>
    <div class="morse__bracelet" aria-hidden="true">
      {#each Array(12) as _, i}
        <span
          class="morse__stone"
          class:morse__stone--dot={i % 3 !== 0}
          class:morse__stone--dash={i % 3 === 0}
          style="--i: {i}"
        ></span>
      {/each}
    </div>
    <p class="morse__encoded" class:morse__encoded--visible={uvOn}>{morse.encoded}</p>
    <p class="morse__decoded" class:morse__decoded--visible={uvOn}>
      Messaggio: <strong>{morse.decoded}</strong>
    </p>
  </div>
</section>

<style>
  .morse {
    margin: 3rem 0;
    padding: 2rem 1.5rem;
    background: #0a0a0a;
    color: #fff;
    border-radius: 2px;
  }

  .morse__title {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.5;
  }

  .morse__hint {
    margin: 0 0 1.25rem;
    font-size: 0.85rem;
    opacity: 0.65;
    max-width: 32rem;
    line-height: 1.6;
  }

  .morse__uv {
    padding: 0.65rem 1.25rem;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .morse__uv--on {
    background: rgba(120, 200, 255, 0.15);
    border-color: rgba(160, 220, 255, 0.6);
    box-shadow: 0 0 24px rgba(120, 200, 255, 0.35);
  }

  .morse__stage {
    position: relative;
    padding: 2.5rem 1rem;
    margin-top: 1.5rem;
    background: #111;
    transition: background 0.5s ease, box-shadow 0.5s ease;
  }

  .morse__stage--uv {
    background: #0d1520;
    box-shadow: inset 0 0 80px rgba(80, 160, 255, 0.12);
  }

  .morse__bracelet {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
    margin-bottom: 2rem;
  }

  .morse__stone {
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #e8e8f0, #a8a8b8);
    opacity: 0.35;
    transition: all 0.4s ease;
    transition-delay: calc(var(--i) * 40ms);
  }

  .morse__stone--dash {
    width: 28px;
    border-radius: 7px;
  }

  .morse__stage--uv .morse__stone {
    opacity: 1;
    background: radial-gradient(
      circle at 35% 35%,
      #e8ffff,
      #7ec8ff 40%,
      #c8a0ff 70%,
      #60b0ff
    );
    box-shadow:
      0 0 12px rgba(120, 200, 255, 0.9),
      0 0 28px rgba(180, 140, 255, 0.5);
    animation: opal-pulse 2s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.12s);
  }

  @keyframes opal-pulse {
    0%,
    100% {
      filter: brightness(1) hue-rotate(0deg);
    }
    50% {
      filter: brightness(1.25) hue-rotate(15deg);
    }
  }

  .morse__encoded {
    margin: 0;
    font-family: monospace;
    font-size: 1.1rem;
    letter-spacing: 0.35em;
    text-align: center;
    opacity: 0.08;
    color: #7ec8ff;
    transition: opacity 0.5s ease;
  }

  .morse__encoded--visible {
    opacity: 1;
    text-shadow: 0 0 20px rgba(120, 200, 255, 0.8);
  }

  .morse__decoded {
    margin: 1rem 0 0;
    text-align: center;
    font-size: 0.85rem;
    opacity: 0;
    transition: opacity 0.5s ease 0.2s;
  }

  .morse__decoded--visible {
    opacity: 0.85;
  }

  .morse__decoded strong {
    font-size: 1.5rem;
    letter-spacing: 0.2em;
    color: #b8e0ff;
  }
</style>
