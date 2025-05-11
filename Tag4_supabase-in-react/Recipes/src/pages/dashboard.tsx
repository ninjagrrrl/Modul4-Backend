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
  //FIXME - hier gibt es einen Fehler, die Daten kommen nicht an
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
        .single();
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
        Hallo {profile?.first_name}
        {profile?.last_name}
      </p>
      <p>Email: {authUser?.email}</p>
    </div>
  );
}

export default Dashboard;
