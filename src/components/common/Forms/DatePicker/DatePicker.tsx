import React, { useState, useEffect } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils from 'react-day-picker/moment';

import InputField from 'components/common/Forms/InputField';

import 'react-day-picker/lib/style.css';
import './DatePicker.sass';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear - 100, 0);
const toMonth = new Date(currentYear + 10, 11);

const YearMonthForm = ({ date, localeUtils, onChange }) => {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className='DayPicker-Caption'>
      <select
        className='DayPicker-select'
        name='month'
        onChange={handleChange}
        value={date.getMonth()}
      >
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select
        className='DayPicker-select'
        name='year'
        onChange={handleChange}
        value={date.getFullYear()}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
};

type DatePickerProps = {
  inputProps: any;
  value: Date;
  onChange: (date: Date) => void;
};

// const FORMAT = 'DD-MM-yyyy';

const DatePicker = (props: DatePickerProps) => {
  const [selectedDay, setSelectedDay] = useState<Date>(props.value);
  const [currentMonth, setCurrentMonth] = useState(fromMonth);

  useEffect(() => {
    setSelectedDay(props.value);
  }, [props.value]);

  const handleYearMonthChange = (month) => {
    setCurrentMonth(month);
  };

  const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();

    console.log(input);

    setSelectedDay(selectedDay);

    if (props.onChange) {
      props.onChange(selectedDay);
    }
  };

  const { inputProps } = props;

  return (
    <DayPickerInput
      value={selectedDay}
      onDayChange={handleDayChange}
      component={(inputFieldProps) => (
        <InputField {...inputFieldProps} {...inputProps} />
      )}
      dayPickerProps={{
        month: currentMonth,
        captionElement: ({ date, localeUtils }) => (
          <YearMonthForm
            date={date}
            localeUtils={localeUtils}
            onChange={handleYearMonthChange}
          />
        ),
      }}
      formatDate={MomentLocaleUtils.formatDate}
      parseDate={MomentLocaleUtils.parseDate}
      placeholder={`${MomentLocaleUtils.formatDate(new Date())}`}
    />
  );
};

export default DatePicker;
