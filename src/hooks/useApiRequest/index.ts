import useApiRequestClient from "@src/hooks/useApiRequest/useApiRequestClient";
import useApiRequestServer from "@src/hooks/useApiRequest/useApiRequestServer";

let useApiRequest: typeof useApiRequestClient;

if (import.meta.env.SSR) {
  useApiRequest = useApiRequestServer;
} else {
  useApiRequest = useApiRequestClient;
}

export default useApiRequest;
