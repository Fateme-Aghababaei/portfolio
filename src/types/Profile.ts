import type { Article } from "./Article";
import type { Certificate } from "./Certificate";
import type { Contact } from "./Contact";
import type { Experience } from "./Experience";
import type { Project } from "./Project";
import type { SkillGroup } from "./SkillGroup";
import type { Statistic } from "./Statistic";

export interface Profile {
    name: string;
    initials: string;
    primaryRole: string;
    roles: string[];
    tagline: string;
    aboutMe: string;
    collaborationPitch: string;
    location: string;
    since: number;
    resumeUrl: string;
    availability: {
        open: boolean;
        message: string;
    };
    contact: {
        email: Contact;
        linkedin: Contact;
        telegram: Contact;
        github: Contact;
    };
    primaryStack: string[];
    skills: SkillGroup[];
    marqueeItems: string[];
    projects: Project[];
    articles: Article[];
    certificates: Certificate[];
    workExperience: Experience[];
    statistics: Statistic[];
}
