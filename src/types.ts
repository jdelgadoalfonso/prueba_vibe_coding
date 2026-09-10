export interface Planet {
  id: string;
  name: string;
  color: string;
  orbitRadius: number;
  radius: number;
  period: number;
  hasRings?: boolean;
  diameter: string;
  distanceToSun: string;
  orbitalPeriodStr: string;
  relativeSize: string;
  description: string;
}
