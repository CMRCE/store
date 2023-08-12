import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Page, Plan, PlanGroup } from "~/models/page.model";
import { getPage } from "~/models/page.model";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.store, "params.store is required");
  invariant(params.page, "params.page is required");
  const page = await getPage(params.store, params.page);
  invariant(page, "Page not found");
  return json(page);
};

function isPlanGroup(
  page: Page
): page is Omit<Page, "data"> & { data: PlanGroup } {
  return page.data.type === "plan_group";
}

function isPlan(page: Page): page is Omit<Page, "data"> & { data: Plan } {
  return page.data.type === "plan";
}

export default function StorePage() {
  const page = useLoaderData<typeof loader>();
  return (
    <>
      <div className="bg-brand-blue h-10 w-full"></div>
      <h1 className="text-3xl font-semibold">{page.data.business.name}</h1>
      <h3 className="text-xl">{page.data.name}</h3>
      <p>{page.data.description}</p>
      {isPlanGroup(page) ? (
        <>
          <ul>
            {page.data.plans.map((plan) => (
              <li key={plan.id}>{plan.name}</li>
            ))}
          </ul>
        </>
      ) : isPlan(page) ? (
        <></>
      ) : null}
    </>
  );
}
