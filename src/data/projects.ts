export interface ProjectLink {
  label: string;
  url: string;
  icon: "github" | "external" | "youtube" | "docs";
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  techStack: string[];
  category: string;
  status: "live" | "in-progress" | "archived";
  featured: boolean;
  links: ProjectLink[];
  metrics: ProjectMetric[];
  features: ProjectFeature[];
  challenges: string[];
  learnings: string[];
  startDate: string;
  endDate?: string;
  role: string;
  teamSize?: number;
}

export const projects: Project[] = [
  {
    id: "ai-voice-automation",
    title: "AI-Based Voice Command Automation Framework",
    tagline: "Voice-triggered test automation using speech recognition",
    description: "A voice-command automation system that uses Vosk speech recognition integrated with Selenium and Appium to enable hands-free test execution across web and mobile platforms.",
    longDescription: "This project reimagines how QA engineers interact with automation frameworks. Instead of manually triggering test suites, engineers can use voice commands to select, execute, and monitor test flows. Built with Vosk for offline speech recognition, integrated with Selenium for web automation and Appium for mobile, the system parses voice input into actionable test commands. It supports natural language variations, handles command disambiguation, and provides audio feedback on execution status. The framework saved 6+ QA hours per engineer weekly by eliminating manual test triggering and enabling multitasking during execution.",
    thumbnail: "/projects/voice-thumb.jpg",
    images: [],
    techStack: ["Java", "Vosk", "Selenium WebDriver", "Appium", "TestNG", "Maven"],
    category: "AI Automation",
    status: "live",
    featured: true,
    links: [
      { label: "GitHub", url: "https://github.com/Himaanshu-Singh", icon: "github" },
    ],
    metrics: [
      { label: "Hours Saved/Week", value: "6+" },
      { label: "Commands Supported", value: "50+" },
      { label: "Recognition Accuracy", value: "95%" },
      { label: "Platforms", value: "Web + Mobile" },
    ],
    features: [
      { title: "Offline Speech Recognition", description: "Uses Vosk for local speech-to-text processing without internet dependency" },
      { title: "Cross-Platform Execution", description: "Single voice command triggers tests on both web (Selenium) and mobile (Appium)" },
      { title: "Natural Language Parsing", description: "Understands command variations and handles disambiguation intelligently" },
      { title: "Audio Feedback", description: "Provides spoken status updates on test execution progress and results" },
    ],
    challenges: [
      "Achieving high recognition accuracy in noisy office environments",
      "Mapping natural language to specific test automation commands",
      "Handling concurrent voice sessions from multiple engineers",
    ],
    learnings: [
      "Offline speech models can achieve production-quality accuracy with proper training",
      "Voice UX requires careful command design to avoid ambiguity",
      "Integration testing across speech + automation layers needs dedicated mocking strategies",
    ],
    startDate: "2024-05",
    endDate: "2024-10",
    role: "Lead Developer",
  },
  {
    id: "ai-test-case-generator",
    title: "AI-Driven Test Case Generator",
    tagline: "Gemini AI-powered test scenario generation",
    description: "An intelligent tool that uses Google's Gemini API to automatically generate optimized, high-impact test scenarios from requirements, reducing test design effort by 60%.",
    longDescription: "Manual test case design is time-consuming and often misses edge cases. This tool leverages Google's Gemini API to analyze requirements, user stories, or feature descriptions and automatically generates comprehensive test scenarios. It identifies boundary conditions, negative paths, and integration points that human testers might overlook. The generated test cases follow a structured format compatible with TestNG and can be directly imported into the automation framework. The tool reduced test design effort by 60% while improving edge-case coverage significantly.",
    thumbnail: "/projects/ai-testgen-thumb.jpg",
    images: [],
    techStack: ["Python", "Gemini API", "TestNG", "Java", "REST API"],
    category: "AI Automation",
    status: "live",
    featured: true,
    links: [
      { label: "GitHub", url: "https://github.com/Himaanshu-Singh", icon: "github" },
    ],
    metrics: [
      { label: "Design Effort Reduced", value: "60%" },
      { label: "Edge Cases Found", value: "3x more" },
      { label: "Avg Generation Time", value: "<5s" },
      { label: "Format Compatibility", value: "TestNG" },
    ],
    features: [
      { title: "Requirement Parsing", description: "Analyzes user stories and feature specs to extract testable conditions" },
      { title: "Edge Case Discovery", description: "AI identifies boundary values, negative paths, and integration risks automatically" },
      { title: "Structured Output", description: "Generates test cases in TestNG-compatible format ready for automation" },
      { title: "Priority Scoring", description: "Ranks generated scenarios by risk and impact for efficient test planning" },
    ],
    challenges: [
      "Ensuring generated test cases are actionable and not overly generic",
      "Handling ambiguous or incomplete requirements gracefully",
      "Maintaining consistency in test case format across different input types",
    ],
    learnings: [
      "LLM outputs need structured prompting and post-processing for automation compatibility",
      "Combining AI generation with human review produces the best coverage",
      "Prompt engineering is as important as the model choice for quality output",
    ],
    startDate: "2025-01",
    role: "Solo Developer",
  },
  {
    id: "hybrid-automation-framework",
    title: "Hybrid Cross-Platform Automation Framework",
    tagline: "Selenium + Appium + TestNG at enterprise scale",
    description: "A scalable hybrid automation framework supporting web and mobile testing with parallel execution, CI/CD integration, and comprehensive reporting.",
    longDescription: "Built at Delhivery to handle the complexity of testing across web portals and mobile apps simultaneously. The framework uses a modular architecture with Selenium WebDriver for web, Appium for mobile (Android + iOS), and TestNG for orchestration. It supports data-driven testing, parallel execution across multiple devices/environments, and integrates with Jenkins for CI/CD-based execution. The framework includes reusable utilities, structured logging, Allure reporting, and handles end-to-end flows that span UI, API, and database layers. It reduced regression cycle time by 40% while improving test stability.",
    thumbnail: "/projects/framework-thumb.jpg",
    images: [],
    techStack: ["Java", "Selenium WebDriver", "Appium", "TestNG", "Jenkins", "Rest Assured", "Maven", "Allure"],
    category: "Test Framework",
    status: "live",
    featured: true,
    links: [
      { label: "GitHub", url: "https://github.com/Himaanshu-Singh", icon: "github" },
    ],
    metrics: [
      { label: "Regression Reduced", value: "40%" },
      { label: "Platforms Covered", value: "3" },
      { label: "Test Stability", value: "95%+" },
      { label: "Daily Executions", value: "500+" },
    ],
    features: [
      { title: "Cross-Platform", description: "Single framework handles web (Selenium), Android (Appium), and iOS testing" },
      { title: "Parallel Execution", description: "Runs tests simultaneously across multiple devices and environments" },
      { title: "CI/CD Integration", description: "Jenkins pipelines for scheduled, triggered, and continuous execution" },
      { title: "Multi-Layer Validation", description: "End-to-end flows validate UI, REST API, and database layers together" },
    ],
    challenges: [
      "Managing device fragmentation and OS-specific behaviors across platforms",
      "Ensuring test stability with parallel execution on shared infrastructure",
      "Designing modular architecture that scales without code duplication",
    ],
    learnings: [
      "Page Object Model with factory patterns provides the best maintainability at scale",
      "Retry mechanisms with intelligent wait strategies eliminate most flakiness",
      "Logging and reporting are as important as the tests themselves for debugging",
    ],
    startDate: "2025-10",
    role: "SDET / Framework Architect",
  },
  {
    id: "intelligent-automation-agent",
    title: "Intelligent Automation Agent",
    tagline: "AI agent that parses tickets, generates & executes tests",
    description: "An AI-powered automation agent that reads Jira tickets, generates test scripts, executes automation flows, and shares detailed reports via email — fully autonomous QA pipeline.",
    longDescription: "This is the most ambitious project — a fully autonomous QA agent. It monitors Jira for new tickets, uses AI to understand the feature/bug description, generates appropriate test scripts (UI + API), executes them against the target environment, and emails a detailed report with pass/fail status, screenshots, and logs. The agent handles the entire QA lifecycle from ticket to report without human intervention, allowing the team to focus on exploratory testing and edge cases while routine regression is fully automated.",
    thumbnail: "/projects/agent-thumb.jpg",
    images: [],
    techStack: ["Java", "Python", "Selenium", "Appium", "Jira API", "Jenkins", "SMTP", "AI/ML"],
    category: "AI Automation",
    status: "in-progress",
    featured: true,
    links: [
      { label: "GitHub", url: "https://github.com/Himaanshu-Singh", icon: "github" },
    ],
    metrics: [
      { label: "Tickets Processed", value: "100+" },
      { label: "Auto-Generated Tests", value: "300+" },
      { label: "Manual Effort Saved", value: "80%" },
      { label: "Report Accuracy", value: "98%" },
    ],
    features: [
      { title: "Ticket Parsing", description: "Reads and understands Jira tickets to determine test scope and priority" },
      { title: "Script Generation", description: "AI generates test scripts based on ticket context and existing patterns" },
      { title: "Autonomous Execution", description: "Runs generated tests against target environments without human trigger" },
      { title: "Automated Reporting", description: "Sends detailed email reports with results, screenshots, and failure analysis" },
    ],
    challenges: [
      "Ensuring generated test scripts are reliable and handle edge cases",
      "Managing execution environment state between autonomous runs",
      "Building confidence in AI-generated tests for production deployment decisions",
    ],
    learnings: [
      "Autonomous systems need strong guardrails and human-in-the-loop for critical decisions",
      "Pattern matching from existing test suites improves generation quality significantly",
      "Email-based reporting with actionable links increases team engagement with results",
    ],
    startDate: "2025-10",
    role: "Lead SDET",
  },
  {
    id: "api-automation-suite",
    title: "REST API Automation Suite",
    tagline: "Comprehensive backend validation with Rest Assured",
    description: "A complete API testing suite using Rest Assured for backend validation, covering service-level testing, database verification, and integration with CI/CD pipelines.",
    longDescription: "APIs are the backbone of modern applications, and this suite ensures they work flawlessly. Built with Rest Assured in Java, it covers CRUD operations, authentication flows, error handling, rate limiting, and data consistency checks against MongoDB and MySQL databases. The suite integrates with Postman for exploratory testing, Newman for CLI execution, and Jenkins for continuous validation. It validates both response structure (JSON schema) and business logic, catching breaking changes before they reach production.",
    thumbnail: "/projects/api-thumb.jpg",
    images: [],
    techStack: ["Java", "Rest Assured", "Postman", "Newman", "MongoDB", "MySQL", "Jenkins", "TestNG"],
    category: "API Testing",
    status: "live",
    featured: false,
    links: [
      { label: "GitHub", url: "https://github.com/Himaanshu-Singh", icon: "github" },
    ],
    metrics: [
      { label: "Endpoints Covered", value: "100+" },
      { label: "Test Cases", value: "500+" },
      { label: "Backend Coverage", value: "90%" },
      { label: "Execution Time", value: "<10min" },
    ],
    features: [
      { title: "Schema Validation", description: "Validates JSON response structure against defined schemas" },
      { title: "Database Verification", description: "Cross-checks API responses with MongoDB and MySQL data" },
      { title: "Auth Flow Testing", description: "Comprehensive authentication and authorization scenario coverage" },
      { title: "CI/CD Integration", description: "Runs on every deployment via Jenkins with Newman CLI" },
    ],
    challenges: [
      "Handling dynamic data and timestamps in API response assertions",
      "Managing test data across multiple databases without conflicts",
      "Testing async operations and eventual consistency patterns",
    ],
    learnings: [
      "Contract testing catches more breaking changes than functional tests alone",
      "Test data factories with cleanup hooks prevent environment pollution",
      "Response time assertions in CI catch performance regressions early",
    ],
    startDate: "2024-06",
    endDate: "2024-10",
    role: "QA Engineer",
  },
];

export const categories = [...new Set(projects.map((p) => p.category))];
