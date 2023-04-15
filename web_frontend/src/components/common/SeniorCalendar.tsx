import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/dist/cjs/shared/types";
import styled from "styled-components";

function SeniorCalendar() {
  const [value, setValue] = useState<Date | null>(null);
  const mark = ["Tue Apr 25 2023", "Wed Apr 05 2023", "Thu Apr 06 2023"];

  useEffect(() => {
    console.log(value);
  }, [value]);
  const handleChange = (value: Value) => {
    if (value instanceof Date) {
      setValue(value);
    }
  };

  return (
    <StContainer>
      <Cal
        calendarType="US"
        onChange={handleChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        // showNeighboringMonth={false}
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        tileContent={({ date }) => {
          if (mark.find((x) => x === date.toDateString())) {
            return (
              <>
                <DotContainer>
                  <div className="dot" />
                </DotContainer>
              </>
            );
          }
        }}
      />
      {/* {moment(value).format("YYYY년 MM월 DD일")} */}
      <span className="bold">{value?.toDateString()}</span>
    </StContainer>
  );
}

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .dot {
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    margin-left: 1px;
  }
`;

const Cal = styled(Calendar)`
  border-radius: 1rem;
  font-family: "Pretendard-Regular";
  border: 0;
  outline: none;
  .reactCalendar {
    border: 0 !important;
  }
  .react-calendar {
    border-radius: 1rem;
    font-family: "Pretendard-Regular";
    border: none;
    outline: none;
  }
  .react-calendar__navigation button {
    color: #006ffd;
    background: none;
    font-size: 1.7rem;
    font-family: "Pretendard-Bold";
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  .react-calendar__month-view__weekdays {
    background: white;
    abbr {
      color: black;
      font-size: 1.5rem;
      font-weight: 500;
      margin-top: 0.5rem;
    }
  }
  .react-calendar__month-view__weekdays {
    height: 2rem;
  }
  .react-calendar__month-view__weekdays__weekday {
    line-height: 2rem;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled {
    max-height: 5rem;
    height: 5rem;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #006ffd;
    border-radius: 1rem;
    max-height: 5rem;
    height: 5rem;
  }
  .react-calendar__tile--now {
    background: #006ffd33;
    border-radius: 1rem;
    font-weight: bold;
    color: #006ffd;
    max-height: 5rem;
    height: 5rem;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #006ffd33;
    border-radius: 1rem;
    font-weight: bold;
    color: #006ffd;
    max-height: 5rem;
    height: 5rem;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
    max-height: 5rem;
    height: 5rem;
  }
  .react-calendar__tile--active {
    background: #006ffd;
    border-radius: 1rem;
    font-weight: bold;
    color: white;
    max-height: 5rem;
    height: 5rem;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #006ffd;
    color: white;
    max-height: 5rem;
    height: 5rem;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
    max-height: 5rem;
    height: 5rem;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #006ffd;
    border-radius: 0;
    max-height: 5rem;
    height: 5rem;
  }
`;

export default SeniorCalendar;
