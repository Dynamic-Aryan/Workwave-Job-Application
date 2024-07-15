"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";


function PostNewJob({ profileInfo, user , jobList}) {
  console.log(jobList,"jobList");
  const buttonStyle = {
    color: "white",
    backgroundColor: "gray", // Green background
    padding: "10px 30px", // Padding
    fontSize: "16px", // Font size
    border: "none", // Remove border
    borderRadius: "7px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
  };

  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  const {toast}=useToast();

  console.log(jobFormData);
  
  function handlePostNewBtnValid() {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control].trim() !== ""
    );
  }

  function handleAddNewJob(){
    if(!profileInfo?.isPremiumUser && jobList.length >=2){
      toast({
        variant: "destructive",
        title: "Max 2 jobs can be posted here",
        description: "Opt for membership ,, to post more jobs",
        action: <Link href={'/membership'} >Choose Membership</Link>,
      })
      return ;
    }
    setShowJobDialog(true);
  }

  async function createNewJob() {
    await postNewJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );

    setJobFormData({
      ...initialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
    setShowJobDialog(false);
  }
  return (
    <div>
      <Button
        onClick={handleAddNewJob}
        className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
      >
        Post A Job..
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-center justify-center font-extrabold text-gray-700">
              Post New Job
            </DialogTitle>
            <div className="grid gap-4 py-1 ">
              <CommonForm
                buttonText={<span style={buttonStyle}>Add</span>}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handlePostNewBtnValid()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostNewJob;
