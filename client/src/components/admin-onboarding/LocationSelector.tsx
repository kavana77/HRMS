import { useState } from "react"
import { Country, State } from "country-state-city"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Label } from "../ui/label"

const LocationSelector = () => {

  const countries = Country.getAllCountries()

  const [countryName, setCountryName] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const [stateName, setStateName] = useState("")

  const states = countryCode
    ? State.getStatesOfCountry(countryCode)
    : []

  return (
    <div className="flex gap-6">

      {/* COUNTRY */}
      <div className="flex flex-col gap-1 w-[250px]">
        <Label className="text-sm text-gray-500 font-medium">
          Country <span className="text-red-500">*</span>
        </Label>

        <Select
          value={countryName}
          onValueChange={(value) => {
            const selectedCountry = countries.find(c => c.name === value)
            if (!selectedCountry) return

            setCountryName(selectedCountry.name)
            setCountryCode(selectedCountry.isoCode)
            setStateName("")
          }}
        >
          <SelectTrigger className="w-full h-16 py-5 rounded-md">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>

          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.isoCode} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {/* STATE */}
      <div className="flex flex-col gap-1 w-[250px]">
        <Label className="text-sm text-gray-500 font-medium">
          State <span className="text-red-500">*</span>
        </Label>
        <Select
          value={stateName}
          onValueChange={(value) => {
            if (!value) return
            setStateName(value)
          }}
          disabled={!countryCode}
        >
          <SelectTrigger className="w-full h-16 py-5 rounded-md">
            <SelectValue placeholder="Select state"/>
          </SelectTrigger>

          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.isoCode} value={state.name}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </div>
  )
}

export default LocationSelector