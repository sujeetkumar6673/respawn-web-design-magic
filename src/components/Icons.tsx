
import React from 'react';
import { Leaf } from 'lucide-react';

export const ReziliaLogo: React.FC = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#62E884" />
        <stop offset="100%" stopColor="#67d6ff" />
      </linearGradient>
    </defs>
    <path d="M70,20 C85,30 85,70 70,80 L30,80 C15,70 15,30 30,20 L70,20 Z" fill="#62E884" />
    <path d="M65,30 C75,40 75,60 65,70 L35,70 C25,60 25,40 35,30 L65,30 Z" fill="#67d6ff" />
    <circle cx="50" cy="50" r="15" fill="#3a1a9e" />
  </svg>
);

export const HomeIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10.182V22h18V10.182L12 2z" fillOpacity="0.85" />
        <rect x="9" y="14" width="6" height="8" fillOpacity="0.95" />
      </svg>
    </div>
  </div>
);

export const SimpliciaBadge: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-3 h-6 bg-gradient-to-b from-simplicia-green-1 via-simplicia-green-2 to-simplicia-green-3 rounded-md shadow-simplicia"></div>
        <div className="absolute -right-1 -top-1 w-2 h-2 bg-simplicia-green-1 rounded-full shadow-simplicia"></div>
        <div className="absolute -left-1 bottom-1 w-2 h-2 bg-simplicia-green-3 rounded-full shadow-simplicia"></div>
      </div>
    </div>
  </div>
);

export const ReziliaAIIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner">
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="headGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#62E884" />
            <stop offset="100%" stopColor="#67d6ff" />
          </linearGradient>
        </defs>
        <path d="M12 2L2 7v10l10 5 10-5V7z" fill="url(#headGradient2)" />
        <circle cx="12" cy="12" r="4" fill="white" />
      </svg>
    </div>
  </div>
);

export const AdmiliaIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner admilia-icon">
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#d1d8ff" />
        <path d="M7 5h10v2H7z" fill="#8c9eff" />
        <path d="M7 9h10v8H7z" fill="#b6c3ff" />
      </svg>
    </div>
  </div>
);

export const CalendarIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner calendar-icon">
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#ff94a4" />
        <path d="M5 9h14v11H5z" fill="#ffb3c0" />
      </svg>
    </div>
  </div>
);

export const DocumentIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner document-icon">
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" fill="#82b1ff" />
        <path d="M13 9h5.5L13 3.5V9z" fill="#448aff" />
        <path d="M8 12h8v2H8zm0 4h8v2H8z" fill="#2979ff" />
      </svg>
    </div>
  </div>
);

export const HeartIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner heart-icon">
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ff6b81" />
      </svg>
    </div>
  </div>
);

export const ForumIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner forum-icon">
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z" fill="#b388ff" />
        <path d="M17 12V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" fill="#d1c4e9" />
      </svg>
    </div>
  </div>
);

export const DirectoryIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner directory-icon">
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#80deea" />
      </svg>
    </div>
  </div>
);

export const ProfileIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner profile-icon">
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#b3e5fc" />
        <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#81d4fa" />
      </svg>
    </div>
  </div>
);

export const SettingIcon: React.FC = () => (
  <div className="icon-3d-wrapper">
    <div className="icon-3d-inner setting-icon">
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z" fill="#ffd54f" />
        <circle cx="12" cy="12" r="3" fill="#ffecb3" />
      </svg>
    </div>
  </div>
);

export const ChevronRightIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
  </svg>
);

export const ChevronLeftIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
  </svg>
);
