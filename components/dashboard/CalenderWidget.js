"use client";
import React, { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "@/lib/event-utils";
import Toggle from "../shared/Toggle";

const CalendarWidget = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderSidebar = (
    <div className="w-[300px] border-r border-[#d3e2e8] bg-white leading-6 dark:bg-[#131f23] dark:text-light-900">
      <div className="p-[2em]">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className="p-[2em]">
        <label>
          <Toggle
            label="Show Weekends"
            toggled={weekendsVisible}
            onClick={handleWeekendsToggle}
          />
        </label>
      </div>
      <div className="p-[2em]">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </div>
    </div>
  );

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/events`) // Replace with your API endpoint
  //     .then((response) => response.json())
  //     .then((data) => setEvents(data))
  //     .catch((error) => console.error("Error fetching events:", error));
  // }, []);

  // const createEvent = (newEvent) => {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/events`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newEvent),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle the response (e.g., update the events state with the newly created event)
  //     })
  //     .catch((error) => console.error("Error creating event:", error));
  // };

  return (
    <div className="flex min-h-screen font-sans text-sm">
      {renderSidebar}
      <div className="grow p-[3em] dark:bg-gray-800 dark:text-white">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          
        */
        />
      </div>
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      {" - "}
      <i>{event.title}</i>
    </li>
  );
}

export default CalendarWidget;
