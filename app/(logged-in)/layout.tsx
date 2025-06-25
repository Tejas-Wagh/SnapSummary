import UpgradeRequired from "@/components/common/upgrade-required";
import { getSubscriptionStatus } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const hasActiveSubscription = getSubscriptionStatus(user);

  if (!hasActiveSubscription) {
    return <UpgradeRequired/>;
  }

  return <>{children}</>;
};

export default Layout;
