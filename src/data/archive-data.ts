export interface ArchiveItem {
  id: string;
  title: string;
  date: string;
  fragment: string;
  category: string;
}

export const archiveData: ArchiveItem[] = [
  {
    id: "001",
    title: "The Architecture of Silent Systems",
    date: "2024.03.12",
    fragment: "Designing backends that run quietly is an art of subtraction. It's not about how many features you add, but how many potential points of failure you remove before they ever reach production...",
    category: "ENGINEERING"
  },
  {
    id: "002",
    title: "Digital Atelier: Crafting Intentional UI",
    date: "2024.02.28",
    fragment: "A user interface should feel like a well-organized physical workshop. Tools are within reach, the lighting is focused, and there is no noise. Each pixel must serve a purpose or get out of the way...",
    category: "DESIGN"
  },
  {
    id: "003",
    title: "Notes on LLM Agent Orchestration",
    date: "2024.01.15",
    fragment: "Scaling AI agents requires a shift from linear execution to event-driven state machines. The challenge lies in managing long-running contexts without losing the 'thread' of the user's intent...",
    category: "AI_RESEARCH"
  },
  {
    id: "004",
    title: "Minimalism as a Technical Constraint",
    date: "2023.12.05",
    fragment: "When we restrict the visual palette to monotone and the interaction to terminals, we expose the skeletal beauty of the data structure. It's a brutalist approach to modern web development...",
    category: "PHILOSOPHY"
  }
];
