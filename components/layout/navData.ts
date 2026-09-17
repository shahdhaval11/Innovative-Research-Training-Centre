export type NavLink = {
  label: string;
  href: string;
};

export type NavColumn = {
  heading?: string;
  links: NavLink[];
};

export type NavItem = {
  label: string;
  /** Shorter label used in the top navbar row to keep it on one line; full `label` is used everywhere else (mega menu heading, mobile menu, footer). */
  shortLabel?: string;
  href: string;
  columns?: NavColumn[];
  cta?: NavLink;
  /** Render the dropdown as a compact, content-sized menu under the nav item instead of a full-width mega panel. */
  compact?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/aboutus",
    columns: [
      {
        links: [
          { label: "About NanoNova", href: "/aboutus" },
          { label: "Vision & Mission", href: "/aboutus#vision-mission" },
          { label: "Why NanoNova?", href: "/aboutus#why-nanonova" },
          { label: "Our Team", href: "/aboutus#our-team" },
          { label: "Laboratory & Infrastructure", href: "/aboutus#infrastructure" },
          { label: "Our Partners", href: "/aboutus#partners" },
          { label: "Achievements", href: "/aboutus#achievements" },
        ],
      },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    columns: [
      {
        heading: "Training & Certification",
        links: [
          { label: "Short-Term Courses", href: "/programs/short-term-courses" },
          { label: "Certificate Programs", href: "/programs/certificate-programs" },
          { label: "Skill-Based Courses", href: "/programs/skill-based-courses" },
          { label: "Advanced Laboratory Training", href: "/programs/advanced-laboratory-training" },
          { label: "Professional Development Programs", href: "/programs/professional-development" },
        ],
      },
      {
        heading: "Life Science Programs",
        links: [
          { label: "Microbiology", href: "/programs/microbiology" },
          { label: "Biotechnology", href: "/programs/biotechnology" },
          { label: "Molecular Biology", href: "/programs/molecular-biology" },
          { label: "Biochemistry", href: "/programs/biochemistry" },
          { label: "Medical Laboratory Science", href: "/programs/medical-laboratory-science" },
          { label: "Environmental Biotechnology", href: "/programs/environmental-biotechnology" },
        ],
      },
      {
        heading: "Pharmaceutical Sciences",
        links: [{ label: "Pharmaceutics", href: "/programs/pharmaceutics" }],
      },
      {
        heading: "Bioinformatics (Online)",
        links: [
          { label: "Bioinformatics", href: "/programs/bioinformatics" },
          { label: "Computational Biology", href: "/programs/computational-biology" },
          { label: "Insilico / Computer Aided Drug Designing", href: "/programs/insilico-drug-designing" },
          { label: "Sequence / Phylogenetic Analysis", href: "/programs/sequence-analysis" },
          { label: "Genomics & Proteomics", href: "/programs/genomics-proteomics" },
        ],
      },
    ],
    cta: { label: "View All Programs", href: "/programs" },
  },
  {
    label: "Internship",
    href: "/internship",
    compact: true,
    columns: [
      {
        links: [
          { label: "Online Internship", href: "/internship/online" },
          { label: "Offline Internship", href: "/internship/offline" },
        ],
      },
    ],
  },
  {
    label: "Research & Dissertation",
    shortLabel: "Research",
    href: "/research-dissertation",
    columns: [
      {
        heading: "Research Services",
        links: [
          { label: "Research Topic Selection", href: "/research-dissertation/topic-selection" },
          { label: "Research Methodology", href: "/research-dissertation/methodology" },
          { label: "Experimental Design", href: "/research-dissertation/experimental-design" },
          { label: "Laboratory Research Training", href: "/research-dissertation/lab-research-training" },
          { label: "Research Data Analysis", href: "/research-dissertation/data-analysis" },
          { label: "Statistical Analysis", href: "/research-dissertation/statistical-analysis" },
          { label: "Bioinformatics Analysis", href: "/research-dissertation/bioinformatics-analysis" },
        ],
      },
      {
        heading: "Dissertation Support",
        links: [
          { label: "UG Dissertation", href: "/research-dissertation/ug-dissertation" },
          { label: "PG Dissertation", href: "/research-dissertation/pg-dissertation" },
          { label: "PhD Research Guidance", href: "/research-dissertation/phd-guidance" },
          { label: "Synopsis Development", href: "/research-dissertation/synopsis-development" },
          { label: "Research Proposal Development", href: "/research-dissertation/proposal-development" },
          { label: "Thesis Presentation Support", href: "/research-dissertation/thesis-presentation" },
        ],
      },
      {
        heading: "Publication Support",
        links: [
          { label: "Scientific Writing", href: "/research-dissertation/scientific-writing" },
          { label: "Manuscript Preparation", href: "/research-dissertation/manuscript-preparation" },
          { label: "Journal Selection Guidance", href: "/research-dissertation/journal-selection" },
          { label: "Reference Management", href: "/research-dissertation/reference-management" },
          { label: "Research Poster & Presentation", href: "/research-dissertation/poster-presentation" },
          { label: "Graphical Abstract", href: "/research-dissertation/graphical-abstract" },
        ],
      },
      {
        heading: "Innovation",
        links: [
          { label: "Research Innovation", href: "/research-dissertation/research-innovation" },
          { label: "Prototype Development", href: "/research-dissertation/prototype-development" },
          { label: "Patent / IP Guidance", href: "/research-dissertation/patent-ip-guidance" },
          { label: "Startup & Innovation Support", href: "/research-dissertation/startup-support" },
        ],
      },
    ],
    cta: { label: "Start Your Research", href: "/research-dissertation" },
  },
  {
    label: "Laboratory Services",
    shortLabel: "Lab Services",
    href: "/laboratory-services",
    columns: [
      {
        heading: "Laboratory Services",
        links: [
          { label: "Microbiology Services", href: "/laboratory-services/microbiology" },
          { label: "Molecular Biology Services", href: "/laboratory-services/molecular-biology" },
          { label: "Biotechnology Services", href: "/laboratory-services/biotechnology" },
          { label: "Pharmaceutical Services", href: "/laboratory-services/pharmaceutical" },
          { label: "Research Laboratory Support", href: "/laboratory-services/research-support" },
          { label: "Laboratory Consultancy", href: "/laboratory-services/consultancy" },
        ],
      },
      {
        heading: "Molecular Services",
        links: [
          { label: "DNA/RNA Research Support", href: "/laboratory-services/dna-rna-support" },
          { label: "PCR Services", href: "/laboratory-services/pcr-services" },
          { label: "Gel Electrophoresis", href: "/laboratory-services/gel-electrophoresis" },
          { label: "Molecular Biology Experiments", href: "/laboratory-services/molecular-experiments" },
          { label: "Genomics Support", href: "/laboratory-services/genomics-support" },
        ],
      },
      {
        heading: "Bioinformatics Services",
        links: [
          { label: "Sequence Analysis", href: "/laboratory-services/sequence-analysis" },
          { label: "BLAST Analysis", href: "/laboratory-services/blast-analysis" },
          { label: "Phylogenetic Analysis", href: "/laboratory-services/phylogenetic-analysis" },
          { label: "Molecular Docking", href: "/laboratory-services/molecular-docking" },
          { label: "Protein Analysis", href: "/laboratory-services/protein-analysis" },
          { label: "Genomics Analysis", href: "/laboratory-services/genomics-analysis" },
          { label: "Data Visualization", href: "/laboratory-services/data-visualization" },
        ],
      },
      {
        heading: "Research Data Services",
        links: [
          { label: "Statistical Analysis", href: "/laboratory-services/statistical-analysis" },
          { label: "Data Interpretation", href: "/laboratory-services/data-interpretation" },
          { label: "Graphs & Figures", href: "/laboratory-services/graphs-figures" },
          { label: "Research Data Visualization", href: "/laboratory-services/research-data-visualization" },
        ],
      },
    ],
    cta: { label: "Request a Service", href: "/laboratory-services" },
  },
  {
    label: "Workshops & Events",
    shortLabel: "Workshops",
    href: "/workshops-events",
    columns: [
      {
        links: [
          { label: "Upcoming Workshops", href: "/workshops-events#upcoming" },
          { label: "Hands-on Workshops", href: "/workshops-events#hands-on" },
          { label: "Online Workshops", href: "/workshops-events#online" },
          { label: "Faculty Development Programs", href: "/workshops-events#fdp" },
          { label: "Student Workshops", href: "/workshops-events#student" },
          { label: "Industry Workshops", href: "/workshops-events#industry" },
          { label: "Past Events", href: "/workshops-events#past-events" },
          { label: "Event Gallery", href: "/workshops-events#gallery" },
        ],
      },
    ],
    cta: { label: "Register for a Workshop", href: "/workshops-events" },
  },
  {
    label: "For Institutions",
    shortLabel: "Institutions",
    href: "/for-institutions",
    columns: [
      {
        heading: "Colleges & Universities",
        links: [
          { label: "Student Training", href: "/for-institutions/student-training" },
          { label: "Faculty Development", href: "/for-institutions/faculty-development" },
          { label: "Department Training", href: "/for-institutions/department-training" },
          { label: "Research Training", href: "/for-institutions/research-training" },
          { label: "Dissertation Support", href: "/for-institutions/dissertation-support" },
          { label: "Industry-Oriented Certification", href: "/for-institutions/industry-certification" },
          { label: "Laboratory Skill Programs", href: "/for-institutions/laboratory-skill-programs" },
        ],
      },
      {
        heading: "Schools",
        links: [
          { label: "Young Scientist Programs", href: "/for-institutions/young-scientist-programs" },
          { label: "Science Workshops", href: "/for-institutions/science-workshops" },
          { label: "Biotechnology Workshops", href: "/for-institutions/biotechnology-workshops" },
          { label: "Laboratory Exposure Programs", href: "/for-institutions/laboratory-exposure" },
          { label: "Summer Research Programs", href: "/for-institutions/summer-research" },
        ],
      },
      {
        heading: "Institutional Collaboration",
        links: [
          { label: "Annual Training Partnership", href: "/for-institutions/annual-training-partnership" },
          { label: "MoU & Collaboration", href: "/for-institutions/mou-collaboration" },
          { label: "Customized Training", href: "/for-institutions/customized-training" },
          { label: "Laboratory Consultancy", href: "/for-institutions/laboratory-consultancy" },
          { label: "Research Collaboration", href: "/for-institutions/research-collaboration" },
        ],
      },
    ],
    cta: { label: "Partner With NanoNova", href: "/for-institutions" },
  },
  {
    label: "For Industry",
    shortLabel: "Industry",
    href: "/for-industry",
    columns: [
      {
        links: [
          { label: "Industry Services", href: "/for-industry#services" },
          { label: "Corporate Training", href: "/for-industry#corporate-training" },
          { label: "Laboratory Training", href: "/for-industry#laboratory-training" },
          { label: "Technical Skill Development", href: "/for-industry#technical-skill-development" },
          { label: "Quality & Microbiology Training", href: "/for-industry#quality-microbiology-training" },
          { label: "Molecular Biology Training", href: "/for-industry#molecular-biology-training" },
          { label: "Bioinformatics Training", href: "/for-industry#bioinformatics-training" },
          { label: "Research Consultancy", href: "/for-industry#research-consultancy" },
        ],
      },
      {
        links: [
          { label: "Laboratory Setup Consultancy", href: "/for-industry#laboratory-setup-consultancy" },
          { label: "R&D Support", href: "/for-industry#rd-support" },
          { label: "Customized Training Programs", href: "/for-industry#customized-training" },
          { label: "Industry Collaboration", href: "/for-industry#industry-collaboration" },
          { label: "Internship Partnerships", href: "/for-industry#internship-partnerships" },
          { label: "Research Collaboration", href: "/for-industry#research-collaboration" },
          { label: "Sponsored Projects", href: "/for-industry#sponsored-projects" },
          { label: "Technical Consultancy", href: "/for-industry#technical-consultancy" },
        ],
      },
    ],
    cta: { label: "Talk to Our Industry Team", href: "/for-industry" },
  },
  {
    label: "Knowledge Hub",
    href: "/knowledge-hub",
    columns: [
      {
        heading: "Resources",
        links: [
          { label: "Research Articles", href: "/knowledge-hub/research-articles" },
          { label: "Biotechnology Articles", href: "/knowledge-hub/biotechnology-articles" },
          { label: "Microbiology Articles", href: "/knowledge-hub/microbiology-articles" },
          { label: "Bioinformatics Tutorials", href: "/knowledge-hub/bioinformatics-tutorials" },
          { label: "Laboratory Techniques", href: "/knowledge-hub/laboratory-techniques" },
          { label: "Research Methodology", href: "/knowledge-hub/research-methodology" },
          { label: "Career Guidance", href: "/knowledge-hub/career-guidance" },
          { label: "Student Resources", href: "/knowledge-hub/student-resources" },
          { label: "FAQs", href: "/knowledge-hub/faqs" },
        ],
      },
      {
        heading: "Media",
        links: [
          { label: "News & Updates", href: "/knowledge-hub/news-updates" },
          { label: "Events", href: "/knowledge-hub/events" },
          { label: "Photo Gallery", href: "/knowledge-hub/photo-gallery" },
          { label: "Video Gallery", href: "/knowledge-hub/video-gallery" },
        ],
      },
    ],
  },
  {
    label: "Contact Us",
    href: "/contactus",
  },
];
