
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
      
      /* Custom calendar styling */
      .calendar-grid {
        display: grid;
        gap: 1px;
        background-color: #f0f0f0;
        border: 1px solid #f0f0f0;
        border-radius: 8px;
        overflow: hidden;
      }
      
      .calendar-day {
        aspect-ratio: 1;
        display: flex;
        flex-direction: column;
        padding: 8px;
        background-color: white;
        cursor: pointer;
        min-height: 80px;
      }
      
      .calendar-day:hover {
        background-color: #f9f9f9;
      }
      
      .calendar-day.selected {
        background-color: rgba(39, 23, 165, 0.05);
      }
      
      .calendar-day.other-month {
        color: #ccc;
        background-color: #fafafa;
      }
      
      .day-number {
        font-weight: 500;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 4px;
      }
      
      .day-number.today {
        background-color: var(--rezilia-green);
        color: white;
        border-radius: 50%;
      }
      
      .event-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--rezilia-purple);
        display: inline-block;
        margin-right: 4px;
      }
      
      .event-indicator {
        font-size: 10px;
        padding: 2px 4px;
        background-color: rgba(39, 23, 165, 0.1);
        color: var(--rezilia-purple);
        border-radius: 4px;
        margin-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      /* Toggle Group Styling */
      .calendar-view-toggle [data-state="on"] {
        background-color: var(--rezilia-purple);
        color: white;
      }
      
      .calendar-view-toggle {
        border-color: var(--rezilia-purple);
      }
      
      .calendar-view-toggle [role="tab"] {
        transition: all 0.2s ease;
      }
      
      .calendar-view-toggle [role="tab"]:hover:not([data-state="on"]) {
        background-color: rgba(39, 23, 165, 0.05);
      }
      
      /* Daily view styling */
      .daily-view-container {
        min-height: 400px;
        border-radius: 8px;
        background-color: white;
        padding: 16px;
      }
      
      /* Week view styling */
      .week-day-header {
        text-align: center;
        font-weight: 500;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      `}
    </style>
  );
};

export default CalendarStyles;
