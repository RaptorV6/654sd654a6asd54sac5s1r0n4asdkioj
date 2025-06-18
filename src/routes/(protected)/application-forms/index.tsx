import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <ul>
      <li>
        <Link href="create/" prefetch={false}>
          Vytvoření žádanky
        </Link>
      </li>
      <li>
        <Link href="planning/" prefetch={false}>
          Plánování žádanek
        </Link>
      </li>
      <li>
        <Link href="plannig/" prefetch={false}>
          Snímkování
        </Link>
      </li>
      <li>
        <Link href="plannig/" prefetch={false}>
          Popsání
        </Link>
      </li>
    </ul>
  );
});
