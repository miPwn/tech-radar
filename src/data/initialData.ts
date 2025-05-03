import { RadarData } from '../types';

export const initialRadarData: RadarData = 
  {
  "companyName": "Cube",
  "lastUpdated": "2025-05-03T13:06:56.836Z",
  "technologies": [
    {
      "id": "3",
      "name": ".Net Core",
      "description": "Cross-platform, high-performance framework for building modern apps",
      "icon": "code",
      "quadrant": "platforms",
      "state": "planned",
      "logoUrl": "https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg"
    },
    {
      "id": "4",
      "name": "Kubernetes",
      "description": "Container orchestration system for automating deployment and scaling",
      "icon": "code",
      "quadrant": "platforms",
      "state": "rejected",
      "logoUrl": "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg"
    },
    {
      "id": "5",
      "name": "Prime NG",
      "description": "UI component library for Angular applications",
      "icon": "code",
      "quadrant": "tools",
      "state": "evaluation",
      "logoUrl": "https://www.primefaces.org/wp-content/uploads/2020/05/primeng-logo-1.png"
    },
    {
      "id": "6",
      "name": "New Relic",
      "description": "Observability platform for application performance monitoring",
      "icon": "code",
      "quadrant": "tools",
      "state": "submitted",
      "logoUrl": "https://newrelic.com/assets/newrelic/source/NewRelic-logo-dark.svg"
    },
    {
      "id": "7",
      "name": "Postgres",
      "description": "Advanced open-source relational database",
      "icon": "code",
      "quadrant": "platforms",
      "state": "adopted",
      "logoUrl": "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg"
    },
    {
      "id": "8",
      "name": "Azure",
      "description": "Cloud computing platform by Microsoft",
      "icon": "code",
      "quadrant": "platforms",
      "state": "submitted",
      "logoUrl": "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg"
    },
    {
      "id": "9",
      "name": "Helm",
      "description": "Package manager for Kubernetes applications",
      "icon": "code",
      "quadrant": "tools",
      "state": "submitted",
      "logoUrl": "https://helm.sh/img/helm.svg"
    },
    {
      "id": "10",
      "name": "Tarraform",
      "description": "Infrastructure as code tool for provisioning cloud infrastructure",
      "icon": "code",
      "quadrant": "techniques",
      "state": "evaluation",
      "logoUrl": "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg"
    },
    {
      "id": "11",
      "name": "Python",
      "description": "High-level, interpreted programming language known for readability",
      "icon": "code",
      "quadrant": "languages",
      "state": "adopted",
      "logoUrl": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
    },
    {
      "id": "12",
      "name": "C#",
      "description": "Modern, object-oriented programming language developed by Microsoft",
      "icon": "code",
      "quadrant": "languages",
      "state": "adopted",
      "logoUrl": "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg"
    },
    {
      "id": "13",
      "name": "Claude API",
      "description": "API access to Anthropic’s Claude AI models",
      "icon": "code",
      "quadrant": "tools",
      "state": "evaluation",
      "logoUrl": "https://avatars.githubusercontent.com/u/109133258?s=200&v=4"
    },
    {
      "id": "14",
      "name": "Roo Code",
      "description": "Collaborative development environment and code assistant",
      "icon": "code",
      "quadrant": "tools",
      "state": "adopted",
      "logoUrl": "https://roocode.io/favicon.ico"
    },
    {
      "id": "15",
      "name": "CoPilot",
      "description": "AI-powered code completion and suggestions from GitHub",
      "icon": "code",
      "quadrant": "tools",
      "state": "evaluation",
      "logoUrl": "https://github.githubassets.com/images/modules/site/copilot-logo.png"
    },
    {
      "id": "16",
      "name": "Terraform",
      "description": "Tool for building, changing, and versioning infrastructure safely",
      "icon": "code",
      "quadrant": "techniques",
      "state": "submitted",
      "logoUrl": "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg"
    },
    {
      "id": "17",
      "name": "EF Core",
      "description": "Object-database mapper for .NET using LINQ queries",
      "icon": "code",
      "quadrant": "tools",
      "state": "rejected",
      "logoUrl": "https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg"
    },
    {
      "id": "18",
      "name": "Playwrite",
      "description": "Framework for end-to-end testing of web applications",
      "icon": "code",
      "quadrant": "tools",
      "state": "planned",
      "logoUrl": "https://playwright.dev/img/playwright-logo.svg"
    }
  ]
}
;

export const stateToRadiusMap = {
  adopted: { inner: 0, outer: 0.35 },
  planned: { inner: 0.35, outer: 0.5 },
  evaluation: { inner: 0.5, outer: 0.65 },
  submitted: { inner: 0.65, outer: 0.8 },
  rejected: { inner: 0.8, outer: 0.95 }
};

export const stateToColorMap = {
  adopted: {
    light: 'rgba(124, 252, 0, 0.25)',
    dark: 'rgba(0, 100, 0, 0.5)',
    border: '#006400',
    tableHeader: 'bg-[#58ab58] text-white'
  },
  planned: {
    light: 'rgba(144, 238, 144, 0.25)',
    dark: 'rgba(50, 205, 50, 0.5)',
    border: '#32CD32',
    tableHeader: 'bg-[#7ed87e] text-black'
  },
  evaluation: {
    light: 'rgba(255, 179, 71, 0.25)',
    dark: 'rgba(255, 140, 0, 0.5)',
    border: '#ff8c00',
    tableHeader: 'bg-[#f8a039] text-black'
  },
  submitted: {
    light: 'rgba(173, 216, 230, 0.25)',
    dark: 'rgba(135, 206, 235, 0.5)',
    border: '#87CEEB',
    tableHeader: 'bg-[#95d2eb] text-black'
  },
  rejected: {
    light: 'rgba(255, 182, 193, 0.25)',
    dark: 'rgba(255, 105, 180, 0.5)',
    border: '#FF69B4',
    tableHeader: 'bg-[#ec8ea9] text-black'
  }
};

export const quadrantColorMap = {
  techniques: { light: 'text-blue-600', dark: 'dark:text-blue-400' },
  tools: { light: 'text-emerald-600', dark: 'dark:text-emerald-400' },
  platforms: { light: 'text-amber-600', dark: 'dark:text-amber-400' },
  languages: { light: 'text-purple-600', dark: 'dark:text-purple-400' },
};