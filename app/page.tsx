import {
  getProfile,
  getTimeline,
  getFeaturedProjects,
  getTechStack,
} from "@/lib/content";
import { HeroSection } from "@/components/home/hero-section";
import { AboutTimeline } from "@/components/home/about-timeline";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { TechStackSection } from "@/components/home/tech-stack-section";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  const profile = getProfile();
  const timeline = getTimeline();
  const featuredProjects = getFeaturedProjects();
  const techStack = getTechStack();

  return (
    <>
      <HeroSection profile={profile} />
      <AboutTimeline aboutMe={profile.aboutMe ?? []} timeline={timeline} />
      <FeaturedProjects projects={featuredProjects} />
      <TechStackSection items={techStack} />
      <ContactSection />
    </>
  );
}
