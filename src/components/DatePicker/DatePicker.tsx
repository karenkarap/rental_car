import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

interface DatePickerComponentProps {
  dateRange: [Date | null, Date | null];
  setDateRange: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>;
}

const DatePickerComponent = ({ dateRange, setDateRange }: DatePickerComponentProps) => {
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      id="datePicker"
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      placeholderText="Booking date"
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
      minDate={new Date()}
    />
  );
};

export default DatePickerComponent;
