/**
 * projects.js
 * Featured projects rendered in the "Work" section.
 *
 * Each entry:
 *  - id          Unique key (slug, matches GitHub repo)
 *  - title       Display name
 *  - year        Year string
 *  - url         External link
 *  - lang        Primary language label
 *  - tags        Visible tech tags
 *  - stars       GitHub stars (display only)
 *  - filterTags  Tags the filter chips match against
 *  - descKey     Key in i18n.js with the localized description
 *  - featured    Whether to render the "Featured" badge
 */
export const projects = [
  {
    id: "vaccination-card-api",
    title: "Vaccination Card API",
    year: "2025",
    url: "https://github.com/MurilloLS/vaccination-card-api",
    lang: "C#",
    tags: [".NET", "Clean Architecture", "CQRS", "JWT", "Tests"],
    stars: 1,
    filterTags: ["dotnet", "backend", "api"],
    descKey: "pVacApiDesc",
    featured: true
  },
  {
    id: "vaccination-card-web",
    title: "Vaccination Card Web",
    year: "2025",
    url: "https://github.com/MurilloLS/vaccination-card-web",
    lang: "TypeScript",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind", "RBAC"],
    stars: 1,
    filterTags: ["frontend", "react"],
    descKey: "pVacWebDesc",
    featured: true
  },
  {
    id: "AngularEmployeeManager",
    title: "Angular Employee Manager",
    year: "2024",
    url: "https://github.com/MurilloLS/AngularEmployeeManager",
    lang: "Angular",
    tags: ["Angular", "TypeScript", "JWT"],
    stars: 0,
    filterTags: ["frontend", "angular"],
    descKey: "pAngEmpDesc",
    featured: false
  },
  {
    id: "WebAPI_Funcionarios",
    title: "WebAPI Funcionários",
    year: "2024",
    url: "https://github.com/MurilloLS/WebAPI_Funcionarios",
    lang: "C#",
    tags: ["ASP.NET Core", "Repository Pattern", "JWT"],
    stars: 1,
    filterTags: ["dotnet", "backend", "api"],
    descKey: "pWebApiDesc",
    featured: false
  },
  {
    id: "Ecommerce-api",
    title: "E-Commerce API",
    year: "2024",
    url: "https://github.com/MurilloLS/Ecommerce-api",
    lang: "C#",
    tags: ["ASP.NET Core", "EF Core", "SQL Server"],
    stars: 0,
    filterTags: ["dotnet", "backend", "api"],
    descKey: "pEcomDesc",
    featured: false
  },
  {
    id: "CrudSupermercado-Csharp",
    title: "CRUD Supermercado",
    year: "2023",
    url: "https://github.com/MurilloLS/CrudSupermercado-Csharp",
    lang: "C#",
    tags: ["MVC", "EF Core", "Bootstrap 5"],
    stars: 1,
    filterTags: ["dotnet", "fullstack"],
    descKey: "pCrudDesc",
    featured: false
  }
];

/**
 * Filter definitions for the project chips.
 * The `labelKey` resolves against i18n.js; if absent we use `label` directly.
 */
export const filters = [
  { id: "all",      labelKey: "filterAll" },
  { id: "dotnet",   label: ".NET" },
  { id: "frontend", label: "Frontend" },
  { id: "react",    label: "React" },
  { id: "angular",  label: "Angular" },
  { id: "api",      label: "API" }
];
