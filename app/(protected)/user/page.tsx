"use client"

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const UserPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logout()
  }

  return ( 
    <div className="bg-white p-10 rounded-xl">
      <Button onClick={onClick}>Log out</Button>
    </div>
   );
}
 
export default UserPage;