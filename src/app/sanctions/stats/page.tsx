import { redirect } from "next/navigation";

// Just redirect to the default child
function Page() {
  return redirect("/sanctions/stats/types");
}

export default Page;
