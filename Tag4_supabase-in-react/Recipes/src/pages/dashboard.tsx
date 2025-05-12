import { supabase } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const {
    data: authUser,

    isError: isAuthError,
    isPending: isAuthPending,
  } = useQuery({
    queryFn: async () => {
      const result = await supabase.auth.getUser();
      if (result.data) {
        return result.data.user;
      } else {
        throw result.error;
      }
    },
    queryKey: ["auth-user"],
  });

  console.log("authUser", authUser);
  const {
    data: profile,
    isError: isProfileError,
    isPending: isProfilePending,
  } = useQuery({
    queryFn: async () => {
      const result = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", authUser!.id)
        .maybeSingle()
        .throwOnError();
      if (result.data) {
        return result.data;
      } else {
        throw result.error;
      }
    },
    queryKey: ["profile", authUser?.id],
    enabled: !!authUser,
  });
  if (isProfilePending || isAuthPending) {
    return "Lädt...";
  }
  if (isProfileError || isAuthError) {
    return "Leider kaputt.";
  }

  return (
    <div>
      <p>
        Hallo {profile?.first_name} {profile?.last_name}
      </p>
      <p>Email: {authUser?.email}</p>
      <p>Created at: {authUser?.created_at}</p>
      <p>Last Sign in at: {authUser?.last_sign_in_at}</p>
    </div>
  );
}

export default Dashboard;
