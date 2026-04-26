import type { Article } from "./Article";
import type { Certificate } from "./Certificate";
import type { Contact } from "./Contact";
import type { Experience } from "./Experience";
import type { Project } from "./Project";
import type { SkillGroup } from "./SkillGroup";
import type { SocialMedia } from "./SocialMedia";
import type { Statistic } from "./Statistic";

export interface Profile {
    name: string;
    primaryRole: string;
    roles: string[];
    heroDescription: string;
    aboutMe: string;
    location: string;
    since: number;
    contact: {
        email: Contact;
        linkedin: Contact;
        telegram: Contact;
    };
    socialMedia: SocialMedia[];
    primaryStack: string[];
    skills: SkillGroup[];
    marqueeItems: string[];
    projects: Project[];
    articles: Article[];
    certificates: Certificate[];
    workExperience: Experience[];
    statistics: Statistic[];
}
