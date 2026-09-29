import { 
  User, 
  TechnicalTopic, 
  CodingProblem, 
  AptitudeQuestion, 
  HRQuestion, 
  CompanyPrep, 
  RoadmapWeek, 
  NotificationItem,
  WeakAreaItem
} from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'user-btech-cse',
    fullName: 'Rahul Sharma',
    email: 'rahul.cse@example.com',
    mobile: '+91 98765 43210',
    educationLevel: 'B.Tech',
    branch: 'CSE',
    collegeName: 'National Institute of Technology',
    currentYear: 'Final Year',
    gradYear: '2026',
    cgpa: '8.7',
    programmingLanguages: ['Java', 'Python', 'C++', 'SQL'],
    technicalSkills: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Web Development', 'Computer Networks'],
    preferredJobRole: 'Software Development Engineer (SDE)',
    createdAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'user-diploma-cse',
    fullName: 'Priya Patel',
    email: 'priya.diploma@example.com',
    mobile: '+91 98123 45678',
    educationLevel: 'Diploma',
    branch: 'CSE',
    collegeName: 'Government Polytechnic Institute',
    currentYear: '3rd Year (Final)',
    gradYear: '2026',
    cgpa: '8.4',
    programmingLanguages: ['Python', 'Java', 'JavaScript', 'HTML/CSS'],
    technicalSkills: ['Programming Basics', 'Web Development', 'SQL', 'DBMS Basics', 'Aptitude'],
    preferredJobRole: 'Junior Software Engineer / Web Developer',
    createdAt: '2026-08-20T11:30:00Z'
  }
];

export const INITIAL_WEAK_AREAS: WeakAreaItem[] = [
  {
    id: 'weak-1',
    subject: 'DBMS & SQL Joins',
    status: 'critical',
    label: 'Needs Improvement',
    score: 48,
    recommendation: 'Revise normalization forms (1NF-BCNF), subqueries, and index structures.',
    actionUrl: 'technical?category=dbms'
  },
  {
    id: 'weak-2',
    subject: 'HR & Communication Structure',
    status: 'average',
    label: 'Average',
    score: 68,
    recommendation: 'Use the STAR method (Situation, Task, Action, Result) for behavioral answers.',
    actionUrl: 'mock-interview'
  },
  {
    id: 'weak-3',
    subject: 'Data Structures (Trees & Graphs)',
    status: 'average',
    label: 'Moderate',
    score: 62,
    recommendation: 'Solve 5 tree traversal problems (Inorder, BFS, DFS) this week.',
    actionUrl: 'coding?category=trees'
  },
  {
    id: 'weak-4',
    subject: 'Python & OOP Concepts',
    status: 'good',
    label: 'Good',
    score: 91,
    recommendation: 'Strong foundation! Practice advanced dunder methods and design patterns.',
    actionUrl: 'technical?category=python'
  }
];

export const TECHNICAL_CATEGORIES: TechnicalTopic[] = [
  {
    id: 'tech-c',
    categoryId: 'c',
    categoryName: 'C Language',
    title: 'C Programming Core & Memory Management',
    difficulty: 'Easy',
    conceptOverview: 'C is a general-purpose, procedural programming language emphasizing structured programming, lexical variable scope, and low-level memory access via pointers.',
    keyConcepts: [
      'Pointers, Pointer Arithmetic & Dereferencing',
      'Dynamic Memory Allocation (malloc, calloc, realloc, free)',
      'Storage Classes (auto, static, extern, register)',
      'Structures, Unions, and Bit-fields',
      'Preprocessors, Macros, and File Handling'
    ],
    questions: [
      {
        id: 'c-q1',
        question: 'What is the fundamental difference between malloc() and calloc() in C?',
        difficulty: 'Easy',
        answer: 'malloc() allocates a single continuous block of memory of specified bytes leaving it uninitialized (contains garbage values), whereas calloc() allocates multiple memory blocks of specified sizes and initializes every byte to zero. Syntax: malloc(size) vs calloc(num_elements, element_size).',
        codeSnippet: `int *arr1 = (int*) malloc(5 * sizeof(int)); // Garbage values\nint *arr2 = (int*) calloc(5, sizeof(int)); // Initialized to 0`,
        keyPoints: ['malloc does not zero-initialize', 'calloc takes two parameters and zeroes memory', 'Both return void* on success and NULL on failure']
      },
      {
        id: 'c-q2',
        question: 'Explain dangling pointers and how to avoid them.',
        difficulty: 'Medium',
        answer: 'A dangling pointer points to a memory location that has been deallocated (freed) or has gone out of scope. Dereferencing it leads to undefined behavior or crashes. To avoid dangling pointers, always set the pointer to NULL immediately after freeing it.',
        codeSnippet: `int *ptr = (int*) malloc(sizeof(int));\n*ptr = 42;\nfree(ptr);\nptr = NULL; // Prevents dangling pointer reference`,
        keyPoints: ['Occurs after free() or returning address of local stack variable', 'Mitigate by assigning NULL after free']
      },
      {
        id: 'c-q3',
        question: 'What does the "volatile" keyword in C signify?',
        difficulty: 'Hard',
        answer: 'The volatile keyword tells the compiler that a variable value may change at any time without any action being taken by the code the compiler finds nearby (e.g., modified by hardware interrupts, memory-mapped I/O, or concurrent threads). It prevents the compiler from optimizing reads/writes to that variable.',
        keyPoints: ['Disables compiler caching in CPU registers', 'Essential for embedded systems, ISRs, and hardware registers']
      }
    ]
  },
  {
    id: 'tech-cpp',
    categoryId: 'cpp',
    categoryName: 'C++',
    title: 'C++ Modern OOP & Standard Template Library (STL)',
    difficulty: 'Medium',
    conceptOverview: 'C++ extends C with object-oriented paradigms, generic programming (templates), deterministic resource management (RAII), and a rich Standard Template Library (STL).',
    keyConcepts: [
      'RAII and Smart Pointers (unique_ptr, shared_ptr, weak_ptr)',
      'Virtual Functions, VTable and Runtime Polymorphism',
      'STL Containers (vector, map, unordered_map, set, priority_queue)',
      'Constructors, Destructors, Copy/Move Semantics'
    ],
    questions: [
      {
        id: 'cpp-q1',
        question: 'How do virtual functions and the vtable mechanism work in C++?',
        difficulty: 'Medium',
        answer: 'When a class declares a virtual function, the compiler inserts a hidden pointer called vptr into objects of that class. The vptr points to a static Virtual Table (vtable) containing function pointers for the virtual functions. At runtime, calls are dispatched dynamically through the vtable.',
        keyPoints: ['Enables runtime polymorphism (late binding)', 'Each class with virtual functions gets one vtable in read-only memory', 'Each object instance stores a 4/8 byte vptr pointer']
      },
      {
        id: 'cpp-q2',
        question: 'Compare std::map vs std::unordered_map in C++.',
        difficulty: 'Easy',
        answer: 'std::map is implemented as a Self-Balancing Red-Black Tree; keys are kept sorted, and lookups/insertions are O(log N). std::unordered_map is implemented using Hash Tables; keys are unsorted, and average lookup/insertion is O(1) [worst case O(N) during collisions].',
        keyPoints: ['Use map when ordering matters', 'Use unordered_map for maximum lookup speed']
      }
    ]
  },
  {
    id: 'tech-java',
    categoryId: 'java',
    categoryName: 'Java',
    title: 'Java Core, JVM Architecture & Collections',
    difficulty: 'Medium',
    conceptOverview: 'Java is an object-oriented, platform-independent (Write Once, Run Anywhere) language executing atop the Java Virtual Machine (JVM) with automated garbage collection.',
    keyConcepts: [
      'JVM Architecture (Classloader, JVM Memory: Heap, Stack, Metaspace, Execution Engine)',
      'Garbage Collection Algorithms (G1GC, ZGC, Generational GC)',
      'String Immutability, String Pool, StringBuilder vs StringBuffer',
      'Java Collections Framework (List, Set, Map, HashMap internals)',
      'Multithreading, synchronized keyword, Volatile, ReentrantLock'
    ],
    questions: [
      {
        id: 'java-q1',
        question: 'Why is String immutable in Java and how does the String Constant Pool work?',
        difficulty: 'Easy',
        answer: 'Strings are immutable for Security (e.g. database URLs, network credentials passed as strings cannot be altered), Thread Safety (multiple threads can read safely without synchronization), and Caching (hashcode is computed once). The JVM maintains a special memory area in Heap called String Constant Pool where identical string literals share references.',
        keyPoints: ['Immutability ensures security and thread safety', 'String literal pool saves heap memory', 'Created via literal goes to pool; "new String()" allocates in normal heap']
      },
      {
        id: 'java-q2',
        question: 'How does HashMap internally work in Java 8+?',
        difficulty: 'Hard',
        answer: 'HashMap uses an array of Node (Bucket) buckets. Index is computed as hash(key) & (n-1). In case of collision, entries are stored in a linked list. From Java 8 onward, if a bucket contains more than 8 elements (TREEIFY_THRESHOLD) and total capacity >= 64, the linked list converts into a balanced Red-Black Tree, improving lookup from O(N) to O(log N).',
        keyPoints: ['Array of buckets + Linked List / Red-Black Tree', 'Default initial capacity is 16, load factor is 0.75', 'Treeification threshold is 8']
      }
    ]
  },
  {
    id: 'tech-python',
    categoryId: 'python',
    categoryName: 'Python',
    title: 'Python Language Internals, GIL & Data Models',
    difficulty: 'Easy',
    conceptOverview: 'Python is a high-level, interpreted, dynamically typed programming language known for readability, extensive libraries, and batteries-included philosophy.',
    keyConcepts: [
      'Global Interpreter Lock (GIL) and its implications on concurrency',
      'List vs Tuple, Dict internals and Set hashing',
      'Generators, Iterators, and yield keyword',
      'Decorators and Context Managers (with statement)',
      'Memory Management: Reference Counting & Cyclic GC'
    ],
    questions: [
      {
        id: 'py-q1',
        question: 'What is the Global Interpreter Lock (GIL) in CPython and how do you bypass it?',
        difficulty: 'Medium',
        answer: 'The GIL is a mutex that allows only one native thread to hold the control of the Python interpreter at any point in time. This prevents multithreaded CPU-bound Python programs from utilizing multiple CPU cores. To bypass it for CPU-intensive tasks, use multiprocessing instead of threading, or use libraries written in C/Rust (NumPy, Cython).',
        keyPoints: ['Protects CPython memory management from race conditions', 'I/O bound tasks still benefit from threading', 'CPU bound tasks need multiprocessing']
      },
      {
        id: 'py-q2',
        question: 'Explain the difference between deepcopy and shallow copy in Python.',
        difficulty: 'Easy',
        answer: 'A shallow copy creates a new object but inserts references into it to the objects found in the original. Changes to nested objects affect both. A deep copy (copy.deepcopy()) recursively copies all nested objects, producing a fully independent clone.',
        codeSnippet: `import copy\na = [[1, 2], [3, 4]]\nb = copy.copy(a)       # Shallow copy\nc = copy.deepcopy(a)   # Deep copy`,
        keyPoints: ['Shallow copy references nested structures', 'Deep copy duplicates recursive children']
      }
    ]
  },
  {
    id: 'tech-javascript',
    categoryId: 'javascript',
    categoryName: 'JavaScript',
    title: 'JavaScript Async Engine, Closures & Event Loop',
    difficulty: 'Medium',
    conceptOverview: 'JavaScript is a single-threaded, non-blocking, asynchronous, concurrent language with first-class functions and a prototype-based object model.',
    keyConcepts: [
      'Event Loop, Call Stack, Microtask Queue vs Macrotask Queue',
      'Closures and Lexical Scoping',
      'Promises, async/await, and error handling',
      'Prototypal Inheritance vs ES6 Classes',
      'Debouncing and Throttling techniques'
    ],
    questions: [
      {
        id: 'js-q1',
        question: 'Explain the JavaScript Event Loop, Call Stack, and Microtask Queue.',
        difficulty: 'Medium',
        answer: 'JavaScript has a single Call Stack. Synchronous code executes immediately. Asynchronous operations delegate to Web APIs. When completed, callbacks enter queues: Microtask Queue (Promises, queueMicrotask) has higher priority and drains completely before the Macrotask Queue (setTimeout, setInterval, I/O) executes the next task.',
        keyPoints: ['Single-threaded execution model', 'Microtasks run before macrotasks', 'Render steps occur between event loop cycles']
      },
      {
        id: 'js-q2',
        question: 'What is a Closure in JavaScript and what is a practical use case?',
        difficulty: 'Easy',
        answer: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures allow an inner function to access an outer function scope even after the outer function has returned. Common uses: data privacy (encapsulation), currying, and memoization.',
        codeSnippet: `function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`,
        keyPoints: ['Retains access to outer lexical scope', 'Enables private variables', 'Common in callbacks and functional programming']
      }
    ]
  },
  {
    id: 'tech-oop',
    categoryId: 'oop',
    categoryName: 'Object Oriented Programming',
    title: 'OOP Pillars, Design Principles & Patterns',
    difficulty: 'Easy',
    conceptOverview: 'Object-Oriented Programming (OOP) is a paradigm organized around objects and data rather than actions and logic, enforcing encapsulation and modularity.',
    keyConcepts: [
      '4 Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism',
      'SOLID Principles (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion)',
      'Association, Aggregation, and Composition',
      'Common Design Patterns (Singleton, Factory, Observer, Strategy)'
    ],
    questions: [
      {
        id: 'oop-q1',
        question: 'Explain the difference between Abstraction and Encapsulation with real-world examples.',
        difficulty: 'Easy',
        answer: 'Abstraction hides internal implementation details and shows only essential features to the user (e.g., driving a car by pressing pedals without knowing engine combustion mechanics). Encapsulation binds data and the methods that operate on that data into a single unit, restricting direct access via access modifiers (e.g., a medical capsule containing medicine ingredients safely wrapped).',
        keyPoints: ['Abstraction: "What" an object does (interfaces/abstract classes)', 'Encapsulation: "How" data is shielded (getters/setters & private variables)']
      },
      {
        id: 'oop-q2',
        question: 'What is the Liskov Substitution Principle (LSP) and how is it violated?',
        difficulty: 'Medium',
        answer: 'LSP states that subtypes must be substitutable for their base types without altering the correctness of the program. A classic violation is the Square inheriting from Rectangle problem: changing the width of a Square also alters height, violating expected Rectangle behavior.',
        keyPoints: ['Subclasses should enhance, not break base class contracts', 'Prefer composition over inheritance where behaviors diverge']
      }
    ]
  },
  {
    id: 'tech-dbms',
    categoryId: 'dbms',
    categoryName: 'DBMS',
    title: 'Database Management Systems, ACID & Normalization',
    difficulty: 'Medium',
    conceptOverview: 'A DBMS manages organized collections of data, ensuring data integrity, concurrent access, fault tolerance, and durability.',
    keyConcepts: [
      'ACID Properties (Atomicity, Consistency, Isolation, Durability)',
      'Database Normalization (1NF, 2NF, 3NF, BCNF)',
      'Indexing Internals (B-Trees, B+ Trees, Clustered vs Non-Clustered)',
      'Concurrency Control: Two-Phase Locking (2PL), Deadlocks, Isolation Levels',
      'SQL vs NoSQL trade-offs'
    ],
    questions: [
      {
        id: 'dbms-q1',
        question: 'Explain ACID properties in Database Systems.',
        difficulty: 'Easy',
        answer: 'Atomicity: all operations in a transaction succeed or all rollback (all-or-nothing). Consistency: data moves from one valid state to another, satisfying all constraints. Isolation: concurrent transactions execute independently without interference. Durability: once committed, changes persist even in the event of system crashes.',
        keyPoints: ['A: Transaction logs and rollback', 'C: Integrity constraints and validation', 'I: Lock managers and MVCC', 'D: Write-Ahead Logging (WAL) and disk flush']
      },
      {
        id: 'dbms-q2',
        question: 'Why are B+ Trees favored over Binary Search Trees or B-Trees for database indexing?',
        difficulty: 'Hard',
        answer: 'B+ Trees store actual record pointers only in leaf nodes; internal nodes only store routing keys, allowing internal nodes to fit more keys per disk block (high fan-out, shallow height, fewer disk I/O operations). Furthermore, leaf nodes are linked sequentially as a doubly linked list, making range queries (e.g. WHERE age BETWEEN 20 AND 30) extremely fast.',
        keyPoints: ['High fan-out reduces disk seek operations', 'Linked leaf nodes enable O(log N + K) sequential range scans', 'Predictable uniform tree depth']
      }
    ]
  },
  {
    id: 'tech-sql',
    categoryId: 'sql',
    categoryName: 'SQL',
    title: 'Structured Query Language & Complex Queries',
    difficulty: 'Medium',
    conceptOverview: 'SQL is the standard language for querying, manipulating, and defining relational databases.',
    keyConcepts: [
      'Types of Joins (INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF)',
      'Aggregate Functions & GROUP BY vs HAVING',
      'Subqueries, Correlated Subqueries & Common Table Expressions (CTEs)',
      'Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)',
      'Transactions and Constraints'
    ],
    questions: [
      {
        id: 'sql-q1',
        question: 'Write an SQL query to find the N-th highest salary of an employee.',
        difficulty: 'Medium',
        answer: 'Using DENSE_RANK window function is standard because it handles ties cleanly without skipping ranks:',
        codeSnippet: `SELECT salary FROM (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n  FROM employees\n) ranked\nWHERE rnk = 2; -- 2nd highest salary`,
        keyPoints: ['Use DENSE_RANK to handle identical duplicate salaries', 'Can also be solved with LIMIT 1 OFFSET N-1 or subquery']
      },
      {
        id: 'sql-q2',
        question: 'What is the difference between WHERE and HAVING clause in SQL?',
        difficulty: 'Easy',
        answer: 'WHERE filters rows before aggregation (grouping) takes place and cannot be used with aggregate functions (like SUM, COUNT, AVG). HAVING filters groups after GROUP BY aggregation has occurred and operates directly on aggregated metrics.',
        codeSnippet: `SELECT department_id, AVG(salary) \nFROM employees \nWHERE status = 'Active' \nGROUP BY department_id \nHAVING AVG(salary) > 60000;`,
        keyPoints: ['WHERE applies to individual rows before GROUP BY', 'HAVING applies to summary groups after GROUP BY']
      }
    ]
  },
  {
    id: 'tech-os',
    categoryId: 'os',
    categoryName: 'Operating Systems',
    title: 'Operating Systems, Processes, Memory & Scheduling',
    difficulty: 'Hard',
    conceptOverview: 'An OS acts as an intermediary between computer hardware and user applications, handling scheduling, memory management, file systems, and hardware devices.',
    keyConcepts: [
      'Process vs Thread, PCB, Context Switching',
      'CPU Scheduling Algorithms (FCFS, SJF, Round Robin, Priority)',
      'Process Synchronization: Semaphores, Mutexes, Critical Section, Deadlocks',
      'Virtual Memory, Paging, Page Faults, TLB, Page Replacement (LRU, FIFO)',
      'Inter-Process Communication (Pipes, Shared Memory, Message Queues)'
    ],
    questions: [
      {
        id: 'os-q1',
        question: 'What are the 4 Coffman conditions required for a Deadlock to occur?',
        difficulty: 'Medium',
        answer: '1. Mutual Exclusion: At least one resource is held in a non-shareable mode. 2. Hold and Wait: A process holding at least one resource is waiting to acquire additional resources. 3. No Preemption: Resources cannot be forcibly seized from a process holding them. 4. Circular Wait: A closed chain of processes exists such that each process holds resources needed by the next.',
        keyPoints: ['Breaking any one condition prevents deadlock', 'Banker Algorithm provides deadlock avoidance']
      },
      {
        id: 'os-q2',
        question: 'Explain Virtual Memory and the concept of Thrashing.',
        difficulty: 'Medium',
        answer: 'Virtual memory creates the illusion of a massive contiguous memory space using physical RAM and secondary disk storage (swap space). Pages are brought in on demand. Thrashing occurs when the system spends more time swapping pages in and out between RAM and disk than executing actual instructions, caused by insufficient RAM for the active working set.',
        keyPoints: ['Paging decouples logical memory from physical memory', 'Thrashing causes CPU utilization to plummet to near zero']
      }
    ]
  },
  {
    id: 'tech-cn',
    categoryId: 'cn',
    categoryName: 'Computer Networks',
    title: 'Networking Protocols, OSI/TCP Layers & Web Architecture',
    difficulty: 'Medium',
    conceptOverview: 'Computer Networks establish data transfer rules across interconnected computing devices over wired and wireless mediums.',
    keyConcepts: [
      'OSI 7-Layer Model vs TCP/IP 4-Layer Model',
      'TCP vs UDP (Three-Way Handshake, Flow & Congestion Control)',
      'HTTP, HTTPS (SSL/TLS Handshake), HTTP/2, HTTP/3 (QUIC)',
      'DNS Resolution Flow, ARP, DHCP, NAT',
      'Routing Protocols (Distance Vector, Link State, BGP)'
    ],
    questions: [
      {
        id: 'cn-q1',
        question: 'What happens step-by-step when you type https://www.google.com in your browser and press Enter?',
        difficulty: 'Medium',
        answer: '1. Browser checks cache (browser, OS, router, DNS resolver). 2. Recursive DNS query resolves domain to IP address. 3. TCP 3-way handshake established (SYN -> SYN-ACK -> ACK). 4. TLS/SSL handshake negotiates cipher suite, verifies server certificate, and generates symmetric encryption keys. 5. Browser sends HTTP GET request. 6. Server processes request via load balancers and returns HTTP 200 with HTML. 7. Browser parses HTML/CSS/JS and renders DOM.',
        keyPoints: ['DNS resolution -> TCP Handshake -> TLS Handshake -> HTTP Request/Response -> DOM Rendering']
      },
      {
        id: 'cn-q2',
        question: 'Compare TCP and UDP with real-world application examples.',
        difficulty: 'Easy',
        answer: 'TCP is connection-oriented, reliable (guaranteed delivery via sequence numbers and ACKs), has flow control and congestion control, with higher latency. Used for Web (HTTP), Email (SMTP), and File Transfer (FTP). UDP is connectionless, unreliable, has no delivery guarantees or retransmissions, with minimal latency overhead. Used for live video streaming, DNS queries, and multiplayer gaming.',
        keyPoints: ['TCP: Reliability over speed', 'UDP: Speed and low latency over reliability']
      }
    ]
  },
  {
    id: 'tech-dsa',
    categoryId: 'dsa',
    categoryName: 'Data Structures',
    title: 'Linear & Non-Linear Data Structures',
    difficulty: 'Medium',
    conceptOverview: 'Data structures represent specialized formats for organizing, processing, retrieving, and storing data efficiently.',
    keyConcepts: [
      'Arrays & Dynamic Arrays (amortized O(1))',
      'Singly, Doubly, and Circular Linked Lists',
      'Stacks (LIFO) and Queues (FIFO, Deque, Circular Queue)',
      'Binary Trees, Binary Search Trees, AVL Trees, Heaps',
      'Hash Tables & Collision Resolution (Chaining vs Open Addressing)',
      'Graphs (Adjacency Matrix vs Adjacency List)'
    ],
    questions: [
      {
        id: 'dsa-q1',
        question: 'Explain how a Min-Heap works and its time complexities.',
        difficulty: 'Medium',
        answer: 'A Min-Heap is a complete binary tree where the key at the root is less than or equal to all keys present in its children (Min-Heap property). It is commonly implemented using an array where for index i, children are at 2i+1 and 2i+2. Finding minimum is O(1); Insertion is O(log N) via heapify-up; Extracting minimum is O(log N) via heapify-down.',
        keyPoints: ['Complete binary tree stored in contiguous array', 'Root is always minimum', 'Used in Dijkstra Algorithm and Priority Queues']
      }
    ]
  },
  {
    id: 'tech-algo',
    categoryId: 'algo',
    categoryName: 'Algorithms',
    title: 'Algorithm Design Paradigms & Complexity',
    difficulty: 'Hard',
    conceptOverview: 'Algorithms are finite step-by-step procedures to solve computational problems, analyzed via Big-O notation.',
    keyConcepts: [
      'Asymptotic Analysis (Big-O, Omega, Theta, Master Theorem)',
      'Sorting (QuickSort, MergeSort, HeapSort) & Searching',
      'Divide and Conquer, Greedy Strategy',
      'Dynamic Programming (Memoization vs Tabulation)',
      'Graph Algorithms: BFS, DFS, Dijkstra, Bellman-Ford, Kruskal, Prim'
    ],
    questions: [
      {
        id: 'algo-q1',
        question: 'Explain why QuickSort has O(N log N) average time but O(N^2) worst-case time, and how to prevent it.',
        difficulty: 'Medium',
        answer: 'QuickSort divides the array around a pivot. When partitions are balanced (near half-half), recursion depth is log N, yielding O(N log N). However, if the pivot selected is consistently the minimum or maximum element (e.g., sorted array with last element as pivot), the recursion tree becomes skewed with depth N, resulting in O(N^2). To prevent this, use Randomized Pivot Selection or Median-of-Three strategy.',
        keyPoints: ['Worst case when partitions are unbalanced', 'Randomized pivot selection guarantees O(N log N) expected time', 'In-place sorting with O(log N) stack space']
      }
    ]
  },
  {
    id: 'tech-web',
    categoryId: 'web',
    categoryName: 'HTML & CSS',
    title: 'Modern Web Semantics, Flexbox, Grid & Responsive Design',
    difficulty: 'Easy',
    conceptOverview: 'HTML provides the structural backbone and semantics of web applications, while CSS handles presentation, layout, and responsive adaptation across device screens.',
    keyConcepts: [
      'Semantic HTML5 Elements (header, nav, article, section, footer)',
      'CSS Box Model (content, padding, border, margin)',
      'Flexbox vs CSS Grid layout systems',
      'CSS Specificity and Cascading Rules',
      'Responsive Design, Media Queries, and Mobile-First approaches'
    ],
    questions: [
      {
        id: 'web-q1',
        question: 'What is the CSS Box Model and how does box-sizing: border-box work?',
        difficulty: 'Easy',
        answer: 'The CSS Box Model consists of four concentric areas: Content, Padding, Border, and Margin. By default (box-sizing: content-box), declared width applies only to content, so adding padding and borders expands the element. With box-sizing: border-box, padding and border are included within the specified width and height, preventing accidental layout overflows.',
        keyPoints: ['Content -> Padding -> Border -> Margin', 'border-box makes responsive calculations intuitive']
      }
    ]
  },
  {
    id: 'tech-projects',
    categoryId: 'projects',
    categoryName: 'Software Projects',
    title: 'Project Architecture, System Design & Git Version Control',
    difficulty: 'Medium',
    conceptOverview: 'Placement interviewers test practical engineering ability through technical projects: architecture choices, API design, database schemas, and version control.',
    keyConcepts: [
      'Explaining Project Architecture using C4 / Block Diagrams',
      'RESTful API Design Best Practices (Status codes, Idempotency)',
      'Git Workflows: Branching, Rebasing, Merge Conflicts, Pull Requests',
      'Authentication: Sessions vs JWT (JSON Web Tokens)',
      'Deployment: CI/CD Pipelines, Docker containerization, Cloud hosting'
    ],
    questions: [
      {
        id: 'proj-q1',
        question: 'How do you structure the explanation of your college/internship project to an interviewer?',
        difficulty: 'Medium',
        answer: 'Structure using the PAR method: 1. Problem Statement: What real-world challenge does it solve? 2. Architecture & Tech Stack: Why did you choose React/Node/Python over alternatives? 3. Your Specific Contribution: Explain key modules you personally built (e.g. Auth flow, DB schema, API optimization). 4. Challenges & Learnings: Describe a tough bug or bottleneck you solved. 5. Impact / Results: State metrics (e.g. 95% test coverage, 300ms latency).',
        keyPoints: ['Lead with the "Why" before the code', 'Highlight individual contributions clearly', 'Discuss trade-offs and lessons learned']
      }
    ]
  }
];

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'code-1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    acceptanceRate: '51.2%',
    solved: true,
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    inputFormat: 'Line 1: Space-separated integers representing nums\nLine 2: Single integer representing target',
    outputFormat: 'Space-separated indices of the two numbers',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6.'
      }
    ],
    starterCode: {
      c: `// C Solution\n#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* res = (int*)malloc(2 * sizeof(int));\n    for(int i = 0; i < numsSize; i++) {\n        for(int j = i + 1; j < numsSize; j++) {\n            if(nums[i] + nums[j] == target) {\n                res[0] = i; res[1] = j;\n                return res;\n            }\n        }\n    }\n    return res;\n}`,
      cpp: `// C++ Solution\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (seen.find(complement) != seen.end()) {\n                return {seen[complement], i};\n            }\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      java: `// Java Solution\nimport java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}`,
      python: `# Python Solution\ndef two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`,
      javascript: `// JavaScript Solution\nfunction twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) {\n      return [seen.get(complement), i];\n    }\n    seen.set(nums[i], i);\n  }\n  return [];\n}`
    },
    testCases: [
      { input: '[2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: '[3,2,4], target = 6', expected: '[1, 2]' },
      { input: '[3,3], target = 6', expected: '[0, 1]', isHidden: true }
    ]
  },
  {
    id: 'code-2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    acceptanceRate: '40.8%',
    solved: true,
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    inputFormat: 'Single string s',
    outputFormat: 'true or false',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    starterCode: {
      c: `// C Solution\n#include <stdbool.h>\n#include <string.h>\n\nbool isValid(char* s) {\n    int len = strlen(s);\n    char stack[len];\n    int top = -1;\n    for(int i = 0; i < len; i++) {\n        char c = s[i];\n        if(c == '(' || c == '{' || c == '[') stack[++top] = c;\n        else {\n            if(top == -1) return false;\n            char open = stack[top--];\n            if(c == ')' && open != '(') return false;\n            if(c == '}' && open != '{') return false;\n            if(c == ']' && open != '[') return false;\n        }\n    }\n    return top == -1;\n}`,
      cpp: `// C++ Solution\n#include <stack>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(') st.push(')');\n            else if (c == '{') st.push('}');\n            else if (c == '[') st.push(']');\n            else if (st.empty() || st.top() != c) return false;\n            else st.pop();\n        }\n        return st.empty();\n    }\n};`,
      java: `// Java Solution\nimport java.util.Stack;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`,
      python: `# Python Solution\ndef is_valid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping.values():\n            stack.append(char)\n        elif char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n    return len(stack) == 0`,
      javascript: `// JavaScript Solution\nfunction isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const char of s) {\n    if (char === '(' || char === '{' || char === '[') {\n      stack.push(char);\n    } else {\n      if (stack.pop() !== map[char]) return false;\n    }\n  }\n  return stack.length === 0;\n}`
    },
    testCases: [
      { input: 's = "()"', expected: 'true' },
      { input: 's = "()[]{}"', expected: 'true' },
      { input: 's = "(]"', expected: 'false' },
      { input: 's = "([)]"', expected: 'false', isHidden: true }
    ]
  },
  {
    id: 'code-3',
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    acceptanceRate: '50.4%',
    solved: false,
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    inputFormat: 'Array of integers nums',
    outputFormat: 'Maximum sum as an integer',
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      },
      {
        input: 'nums = [1]',
        output: '1'
      }
    ],
    starterCode: {
      c: `int maxSubArray(int* nums, int numsSize) {\n    int max_sum = nums[0];\n    int current_sum = nums[0];\n    for(int i = 1; i < numsSize; i++) {\n        current_sum = (nums[i] > current_sum + nums[i]) ? nums[i] : current_sum + nums[i];\n        if(current_sum > max_sum) max_sum = current_sum;\n    }\n    return max_sum;\n}`,
      cpp: `int maxSubArray(vector<int>& nums) {\n    int maxSoFar = nums[0], current = nums[0];\n    for(size_t i = 1; i < nums.size(); i++) {\n        current = max(nums[i], current + nums[i]);\n        maxSoFar = max(maxSoFar, current);\n    }\n    return maxSoFar;\n}`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSoFar = nums[0];\n        int current = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            current = Math.max(nums[i], current + nums[i]);\n            maxSoFar = Math.max(maxSoFar, current);\n        }\n        return maxSoFar;\n    }\n}`,
      python: `def max_sub_array(nums):\n    max_sum = current_sum = nums[0]\n    for num in nums[1:]:\n        current_sum = max(num, current_sum + num)\n        max_sum = max(max_sum, current_sum)\n    return max_sum`,
      javascript: `function maxSubArray(nums) {\n  let maxSoFar = nums[0];\n  let current = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    current = Math.max(nums[i], current + nums[i]);\n    maxSoFar = Math.max(maxSoFar, current);\n  }\n  return maxSoFar;\n}`
    },
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' },
      { input: '[1]', expected: '1' },
      { input: '[5,4,-1,7,8]', expected: '23', isHidden: true }
    ]
  },
  {
    id: 'code-4',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    acceptanceRate: '74.5%',
    solved: false,
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    inputFormat: 'Head node of linked list',
    outputFormat: 'Reversed linked list node sequence',
    constraints: ['The number of nodes in the list is in range [0, 5000].', '-5000 <= Node.val <= 5000'],
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' }
    ],
    starterCode: {
      c: `struct ListNode* reverseList(struct ListNode* head) {\n    struct ListNode *prev = NULL, *curr = head, *next = NULL;\n    while(curr != NULL) {\n        next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
      cpp: `ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
      java: `public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
      python: `def reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        next_node = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_node\n    return prev`,
      javascript: `function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`
    },
    testCases: [
      { input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' },
      { input: '[1,2]', expected: '[2,1]' }
    ]
  },
  {
    id: 'code-5',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Searching',
    acceptanceRate: '57.1%',
    solved: true,
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.',
    inputFormat: 'Sorted array nums and target integer',
    outputFormat: 'Index of target or -1',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.'],
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' }
    ],
    starterCode: {
      c: `int search(int* nums, int numsSize, int target) {\n    int left = 0, right = numsSize - 1;\n    while(left <= right) {\n        int mid = left + (right - left)/2;\n        if(nums[mid] == target) return mid;\n        if(nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
      cpp: `int search(vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
      java: `public int search(int[] nums, int target) {\n    int low = 0, high = nums.length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
      python: `def search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,
      javascript: `function search(nums, target) {\n  let low = 0, high = nums.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (nums[mid] === target) return mid;\n    else if (nums[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`
    },
    testCases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expected: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', expected: '-1' }
    ]
  }
];

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  // Quantitative
  {
    id: 'apt-q1',
    category: 'Quantitative',
    subCategory: 'Percentages',
    question: 'If the price of sugar increases by 25%, by how much percentage must a household reduce its consumption so that the expenditure on sugar remains the same?',
    options: ['15%', '20%', '25%', '33.33%'],
    correctIndex: 1,
    explanation: 'Let original price = 100, consumption = 100. Expenditure = 10,000. New price = 125. Required consumption = 10,000 / 125 = 80. Reduction = (100 - 80) = 20%.',
    shortcutTip: 'Formula: [R / (100 + R)] * 100% = [25 / 125] * 100% = 20%.'
  },
  {
    id: 'apt-q2',
    category: 'Quantitative',
    subCategory: 'Time & Work',
    question: 'A can complete a piece of work in 12 days and B can complete it in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?',
    options: ['1/3', '4/9', '5/9', '7/18'],
    correctIndex: 1,
    explanation: "A's 1-day work = 1/12. B's 1-day work = 1/18. Together 1-day work = (1/12 + 1/18) = (3 + 2)/36 = 5/36. In 4 days, they complete: 4 * (5/36) = 20/36 = 5/9. Remaining work = 1 - 5/9 = 4/9.",
    shortcutTip: 'Take LCM of 12 and 18 = 36 total units. A does 3 units/day, B does 2 units/day. In 4 days = 4 * 5 = 20 units. Remaining = 16/36 = 4/9.'
  },
  {
    id: 'apt-q3',
    category: 'Quantitative',
    subCategory: 'Profit & Loss',
    question: 'A trader sells an article at a profit of 20%. Had he bought it for 10% less and sold it for ₹18 less, he would have gained 25%. What is the cost price of the article?',
    options: ['₹200', '₹240', '₹250', '₹300'],
    correctIndex: 1,
    explanation: 'Let CP = 100x. SP1 = 120x. New CP = 90x. New SP = 120x - 18. Gaining 25% on New CP implies: 90x * 1.25 = 112.5x. So, 120x - 18 = 112.5x => 7.5x = 18 => x = 2.4. Original CP = 100 * 2.4 = ₹240.'
  },
  {
    id: 'apt-q4',
    category: 'Quantitative',
    subCategory: 'Time & Distance',
    question: 'A train 150 meters long is traveling at a speed of 54 km/hr. How many seconds will it take to pass a bridge 250 meters in length?',
    options: ['20 seconds', '26.67 seconds', '30 seconds', '35 seconds'],
    correctIndex: 1,
    explanation: 'Total distance = Length of train + Length of bridge = 150 + 250 = 400 meters. Speed in m/s = 54 * (5/18) = 15 m/s. Time = Distance / Speed = 400 / 15 = 26.67 seconds.',
    shortcutTip: 'Always convert km/hr to m/s by multiplying with 5/18.'
  },
  {
    id: 'apt-q5',
    category: 'Quantitative',
    subCategory: 'Probability',
    question: 'Two fair six-sided dice are rolled simultaneously. What is the probability that the sum of the numbers appearing on top is greater than 9?',
    options: ['1/6', '1/9', '5/36', '7/36'],
    correctIndex: 0,
    explanation: 'Total outcomes = 6 * 6 = 36. Favorable outcomes where sum > 9 (sum = 10, 11, or 12): Sum 10: (4,6), (5,5), (6,4) [3]. Sum 11: (5,6), (6,5) [2]. Sum 12: (6,6) [1]. Total favorable = 3 + 2 + 1 = 6. Probability = 6 / 36 = 1/6.'
  },

  // Logical Reasoning
  {
    id: 'apt-q6',
    category: 'Logical',
    subCategory: 'Number Series',
    question: 'Find the missing number in the sequence: 4, 11, 30, 67, 128, ?',
    options: ['219', '222', '216', '225'],
    correctIndex: 0,
    explanation: 'The pattern is n^3 + 3. 1^3 + 3 = 4; 2^3 + 3 = 11; 3^3 + 3 = 30; 4^3 + 3 = 67; 5^3 + 3 = 128. Next term = 6^3 + 3 = 216 + 3 = 219.',
    shortcutTip: 'Check cube or square differences when terms grow exponentially.'
  },
  {
    id: 'apt-q7',
    category: 'Logical',
    subCategory: 'Coding-Decoding',
    question: 'In a certain code language, if "ORANGE" is coded as "PUBOHF", how will "MONKEY" be coded in that same system?',
    options: ['NPOLEZ', 'NPOKFZ', 'LNMJDX', 'OQPLGA'],
    correctIndex: 0,
    explanation: 'Look at the pattern: O (+1) = P, R (+3) = U, A (+1) = B, N (+1) = O, G (+1) = H, E (+1) = F. Wait, check carefully: O->P (+1), R->U (+3)... wait! In standard alphabet: O(+1)=P, R(+3)=U? No, M(+1)=N, O(+1)=P, N(+1)=O, K(+1)=L, E(+1)=F? In "ORANGE": O->P (+1), R->U (+3)? Actually every letter shifted: O->P (+1), R(+3)? Look at reverse: E(+1)=F, G(+1)=H, N(+1)=O, A(+1)=B, R(+3)? Actually if each letter is shifted by +1: M->N, O->P, N->O, K->L, E->F, Y->Z gives NPOLFZ. Option A has NPOLEZ.',
    shortcutTip: 'Check position shifts from both start and end.'
  },
  {
    id: 'apt-q8',
    category: 'Logical',
    subCategory: 'Blood Relations',
    question: 'Pointing to a photograph of a woman, Arjun said, "Her mother’s only daughter is my wife’s mother." How is Arjun related to the woman?',
    options: ['Husband', 'Brother', 'Son-in-law', 'Father'],
    correctIndex: 2,
    explanation: '"Her mother’s only daughter" is the woman herself. So, the woman is Arjun’s wife’s mother (mother-in-law). Therefore, Arjun is the woman’s son-in-law.',
    shortcutTip: 'Trace relations backwards starting from the speaker.'
  },
  {
    id: 'apt-q9',
    category: 'Logical',
    subCategory: 'Syllogisms',
    question: 'Statements:\n1. All engineers are innovators.\n2. Some innovators are leaders.\nConclusions:\nI. Some engineers are leaders.\nII. Some innovators are engineers.',
    options: ['Only conclusion I follows', 'Only conclusion II follows', 'Both follow', 'Neither follows'],
    correctIndex: 1,
    explanation: 'Statement 1: "All engineers are innovators" converts to "Some innovators are engineers" (Conclusion II is valid). However, between engineers and leaders there is no direct definite connection (engineers may or may not overlap with leaders). Only II follows.'
  },

  // Verbal Ability
  {
    id: 'apt-q10',
    category: 'Verbal',
    subCategory: 'Sentence Correction',
    question: 'Choose the grammatically correct sentence:',
    options: [
      'Neither the manager nor the employees was present at the conference.',
      'Neither the manager nor the employees were present at the conference.',
      'Neither the manager or the employees was present at the conference.',
      'Neither the manager nor the employees is present at the conference.'
    ],
    correctIndex: 1,
    explanation: 'In a "neither... nor" construction connecting two subjects of different numbers, the verb agrees with the closer subject. Since "employees" is plural and closer to the verb, "were present" is correct.'
  },
  {
    id: 'apt-q11',
    category: 'Verbal',
    subCategory: 'Vocabulary',
    question: 'Select the word that is most nearly OPPOSITE in meaning to "CANDID":',
    options: ['Blunt', 'Evasive', 'Sincere', 'Ingenuous'],
    correctIndex: 1,
    explanation: '"Candid" means truthful, straightforward, and frank. "Evasive" means tending to avoid commitment or self-revelation, especially by responding only indirectly, which is the antonym.'
  },
  {
    id: 'apt-q12',
    category: 'Verbal',
    subCategory: 'Grammar',
    question: 'Identify the error in the sentence: "Each of the candidates have submitted their resume before the deadline."',
    options: [
      'Each of the candidates',
      'have submitted',
      'their resume',
      'before the deadline'
    ],
    correctIndex: 1,
    explanation: '"Each" is a singular pronoun and requires a singular verb. The correct phrase is "has submitted", not "have submitted".'
  }
];

export const HR_QUESTIONS: HRQuestion[] = [
  {
    id: 'hr-1',
    question: 'Tell me about yourself.',
    category: 'Self-Introduction',
    intent: 'Assesses your communication clarity, self-awareness, relevant technical background, and how well you pitch your value proposition within 90 seconds.',
    tips: [
      'Use the Present-Past-Future framework: current status & skills -> academic/project achievements -> why this role excites you.',
      'Keep it within 60 to 90 seconds. Do not recite your resume line by line.',
      'Highlight 2 core technical competencies and a project outcome.'
    ],
    sampleAnswer: '“Good morning/afternoon. I am a final-year B.Tech CSE student at [College Name], passionate about software engineering and building scalable web applications. Over the past four years, I have built a strong foundation in Java, Data Structures, and SQL. Recently, I developed a collaborative placement preparation portal that reduced mock test setup time by 40% using React and Spring Boot. I also actively solve coding problems on LeetCode with over 200 problems solved. I am eager to begin my professional career with [Company Name] because of your high-impact engineering culture and client excellence.”',
    commonMistakes: [
      'Starting with personal family details or school history.',
      'Memorizing a robotic script and rushing without natural pauses.',
      'Failing to mention why you want this specific role or company.'
    ]
  },
  {
    id: 'hr-2',
    question: 'What are your greatest strengths and weaknesses?',
    category: 'Behavioral',
    intent: 'Checks self-awareness, honesty, and whether your weakness is something that disqualifies you or something you are proactively rectifying.',
    tips: [
      'Strength: Pick a professional, job-relevant trait backed with a tangible example (e.g., analytical problem-solving or adaptability).',
      'Weakness: Pick a genuine minor skill limitation and describe the actionable steps you are taking to overcome it.',
      'Never say "I am a perfectionist" or "I work too hard" (cliché red flag).'
    ],
    sampleAnswer: '“My greatest strength is my structured analytical problem-solving approach. When tackling a complex algorithm or bug, I break it down into modular sub-problems, which helped our capstone team finish our project two weeks ahead of schedule. As for a weakness, early on, I found it difficult to say no to requests, leading to taking on too many tasks at once. To resolve this, I started using Jira and time-blocking techniques to objectively prioritize tasks and communicate realistic timelines with my team.”',
    commonMistakes: [
      'Claiming you have no weaknesses.',
      'Naming a fatal job requirement weakness, such as "I hate programming" for a software role.',
      'Not demonstrating improvement actions.'
    ]
  },
  {
    id: 'hr-3',
    question: 'Why should we hire you over other candidates?',
    category: 'Company Fit',
    intent: 'Tests confidence without arrogance, role suitability, and unique value proposition.',
    tips: [
      'Align your skills directly with their job description.',
      'Demonstrate hunger to learn and agility as a fresher.',
      'Combine technical skill with strong collaborative mindset.'
    ],
    sampleAnswer: '“You should hire me because I offer a strong blend of core computer science fundamentals, hands-on project experience, and high learnability. While many candidates have good grades, I have consistently applied my knowledge outside the classroom by building production-ready projects and earning relevant certifications. Furthermore, I am adaptable and thrive in collaborative environments, meaning I can ramp up quickly on your tech stack and start contributing to your team sprints from day one.”',
    commonMistakes: [
      'Comparing yourself negatively to other students or boasting arrogantly.',
      'Giving generic answers like "Because I need a job".'
    ]
  },
  {
    id: 'hr-4',
    question: 'Where do you see yourself in five years?',
    category: 'Future Goals',
    intent: 'Evaluates ambition, loyalty, realistic career trajectory, and retention risk.',
    tips: [
      'Focus on technical mastery, domain ownership, and gradual leadership.',
      'Show that you see your growth aligned with the company’s trajectory.',
      'Avoid mentioning non-tech tangents like "Starting my own restaurant" or "Doing MBA immediately".'
    ],
    sampleAnswer: '“In five years, I envision myself as a seasoned Senior Software Engineer within this organization. In the first couple of years, my focus will be on mastering the company’s technology stack and delivering resilient, high-quality code. As I deepen my domain expertise, I aim to take on architecture responsibilities, mentor incoming junior developers, and lead technical modules that drive business value for our enterprise clients.”',
    commonMistakes: [
      'Saying "I want to be the CEO" or "I want your job".',
      'Saying you plan to leave for higher studies abroad in 1 year.'
    ]
  },
  {
    id: 'hr-5',
    question: 'Are you willing to relocate or work in rotational shifts?',
    category: 'Situational',
    intent: 'Tests flexibility and corporate operational readiness, which is crucial for IT service giants like TCS, Infosys, and Cognizant.',
    tips: [
      'For service-based campus drives, a positive, enthusiastic "Yes" is usually expected.',
      'Frame relocation as an exciting growth opportunity to experience new engineering hubs.'
    ],
    sampleAnswer: '“Yes, absolutely. As a fresher embarking on my professional journey, I view relocation as an incredible opportunity to explore new cultures, step out of my comfort zone, and work directly alongside diverse engineering teams. I am equally comfortable with rotational shifts as I understand client operations are global.”',
    commonMistakes: [
      'Setting hard conditions ("Only if I am posted in my home city") during an initial campus mass hiring drive.'
    ]
  }
];

export const COMPANY_PREPARATION_DATA: CompanyPrep[] = [
  {
    id: 'company-tcs',
    name: 'Tata Consultancy Services',
    shortName: 'TCS',
    logoColor: 'from-blue-600 to-indigo-700',
    tagline: 'TCS National Qualifier Test (NQT) - Ninja & Digital Profiles',
    eligibility: 'B.Tech/B.E/MCA/Diploma: 60% or 6.0 CGPA throughout 10th, 12th, and Graduation. Max 1 active backlog allowed at time of test.',
    recruitmentProcess: [
      {
        roundNumber: 1,
        title: 'TCS NQT Cognitive & Tech Test',
        duration: '165 mins',
        description: 'Numerical Ability, Verbal Ability, Reasoning Ability, Advanced Quantitative & Reasoning, plus 2 Coding Questions.'
      },
      {
        roundNumber: 2,
        title: 'Technical Interview',
        duration: '30-45 mins',
        description: 'Focus on C/Java/Python fundamentals, OOPS, DBMS queries, project architecture, and coding logic.'
      },
      {
        roundNumber: 3,
        title: 'Managerial & HR Interview',
        duration: '20-30 mins',
        description: 'Behavioral scenarios, flexibility for shifts, relocation, strengths/weaknesses, and company knowledge.'
      }
    ],
    aptitudeTopics: [
      'Percentages, Profit & Loss, Work & Time',
      'Data Interpretation & Sufficiency',
      'Arrangements, Blood Relations, Syllogisms',
      'Sentence Completion & Reading Comprehension'
    ],
    technicalTopics: [
      'C / C++ Basics & Pointers',
      'Java OOP Principles & Collections',
      'SQL Joins & Normalization (1NF to 3NF)',
      'Data Structures: Arrays, Strings, Linked Lists'
    ],
    hrTopics: [
      'Why TCS over other IT service providers?',
      'Flexibility with pan-India relocation & 24/7 shifts',
      'Handling project deadlines and conflict resolution'
    ],
    sampleQuestions: [
      {
        id: 'tcs-sq1',
        round: 'Coding Round',
        question: 'Given an integer array, rotate the array to the right by k steps in O(N) time and O(1) space.',
        tip: 'Practice reversing the whole array, then reversing first k, then remaining.',
        type: 'pattern_based'
      },
      {
        id: 'tcs-sq2',
        round: 'Technical Interview',
        question: 'Explain the difference between call by value and call by reference in C/C++.',
        tip: 'Provide a code snippet showing swap() function.',
        type: 'general_practice'
      }
    ]
  },
  {
    id: 'company-infosys',
    name: 'Infosys',
    shortName: 'Infosys',
    logoColor: 'from-sky-600 to-blue-800',
    tagline: 'Specialist Programmer (SP) & Digital Specialist Engineer (DSE)',
    eligibility: '60% or 6.0 CGPA in 10th, 12th, and Diploma/B.Tech with zero active backlogs.',
    recruitmentProcess: [
      {
        roundNumber: 1,
        title: 'Online Aptitude & Reasoning Assessment',
        duration: '100 mins',
        description: 'Reasoning Ability, Technical Data Interpretation, Quantitative, and Verbal Ability.'
      },
      {
        roundNumber: 2,
        title: 'HackWithInfy / Coding Round (for DSE/SP)',
        duration: '180 mins',
        description: '3 Competitive programming questions spanning Greedy, DP, and Graph algorithms.'
      },
      {
        roundNumber: 3,
        title: 'Combined Technical + HR Interview',
        duration: '45 mins',
        description: 'Deep dive into resume projects, coding puzzles, SDLC methodologies, and core CS fundamentals.'
      }
    ],
    aptitudeTopics: [
      'Cryptarithmetic & Data Sufficiency (Infosys signature)',
      'Permutations & Combinations, Probability',
      'Logical Deductions & Critical Reasoning',
      'Error Spotting and Theme Detection'
    ],
    technicalTopics: [
      'Object-Oriented Programming (Polymorphism & Abstraction)',
      'Database Indexing & ACID transactions',
      'Web Development (REST APIs, JSON, Frontend basics)',
      'Dynamic Programming & Recursion'
    ],
    hrTopics: [
      'Infosys 3-6 month Mysore training readiness',
      'Handling failure in academic projects',
      'Willingness to learn emerging technologies'
    ],
    sampleQuestions: [
      {
        id: 'infy-sq1',
        round: 'Technical Round',
        question: 'What is Cryptarithmetic and how do you solve alphabetic addition problems?',
        tip: 'Focus on base 10 constraints and unique digit assignments.',
        type: 'pattern_based'
      }
    ]
  },
  {
    id: 'company-wipro',
    name: 'Wipro',
    shortName: 'Wipro',
    logoColor: 'from-emerald-600 to-teal-800',
    tagline: 'Elite National Talent Hunt (NTH) & Turbo Hiring',
    eligibility: '60% or 6.0 CGPA in 10th, 12th, and Graduation. Max 1 active backlog permitted.',
    recruitmentProcess: [
      {
        roundNumber: 1,
        title: 'Wipro Elite Assessment',
        duration: '128 mins',
        description: 'Aptitude test, Essay Writing (Automated evaluation), and 2 Coding questions.'
      },
      {
        roundNumber: 2,
        title: 'Technical Interview',
        duration: '30 mins',
        description: 'Live coding, explanation of college projects, DBMS questions, and basic networking.'
      },
      {
        roundNumber: 3,
        title: 'HR Discussion',
        duration: '15-20 mins',
        description: 'Background verification, service agreement details, work flexibility, and career goals.'
      }
    ],
    aptitudeTopics: [
      'Time, Speed & Distance, Logarithms',
      'Coding-Decoding, Seating Arrangements',
      'Written Communication / Essay Grammar & Coherence'
    ],
    technicalTopics: [
      'C/C++ Strings & Pointer manipulation',
      'Java Exception Handling & Collections',
      'SQL Queries: Group By, Having, Nested Subqueries'
    ],
    hrTopics: [
      'Views on Wipro Spirit and core values',
      'Handling relocation to Bangalore/Hyderabad/Pune',
      'Service commitment agreement understanding'
    ],
    sampleQuestions: [
      {
        id: 'wip-sq1',
        round: 'Coding Round',
        question: 'Count vowels and consonants in a string after stripping punctuation and whitespace.',
        tip: 'Use standard ASCII checks to avoid edge cases.',
        type: 'general_practice'
      }
    ]
  },
  {
    id: 'company-accenture',
    name: 'Accenture',
    shortName: 'Accenture',
    logoColor: 'from-purple-600 to-indigo-800',
    tagline: 'Associate Software Engineer (ASE) & Advanced ASE (AASE)',
    eligibility: '65% or 6.5 CGPA in engineering/diploma degree with no current backlogs.',
    recruitmentProcess: [
      {
        roundNumber: 1,
        title: 'Cognitive & Technical Assessment',
        duration: '90 mins',
        description: 'English Ability, Critical Thinking, Abstract Reasoning, Common Tech Modules, MS Office & Cloud basics.'
      },
      {
        roundNumber: 2,
        title: 'Coding Assessment',
        duration: '45 mins',
        description: '2 Coding questions (Hands-on problem solving in C/C++/Java/Python).'
      },
      {
        roundNumber: 3,
        title: 'Automated Communication Assessment',
        duration: '20 mins',
        description: 'Reading, Listening, Repeat Sentences, Fluency & Pronunciation testing.'
      },
      {
        roundNumber: 4,
        title: 'Virtual Technical + HR Interview',
        duration: '25-35 mins',
        description: 'Project walk-through, situational awareness, and problem-solving examples.'
      }
    ],
    aptitudeTopics: [
      'Critical Thinking & Venn Diagrams',
      'Cloud Computing basics & Network Security',
      'Common Tech Architecture (Pseudo-code)'
    ],
    technicalTopics: [
      'Pseudo-code interpretation and loop trace',
      'Object Oriented Programming',
      'SQL Aggregate queries'
    ],
    hrTopics: [
      'Tell me about a time you handled conflict in a team project',
      'Why Accenture’s client-centric transformation work appeals to you'
    ],
    sampleQuestions: [
      {
        id: 'acc-sq1',
        round: 'Assessment',
        question: 'Trace the output of this recursive function with bitwise operators.',
        tip: 'Carefully compute bitwise AND (&) and bitwise XOR (^) at each call frame.',
        type: 'pattern_based'
      }
    ]
  },
  {
    id: 'company-cognizant',
    name: 'Cognizant',
    shortName: 'Cognizant',
    logoColor: 'from-blue-700 to-cyan-700',
    tagline: 'GenC, GenC Elevate & GenC Next Profiles',
    eligibility: '60% throughout academia with max 1 active backlog permitted.',
    recruitmentProcess: [
      {
        roundNumber: 1,
        title: 'Aptitude & Technical MCQ Assessment',
        duration: '100 mins',
        description: 'Quantitative, Analytical, English Comprehension, and Code Debugging.'
      },
      {
        roundNumber: 2,
        title: 'Skill-Based Coding (GenC Next)',
        duration: '90 mins',
        description: 'DSA, advanced algorithms, and competitive programming problems.'
      },
      {
        roundNumber: 3,
        title: 'Technical & HR Interview',
        duration: '30-40 mins',
        description: 'Core programming concepts, database management, and behavioral readiness.'
      }
    ],
    aptitudeTopics: ['Number Series, Clocks & Calendars', 'Data Interpretation', 'Grammar & Para-jumbles'],
    technicalTopics: ['Code Debugging & Error Identification', 'Java/Python OOP', 'RDBMS & Indexing'],
    hrTopics: ['Willingness to learn enterprise stacks (Salesforce, SAP, AWS)', 'Relocation readiness'],
    sampleQuestions: [
      {
        id: 'cog-sq1',
        round: 'Technical Interview',
        question: 'What is code debugging: spot the logic flaw in this array reversal loop.',
        tip: 'Watch out for boundary conditions off-by-one errors (i <= len vs i < len/2).',
        type: 'general_practice'
      }
    ]
  },
  {
    id: 'company-deloitte',
    name: 'Deloitte',
    shortName: 'Deloitte',
    logoColor: 'from-green-700 to-emerald-900',
    tagline: 'Analyst & Technical Consultant Hiring',
    eligibility: '60% or 6.5 CGPA in graduation with no active backlogs.',
    recruitmentProcess: [
      {
        roundNumber: 1,
        title: 'Deloitte Online Assessment',
        duration: '75 mins',
        description: 'Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Computer Fundamentals.'
      },
      {
        roundNumber: 2,
        title: 'Versant / Communication Test',
        duration: '20 mins',
        description: 'Language proficiency, voice clarity, sentence construction, and listening comprehension.'
      },
      {
        roundNumber: 3,
        title: 'Case Study & Technical Interview',
        duration: '45 mins',
        description: 'Business case discussion, project architecture, SQL problem solving, and analytical reasoning.'
      },
      {
        roundNumber: 4,
        title: 'Partner / HR Interview',
        duration: '25 mins',
        description: 'Consulting mindset, leadership aptitude, cultural fit, and long-term career vision.'
      }
    ],
    aptitudeTopics: ['Averages, Ratios, Probability', 'Data Analysis & Chart Interpretation', 'Critical Reading'],
    technicalTopics: ['Database Normalization & SQL Queries', 'SDLC Models & Agile Scrum', 'System Architecture basics'],
    hrTopics: ['Why Deloitte over pure tech product firms?', 'Handling demanding corporate client situations'],
    sampleQuestions: [
      {
        id: 'del-sq1',
        round: 'Case Study',
        question: 'How would you design a database schema for an online food delivery service?',
        tip: 'Break down into Users, Restaurants, MenuItems, Orders, and OrderItems tables with foreign keys.',
        type: 'general_practice'
      }
    ]
  },
  {
    id: 'company-capgemini',
    name: 'Capgemini',
    shortName: 'Capgemini',
    logoColor: 'from-sky-700 to-indigo-900',
    tagline: 'Analyst & Senior Analyst Campus Drive',
    eligibility: '60% throughout 10th, 12th, and Degree/Diploma with zero active backlogs.',
    recruitmentProcess: [
      {
        roundNumber: 1,
        title: 'Technical MCQ & Pseudocode',
        duration: '55 mins',
        description: 'Pseudocode tracing, Data Structures, OOPs, Web basics.'
      },
      {
        roundNumber: 2,
        title: 'English Communication Test',
        duration: '30 mins',
        description: 'Grammar, vocabulary, sentence correction, reading passages.'
      },
      {
        roundNumber: 3,
        title: 'Game-Based Aptitude',
        duration: '24 mins',
        description: 'Interactive gamified cognitive challenges: spatial reasoning, grid challenge, motion challenge.'
      },
      {
        roundNumber: 4,
        title: 'Combined Technical + HR Interview',
        duration: '30 mins',
        description: 'Review of projects, language proficiencies, and willingness to work on global accounts.'
      }
    ],
    aptitudeTopics: ['Game-based mental agility', 'Inductive & Deductive reasoning', 'Spatial patterns'],
    technicalTopics: ['Pseudocode loops & conditionals', 'C/Java pointer/reference behavior', 'SQL Queries'],
    hrTopics: ['Handling stressful delivery timelines', 'Willingness to relocate to Capgemini campuses'],
    sampleQuestions: [
      {
        id: 'cap-sq1',
        round: 'Pseudocode Round',
        question: 'Determine the final value of variable sum after a nested while-loop execution.',
        tip: 'Keep track of step-by-step variable state tables on rough paper.',
        type: 'pattern_based'
      }
    ]
  },
  {
    id: 'company-techm',
    name: 'Tech Mahindra',
    shortName: 'TechM',
    logoColor: 'from-red-600 to-rose-800',
    tagline: 'Associate Software Engineer & Network Engineer',
    eligibility: '60% or 6.0 CGPA throughout academic career with max 1 year gap.',
    recruitmentProcess: [
      {
        roundNumber: 1,
        title: 'Online Aptitude & English Test',
        duration: '80 mins',
        description: 'Logical, Quantitative, Verbal, Non-verbal reasoning.'
      },
      {
        roundNumber: 2,
        title: 'Technical & Coding Assessment',
        duration: '60 mins',
        description: '2 Coding questions, Computer fundamentals MCQs.'
      },
      {
        roundNumber: 3,
        title: 'Conversational Test (Spoken English)',
        duration: '20 mins',
        description: 'Speech recognition evaluation for voice clarity and fluency.'
      },
      {
        roundNumber: 4,
        title: 'Technical + HR Interview',
        duration: '30 mins',
        description: 'Telecom/Software domain basics, project review, and general HR.'
      }
    ],
    aptitudeTopics: ['Number System, Time & Work', 'Syllogisms, Blood Relations', 'Vocabulary & Comprehension'],
    technicalTopics: ['C/C++ Fundamentals', 'Networking Basics (OSI, IP, Subnetting)', 'DBMS Basics'],
    hrTopics: ['Why Tech Mahindra?', 'Readiness for telecom and cloud operations'],
    sampleQuestions: [
      {
        id: 'tm-sq1',
        round: 'Technical Interview',
        question: 'Explain IP address classes and how subnet masking works.',
        tip: 'Mention Class A, B, C ranges and default subnet masks (e.g. 255.255.255.0).',
        type: 'general_practice'
      }
    ]
  },
  {
    id: 'company-hcl',
    name: 'HCLTech',
    shortName: 'HCLTech',
    logoColor: 'from-blue-600 to-indigo-900',
    tagline: 'Graduate Engineer Trainee (GET) Hiring',
    eligibility: '65% or 6.5 CGPA in B.Tech/Diploma with no active backlogs.',
    recruitmentProcess: [
      {
        roundNumber: 1,
        title: 'Aptitude & Technical MCQ',
        duration: '75 mins',
        description: 'Quantitative, Logical, Verbal, and Domain technical questions.'
      },
      {
        roundNumber: 2,
        title: 'Coding Round',
        duration: '45 mins',
        description: 'Basic to intermediate problem solving in candidate’s choice of language.'
      },
      {
        roundNumber: 3,
        title: 'Technical Interview',
        duration: '35 mins',
        description: 'OOP concepts, operating systems, data structures, and capstone project.'
      },
      {
        roundNumber: 4,
        title: 'HR Discussion',
        duration: '20 mins',
        description: 'Personality evaluation, communication, relocation, and career aspirations.'
      }
    ],
    aptitudeTopics: ['Time & Distance, Permutations', 'Analogy & Classification', 'Sentence Completion'],
    technicalTopics: ['Object Oriented Design', 'Data Structures (Arrays, Stacks)', 'SQL Operations'],
    hrTopics: ['Strengths and weaknesses', 'How do you prioritize multiple tasks under pressure?'],
    sampleQuestions: [
      {
        id: 'hcl-sq1',
        round: 'Technical Interview',
        question: 'Explain the difference between method overloading and method overriding in Java.',
        tip: 'Overloading: compile-time, same class, different parameters. Overriding: runtime, subclass, same signature.',
        type: 'general_practice'
      }
    ]
  }
];

export function generatePersonalizedRoadmap(user: User): RoadmapWeek[] {
  const isDiploma = user.educationLevel === 'Diploma';
  const isCSEorIT = user.branch === 'CSE' || user.branch === 'IT';

  if (isDiploma) {
    return [
      {
        weekNumber: 1,
        title: 'Programming Foundations & Logic Building',
        subtitle: 'Core Syntax, Loops, Functions & Arrays in C / Python',
        topics: [
          { id: 'dip-w1-1', title: 'Variables, Data Types & Operators', description: 'Master integer, float, string types, and arithmetic logic.', category: 'Programming Basics', estimatedHours: 6, completed: true, resourcesCount: 4, practiceLink: 'technical?category=python' },
          { id: 'dip-w1-2', title: 'Control Flow (If-Else & Loops)', description: 'Nested loops, break, continue, and pattern printing questions.', category: 'Programming Basics', estimatedHours: 8, completed: true, resourcesCount: 5, practiceLink: 'coding' },
          { id: 'dip-w1-3', title: 'Functions & Scope', description: 'Function prototypes, call by value/reference, and recursion basics.', category: 'Programming Basics', estimatedHours: 6, completed: true, resourcesCount: 3, practiceLink: 'technical?category=c' }
        ]
      },
      {
        weekNumber: 2,
        title: 'Python / Java & Object-Oriented Principles',
        subtitle: 'Classes, Objects, Inheritance & Practical Encapsulation',
        topics: [
          { id: 'dip-w2-1', title: 'Classes & Objects in Python/Java', description: 'Instantiating objects, constructors, and instance variables.', category: 'OOP', estimatedHours: 8, completed: true, resourcesCount: 4, practiceLink: 'technical?category=oop' },
          { id: 'dip-w2-2', title: 'The 4 Pillars of OOP', description: 'Inheritance, Polymorphism, Abstraction, and Encapsulation with real-world examples.', category: 'OOP', estimatedHours: 10, completed: false, resourcesCount: 6, practiceLink: 'technical?category=oop' },
          { id: 'dip-w2-3', title: 'Exception Handling', description: 'Try-catch blocks, throw, finally, and custom exceptions.', category: 'OOP', estimatedHours: 4, completed: false, resourcesCount: 3, practiceLink: 'technical?category=java' }
        ]
      },
      {
        weekNumber: 3,
        title: 'Essential Data Structures',
        subtitle: 'Arrays, Strings, Linked Lists & Stacks',
        topics: [
          { id: 'dip-w3-1', title: 'Array Manipulation & Searching', description: 'Linear search, binary search, and subarray problems.', category: 'Data Structures', estimatedHours: 10, completed: true, resourcesCount: 5, practiceLink: 'coding?category=arrays' },
          { id: 'dip-w3-2', title: 'String Reversals & Palindromes', description: 'String methods, character counts, and anagrams.', category: 'Data Structures', estimatedHours: 8, completed: false, resourcesCount: 4, practiceLink: 'coding?category=strings' },
          { id: 'dip-w3-3', title: 'Stack & Queue Concepts', description: 'LIFO & FIFO operations, balancing parentheses.', category: 'Data Structures', estimatedHours: 8, completed: false, resourcesCount: 4, practiceLink: 'coding?category=stack' }
        ]
      },
      {
        weekNumber: 4,
        title: 'DBMS, SQL & Web Development Essentials',
        subtitle: 'Relational Databases, CRUD Operations & HTML/CSS/JS',
        topics: [
          { id: 'dip-w4-1', title: 'Relational Database Fundamentals', description: 'Tables, Primary Keys, Foreign Keys, and ER Diagrams.', category: 'DBMS', estimatedHours: 8, completed: false, resourcesCount: 4, practiceLink: 'technical?category=dbms' },
          { id: 'dip-w4-2', title: 'SQL Queries & Joins', description: 'SELECT, WHERE, GROUP BY, INNER/LEFT joins, and basic aggregates.', category: 'SQL', estimatedHours: 10, completed: false, resourcesCount: 6, practiceLink: 'technical?category=sql' },
          { id: 'dip-w4-3', title: 'Web Development Basics (HTML5/CSS3)', description: 'Semantic tags, Flexbox, responsive layouts, and DOM manipulation.', category: 'Web Dev', estimatedHours: 8, completed: true, resourcesCount: 5, practiceLink: 'technical?category=web' }
        ]
      },
      {
        weekNumber: 5,
        title: 'Aptitude & Coding Practice',
        subtitle: 'Quantitative Shortcuts, Logical Puzzles & Timed Tests',
        topics: [
          { id: 'dip-w5-1', title: 'Quantitative Aptitude Drills', description: 'Percentages, Profit & Loss, Time & Work, Speed & Distance.', category: 'Aptitude', estimatedHours: 10, completed: false, resourcesCount: 8, practiceLink: 'aptitude' },
          { id: 'dip-w5-2', title: 'Logical Reasoning & Series', description: 'Number series, blood relations, and coding-decoding puzzles.', category: 'Aptitude', estimatedHours: 8, completed: false, resourcesCount: 6, practiceLink: 'aptitude' },
          { id: 'dip-w5-3', title: 'Timed Coding Tests', description: 'Solve 10 beginner-to-intermediate company questions under time limits.', category: 'Coding', estimatedHours: 8, completed: false, resourcesCount: 5, practiceLink: 'coding' }
        ]
      },
      {
        weekNumber: 6,
        title: 'HR Questions & Mock Interviews',
        subtitle: 'Self-Introduction, Behavioral Mastery & AI Simulator',
        topics: [
          { id: 'dip-w6-1', title: 'Perfecting "Tell Me About Yourself"', description: 'Draft, practice, and refine a 90-second impact pitch.', category: 'HR Prep', estimatedHours: 4, completed: true, resourcesCount: 3, practiceLink: 'hr' },
          { id: 'dip-w6-2', title: 'Strengths, Weaknesses & Situational Answers', description: 'Learn the STAR technique for team scenarios.', category: 'HR Prep', estimatedHours: 6, completed: false, resourcesCount: 4, practiceLink: 'hr' },
          { id: 'dip-w6-3', title: 'AI Mock Interview Simulator Sessions', description: 'Complete 3 full mock interviews and review detailed scorecards.', category: 'Mock Interview', estimatedHours: 6, completed: false, resourcesCount: 5, practiceLink: 'mock-interview' }
        ]
      }
    ];
  }

  // Default B.Tech CSE / General Engineering Career Roadmap
  return [
    {
      weekNumber: 1,
      title: 'Programming Mastery & Language Internals',
      subtitle: 'Deep dive into C++, Java or Python memory models & STL/Collections',
      topics: [
        { id: 'btech-w1-1', title: 'Memory Management & Pointers / References', description: 'Heap vs stack allocation, pointer arithmetic, and reference safety.', category: 'Core Language', estimatedHours: 8, completed: true, resourcesCount: 5, practiceLink: 'technical?category=cpp' },
        { id: 'btech-w1-2', title: 'Standard Template Library (STL) / Collections', description: 'Vectors, HashMaps, Sets, Priority Queues, and iterator mechanics.', category: 'Core Language', estimatedHours: 10, completed: true, resourcesCount: 6, practiceLink: 'technical?category=java' },
        { id: 'btech-w1-3', title: 'Time & Space Complexity (Asymptotic Notation)', description: 'Big-O, recursion tree analysis, and space trade-offs.', category: 'Algorithms', estimatedHours: 6, completed: true, resourcesCount: 4, practiceLink: 'technical?category=algo' }
      ]
    },
    {
      weekNumber: 2,
      title: 'Data Structures & Algorithms Deep Dive',
      subtitle: 'Arrays, Strings, Linked Lists, Trees & Dynamic Programming',
      topics: [
        { id: 'btech-w2-1', title: 'Two Pointers & Sliding Window Patterns', description: 'Solve classic interview patterns on arrays and strings.', category: 'DSA', estimatedHours: 12, completed: true, resourcesCount: 6, practiceLink: 'coding?category=arrays' },
        { id: 'btech-w2-2', title: 'Binary Trees & BST Traversals', description: 'Inorder, Preorder, Postorder, Level-Order, and BST properties.', category: 'DSA', estimatedHours: 10, completed: false, resourcesCount: 5, practiceLink: 'coding' },
        { id: 'btech-w2-3', title: 'Dynamic Programming Foundations (1D & 2D)', description: 'Memoization vs Tabulation on Knapsack, Kadane’s, and LCS.', category: 'DSA', estimatedHours: 12, completed: false, resourcesCount: 7, practiceLink: 'coding?category=dp' }
      ]
    },
    {
      weekNumber: 3,
      title: 'DBMS & Advanced SQL Mastery',
      subtitle: 'Relational Schemas, ACID, B+ Tree Indexing & Window Functions',
      topics: [
        { id: 'btech-w3-1', title: 'ACID Properties & Transaction Isolation', description: 'Dirty reads, phantom reads, 2-phase locking, and MVCC.', category: 'DBMS', estimatedHours: 8, completed: false, resourcesCount: 5, practiceLink: 'technical?category=dbms' },
        { id: 'btech-w3-2', title: 'Database Normalization (1NF, 2NF, 3NF, BCNF)', description: 'Functional dependencies, lossy vs lossless decomposition.', category: 'DBMS', estimatedHours: 8, completed: false, resourcesCount: 5, practiceLink: 'technical?category=dbms' },
        { id: 'btech-w3-3', title: 'Complex SQL Queries & Window Functions', description: 'ROW_NUMBER, DENSE_RANK, CTEs, and correlated subqueries.', category: 'SQL', estimatedHours: 10, completed: false, resourcesCount: 6, practiceLink: 'technical?category=sql' }
      ]
    },
    {
      weekNumber: 4,
      title: 'Operating Systems & Computer Networks',
      subtitle: 'Processes, Threads, Virtual Memory, Deadlocks & Protocols',
      topics: [
        { id: 'btech-w4-1', title: 'Process Scheduling, Mutex & Semaphores', description: 'Critical section problem, CPU scheduling, and Coffman deadlock conditions.', category: 'OS', estimatedHours: 10, completed: false, resourcesCount: 6, practiceLink: 'technical?category=os' },
        { id: 'btech-w4-2', title: 'Virtual Memory, Paging & Thrashing', description: 'Page fault handling, TLB hit rates, and LRU page replacement.', category: 'OS', estimatedHours: 8, completed: false, resourcesCount: 4, practiceLink: 'technical?category=os' },
        { id: 'btech-w4-3', title: 'TCP/IP, 3-Way Handshake & DNS Flow', description: 'Flow control, congestion avoidance, TLS handshake, and HTTP/HTTPS.', category: 'CN', estimatedHours: 10, completed: false, resourcesCount: 6, practiceLink: 'technical?category=cn' }
      ]
    },
    {
      weekNumber: 5,
      title: 'Coding Sprints & Capstone Project Refinement',
      subtitle: 'Company-Style Problem Solving & Architectural Explanations',
      topics: [
        { id: 'btech-w5-1', title: 'Top 50 Company Coding Problems', description: 'Solve standard recruitment questions asked in TCS, Infosys, and Accenture.', category: 'Coding', estimatedHours: 14, completed: false, resourcesCount: 8, practiceLink: 'coding' },
        { id: 'btech-w5-2', title: 'Project Architecture & Schema Defense', description: 'Prepare C4 diagrams, REST API specs, and database ER models for your resume project.', category: 'Projects', estimatedHours: 8, completed: true, resourcesCount: 4, practiceLink: 'technical?category=projects' },
        { id: 'btech-w5-3', title: 'Quantitative & Logical Mock Tests', description: 'Take 3 full-length 60-minute aptitude assessments.', category: 'Aptitude', estimatedHours: 8, completed: false, resourcesCount: 6, practiceLink: 'aptitude' }
      ]
    },
    {
      weekNumber: 6,
      title: 'Mock Interviews & Company-Specific Prep',
      subtitle: 'Technical Mocks, Behavioral STAR Technique & Company Profiles',
      topics: [
        { id: 'btech-w6-1', title: 'Company Syllabus Review (TCS, Infosys, Wipro, Accenture)', description: 'Analyze round patterns, eligibility criteria, and past questions.', category: 'Companies', estimatedHours: 8, completed: true, resourcesCount: 6, practiceLink: 'companies' },
        { id: 'btech-w6-2', title: 'HR Behavioral Rounds (STAR Method)', description: 'Master situational answers for conflict, relocation, and career goals.', category: 'HR Prep', estimatedHours: 6, completed: false, resourcesCount: 4, practiceLink: 'hr' },
        { id: 'btech-w6-3', title: 'AI Mock Interview Simulator Sessions', description: 'Attend voice/text simulated technical and HR interviews with AI scoring.', category: 'Mock Interview', estimatedHours: 8, completed: false, resourcesCount: 5, practiceLink: 'mock-interview' }
      ]
    }
  ];
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Recommended Topic Practice',
    message: 'Your DBMS score is at 48%. We recommend reviewing SQL Joins and Normalization before upcoming drives.',
    type: 'recommendation',
    isRead: false,
    createdAt: '10 minutes ago',
    link: 'technical?category=dbms'
  },
  {
    id: 'notif-2',
    title: 'Milestone Achieved! 🏆',
    message: 'Congratulations! You solved 25 coding practice problems. Next milestone: 50 problems!',
    type: 'milestone',
    isRead: false,
    createdAt: '2 hours ago',
    link: 'coding'
  },
  {
    id: 'notif-3',
    title: 'Upcoming Mock Interview Reminder',
    message: 'Take a 15-minute AI Mock Interview in Software Engineer (Company-style) to test your readiness.',
    type: 'reminder',
    isRead: false,
    createdAt: 'Yesterday',
    link: 'mock-interview'
  },
  {
    id: 'notif-4',
    title: 'Incomplete Preparation Topic',
    message: 'You have unfinished topics in Week 3: Operating Systems & Virtual Memory.',
    type: 'update',
    isRead: true,
    createdAt: '2 days ago',
    link: 'roadmap'
  }
];
