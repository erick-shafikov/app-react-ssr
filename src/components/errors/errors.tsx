import { observer } from "mobx-react";
import useStore from "@src/contexts/useStore";

interface Error404Props {
  title?: string;
}

const Error404 = observer(function ({
  title = "Page not found",
}: Error404Props) {
  const { page } = useStore();

  page.update(title, 404);

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
});

export default Error404;
