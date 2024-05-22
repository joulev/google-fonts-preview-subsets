import { Dropdown } from "./dropdown";
import data from "./v1/[font]/data.json";

export default function Page() {
  return (
    <div className="flex h-dvh w-dvw flex-row justify-center py-24">
      <Dropdown fonts={data.map(x => x.name)} />
    </div>
  );
}
