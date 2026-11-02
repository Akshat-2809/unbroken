"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTalkDraft } from "@/lib/talk/draft";
import { AREAS, TALK_FIELDS, talkSchema, type TalkField } from "@/lib/talk/schema";
import s from "./Talk.module.css";

/**
 * Front end only: validates in the browser and shows the success state. Nothing is sent or stored.
 * The inputs have no name, so without JavaScript submitting can't put what was typed in the URL.
 */
export function TalkForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<TalkField, string>>>({});
  const [area, setArea] = useState<string>(AREAS[0]);
  const doneRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const draftEmail = useTalkDraft();

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  // Arriving from the footer box: the email is filled in, so the name comes next.
  useEffect(() => {
    if (draftEmail) nameRef.current?.focus({ preventScroll: true });
  }, [draftEmail]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { elements } = e.currentTarget;
    const value = (id: string) => (elements.namedItem(id) as HTMLInputElement).value;

    const parsed = talkSchema.safeParse({ name: value("t-name"), email: value("t-email"), area });
    if (parsed.success) {
      setErrors({});
      setSent(true);
      return;
    }

    const fieldErrors: Partial<Record<TalkField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as TalkField;
      if (TALK_FIELDS.includes(key) && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setErrors(fieldErrors);
  }

  if (sent) {
    return (
      <div className={s.form} ref={doneRef} tabIndex={-1} role="status" style={{ outline: "none" }}>
        <span className="tag"><i />Received</span>
        <h3 style={{ fontSize: 34 }}>Thanks. Rajat will be in touch.</h3>
      </div>
    );
  }

  const describe = (f: TalkField) => (errors[f] ? `t-${f}-err` : undefined);

  return (
    <form action="#talk" onSubmit={onSubmit} className={s.form} noValidate>
      <p className="sr-only" aria-live="polite" role="status">
        {Object.keys(errors).length > 0 ? "Please check the highlighted fields and try again." : ""}
      </p>

      <div className={s.field}>
        <label htmlFor="t-name">Name</label>
        <input ref={nameRef} id="t-name" type="text" autoComplete="name" required maxLength={120}
          aria-invalid={!!errors.name} aria-describedby={describe("name")} />
        {errors.name && <span id="t-name-err" className={s.ferr}>{errors.name}</span>}
      </div>
      <div className={s.field}>
        <label htmlFor="t-email">Work email</label>
        <input key={draftEmail} id="t-email" type="email" autoComplete="email" required maxLength={254}
          defaultValue={draftEmail} aria-invalid={!!errors.email} aria-describedby={describe("email")} />
        {errors.email && <span id="t-email-err" className={s.ferr}>{errors.email}</span>}
      </div>
      <div className={s.field}>
        <span className="lab" style={{ fontSize: 11.5 }}>I work in</span>
        <div className={s.opts} role="group" aria-label="I work in">
          {AREAS.map((a) => (
            <button type="button" key={a} className={`${s.opt} ${a === area ? s.on : ""}`} aria-pressed={a === area} onClick={() => setArea(a)}>{a}</button>
          ))}
        </div>
        {errors.area && <span className={s.ferr}>{errors.area}</span>}
      </div>

      <button type="submit" className={`btn ${s.send}`}>
        Send
      </button>
    </form>
  );
}
