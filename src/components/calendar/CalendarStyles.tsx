
import React from 'react';

const CalendarStyles: React.FC = () => {
  return (
    <style>
      {`
      .rdp {
        --rdp-accent-color: var(--rezilia-purple);
        margin: 0;
      }
      .rdp-months {
        justify-content: center;
      }
      .rdp-caption {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        text-align: center;
      }
      .rdp-cell {
        opacity: 1 !important;
      }
      .rdp-button {
        opacity: 1 !important;
        font-size: 16px !important;
      }
      .rdp-day:not(.rdp-day_outside) {
        font-weight: normal !important;
        color: #fff !important;
      }
      .rdp-day_today {
        background-color: var(--rezilia-green) !important;
        color: white !important;
      }
      .rdp-day_selected {
        background-color: #fff !important;
        color: #333 !important;
        border-radius: 0 !important;
        border: 2px solid #fff !important;
      }
      .rdp-head_cell {
        color: rgba(255, 255, 255, 0.8) !important;
        font-weight: 500 !important;
      }
      .rdp-weeknumber {
        color: #fff !important;
      }
      
      /* Mobile styles similar to the image */
      @media (max-width: 768px) {
        .mobile-calendar {
          background: transparent !important;
          color: white !important;
          border: none !important;
          box-shadow: none !important;
          padding-bottom: 0 !important;
        }
        .mobile-calendar .rdp-months {
          background: transparent !important;
        }
        .mobile-calendar .rdp-caption {
          color: white !important;
          font-size: 18px !important;
          font-weight: bold !important;
          justify-content: space-between !important;
          padding: 8px 0 !important;
        }
        .mobile-calendar .rdp-head_cell {
          color: rgba(255, 255, 255, 0.8) !important;
          font-size: 14px !important;
        }
        .mobile-calendar .rdp-tbody {
          background: transparent !important;
        }
        .mobile-calendar .rdp-button {
          color: white !important;
        }
        .mobile-calendar .rdp-day_today {
          background: #fff !important;
          color: #333 !important;
          font-weight: bold !important;
        }
        .mobile-calendar .rdp-day_selected {
          background: #fff !important;
          color: #333 !important;
          font-weight: bold !important;
        }
        
        /* Event list styles similar to image */
        .event-list-mobile {
          margin-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 1rem;
        }
        .event-item-mobile {
          background: rgba(0, 0, 0, 0.2);
          border-left: 4px solid #51cbff;
          border-radius: 8px;
          padding: 10px 15px;
          margin-bottom: 10px;
          color: white;
        }
        .event-time-mobile {
          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }
        .event-title-mobile {
          font-size: 15px;
          color: #fff;
          margin-top: 4px;
        }
      }
      `}
    </style>
  );
};

export default CalendarStyles;
