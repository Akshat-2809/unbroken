"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { startTalk } from "@/app/actions/talk";
import { useTalkDraft } from "@/lib/talk/draft";
import { AREAS, type TalkField, type TalkState } from "@/lib/talk/schema";
import s from "./Talk.module.css";

const initialState: TalkState = { status: "idle" };

export function TalkForm() {
  const [state, formAction, pending] = useActionState(startTalk, initialState);
  const [area, setArea] = useState<string>(AREAS[0]);
  const doneRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const draftEmail = useTalkDraft();

  useEffect(() => {
    if (state.status === "success") doneRef.current?.focus();
  }, [state]);

  // Arriving from the footer box: the email is filled in, so the name comes next.
  useEffect(() => {
    if (draftEmail) nameRef.current?.focus({ preventScroll: true });
  }, [draftEmail]);

  if (state.status === "success") {
    return (
      <div className={s.form} ref={doneRef} tabIndex={-1} role="status" style={{ outline: "none" }}>
        <span className="tag"><i />Received</span>
        <h3 style={{ fontSize: 34 }}>Thanks. Rajat will be in touch.</h3>
      </div>
    );
  }

  const err = state.status === "error" ? state : null;
  const fieldError = (f: TalkField) => err?.fieldErrors?.[f];
  const value = (f: TalkField) => err?.values?.[f];
  const describe = (f: TalkField) => (fieldError(f) ? `t-${f}-err` : undefined);

  return (
    <form action={formAction} className={s.form} aria-busy={pending} noValidate>
      <p className="sr-only" aria-live="polite" role="status">
        {pending ? "Sending…" : err ? err.message : ""}
      </p>

      <div className={s.field}>
        <label htmlFor="t-name">Name</label>
        <input ref={nameRef} id="t-name" name="name" type="text" autoComplete="name" required maxLength={120}
          defaultValue={value("name")} aria-invalid={!!fieldError("name")} aria-describedby={describe("name")} />
        {fieldError("name") && <span id="t-name-err" className={s.ferr}>{fieldError("name")}</span>}
      </div>
      <div className={s.field}>
        <label htmlFor="t-email">Work email</label>
        <input key={draftEmail} id="t-email" name="email" type="email" autoComplete="email" required maxLength={254}
          defaultValue={value("email") ?? draftEmail} aria-invalid={!!fieldError("email")} aria-describedby={describe("email")} />
        {fieldError("email") && <span id="t-email-err" className={s.ferr}>{fieldError("email")}</span>}
      </div>
      <div className={s.field}>
        <span className="lab" style={{ fontSize: 11.5 }}>I work in</span>
        <input type="hidden" name="area" value={area} />
        <div className={s.opts} role="group" aria-label="I work in">
          {AREAS.map((a) => (
            <button type="button" key={a} className={`${s.opt} ${a === area ? s.on : ""}`} aria-pressed={a === area} onClick={() => setArea(a)}>{a}</button>
          ))}
        </div>
        {fieldError("area") && <span className={s.ferr}>{fieldError("area")}</span>}
      </div>

      <div className={s.hp} aria-hidden="true">
        <label htmlFor="t-website">Website</label>
        <input id="t-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {err && !err.fieldErrors && <p className={s.ferr}>{err.message}</p>}

      <button type="submit" className={`btn ${s.send}`} disabled={pending}>
        {pending && <span className={s.spin} aria-hidden="true" />}
        Send
      </button>
    </form>
  );
}
