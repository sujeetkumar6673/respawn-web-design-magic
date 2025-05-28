
// Mock data for various services
export const mockUsers = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'john@example.com',
    name: 'John Doe',
    phone: '(555) 123-4567',
    city: 'New York',
    role: 'patient',
    isAuthenticated: false,
    contacts: [
      {
        id: '00000000-0000-0000-0000-000000000002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '(555) 987-6543',
        city: 'Los Angeles',
        role: 'FamilyMember',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        lastMessage: "How is everything going today?",
        timestamp: new Date(Date.now() - 3600000 * 2),
        unreadCount: 0,
        status: 'online' as const
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        name: 'Demo Singh',
        email: 'demo@example.com',
        phone: '997845690',
        city: 'Mumbai',
        role: 'FamilyCareGiver',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        lastMessage: "I'll check on the medication schedule",
        timestamp: new Date(Date.now() - 86400000),
        unreadCount: 1,
        status: 'away' as const
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'jane@example.com',
    name: 'Jane Smith',
    phone: '(555) 987-6543',
    city: 'Los Angeles',
    role: 'FamilyMember',
    isAuthenticated: false,
    contacts: [
      {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        city: 'New York',
        role: 'patient',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
        lastMessage: "Thanks for checking in",
        timestamp: new Date(Date.now() - 3600000),
        unreadCount: 0,
        status: 'online' as const
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        name: 'Demo Singh',
        email: 'demo@example.com',
        phone: '997845690',
        city: 'Mumbai',
        role: 'FamilyCareGiver',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        lastMessage: "Let's coordinate care schedule",
        timestamp: new Date(Date.now() - 86400000 * 2),
        unreadCount: 2,
        status: 'offline' as const
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    email: 'demo@example.com',
    name: 'Demo Singh',
    phone: '997845690',
    city: 'Mumbai',
    role: 'FamilyCareGiver',
    isAuthenticated: false,
    contacts: [
      {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        city: 'New York',
        role: 'patient',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
        lastMessage: "Feeling much better today",
        timestamp: new Date(Date.now() - 3600000 * 4),
        unreadCount: 0,
        status: 'online' as const
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '(555) 987-6543',
        city: 'Los Angeles',
        role: 'FamilyMember',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        lastMessage: "Family meeting this weekend?",
        timestamp: new Date(Date.now() - 86400000),
        unreadCount: 1,
        status: 'away' as const
      }
    ]
  }
];

export const mockCalendarEvents = [
  {
    id: '1',
    title: 'Doctor Appointment',
    date: '2024-01-15',
    time: '10:00 AM',
    type: 'medical'
  },
  {
    id: '2',
    title: 'Yoga Session',
    date: '2024-01-16',
    time: '6:00 PM',
    type: 'wellness'
  },
  {
    id: '3',
    title: 'Health Check-up',
    date: '2024-01-18',
    time: '2:00 PM',
    type: 'medical'
  }
];

// Enhanced calendar events for the calendar context
export const mockCalendarEventsDetailed = [
  // Today's events
  {
    id: '1',
    title: 'Doctor Appointment',
    date: new Date(),
    time: '10:00',
    description: 'Annual check-up',
    color: '#2717A5'
  },
  {
    id: '2',
    title: 'Lunch with Family',
    date: new Date(),
    time: '13:00',
    description: 'At favorite restaurant',
    color: '#FF9F46'
  },
  {
    id: '3',
    title: 'Medication Reminder',
    date: new Date(),
    time: '09:00',
    description: 'Take morning pills',
    color: '#FF719A'
  },
  {
    id: '4',
    title: 'Physical Therapy',
    date: new Date(),
    time: '15:30',
    description: 'With Dr. Johnson',
    color: '#62E884'
  },
  {
    id: '5',
    title: 'Evening Walk',
    date: new Date(),
    time: '18:00',
    description: 'Around the park',
    color: '#67d6ff'
  }
];

export const mockHealthData = {
  vitals: {
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 98.6,
    weight: 150
  },
  activities: [
    {
      id: '1',
      type: 'walking',
      duration: 30,
      calories: 150,
      date: '2024-01-15'
    },
    {
      id: '2',
      type: 'running',
      duration: 45,
      calories: 400,
      date: '2024-01-14'
    }
  ]
};

export const mockChatMessages = [
  {
    id: '1',
    sender: 'AI Assistant',
    message: 'Hello! How can I help you with your health today?',
    timestamp: '2024-01-15T10:00:00Z',
    isUser: false
  },
  {
    id: '2',
    sender: 'User',
    message: 'I have been feeling tired lately.',
    timestamp: '2024-01-15T10:01:00Z',
    isUser: true
  }
];

// Mock chat contacts data - enhanced with additional properties for chat UI
export const mockChatContacts = {
  '00000000-0000-0000-0000-000000000001': [
    {
      id: '00000000-0000-0000-0000-000000000002',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      lastMessage: "How is everything going today?",
      timestamp: new Date(Date.now() - 3600000 * 2),
      unreadCount: 0,
      status: 'online' as const
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      name: 'Demo Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      lastMessage: "I'll check on the medication schedule",
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 1,
      status: 'away' as const
    }
  ],
  '00000000-0000-0000-0000-000000000002': [
    {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
      lastMessage: "Thanks for checking in",
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 0,
      status: 'online' as const
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      name: 'Demo Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      lastMessage: "Let's coordinate care schedule",
      timestamp: new Date(Date.now() - 86400000 * 2),
      unreadCount: 2,
      status: 'offline' as const
    }
  ],
  '00000000-0000-0000-0000-000000000003': [
    {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
      lastMessage: "Feeling much better today",
      timestamp: new Date(Date.now() - 3600000 * 4),
      unreadCount: 0,
      status: 'online' as const
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      lastMessage: "Family meeting this weekend?",
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 1,
      status: 'away' as const
    }
  ]
};

// Mock current users data
export const mockCurrentUsers = {
  '00000000-0000-0000-0000-000000000001': {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop'
  },
  '00000000-0000-0000-0000-000000000002': {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  '00000000-0000-0000-0000-000000000003': {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Demo Singh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
};
