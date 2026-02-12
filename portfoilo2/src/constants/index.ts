export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "education",
        title: "Education",
    },
    {
        id: "hobbies",
        title: "Hobbies",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Web Developer",
        icon: "web",
    },
    {
        title: "AI/ML Enthusiast",
        icon: "mobile",
    },
    {
        title: "Backend Developer",
        icon: "backend",
    },
    {
        title: "Data Analyst",
        icon: "creator",
    },
];

const technologies = [
    {
        name: "Python",
        icon: "/tech/python.svg",
    },
    {
        name: "JavaScript",
        icon: "/tech/javascript.svg",
    },
    {
        name: "React JS",
        icon: "/tech/react.svg",
    },
    {
        name: "Tailwind CSS",
        icon: "/tech/tailwindcss.svg",
    },
    {
        name: "HTML 5",
        icon: "/tech/html-5.svg",
    },
    {
        name: "CSS 3",
        icon: "/tech/css-3.svg",
    },
    {
        name: "TensorFlow",
        icon: "/tech/tensorflow.svg",
    },
    {
        name: "SQL",
        icon: "/tech/mysql.svg",
    },
    {
        name: "Git",
        icon: "/tech/git-icon.svg",
    },
    {
        name: "GitHub",
        icon: "/tech/github-icon.svg",
    },
    {
        name: "Node JS",
        icon: "/tech/nodejs-icon.svg",
    },
    {
        name: "MongoDB",
        icon: "/tech/mongodb-icon.svg",
    },
    {
        name: "AWS",
        icon: "/tech/aws.svg",
    },
];

const education = [
    {
        degree: "B.Tech in Computer Science and Engineering",
        institution: "Srinivas University Institute of Technology, Mangaluru",
        date: "Oct 2022 – Apr 2026",
        description: "CGPA: 7.80 (Till Semester 7)",
    },
    {
        degree: "Pre-University Course (PUC)",
        institution: "Gogte PU College of Commerce and Science, Belagavi",
        date: "May 2020 – Apr 2022",
        description: "Completed PUC in Science stream.",
    },
    {
        degree: "High School (CBSE)",
        institution: "Mount Carmel CBSE School, Ramnagar",
        date: "Apr 2020",
        description: "Completed secondary education under CBSE board.",
    },
];

const projects = [
    {
        name: "Real-Time Smart Traffic and Pothole Detection",
        description:
            "Built a real-time, data-driven system to analyze traffic conditions and detect road potholes using analytics and ML techniques.",
        tags: [
            {
                name: "python",
                color: "blue-text-gradient",
            },
            {
                name: "ml",
                color: "green-text-gradient",
            },
            {
                name: "analytics",
                color: "pink-text-gradient",
            },
        ],
        image: "/projects/traffic.png",
        source_code_link: "https://github.com/",
    },
    {
        name: "Candle Business Website – Frontend",
        description:
            "Designed a responsive business website using HTML, CSS, and JavaScript with focus on UI and user experience.",
        tags: [
            {
                name: "html",
                color: "blue-text-gradient",
            },
            {
                name: "css",
                color: "green-text-gradient",
            },
            {
                name: "javascript",
                color: "pink-text-gradient",
            },
        ],
        image: "/projects/candle.png",
        source_code_link: "https://github.com/",
    },
    {
        name: "Data Scraping Project",
        description:
            "Automated web data extraction using Python and processed datasets for analysis and ML usage.",
        tags: [
            {
                name: "python",
                color: "blue-text-gradient",
            },
            {
                name: "selenium",
                color: "green-text-gradient",
            },
            {
                name: "pandas",
                color: "pink-text-gradient",
            },
        ],
        image: "/projects/scraping.png",
        source_code_link: "https://github.com/",
    },
];

const certifications = [
    {
        title: "Certified in Artificial Intelligence and Machine Learning",
        provider: "Bits",
    },
    {
        title: "IT Specialist – Databases",
        provider: "CertiPort",
    },
    {
        title: "Amazon Web Services (AWS)",
        provider: "AWS",
    },
    {
        title: "JavaScript Specialist",
        provider: "Ethnotech",
    },
    {
        title: "GenAI Data Analytics Job Simulation",
        provider: "Tata (Forage)",
    },
];

const spokenLanguages = ["English", "Kannada", "Hindi", "Marathi", "Konkani"];

const hobbies = [
    {
        title: "Football",
        icon: "football",
        description: "Passion for the beautiful game, teamwork, and strategic play on the field.",
    },
    {
        title: "Reading",
        icon: "books",
        description: "Exploring new perspectives through science fiction, tech deep-dives, and literature.",
    },
    {
        title: "Music",
        icon: "music",
        description: "Diving into soundscapes that fuel productivity and inspire creative thinking.",
    },
];

const experiences = [
    {
        title: "AI/ML Junior Developer Intern",
        company_name: "Daylink Tech Labs Private Limited",
        date: "Dec 2025 – May 2026",
        points: [
            "Developed and optimized ML models; integrated AI components into web systems.",
            "Contributed to CCTV-based PPE detection and AI-driven automation projects.",
        ],
    },
    {
        title: "AI/ML Intern",
        company_name: "Bits Technology",
        date: "May 2025 – Jul 2025",
        points: [
            "Implemented supervised and unsupervised learning models with evaluation techniques.",
        ],
    },
    {
        title: "Web Developer Intern",
        company_name: "Nexel",
        date: "2023",
        points: [
            "Designed responsive web pages using HTML, CSS, and JavaScript.",
            "Improved UI design and front-end functionality.",
        ],
    },
];

const testimonials: any[] = [];

export { services, technologies, projects, education, certifications, spokenLanguages, hobbies, experiences, testimonials };
