
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
        justify-content: center;
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
        color: #333 !important;
      }
      .rdp-day_today {
        background-color: var(--rezilia-green) !important;
        color: white !important;
      }
      .rdp-day_selected {
        background-color: var(--rezilia-purple) !important;
        color: white !important;
      }
      `}
    </style>
  );
};

export default CalendarStyles;
