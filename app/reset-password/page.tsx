import { Button } from "@/components/button";
import { resetPassword } from "./actions";
import { Navigation } from "@/components/navigation";
import { Alert } from "@/components/alert";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string; error: boolean };
}) {
  // TODO add on success message and error message
  return (
    <form className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="you@site.com"
            required
          />
        </div>
        <div
          className={`${!searchParams.message ? "hidden" : ""} `}
          aria-live="polite"
        >
          {searchParams.message && (
            <Alert type={searchParams.error ? "error" : "success"}>
              {searchParams.message}
            </Alert>
          )}
        </div>
      </div>
      <Navigation>
        <Button variant="primary" href="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-[1em] w-[1em]"
            stroke="currentColor"
            strokeWidth={3}
            aria-label="Back Link"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Button>
        <Button
          variant="accent"
          formAction={resetPassword}
          pendingText="Loading"
        >
          Reset Password
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-[1em] w-[1em]"
            aria-hidden="true"
          >
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>
        </Button>
      </Navigation>
    </form>
  );
}
