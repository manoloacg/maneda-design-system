/* Shared behavior for the inquiry and checklist forms:
   required-field and email checks, localized messages, Web3Forms submit, test mode. */
export function initForm(form: HTMLFormElement) {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[type=submit]')!;

  const fields = () =>
    [...form.querySelectorAll<HTMLInputElement>('input:not([type=hidden]):not([type=checkbox]), select, textarea')];
  const setError = (el: HTMLElement, message: string) => {
    const out = document.getElementById(`${el.id}-error`);
    if (out) out.textContent = message;
    if (message) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    const d = form.dataset;
    let first: HTMLElement | null = null;
    for (const el of fields()) {
      let message = '';
      const value = el.value.trim();
      if (el.required && !value) message = d.required!;
      else if (el.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = d.email!;
      setError(el, message);
      if (message && !first) first = el;
    }
    if (first) {
      status.textContent = d.fix!;
      first.focus();
      return;
    }
    if ((form.elements.namedItem('botcheck') as HTMLInputElement | null)?.checked) return;

    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = d.sending!;
    // Test mode: no access key yet, so nothing is sent.
    if (d.test === 'true') {
      location.href = `${d.thanks}?test=1`;
      return;
    }
    try {
      const res = await fetch(d.endpoint!, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      location.href = d.thanks!;
    } catch {
      status.textContent = d.send!;
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}
