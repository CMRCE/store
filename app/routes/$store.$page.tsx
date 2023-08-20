import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Page, Plan, PlanGroup } from "~/models/page.model";
import { getPage } from "~/models/page.model";

function isPlanGroup(
  page: Page
): page is Omit<Page, "data"> & { data: PlanGroup } {
  return page.data.type === "plan_group";
}

function isPlan(page: Page): page is Omit<Page, "data"> & { data: Plan } {
  return page.data.type === "plan";
}

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.store, "params.store is required");
  invariant(params.page, "params.page is required");
  const page = await getPage(params.store, params.page);
  invariant(page, "Page not found");
  return json(page);
};

export const meta: V2_MetaFunction<typeof loader> = ({ data: page }) => {
  return [
    {
      title: `Buy ${page?.data.name} from ${page?.data.business.name}`,
    },
    {
      name: "description",
      content: page?.data.description,
    },
  ];
};

export default function StorePage() {
  const page = useLoaderData<typeof loader>();
  return (
    <main className="bg-brand-yellow-light bg-opacity-60 min-h-screen">
      <div className="bg-brand-blue bg-opacity-80 h-20 md:h-30 w-full flex justify-center mb-12 md:mb-20">
        <img
          className="rounded-full translate-y-1/2"
          src="https://picsum.photos/200"
          alt={`logo of ${page.data.business.name}`}
        />
      </div>
      <div className="flex justify-center">
        <div className="px-6 md:w-1/2">
          <h1 className="text-4xl font-semibold text-center mb-2">
            {page.data.business.name}
          </h1>
          <h2 className="text-2xl text-center mb-2">{page.data.name}</h2>
          <p className="text-lg">{page.data.description}</p>
        </div>
      </div>
      <div className="py-6">
        {isPlanGroup(page) ? (
          <>
            <ul className="flex flex-wrap justify-center gap-6 px-6">
              {page.data.plans.map((plan) => (
                <li
                  key={plan.id}
                  className="w-full md:w-1/3 flex flex-col justify-between bg-white p-3"
                >
                  <h3 className="text-xl text-center">{plan.name}</h3>
                  <p className="">{plan.description}</p>
                  <h4 className="text-lg text-center">Benefits</h4>
                  <ul className="list-disc pl-5">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <button className="mt-10 text-sm font-semibold hover:text-opacity-60 hover:bg-gray-80 bg-black border p-2 px-6 rounded-md border-black text-white">
                    Buy Plan +
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : isPlan(page) ? (
          <></>
        ) : null}
      </div>
    </main>
  );
}
