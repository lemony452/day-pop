import Loading from "../dashboard/loading";
import GetToken from "./get-token";

export default function CallbackPage({ searchParams }) {
  const code = searchParams.code;
  const state = searchParams.state;
  return (
    <Loading>
      <GetToken code={code} state={state}></GetToken>
    </Loading>
  );
}
