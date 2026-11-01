import { z } from "zod";

export const AREAS = ["Logistics", "Supply chain", "Travel", "Enterprise software"] as const;
export type Area = (typeof AREAS)[number];

export const TALK_FIELDS = ["name", "email", "area"] as const;
export type TalkField = (typeof TALK_FIELDS)[number];

export const talkSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please enter your work email.")
    .max(254, "That email is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  area: z.enum(AREAS, "Please choose where you work."),
  // Honeypot: real visitors never see or fill this.
  website: z.string().optional().default(""),
});

export type TalkState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<TalkField, string>>;
      values?: Partial<Record<TalkField, string>>;
    };
