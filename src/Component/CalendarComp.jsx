import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Test2.css";

const CalendarComp = () => {
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-card">

        <div className="calendar-header">
          <div>
            <h2>Sélectionner une date</h2>
            <p>Choisissez la date de votre demande</p>
          </div>
        </div>

        <Calendar
          onChange={onChange}
          value={value}
          locale="fr-FR"
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={true}
        />

      </div>
    </div>
  );
};

export default CalendarComp;