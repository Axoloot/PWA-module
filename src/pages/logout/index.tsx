import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUserContext } from "../../providers/userProvider";

const Logout = () => {
  const { logout } = useUserContext();
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/');
  }, [logout]);

  useEffect(logout, [logout]);

  return (<></>)
};

export default Logout;
