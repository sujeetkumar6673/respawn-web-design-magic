
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
