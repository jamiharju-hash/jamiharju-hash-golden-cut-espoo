import { FormEvent, useState } from "react";
import { trackEvent } from "../lib/analytics";

type SubmitState = "idle" | "loading" | "success" | "error";

const inputClass = "w-full rounded-2xl border border-[var(--line)] bg-[var(--ink)] px-4 py-3 text-sm text-[var(--bone)] outline-none transition placeholder:text-[var(--muted)]/60 focus:border-[var(--brass)]";
const labelClass = "grid gap-2 text-sm font-bold text-[var(--bone)]";
const buttonClass = "premium-cta inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-black text-[var(--ink)] transition disabled:cursor-not-allowed disabled:opacity-60";

async function postJson(endpoint: string, body: Record<string, unknown>) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Lähetys epäonnistui");
  }

  return data;
}

function FormNotice({ state }: { state: SubmitState }) {
  if (state === "success") {
    return <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm font-bold text-emerald-200">Lähetetty. Golden Cut ottaa yhteyttä.</p>;
  }

  if (state === "error") {
    return <p className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm font-bold text-red-200">Lähetys epäonnistui. Soita suoraan numeroon 040 058 8484.</p>;
  }

  return null;
}

export function GiftCardForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [amount, setAmount] = useState("50");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");

    const form = new FormData(event.currentTarget);

    try {
      await postJson("/api/gift-cards", {
        buyerName: form.get("buyerName"),
        buyerEmail: form.get("buyerEmail"),
        buyerPhone: form.get("buyerPhone"),
        recipientName: form.get("recipientName"),
        amount,
        customAmount: form.get("customAmount"),
        message: form.get("message"),
        source: "gift_card_form",
      });
      trackEvent("submit_gift_card_form", { amount });
      setState("success");
      event.currentTarget.reset();
      setAmount("50");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="premium-card grid gap-4 rounded-3xl p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClass}>Ostajan nimi<input className={inputClass} name="buyerName" required placeholder="Etunimi Sukunimi" /></label>
        <label className={labelClass}>Vastaanottajan nimi<input className={inputClass} name="recipientName" required placeholder="Lahjan saaja" /></label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClass}>Sähköposti<input className={inputClass} name="buyerEmail" type="email" placeholder="nimi@email.fi" /></label>
        <label className={labelClass}>Puhelin<input className={inputClass} name="buyerPhone" type="tel" placeholder="040 000 0000" /></label>
      </div>
      <div className="grid gap-2">
        <span className="text-sm font-bold text-[var(--bone)]">Summa</span>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {["30", "50", "75", "100", "custom"].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(value)}
              className={`rounded-full border px-3 py-2 text-sm font-black transition ${amount === value ? "border-[var(--brass)] bg-[var(--brass)] text-[var(--ink)]" : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--brass-soft)] hover:text-[var(--champagne)]"}`}
            >
              {value === "custom" ? "Muu" : `${value} €`}
            </button>
          ))}
        </div>
      </div>
      {amount === "custom" && <label className={labelClass}>Vapaa summa<input className={inputClass} name="customAmount" placeholder="esim. 120 €" /></label>}
      <label className={labelClass}>Viesti lahjakorttiin<textarea className={inputClass} name="message" rows={3} placeholder="Lyhyt tervehdys vastaanottajalle" /></label>
      <button className={buttonClass} disabled={state === "loading"}>{state === "loading" ? "Lähetetään..." : "Lähetä lahjakorttipyyntö"}</button>
      <FormNotice state={state} />
    </form>
  );
}

export function ProductInterestForm() {
  const [state, setState] = useState<SubmitState>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = new FormData(event.currentTarget);

    try {
      await postJson("/api/leads", {
        type: "product_interest",
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        message: `Tuotekysely: ${form.get("product") || "ei valintaa"}. ${form.get("message") || ""}`,
        source: "product_interest_form",
      });
      trackEvent("submit_product_interest_form", { product: String(form.get("product") || "") });
      setState("success");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="premium-card grid gap-4 rounded-3xl p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClass}>Nimi<input className={inputClass} name="name" required placeholder="Etunimi Sukunimi" /></label>
        <label className={labelClass}>Puhelin<input className={inputClass} name="phone" type="tel" placeholder="040 000 0000" /></label>
      </div>
      <label className={labelClass}>Sähköposti<input className={inputClass} name="email" type="email" placeholder="nimi@email.fi" /></label>
      <label className={labelClass}>Tuote
        <select className={inputClass} name="product" defaultValue="Partaöljy 30 ml">
          <option>Shaving gel</option>
          <option>Partasaippua</option>
          <option>Partaöljy 30 ml</option>
          <option>Cutrin Shampoo Bio+</option>
          <option>Beard Balm</option>
        </select>
      </label>
      <label className={labelClass}>Lisätiedot<textarea className={inputClass} name="message" rows={3} placeholder="Kysy saatavuus tai varaa tuote mukaan käynnille" /></label>
      <button className={buttonClass} disabled={state === "loading"}>{state === "loading" ? "Lähetetään..." : "Lähetä tuotekysely"}</button>
      <FormNotice state={state} />
    </form>
  );
}

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = new FormData(event.currentTarget);

    try {
      await postJson("/api/leads", {
        type: "contact",
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        message: form.get("message"),
        source: "contact_form",
      });
      trackEvent("submit_contact_form", { source: "contact_form" });
      setState("success");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="premium-card grid gap-4 rounded-3xl p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClass}>Nimi<input className={inputClass} name="name" required placeholder="Etunimi Sukunimi" /></label>
        <label className={labelClass}>Puhelin<input className={inputClass} name="phone" type="tel" placeholder="040 000 0000" /></label>
      </div>
      <label className={labelClass}>Sähköposti<input className={inputClass} name="email" type="email" placeholder="nimi@email.fi" /></label>
      <label className={labelClass}>Viesti<textarea className={inputClass} name="message" required rows={4} placeholder="Miten voimme auttaa?" /></label>
      <button className={buttonClass} disabled={state === "loading"}>{state === "loading" ? "Lähetetään..." : "Lähetä viesti"}</button>
      <FormNotice state={state} />
    </form>
  );
}
