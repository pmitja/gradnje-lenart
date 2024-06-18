"use client"

import LogoutButton from "@/components/auth/logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const UserPage = () => {
  const user = useCurrentUser();

  return ( 
    <main className="bg-white p-10 rounded-xl">
      <LogoutButton>Logout</LogoutButton>
    </main>
   );
}
 
export default UserPage;