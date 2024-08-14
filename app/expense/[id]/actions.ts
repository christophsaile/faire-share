"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { updateBalances } from "../actions";
import { revalidatePath } from "next/cache";

export async function deleteExpense(expenseId: number) {
  // TODO - move this to a shared function
  // TODO - only allow the user who created the expense to delete it?
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  // delete the expense from the database
  const { data: deleteExpenseData, error: deleteExpenseError } = await supabase
    .from("expenses")
    .delete()
    .eq("expense_id", expenseId)
    .select();

  console.log(deleteExpenseData);

  if (deleteExpenseError) {
    console.error("Error deleting expense:", deleteExpenseError);
  }

  let profileId;

  if (user.id === deleteExpenseData[0].paid) {
    profileId = deleteExpenseData[0].owes;
  } else {
    profileId = deleteExpenseData[0].paid;
  }

  await updateBalances(user.id, profileId);

  revalidatePath("/balance");
  revalidatePath(`/expense/with/${profileId}`);
  redirect(`/expense/with/${profileId}`);
}
