
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingChatButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleChatClick = () => {
    if (location.pathname === '/chat') {
      // If we're on chat page, go back to dashboard
      navigate('/dashboard');
    } else {
      // If we're not on chat page, go to chat
      navigate('/chat');
    }
  };

  return (
    <Button
      onClick={handleChatClick}
      className={`fixed ${isMobile ? 'bottom-20 right-4' : 'bottom-6 right-6'} bg-rezilia-purple hover:bg-rezilia-purple/90 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 hover:scale-105`}
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default FloatingChatButton;
