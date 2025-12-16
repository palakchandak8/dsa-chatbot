import { ExplanationLevel } from "./dsaTopics";

interface ExplanationContent {
  definition: string;
  analogy: string;
  operations: string[];
  complexity: { time: string; space: string };
  code: { language: string; code: string }[];
  example: string;
}

interface TopicExplanation {
  beginner: ExplanationContent;
  intermediate: ExplanationContent;
  advanced: ExplanationContent;
}

export const explanations: Record<string, TopicExplanation> = {
  stack: {
    beginner: {
      definition: "A Stack is like a pile of books - you can only add or remove from the top! It follows LIFO (Last In, First Out).",
      analogy: "🥞 Think of a stack of pancakes. The last pancake you put on top is the first one you eat. You can't eat the bottom pancake without removing all the ones above it first!",
      operations: [
        "Push - Add an item to the top",
        "Pop - Remove the top item",
        "Peek - Look at the top item without removing it",
        "isEmpty - Check if stack is empty",
      ],
      complexity: { time: "O(1) for all operations", space: "O(n)" },
      code: [
        {
          language: "Python",
          code: `# Simple Stack using list
stack = []

# Push elements
stack.append(10)
stack.append(20)
stack.append(30)

print(stack)  # [10, 20, 30]

# Pop element
top = stack.pop()
print(top)    # 30

# Peek (look at top)
print(stack[-1])  # 20`,
        },
      ],
      example: "Push 1, 2, 3 → Stack: [1, 2, 3] (3 is on top)\nPop → Returns 3, Stack: [1, 2]",
    },
    intermediate: {
      definition: "A Stack is a linear data structure following LIFO principle. It's implemented using arrays or linked lists and is fundamental to many algorithms.",
      analogy: "📱 Think of the 'Back' button in your browser. Each page you visit is pushed onto a stack, and pressing back pops the current page to show the previous one.",
      operations: [
        "Push(x) - Add element x to top → O(1)",
        "Pop() - Remove and return top element → O(1)",
        "Peek()/Top() - Return top without removal → O(1)",
        "isEmpty() - Return true if stack is empty → O(1)",
        "size() - Return number of elements → O(1)",
      ],
      complexity: { time: "O(1) for all operations", space: "O(n) where n is the number of elements" },
      code: [
        {
          language: "Python",
          code: `class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Stack is empty")
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        raise IndexError("Stack is empty")
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# Dry Run
s = Stack()
s.push(5)   # Stack: [5]
s.push(10)  # Stack: [5, 10]
s.push(15)  # Stack: [5, 10, 15]
print(s.peek())  # Output: 15
s.pop()     # Stack: [5, 10], returns 15
print(s.size())  # Output: 2`,
        },
      ],
      example: "Dry Run:\n1. push(5) → [5]\n2. push(10) → [5, 10]\n3. push(15) → [5, 10, 15]\n4. pop() → returns 15, stack becomes [5, 10]\n5. peek() → returns 10 (stack unchanged)",
    },
    advanced: {
      definition: "A Stack is an abstract data type with O(1) operations. Advanced implementations include dynamic arrays with amortized O(1) push, linked list-based stacks, and lock-free concurrent stacks.",
      analogy: "🏗️ Think of function call management in programming. Each function call pushes a stack frame containing local variables, return address, and parameters. Recursion depth is limited by stack size.",
      operations: [
        "Push(x) - Amortized O(1) with dynamic arrays",
        "Pop() - O(1), handles underflow gracefully",
        "getMin()/getMax() - O(1) with auxiliary stack",
        "Thread-safe operations for concurrent access",
        "Persistent stack for immutable operations",
      ],
      complexity: { 
        time: "O(1) amortized for push (dynamic array), O(1) worst case for linked list", 
        space: "O(n) + O(n) for min/max stack variant" 
      },
      code: [
        {
          language: "Python",
          code: `class MinStack:
    """Stack with O(1) getMin operation"""
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val: int) -> None:
        self.stack.append(val)
        # Push to min_stack if empty or val <= current min
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self) -> None:
        if self.stack:
            val = self.stack.pop()
            # Pop from min_stack if popped value is min
            if val == self.min_stack[-1]:
                self.min_stack.pop()
    
    def top(self) -> int:
        return self.stack[-1] if self.stack else None
    
    def getMin(self) -> int:
        return self.min_stack[-1] if self.min_stack else None

# Applications:
# 1. Expression evaluation (infix to postfix)
# 2. Balanced parentheses checking
# 3. Undo/Redo functionality
# 4. Browser history navigation
# 5. Function call stack (recursion)
# 6. Monotonic stack for next greater element`,
        },
      ],
      example: "MinStack Example:\npush(3) → stack:[3], min_stack:[3]\npush(1) → stack:[3,1], min_stack:[3,1]\npush(2) → stack:[3,1,2], min_stack:[3,1] (2>1)\ngetMin() → 1\npop() → stack:[3,1], min_stack:[3,1]\ngetMin() → 1",
    },
  },
  queue: {
    beginner: {
      definition: "A Queue is like a line at a movie theater - first person in line is the first to get served! It follows FIFO (First In, First Out).",
      analogy: "🎫 Imagine waiting in line for a concert. The first person who joins the line gets their ticket first. New people join at the back, and people leave from the front!",
      operations: [
        "Enqueue - Add an item to the back",
        "Dequeue - Remove item from the front",
        "Front - Look at the front item",
        "isEmpty - Check if queue is empty",
      ],
      complexity: { time: "O(1) for all operations", space: "O(n)" },
      code: [
        {
          language: "Python",
          code: `from collections import deque

# Simple Queue using deque
queue = deque()

# Enqueue elements
queue.append(10)
queue.append(20)
queue.append(30)

print(list(queue))  # [10, 20, 30]

# Dequeue element
front = queue.popleft()
print(front)  # 10

# Check front
print(queue[0])  # 20`,
        },
      ],
      example: "Enqueue 1, 2, 3 → Queue: [1, 2, 3] (1 is at front)\nDequeue → Returns 1, Queue: [2, 3]",
    },
    intermediate: {
      definition: "A Queue is a linear data structure following FIFO principle. Commonly implemented using circular arrays or linked lists for efficient operations.",
      analogy: "🖨️ Think of a print queue. Documents are printed in the order they were sent. The first document sent is the first to be printed.",
      operations: [
        "Enqueue(x) - Add element x to rear → O(1)",
        "Dequeue() - Remove and return front element → O(1)",
        "Front()/Peek() - Return front without removal → O(1)",
        "isEmpty() - Check if queue is empty → O(1)",
        "size() - Return number of elements → O(1)",
      ],
      complexity: { time: "O(1) for all operations", space: "O(n)" },
      code: [
        {
          language: "Python",
          code: `class Queue:
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if not self.is_empty():
            return self.items.pop(0)
        raise IndexError("Queue is empty")
    
    def front(self):
        if not self.is_empty():
            return self.items[0]
        raise IndexError("Queue is empty")
    
    def is_empty(self):
        return len(self.items) == 0

# Dry Run
q = Queue()
q.enqueue(5)   # Queue: [5]
q.enqueue(10)  # Queue: [5, 10]
q.enqueue(15)  # Queue: [5, 10, 15]
print(q.front())  # Output: 5
q.dequeue()    # Queue: [10, 15], returns 5`,
        },
      ],
      example: "Dry Run:\n1. enqueue(5) → [5]\n2. enqueue(10) → [5, 10]\n3. enqueue(15) → [5, 10, 15]\n4. dequeue() → returns 5, queue becomes [10, 15]\n5. front() → returns 10",
    },
    advanced: {
      definition: "Advanced queue implementations include circular queues (efficient memory), priority queues (heap-based), and deques (double-ended). Used extensively in BFS, scheduling, and buffering.",
      analogy: "🚦 Think of CPU scheduling. Processes wait in different priority queues. Higher priority processes are served first, while equal priority follows FIFO.",
      operations: [
        "Circular Queue - Fixed size, O(1) operations",
        "Priority Queue - O(log n) insert/extract",
        "Deque - O(1) operations at both ends",
        "Blocking Queue - Thread-safe with wait",
      ],
      complexity: { 
        time: "Queue: O(1), Priority Queue: O(log n)", 
        space: "O(n)" 
      },
      code: [
        {
          language: "Python",
          code: `import heapq

class PriorityQueue:
    """Min-heap based priority queue"""
    def __init__(self):
        self.heap = []
        self.count = 0  # For FIFO ordering of equal priorities
    
    def push(self, priority, item):
        heapq.heappush(self.heap, (priority, self.count, item))
        self.count += 1
    
    def pop(self):
        if self.heap:
            return heapq.heappop(self.heap)[2]
        raise IndexError("Queue is empty")
    
    def peek(self):
        return self.heap[0][2] if self.heap else None

# Circular Queue for fixed-size buffer
class CircularQueue:
    def __init__(self, k):
        self.queue = [None] * k
        self.head = self.tail = -1
        self.size = k
    
    def enqueue(self, val):
        if self.is_full():
            return False
        if self.is_empty():
            self.head = 0
        self.tail = (self.tail + 1) % self.size
        self.queue[self.tail] = val
        return True`,
        },
      ],
      example: "Priority Queue:\npush(3, 'low') → [(3, 'low')]\npush(1, 'high') → [(1, 'high'), (3, 'low')]\npush(2, 'med') → [(1, 'high'), (3, 'low'), (2, 'med')]\npop() → 'high' (lowest priority number)",
    },
  },
  "binary-search": {
    beginner: {
      definition: "Binary Search is a way to find something in a sorted list by always looking at the middle! It's much faster than checking every item one by one.",
      analogy: "📖 Think of finding a word in a dictionary. You don't read every page - you open to the middle, see if your word comes before or after, then repeat with the correct half!",
      operations: [
        "Find the middle element",
        "Compare with target",
        "If equal, found it!",
        "If target is smaller, search left half",
        "If target is larger, search right half",
      ],
      complexity: { time: "O(log n) - much faster than O(n)!", space: "O(1)" },
      code: [
        {
          language: "Python",
          code: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Found it!
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Not found

# Example
numbers = [1, 3, 5, 7, 9, 11, 13]
result = binary_search(numbers, 7)
print(f"Found at index: {result}")  # Output: 3`,
        },
      ],
      example: "Array: [1, 3, 5, 7, 9], Find: 7\n1. Mid = 5, 7 > 5, go right\n2. Mid = 9, 7 < 9, go left\n3. Mid = 7, Found! ✓",
    },
    intermediate: {
      definition: "Binary Search is a divide-and-conquer algorithm that finds a target value in a sorted array by repeatedly halving the search space. It reduces time complexity from O(n) to O(log n).",
      analogy: "🎯 Like a number guessing game where someone tells you 'higher' or 'lower' after each guess. By always guessing the middle, you minimize the number of guesses needed.",
      operations: [
        "Initialize left = 0, right = n-1",
        "While left <= right, calculate mid",
        "Compare arr[mid] with target",
        "Adjust search bounds based on comparison",
        "Handle edge cases: empty array, duplicates",
      ],
      complexity: { time: "O(log n) - halving each time", space: "O(1) iterative, O(log n) recursive" },
      code: [
        {
          language: "Python",
          code: `def binary_search(arr, target):
    """Standard binary search with dry run"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Prevents overflow
        
        print(f"Searching: left={left}, right={right}, mid={mid}, arr[mid]={arr[mid]}")
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Dry Run
arr = [1, 3, 5, 7, 9, 11, 13]
target = 9

# Step 1: left=0, right=6, mid=3, arr[3]=7
#         9 > 7, so left = 4
# Step 2: left=4, right=6, mid=5, arr[5]=11
#         9 < 11, so right = 4
# Step 3: left=4, right=4, mid=4, arr[4]=9
#         Found! Return 4

result = binary_search(arr, target)`,
        },
      ],
      example: "Dry Run for arr=[1,3,5,7,9,11,13], target=9:\nStep 1: mid=3 (7), 9>7, left=4\nStep 2: mid=5 (11), 9<11, right=4\nStep 3: mid=4 (9), Found at index 4!",
    },
    advanced: {
      definition: "Binary Search has many variants: lower_bound, upper_bound, finding first/last occurrence, and searching in rotated arrays. It's also applicable to answer-type problems (binary search on answer).",
      analogy: "🔬 Like using a microscope with adjustable zoom. Each adjustment narrows your focus exponentially until you find exactly what you're looking for.",
      operations: [
        "Standard: Find exact element",
        "Lower Bound: First element >= target",
        "Upper Bound: First element > target",
        "Rotated Array: Modified comparison logic",
        "Binary Search on Answer: Optimization problems",
      ],
      complexity: { 
        time: "O(log n) for all variants", 
        space: "O(1)" 
      },
      code: [
        {
          language: "Python",
          code: `def lower_bound(arr, target):
    """First position where arr[i] >= target"""
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left

def upper_bound(arr, target):
    """First position where arr[i] > target"""
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left

def search_rotated(nums, target):
    """Search in rotated sorted array"""
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        
        # Check which half is sorted
        if nums[left] <= nums[mid]:  # Left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1

# Binary Search on Answer Example
def min_capacity(weights, days):
    """Minimum ship capacity to ship in D days"""
    left, right = max(weights), sum(weights)
    
    while left < right:
        mid = (left + right) // 2
        if can_ship(weights, days, mid):
            right = mid
        else:
            left = mid + 1
    return left`,
        },
      ],
      example: "Rotated Array [4,5,6,7,0,1,2], target=0:\n1. mid=3 (7), left sorted [4,5,6,7], 0 not in range\n2. Search right: mid=5 (1), right sorted [0,1,2]\n3. 0 in range [0,1], right=4\n4. mid=4 (0), Found!",
    },
  },
};

export function getExplanation(topic: string, level: ExplanationLevel): ExplanationContent | null {
  const topicData = explanations[topic.toLowerCase().replace(/\s+/g, "-")];
  if (!topicData) return null;
  return topicData[level];
}

export function getQuickResponse(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes("time complexity") && q.includes("stack")) {
    return "All stack operations (push, pop, peek, isEmpty) have **O(1)** time complexity. This is because we only work with the top element!";
  }
  
  if (q.includes("difference") && q.includes("stack") && q.includes("queue")) {
    return `## Stack vs Queue

| Feature | Stack | Queue |
|---------|-------|-------|
| Order | LIFO (Last In, First Out) | FIFO (First In, First Out) |
| Insertion | Top (push) | Rear (enqueue) |
| Deletion | Top (pop) | Front (dequeue) |
| Example | Undo button, Browser back | Print queue, BFS |
| Visual | 📚 Stack of books | 🚶 Line at counter |`;
  }
  
  if (q.includes("why") && q.includes("quick sort") && q.includes("fast")) {
    return `## Why Quick Sort is Fast

1. **Divide & Conquer**: Splits array into smaller parts
2. **In-place**: Uses O(log n) extra space
3. **Cache Friendly**: Works with contiguous memory
4. **Average Case**: O(n log n) with good pivot selection

However, worst case is O(n²) when pivot is always min/max. Use randomized pivot to avoid this!`;
  }
  
  return "";
}
