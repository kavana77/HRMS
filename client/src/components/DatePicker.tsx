import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export function DatePicker({ value, onChange }: any) {
  const [date, setDate] = useState<Date | undefined>(value)

  return (
    <Popover>
      <PopoverTrigger >
        <Button
          variant="outline"
          className="w-full justify-between text-left font-normal"
        >
          {date ? format(date, "dd/MM") : "DD/MM"}
          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate)
            onChange(selectedDate)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}