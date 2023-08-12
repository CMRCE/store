import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "OurShop.Africa" },
    { name: "description", content: "Welcome to OurShop!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to OurShop</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://app.ourshop.africa"
            rel="noreferrer"
          >
            Go to Dashboard
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://ourshop.africa"
            rel="noreferrer"
          >
            Go to Homepage
          </a>
        </li>
      </ul>
    </div>
  );
}
