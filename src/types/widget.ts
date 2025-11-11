export type WidgetType = "steps" | "sleep" | "hrv" | "streak" | "bloodOxygen" | "moodTrends" | "wellnessScore";

export interface Widget {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  type: WidgetType;
}
