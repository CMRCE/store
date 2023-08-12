import { fetch } from "@remix-run/node";
import { z } from "zod";

const CurrencySchema = z.object({
  id: z.number(),
  name: z.string(),
  symbol: z.string(),
  code: z.string(),
});

const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  currency: CurrencySchema,
  logo: z.string().nullable(),
});

const PlanSchema = z.object({
  id: z.number(),
  type: z.literal("plan"),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  business: BusinessSchema,
  benefits: z.array(z.string()),
  duration_type: z.string(),
  duration_length: z.number(),
  trial_duration_type: z.string(),
  trial_duration_length: z.number(),
  tokenize_for_trial: z.boolean(),
  price: z.number(),
  interval: z.object({
    name: z.string(),
    duration: z.number(),
  }),
  currency: CurrencySchema,
  subscriber_fields: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      label: z.string(),
    })
  ),
  subscriber_identifier: z.string(),
});

const PlanGroupSchema = z.object({
  id: z.number(),
  type: z.literal("plan_group"),
  name: z.string(),
  slug: z.string(),
  business: BusinessSchema,
  description: z.string(),
  plans: z.array(PlanSchema),
});

const PageSchema = z.object({
  status: z.string(),
  data: z.discriminatedUnion("type", [PlanGroupSchema, PlanSchema]),
});

export type Plan = z.infer<typeof PlanSchema>;
export type PlanGroup = z.infer<typeof PlanGroupSchema>;
export type Page = z.infer<typeof PageSchema>;

/**
 * Get the details of the page to display
 * @param store The slug for the store/business
 * @param page The slug for the plan or plan group
 */
export async function getPage(store: string, page: string) {
  const res = await fetch(
    `${process.env.BASE_API_URL}/v1/store/${store}/${page}`
  );
  const data = await res.json();
  return PageSchema.parse(data);
}
