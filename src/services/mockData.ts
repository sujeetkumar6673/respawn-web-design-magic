
// Mock data for various services
export const mockUsers = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    phone: '(555) 123-4567',
    city: 'New York',
    isAuthenticated: false
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    phone: '(555) 987-6543',
    city: 'Los Angeles',
    isAuthenticated: false
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

// Mock chat contacts data
export const mockChatContacts = {
  'current-user': [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      lastMessage: "She's doing well! We just finished her therapy session.",
      timestamp: new Date(Date.now() - 3600000 * 2),
      unreadCount: 0,
      status: 'online' as const
    },
    {
      id: '2',
      name: 'Mark Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      lastMessage: "I'll send the medication schedule tonight",
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 2,
      status: 'away' as const
    },
    {
      id: '3',
      name: 'Dr. Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
      lastMessage: "Let's discuss the treatment plan next week",
      timestamp: new Date(Date.now() - 86400000 * 2),
      unreadCount: 0,
      status: 'offline' as const
    },
    {
      id: '4',
      name: 'Family Group',
      avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=200&auto=format&fit=crop',
      lastMessage: 'Thanks for the update everyone!',
      timestamp: new Date(Date.now() - 86400000 * 3),
      unreadCount: 0,
      status: 'online' as const
    }
  ],
  'user-1': [
    {
      id: '5',
      name: 'Nina',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop',
      lastMessage: "How is everything going?",
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 1,
      status: 'online' as const
    },
    {
      id: '6',
      name: 'Care Team',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop',
      lastMessage: "Weekly check-in scheduled",
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 0,
      status: 'online' as const
    }
  ]
};

// Mock current users data
export const mockCurrentUsers = {
  'current-user': {
    id: 'current-user',
    name: 'Nina',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop'
  },
  'user-1': {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
};
