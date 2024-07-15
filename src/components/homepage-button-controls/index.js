"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

function HomepageButtonControls({ user, profileInfo }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="flex space-x-4">
      <Button
        onClick={() => {
          if (!user) {
            router.push("/sign-in"); // Redirect to sign-in page if user is not logged in
          } else {
            router.push("/jobs");
          }
        }}
        className="flex h-11 items-center justify-center px-5"
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Browse Jobs.."
            : "Jobs Dashboard.."
          : "Find Jobs.."}
      </Button>
      <Button
        onClick={() => {
          if (!user) {
            router.push("/sign-in"); // Redirect to sign-in page if user is not logged in
          } else {
            router.push(
              profileInfo?.role === "candidate" ? "/activity" : "/jobs"
            );
          }
        }}
        className="flex h-11 items-center justify-center px-5"
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Your Activity.."
            : "Post New Job.."
          : "Post New Job.."}
      </Button>
    </div>
  );
}

export default HomepageButtonControls;
