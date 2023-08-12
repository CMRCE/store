import type { LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant"

export const loader = ({ params }: LoaderArgs) => {
  invariant(params.store, "params.store is required");
  // const post = await getPost(params.slug);
  return null;
};

export default function Store() {
  return (
    <>
      <h1>My Store</h1>
    </>
  );
}
