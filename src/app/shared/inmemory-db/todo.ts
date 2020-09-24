export class Todo {
  static todoList = [
    {
      id: 1,
      title: "Fix Responsiveness 💻",
      note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      important: true,
      starred: true,
      done: false,
      trashed: false,
      completed: false,
      selected: false,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),

      tag: [1, 2]
    },
    {
      id: 2,
      title: "Code Reffactoring",
      note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      important: false,
      starred: false,
      done: true,
      trashed: false,
      completed: true,
      selected: false,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),

      tag: [2]
    },
    {
      id: 3,
      title: "Resolving data issues",
      note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      important: false,
      starred: false,
      done: true,
      trashed: false,
      completed: false,
      selected: false,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),

      tag: [1]
    },
    {
      id: 4,
      title: "On boarding process",
      note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      important: false,
      starred: false,
      done: false,
      trashed: false,
      completed: true,
      selected: false,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),

      tag: [1, 2, 3]
    }
  ];
  completed: any;
}

// ============================================
export class TodoTag {
  static tag = [
    {
      id: 1,
      name: "Frontend"
    },
    {
      id: 2,
      name: "Backend"
    },
    {
      id: 3,
      name: "API"
    },
    {
      id: 4,
      name: "Issue"
    },
    {
      id: 5,
      name: "Mobile"
    }
  ];
}
