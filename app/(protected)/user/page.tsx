"use client"

import LogoutButton from "@/components/auth/logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const UserPage = () => {
  const user = useCurrentUser();

  return ( 
    <div className="bg-white p-10 rounded-xl">
      <LogoutButton>Logout</LogoutButton>
    </div>
   );
}
 
export default UserPage;