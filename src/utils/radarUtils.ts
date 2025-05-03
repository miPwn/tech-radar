import { AdoptionState, Technology, Quadrant } from "../types";
import { stateToRadiusMap } from "../data/initialData";

// Define quadrant angle ranges
const quadrantRanges: Record<Quadrant, { start: number; end: number }> = {
  techniques: { start: 0, end: 90 },
  tools: { start: 90, end: 180 },
  platforms: { start: 180, end: 270 },
  languages: { start: 270, end: 360 }
};

// Constants for spacing and layout
const MIN_ICON_DISTANCE = 90; // Increased spacing
const QUADRANT_PADDING = 5;
const MAX_ATTEMPTS = 200;

// Convert polar coordinates to cartesian
export const polarToCartesian = (
  angle: number,
  radius: number,
  centerX: number,
  centerY: number
): { x: number; y: number } => {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians)
  };
};

// Check for collisions
export const wouldCollide = (
  newPos: { x: number; y: number },
  existingPositions: { x: number; y: number }[]
): boolean => {
  return existingPositions.some((pos) => {
    const dx = newPos.x - pos.x;
    const dy = newPos.y - pos.y;
    return Math.sqrt(dx * dx + dy * dy) < MIN_ICON_DISTANCE;
  });
};

// Radius boundaries for state
export const getStateRadiusRange = (state: AdoptionState) => {
  return {
    min: stateToRadiusMap[state].inner,
    max: stateToRadiusMap[state].outer
  };
};

// Determine angle range for a quadrant
export const constrainAngleToQuadrant = (angle: number, quadrant: Quadrant): number => {
  const { start, end } = quadrantRanges[quadrant];
  const span = end - start;
  const adjusted = ((angle - start + span) % span) + start;
  return Math.max(start + QUADRANT_PADDING, Math.min(adjusted, end - QUADRANT_PADDING));
};

// Calculate cartesian position for a technology
export const calculateTechnologyPosition = (
  technology: Technology,
  existingPositions: { x: number; y: number }[],
  centerX: number,
  centerY: number,
  maxRadius: number
): { x: number; y: number } => {
  const angleRange = quadrantRanges[technology.quadrant];
  const stateRange = getStateRadiusRange(technology.state);
  const radiusMin = stateRange.min * maxRadius + 20;
  const radiusMax = stateRange.max * maxRadius - 20;

  let bestPosition = { x: 0, y: 0 };
  let found = false;
  let attempt = 0;

  while (!found && attempt < MAX_ATTEMPTS) {
    const angle = angleRange.start + QUADRANT_PADDING + Math.random() * (angleRange.end - angleRange.start - QUADRANT_PADDING * 2);
    const radius = radiusMin + Math.random() * (radiusMax - radiusMin);
    const pos = polarToCartesian(angle, radius, centerX, centerY);

    if (!wouldCollide(pos, existingPositions)) {
      bestPosition = pos;
      found = true;
    }

    attempt++;
  }

  // fallback
  if (!found) {
    const fallbackAngle = angleRange.start + (angleRange.end - angleRange.start) / 2;
    const fallbackRadius = (radiusMin + radiusMax) / 2;
    bestPosition = polarToCartesian(fallbackAngle, fallbackRadius, centerX, centerY);
  }

  return bestPosition;
};

// Find tech by ID
export const findTechnologyById = (
  technologies: Technology[],
  id: string
): Technology | undefined => {
  return technologies.find((tech) => tech.id === id);
};

// Unique ID generator
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};
