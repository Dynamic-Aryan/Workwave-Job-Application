"use client";

import { Fragment, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createJobApplicationAction } from "@/actions";
import { useToast } from "../ui/use-toast";

function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
  console.log(jobApplications, "jobApplications");
  const {toast} = useToast()
  async function handlejobApply() {

    if(!profileInfo.isPremiumUser && jobApplications.length >=2){
      setShowJobDetailsDrawer(false);
      toast({
        variant: "destructive",
        title: "Max 2 jobs can be applied here",
        description: "Opt for membership ,, to apply for more jobs",
       
      })
      return ;
    }

    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setShowJobDetailsDrawer(false);
  }

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
      >
        <CommonCard
          icon={<JobIcon />}
          title={jobItem?.title}
          description={jobItem?.companyName}
          footerContent={
            <Button
              onClick={() => setShowJobDetailsDrawer(true)}
              className="dark:bg-[#94a3b8] dark:text-white flex h-11 items-center justify-center px-5 bg-zinc-700"
            >
              View Details
            </Button>
          }
        />
        <DrawerContent className="p-6 bg-slate-400">
          <DrawerHeader className="px-0">
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl font-extrabold text-gray-800 ">
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex gap-4">
                <Button
                  onClick={handlejobApply}
                  disabled={
                    jobApplications.findIndex(
                      (item) => item.jobID === jobItem?._id
                    ) > -1
                      ? true
                      : false
                  }
                  className="disabled:opacity-65 flex h-11 items-center justify-center px-5 bg-zinc-700"
                >
                  {jobApplications.findIndex(
                    (item) => item.jobID === jobItem?._id
                  ) > -1
                    ? "Applied"
                    : "Apply"}
                </Button>
                <Button
                  className="flex h-11 items-center justify-center px-5 bg-zinc-700"
                  onClick={() => setShowJobDetailsDrawer(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-xl font-medium text-gray-800">
            {jobItem?.title}
            <span className="text-xl ml-4 font-normal text-gray-900">
              {jobItem?.location}
            </span>
          </DrawerDescription>
          <div className="w-[150px] mt-5 flex justify-center items-center h-[40px] bg-gray-800 hover:bg-slate-600 rounded-[4px]">
            <h2 className="text-lg font-semibold text-white ">
              {jobItem?.type} Time
            </h2>
          </div>
          <h3 className="text-2xl font-medium text-gray-900 mt-3">
            Experience: {jobItem?.experience} year
          </h3>
          <div className="flex gap-4 mt-6">
            {jobItem?.skills.split(",").map((skillItem) => (
              <div className="w-[100px] flex justify-center items-center h-[33px] bg-gray-800 rounded-[7px]">
                <h2 className="text-[15px] font-medium text-white">
                  {skillItem}
                </h2>
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

export default CandidateJobCard;
