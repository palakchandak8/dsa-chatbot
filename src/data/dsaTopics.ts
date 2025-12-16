export interface DSATopic {
  id: string;
  name: string;
  icon: string;
  subtopics?: string[];
}

export const dsaTopics: DSATopic[] = [
  {
    id: "arrays",
    name: "Arrays",
    icon: "📊",
    subtopics: ["1D Arrays", "2D Arrays", "Array Operations", "Sliding Window"],
  },
  {
    id: "linked-list",
    name: "Linked List",
    icon: "🔗",
    subtopics: ["Singly Linked", "Doubly Linked", "Circular Linked"],
  },
  {
    id: "stack",
    name: "Stack",
    icon: "📚",
    subtopics: ["Stack Operations", "Applications", "Monotonic Stack"],
  },
  {
    id: "queue",
    name: "Queue",
    icon: "🚶",
    subtopics: ["Queue Operations", "Circular Queue", "Priority Queue", "Deque"],
  },
  {
    id: "trees",
    name: "Trees",
    icon: "🌳",
    subtopics: ["Binary Tree", "BST", "AVL Tree", "Traversals"],
  },
  {
    id: "graphs",
    name: "Graphs",
    icon: "🕸️",
    subtopics: ["BFS", "DFS", "Shortest Path", "Spanning Tree"],
  },
  {
    id: "sorting",
    name: "Sorting",
    icon: "📈",
    subtopics: ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort"],
  },
  {
    id: "searching",
    name: "Searching",
    icon: "🔍",
    subtopics: ["Linear Search", "Binary Search", "Ternary Search"],
  },
  {
    id: "recursion",
    name: "Recursion",
    icon: "🔄",
    subtopics: ["Base Cases", "Backtracking", "Memoization"],
  },
  {
    id: "dp",
    name: "Dynamic Programming",
    icon: "🧩",
    subtopics: ["1D DP", "2D DP", "State Optimization", "Classic Problems"],
  },
  {
    id: "hashing",
    name: "Hashing",
    icon: "🔐",
    subtopics: ["Hash Tables", "Hash Functions", "Collision Handling"],
  },
  {
    id: "heap",
    name: "Heap",
    icon: "⛰️",
    subtopics: ["Min Heap", "Max Heap", "Heapify", "Heap Sort"],
  },
];

export type ExplanationLevel = "beginner" | "intermediate" | "advanced";

export const explanationLevels: { id: ExplanationLevel; label: string; description: string }[] = [
  { id: "beginner", label: "Beginner", description: "Simple explanations with analogies" },
  { id: "intermediate", label: "Intermediate", description: "Logic with dry runs" },
  { id: "advanced", label: "Advanced", description: "Optimizations & edge cases" },
];
