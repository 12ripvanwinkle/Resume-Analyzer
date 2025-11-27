import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Smart Feedback for YOUR Dream Job" },
  ];
}

export default function Home() {

  const {isLoading, auth} = usePuterStore(); 
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
    
  }, [auth.isAuthenticated])
  
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Corresponding Resume Ratings</h1>
        <h2>Review Your Submissions and Check AI-Powered feedback</h2>
      </div>

      {/* this is a list of different resumes */}

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>
    
    
  </main>
}
