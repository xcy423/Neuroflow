export interface ChallengeUserRank {
  name: string;
  days: number; // participation days or points metric
  avatar: string; // could be emoji or URL
}

export interface ChallengeInfo {
  id: number;
  title: string;
  category: string;
  icon: string; // emoji or short label
  description: string;
  timeLeft: string; // formatted countdown text
  participants: number;
  joined?: boolean;
  topUsers?: ChallengeUserRank[]; // ranking list for session view
}