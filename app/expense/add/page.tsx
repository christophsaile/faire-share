import { createClient } from "@/utils/supabase/server";
import ExpenseForm from "../expense-form";
import { Profile } from "../utils";
import { addExpense } from "./actions";
import { FsButtonGroup } from "@/components/fs-button-group";
import { FsButton } from "@/components/fs-button";
import { redirect } from "next/navigation";

export default async function ExpenseAdd({
  searchParams,
}: {
  searchParams: { profile_id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .neq("id", user?.id);
  if (error) console.log(error);

  const preselectProfile = data?.find(
    (profile) => profile.id === searchParams.profile_id,
  );

  return (
    <div>
      <ExpenseForm
        profiles={data as Profile[]}
        preselectProfile={preselectProfile}
      >
        <FsButtonGroup>
          <FsButton
            variant="secondary"
            href={
              searchParams.profile_id
                ? `/expense/profile/${searchParams.profile_id}`
                : "/"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-[1em] w-[1em]"
              stroke="currentColor"
              strokeWidth={2}
              aria-label="Back Link"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </FsButton>
          <FsButton variant="accent" formAction={addExpense}>
            Add Expense
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-[1em] w-[1em]"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </FsButton>
        </FsButtonGroup>
      </ExpenseForm>
    </div>
  );
}
