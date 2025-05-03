import { AdoptionState, Technology, Quadrant } from "../types";
import { stateToRadiusMap } from "../data/initialData";

// Quadrant angles
const quadrantRanges: Record<Quadrant, { start: number; end: number }> = {
  techniques: { start: 0, end: 90 },
  tools: { start: 90, end: 180 },
  platforms: { start: 180, end: 270 },
  languages: { start: 270, end: 360 }
};

// Spacing + spiral constants
const MIN_BORDER_PADDING = 30;
const QUADRANT_PADDING = 15;
const SPIRAL_STEP = 5;
const MAX_TRIES = 500;

// Add jitter to break symmetry
const jitter = (min: number, max: number): number => Math.random() * (max - min) + min;

// Polar to cartesian
export const polarToCartesian = (
  angle: number,
  radius: number,
  centerX: number,
  centerY: number
): { x: number; y: number } => {
  const radians = ((angle - 90) * Math.PI) / 180;
  const adjustedRadius = Math.max(radius * (1 - MIN_BORDER_PADDING / Math.max(centerX, centerY)), 0);
  return {
    x: centerX + adjustedRadius * Math.cos(radians),
    y: centerY + adjustedRadius * Math.sin(radians)
  };
};

// Collision check with dynamic spacing
export const wouldCollide = (
  newPos: { x: number; y: number },
  existingPositions: { x: number; y: number }[],
  radius: number
): boolean => {
  const scaledDistance = 50 + radius * 100;
  return existingPositions.some(pos => {
    const dx = newPos.x - pos.x;
    const dy = newPos.y - pos.y;
    return Math.sqrt(dx * dx + dy * dy) < scaledDistance;
  });
};

// Get state range
export const getStateRadiusRange = (state: AdoptionState) => ({
  min: stateToRadiusMap[state].inner + MIN_BORDER_PADDING / 1000,
  max: stateToRadiusMap[state].outer - MIN_BORDER_PADDING / 1000
});

// Constrain angle
export const constrainAngleToQuadrant = (angle: number, quadrant: Quadrant): number => {
  const range = quadrantRanges[quadrant];
  const normalized = ((angle % 360) + 360) % 360;
  return normalized >= range.start && normalized <= range.end
    ? normalized
    : range.start + (range.end - range.start) / 2;
};

// Core layout logic
export const findValidPosition = (
  technology: Technology,
  existingTechs: Technology[],
  centerX: number,
  centerY: number,
  maxRadius: number
): { angle: number; radius: number } => {
  const range = quadrantRanges[technology.quadrant];
  const stateRange = getStateRadiusRange(technology.state);

  const baseAngle = range.start + (range.end - range.start) / 2 + jitter(-12, 12);
  const baseRadius = (stateRange.min + stateRange.max) / 2 + jitter(-0.03, 0.03);

  const existingPositions = existingTechs.map(tech =>
    calculateTechnologyPosition(tech, [], centerX, centerY, maxRadius)
  );

  let angle = baseAngle;
  let radius = baseRadius;
  let spiralStep = 0;

  while (spiralStep < MAX_TRIES) {
    angle = baseAngle + (spiralStep * SPIRAL_STEP) % (range.end - range.start - 2 * QUADRANT_PADDING);
    radius = baseRadius + Math.sin(spiralStep * 0.15) * 0.15;

    const pos = polarToCartesian(angle, radius * maxRadius, centerX, centerY);

    if (!wouldCollide(pos, existingPositions, radius)) {
      return { angle, radius };
    }
    spiralStep++;
  }

  return { angle: baseAngle, radius: baseRadius };
};

// Compute cartesian pos from tech
export const calculateTechnologyPosition = (
  technology: Technology,
  existingPositions: { x: number; y: number }[],
  centerX: number,
  centerY: number,
  maxRadius: number
): { x: number; y: number } => {
  const { start, end } = quadrantRanges[technology.quadrant];
  const stateRange = getStateRadiusRange(technology.state);

  const midRadius = (stateRange.min + stateRange.max) / 2;
  const radiusStep = (stateRange.max - stateRange.min) / 10;

  let spiralStep = 0;
  let found = false;
  let position = { x: 0, y: 0 };

  // Use spiral to explore position candidates
  while (!found && spiralStep < 360) {
    const angle = start + QUADRANT_PADDING + (spiralStep * SPIRAL_STEP) % (end - start - 2 * QUADRANT_PADDING);
    const radius = stateRange.min + ((spiralStep % 10) * radiusStep);

    position = polarToCartesian(angle, radius * maxRadius, centerX, centerY);

    if (!wouldCollide(position, existingPositions, radius)) {
      found = true;
    }

    spiralStep++;
  }

  // Fallback to center of quadrant if no space found
  if (!found) {
    const fallbackAngle = start + (end - start) / 2;
    const fallbackRadius = midRadius * maxRadius;
    position = polarToCartesian(fallbackAngle, fallbackRadius, centerX, centerY);
  }

  return position;
};

// Helpers
export const findTechnologyById = (technologies: Technology[], id: string): Technology | undefined =>
  technologies.find((tech) => tech.id === id);

export const generateId = (): string =>
  Math.random().toString(36).substring(2, 10);