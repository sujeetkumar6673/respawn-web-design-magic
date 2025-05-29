
export interface Notification {
  id: string;
  type: 'medicine' | 'appointment' | 'task';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

// Generate mock notifications
const generateMockNotifications = (): Notification[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return [
    {
      id: '1',
      type: 'medicine',
      title: 'Medicine Reminder',
      message: 'Time to take Aspirin - 1 tablet',
      time: '2 hours ago',
      isRead: false,
      priority: 'high',
      dueDate: new Date(today.getTime() + 2 * 60 * 60 * 1000) // 2 hours from now
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Doctor Appointment',
      message: 'Appointment with Dr. Smith tomorrow at 2:00 PM',
      time: '1 hour ago',
      isRead: false,
      priority: 'medium',
      dueDate: new Date(today.getTime() + 24 * 60 * 60 * 1000) // tomorrow
    },
    {
      id: '3',
      type: 'task',
      title: 'Task Due',
      message: 'Physical therapy exercises are due today',
      time: '30 minutes ago',
      isRead: false,
      priority: 'medium',
      dueDate: today
    },
    {
      id: '4',
      type: 'medicine',
      title: 'Medicine Reminder',
      message: 'Time to take Vitamins - 2 tablets',
      time: '3 hours ago',
      isRead: true,
      priority: 'low',
      dueDate: new Date(today.getTime() + 8 * 60 * 60 * 1000) // 8 hours from now
    },
    {
      id: '5',
      type: 'appointment',
      title: 'Lab Results',
      message: 'Blood test results are ready for pickup',
      time: '1 day ago',
      isRead: true,
      priority: 'low',
      dueDate: new Date(today.getTime() - 24 * 60 * 60 * 1000) // yesterday
    }
  ];
};

export const notificationService = {
  // Get all notifications
  async getNotifications(): Promise<Notification[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return generateMockNotifications();
  },

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Marking notification as read:', notificationId);
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Marking all notifications as read');
  },

  // Get unread count
  async getUnreadCount(): Promise<number> {
    const notifications = await this.getNotifications();
    return notifications.filter(n => !n.isRead).length;
  }
};
