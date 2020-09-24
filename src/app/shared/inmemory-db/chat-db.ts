export class ChatDB {
  public static user = [
    {
      id: "7863a6802ez0e277a0f98534",
      name: "John Doe",
      avatar: "assets/images/face-1.jpg",
      status: "online",
      chatInfo: [
        {
          chatId: "89564a680b3249760ea21fe77",
          contactId: "323sa680b3249760ea21rt47",
          contactName: "Dino Donel",
          unread: 4,
          message: "You did great with the last presentation, looking forward to working with you on the next project.",
          lastChatTime: "2017-06-12T02:10:18.931Z"
        },
        {
          chatId: "3289564a680b2134760ea21fe7753",
          contactId: "14663a3406eb47ffa63d4fec9429cb71",
          contactName: "Tim French",
          unread: 0,
          message: "You did great with the last presentation, looking forward to working with you on the next project.",
          lastChatTime: "2019-03-10T02:10:18.931Z"
        }
      ]
    }
  ];
  public static contacts = [
    {
      id: "323sa680b3249760ea21rt47",
      name: "Dino Donel",
      avatar: "assets/images/faces/13.jpg",
      status: "online",
      message: "You did great with the last presentation, looking forward to working with you on the next project.",
      time: "11min ago",
      mood: ""
    },
    {
      id: "14663a3406eb47ffa63d4fec9429cb71",
      name: "Tim French",
      avatar: "assets/images/faces/12.jpg",
      status: "online",
      message: "Yeah...the party was awesome.",
      time: "33 min ago",
      mood: ""
    },
    {
      id: "43bd9bc59d164b5aea498e3ae1c24c3c",
      name: "Pero Trokadero",
      avatar: "assets/images/faces/3.jpg",
      status: "online",
      message: "Call me latter whenever you find time to talk",
      time: "54min ago",
      mood: ""
    },
    {
      id: "3fc8e01f3ce649d1caf884fbf4f698e4",
      name: "Jasmin Sugare",
      avatar: "assets/images/faces/16.jpg",
      status: "offline",
      message: "It was a trap, we don't beleve that",
      time: "2 hours ago",
      mood: ""
    },
    {
      id: "e929b1d790ab49968ed8e34648553df4",
      name: "Elena Ravnjanski",
      avatar: "assets/images/faces/10.jpg",
      status: "online",
      message: "Looking forward to seeing you, We will have wanderful time together",
      time: "3 hours ago",
      mood: ""
    },
    {
      id: "d6caf04bba614632b5fecf91aebf4564",
      name: "Marko Apostolski",
      avatar: "assets/images/faces/9.jpg",
      status: "offline",
      message: "Marko is an awesome guy, he is really polite",
      time: "2 days ago",
      mood: ""
    },
    {
      id: "be0fb188c8e242f097fafa24632107e4",
      name: "Laze Apostolski",
      avatar: "assets/images/faces/5.jpg",
      status: "offline",
      message: "What are your plans for tomorrow night? How about to go on a drink?",
      time: "2 days ago",
      mood: ""
    },
    {
      id: "dea902191b964a68ba5f2d93cff37e13",
      name: "Eva Apostolska",
      avatar: "assets/images/faces/15.jpg",
      status: "online",
      message: "Trust me, she is wanderfull girl and very abicious",
      time: "1 week ago",
      mood: ""
    },
    {
      id: "0bf58f5ccc4543a9f8747350b7bda3c7",
      name: "Sofija Apostolska",
      avatar: "assets/images/faces/4.jpg",
      status: "offline",
      message: "Call me tomorrow, I will find some time for you.",
      time: "1 week ago",
      mood: ""
    },
    {
      id: "c5d7498bbcb84d81fc72168871ac6a6e",
      name: "Tope Marketing",
      avatar: "assets/images/faces/2.jpg",
      status: "offline",
      message: "You did great with the last presentation, looking forward to working with you on the next project.",
      time: "2 months ago",
      mood: ""
    }
  ];
  public static chatCollection = [
    {
      id: "89564a680b3249760ea21fe77",
      chats: [
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "Have you ever been in some new style course school?",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "What could happen if you attend on some new course",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "Yes",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "Yeah...It happens to all of us",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "Have you ever been in some new style course school?",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "What could happen if you attend on some new course",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "Yes",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "Yeah...It happens to all of us",
          time: "2020-02-10T10:23:12.291Z"
        }
      ]
    },
    {
      id: "3289564a680b2134760ea21fe7753",
      chats: [
        {
          contactId: "14663a3406eb47ffa63d4fec9429cb71",
          text: "Have you ever been in some new style course school?",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "What could happen if you attend on some new course",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "14663a3406eb47ffa63d4fec9429cb71",
          text: "Yes",
          time: "2020-02-10T10:23:12.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "Yeah...It happens to all of us",
          time: "2020-02-10T10:23:12.291Z"
        }
      ]
    }
  ];
}
