const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
}

const Calendar = ({ selected, onSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(selected || new Date())

    // Get days in a specific month
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

    // Get the first day of the month (for correct positioning in the calendar)
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

    // Get the current year and month
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Array to hold all the days for the current month
    const days = []
    const daysCount = daysInMonth(year, month)
    const firstDay = firstDayOfMonth(year, month)

    // Fill the array with empty slots for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
        days.push(null)
    }

    // Push the days for the current month
    for (let i = 1; i <= daysCount; i++) {
        days.push(new Date(year, month, i))
    }

    // Handle going to the previous month
    const handlePrevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1))
    }

    // Handle going to the next month
    const handleNextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1))
    }

    // Handle changing the year
    const handleYearChange = (e) => {
        const newYear = e.target.value
        if (newYear && !isNaN(newYear)) {
            setCurrentMonth(new Date(newYear, month, 1))
        }
    }

    // Check if a date is selected
    const isSelected = (date) => {
        if (!selected || !date) return false
        return date.toDateString() === selected.toDateString()
    }

    return (
        <div className="p-3">
            <div className="flex justify-between items-center mb-2">
                {/* Previous Month Button */}
                <button onClick={handlePrevMonth} className="p-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                {/* Month and Year Display */}
                <div className="flex items-center space-x-2">
                    <button onClick={handlePrevMonth} className="text-lg">
                        <span className="mr-2">{currentMonth.toLocaleString("default", { month: "long" })}</span>
                        <input
                            type="number"
                            value={year}
                            onChange={handleYearChange}
                            className="w-16 text-center border-b focus:outline-none"
                        />
                    </button>
                </div>

                {/* Next Month Button */}
                <button onClick={handleNextMonth} className="p-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
                    <div key={i} className="p-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 mt-1">
                {days.map((date, i) => (
                    <div key={i} className="p-0">
                        {date ? (
                            <button
                                onClick={() => onSelect(date)}
                                className={cn(
                                    "h-8 w-8 rounded-md p-0 text-center text-sm",
                                    isSelected(date) ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                                )}
                            >
                                {date.getDate()}
                            </button>
                        ) : (
                            <div className="h-8 w-8" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Calendar;