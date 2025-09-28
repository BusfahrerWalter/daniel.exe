export type SnapshotDomain = 'ADS_CLICKED' | 'MEMBER_FOLLOWING' | 'login' | 'RICH_MEDIA' | 'SEARCHES' | 'INFERENCE_TAKEOUT' | 'ALL_COMMENTS' | 'CONTACTS' | 'Events' | 'RECEIPTS' | 'AD_TARGETING' | 'REGISTRATION' | 'REVIEWS' | 'ARTICLES' | 'PATENTS' | 'GROUPS' | 'COMPANY_FOLLOWS' | 'INVITATIONS' | 'PHONE_NUMBERS' | 'CONNECTIONS' | 'EMAIL_ADDRESSES' | 'JOB_POSTINGS' | 'JOB_APPLICATIONS' | 'JOB_SEEKER_PREFERENCES' | 'LEARNING' | 'INBOX' | 'SAVED_JOBS' | 'SAVED_JOB_ALERTS' | 'PROFILE' | 'SKILLS' | 'POSITIONS' | 'EDUCATION' | 'TEST_SCORES' | 'CAUSES_YOU_CARE_ABOUT' | 'PUBLICATIONS' | 'PROJECTS' | 'ORGANIZATIONS' | 'LANGUAGES' | 'HONORS' | 'COURSES' | 'CERTIFICATIONS' | 'RECOMMENDATIONS' | 'ENDORSEMENTS' | 'MEMBER_SHARE_INFO' | 'SECURITY_CHALLENGE_PIPE' | 'TRUSTED_GRAPH' | 'MARKETPLACE_ENGAGEMENTS' | 'MARKETPLACE_PROVIDERS' | 'MARKETPLACE_OPPORTUNITIES' | 'ACTOR_SAVE_ITEM' | 'JOB_APPLICANT_SAVED_ANSWERS' | 'TALENT_QUESTION_SAVED_RESPONSE' | 'PROFILE_SUMMARY' | 'ALL_LIKES' | 'ALL_VOTES' | 'RECEIPTS_LBP' | 'easyapply-blocking' | 'LEARNING_COACH_AI_TAKEOUT' | 'LEARNING_COACH_INBOX' | 'LEARNING_ROLEPLAY_INBOX' | 'VOLUNTEERING_EXPERIENCES' | 'ACCOUNT_HISTORY' | 'INSTANT_REPOSTS' | 'IDENTITY_CREDENTIALS_AND_ASSETS';

export interface SnapshotData extends Record<SnapshotDomain, any> {
	PROFILE: ProfileSnapshot;
	SKILLS: SkillSnapshot[];
	POSITIONS: PositionSnapshot[];
	EDUCATION: EducationSnapshot[];
}

export interface ProfileSnapshot {
	birthDate: string;
	firstName: string;
	geoLocation: string;
	headline: string;
	industry: string;
	instantMessengers: string;
	lastName: string;
	maidenName: string;
	summary: string;
	twitterHandles: string;
	websites: string;
	zipCode: string;
	address: string;
}

export interface SkillSnapshot {
	name: string;
}

export interface PositionSnapshot {
	finishedOn: string;
	title: string;
	companyName: string;
	description: string;
	location: string;
	startedOn: string;
}

export interface EducationSnapshot {
	activities: string;
	degreeName: string;
	startDate: string;
	schoolName: string;
	endDate: string;
	notes: string;
}