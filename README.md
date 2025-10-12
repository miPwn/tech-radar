# Technology Radar Dashboard

This project is a **Technology Radar** visualization and management tool, inspired by industry-standard practices for tracking the adoption lifecycle of technologies across an organization.

It provides an **interactive, quadrant-based radar chart** that categorizes technologies by:

- **Quadrant**: _Techniques_, _Tools_, _Platforms_, _Languages & Frameworks_
- **Adoption State**: _Adopted_, _Planned_, _Evaluation_, _Submitted_, _Rejected_

Each technology is plotted based on its quadrant and current state, with clear visual cues and separation to avoid ambiguity. A corresponding table below the radar provides structured details for each item, keeping the data clear and easy to audit.

---

## Key Features

- **Radar visualization** with quadrant + state mapping
- Color-coded rings and quadrant labels for clarity
- Dynamic placement of items without overlap
- Grid view of technologies grouped by state
- Export functionality to save radar snapshots as PNG
- Fully responsive and theme-aware (light/dark mode)

---

## Prototyped with [Bolt]

This project was initially prototyped using **Bolt**, a lightweight dev toolchain optimized for rapid prototyping. Bolt helped streamline early setup, layout logic, and iterative design cycles before moving toward refinement and customization.

---

## Structure

- `src/components/` – React components like `RadarView`, `TechnologyItem`, and `TechnologySummary`
- `src/utils/` – Layout algorithms (`radarUtils.ts`) for dynamic positioning
- `src/data/initialData.ts` – Source of quadrant/state metadata and initial technologies
- `public/` – Icons and static assets

---

## Getting Started

Clone and run:

```bash
git clone https://github.com/your-org/tech-radar.git
cd tech-radar
npm install
npm run dev
```

---

## Example Output

The radar clearly visualizes which technologies are:

- Ready for adoption
- Under active evaluation
- Recently submitted
- No longer recommended (rejected)

This helps teams make informed technology decisions at a glance.

---

## Future Enhancements

- Edit and annotate technology entries directly
- Filter or focus by quadrant/state
- Data sync with external systems (GitHub Issues, Airtable, etc.)
- Role-based views and permissions




---
