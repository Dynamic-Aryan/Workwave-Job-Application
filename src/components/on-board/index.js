"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://ppcklbrpojzechmrslvi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwY2tsYnJwb2p6ZWNobXJzbHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5NDM2NzQsImV4cCI6MjAzNTUxOTY3NH0.TL2AfKc65WBLa2l9BGS2Ay2F5Nt_BWuJnrpFppFa8aY"
);

function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [file, setFile] = useState(null);
  const currentAuthUser = useUser();
  const { user } = currentAuthUser;

  function handleFileChange(event) {
    event.preventDefault();

    setFile(event.target.files[0]);
  }

  async function handleUploadPdfToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from("work-wave-public")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
      console.log(data,error);
      if(data){
        setCandidateFormData({
          ...candidateFormData,
          resume : data.path
        })
      }

  }

  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  }, [file]);

  function handleTabChange(value) {
    setCurrentTab(value);
  }

 

  function handleRecruiterFormValid() {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  }

  function handleCandidateFormValid(){
    return Object.keys(candidateFormData).every(key=> candidateFormData[key].trim()!=='')
  }

  async function createProfile() {
    const data = currentTab === 'candidate'?{
      candidateInfo: candidateFormData,
      role:'candidate',
      isPremiumUser: false,
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
    }:{
      recruiterInfo: recruiterFormData,
      role: "recruiter",
      isPremiumUser: false,
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
    };

    await createProfileAction(data, "/onboard");
  }
  console.log(candidateFormData);
  const buttonStyle = {
    color: "white",
    backgroundColor: "gray", // Green background
    padding: "10px 30px", // Padding
    fontSize: "16px", // Font size
    border: "none", // Remove border
    borderRadius: "7px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
  };

  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b-4 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to Acclimation
            </h1>
            <TabsList>
              <TabsTrigger className="font-extrabold " value="candidate">
                Candidate
              </TabsTrigger>
              <TabsTrigger className="font-extrabold" value="recruiter">
                Recruiter
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            formControls={candidateOnboardFormControls}
            buttonText={<span style={buttonStyle}>Onboard as Candidate</span>}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            handleFileChange={handleFileChange}
            isBtnDisabled={!handleCandidateFormValid()}
            action={createProfile}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnboardFormControls}
            buttonText={<span style={buttonStyle}>Onboard as Recruiter</span>}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValid()}
            action={createProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default OnBoard;
