import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getGuardianCalendar } from "../../core/api";

interface IProp {
  setDate: Dispatch<SetStateAction<string>>;
  id: number;
}
function GuardianCalendar(prop: IProp) {
  const [value, setValue] = useState(new Date());
  const { data } = useQuery("guardianDateList", () => getGuardianCalendar(prop.id));
  const [meal, setMeal] = useState([""]);
  const [workout, setWorkout] = useState([""]);

  useEffect(() => {
    setMeal(data?.data.mealRecordDate);
    setWorkout(data?.data.workOutRecordDate);
  }, [data]);

  const handleChange = (value: Value) => {
    if (value instanceof Date) {
      setValue(value);
      prop.setDate(moment(value).format("YYYY-MM-DD"));
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
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        tileContent={({ date }) => {
          const isMeal = meal?.find((x) => x === moment(date).format("YYYY-MM-DD"));
          const isWorkout = workout?.find((x) => x === moment(date).format("YYYY-MM-DD"));

          if (isMeal || isWorkout) {
            return (
              <DotContainer>
                {isMeal && <div className="dot" />}
                {isWorkout && <div className="triangle" />}
              </DotContainer>
            );
          }
        }}
      />
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
  .triangle {
    width: 0px;
    height: 0px;
    border-bottom: calc(0.5rem * 1.732) solid #f6e58d;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
  }
`;

const Cal = styled(Calendar)`
  border-radius: 1rem;
  font-family: "Pretendard-Regular";
  border: 0;
  outline: none;
  max-width: fit-content;
  max-height: fit-content;
  .reactCalendar {
    border: 0 !important;
  }
  .react-calendar {
    border-radius: 1rem;
    font-family: "Pretendard-Regular";
    border: none;
    outline: none;
    max-width: fit-content;
    max-height: fit-content;
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
    max-height: 4rem;
    height: 4rem;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #006ffd;
    border-radius: 1rem;
    max-height: 4rem;
    height: 4rem;
  }
  .react-calendar__tile--now {
    background: #006ffd33;
    border-radius: 1rem;
    font-weight: bold;
    color: #006ffd;
    max-height: 4rem;
    height: 4rem;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #006ffd33;
    border-radius: 1rem;
    font-weight: bold;
    color: #006ffd;
    max-height: 4rem;
    height: 4rem;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
    max-height: 4rem;
    height: 4rem;
  }
  .react-calendar__tile--active {
    background: #006ffd;
    border-radius: 1rem;
    font-weight: bold;
    color: white;
    max-height: 4rem;
    height: 4rem;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #006ffd;
    color: white;
    max-height: 4rem;
    height: 4rem;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
    max-height: 4rem;
    height: 4rem;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #006ffd;
    border-radius: 0;
    max-height: 4rem;
    height: 4rem;
  }
`;

export default GuardianCalendar;
