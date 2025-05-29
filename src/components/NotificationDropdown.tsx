
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Bell, Pill, Calendar, CheckSquare, Clock } from 'lucide-react';
import { notificationService, Notification } from '@/services/notificationService';
import { cn } from '@/lib/utils';

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const [notifs, count] = await Promise.all([
        notificationService.getNotifications(),
        notificationService.getUnreadCount()
      ]);
      setNotifications(notifs);
      setUnreadCount(count);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'medicine':
        return <Pill className="w-4 h-4 text-purple-500" />;
      case 'appointment':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'task':
        return <CheckSquare className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-yellow-400">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rezilia-orange text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 bg-white shadow-lg border z-50" 
        align="end" 
        sideOffset={5}
      >
        <div className="flex items-center justify-between p-3 border-b">
          <DropdownMenuLabel className="text-sm font-semibold">
            Notifications ({unreadCount} unread)
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-blue-600 hover:text-blue-800"
              onClick={handleMarkAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="max-h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No notifications
            </div>
          ) : (
            <div className="p-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-3 border-l-4 rounded-r-md mb-2 cursor-pointer transition-colors hover:bg-gray-50",
                    getPriorityColor(notification.priority),
                    !notification.isRead && "bg-opacity-100",
                    notification.isRead && "bg-opacity-50"
                  )}
                  onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={cn(
                        "text-sm font-medium truncate",
                        !notification.isRead && "text-gray-900",
                        notification.isRead && "text-gray-600"
                      )}>
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                      )}
                    </div>
                    
                    <p className={cn(
                      "text-xs mb-2",
                      !notification.isRead && "text-gray-700",
                      notification.isRead && "text-gray-500"
                    )}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          notification.priority === 'high' && "border-red-200 text-red-700",
                          notification.priority === 'medium' && "border-yellow-200 text-yellow-700",
                          notification.priority === 'low' && "border-green-200 text-green-700"
                        )}
                      >
                        {notification.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button 
                variant="ghost" 
                className="w-full text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setIsOpen(false)}
              >
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
