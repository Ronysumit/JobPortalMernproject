import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/REDUX/jobSlice';
const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
      "Bangalore",
      "Kolkata",
      "Chennai"
    ]
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Science",
      "DevOps",
      "UI/UX Design",
      "Software Testing"
    ]
  },
  {
    filterType: "Salary",
    array: [
      "0-3 LPA",
      "3-6 LPA",
      "6-10 LPA",
      "20+ LPA"
    ]
  }
]
function FilterCard() {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const handleChange = (value) => {
    setSelectedValue(value)
  }
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))

  }, [selectedValue])
  return (
    <div className='w-full bg-white rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {
          filterData.map((item, index) => {
            return (
              <div key={index}>
                <h1 className='font-bold text-lg'>{item.filterType}</h1>
                {
                  item.array.map((arrayItem, idx) => {
                    const itemID = `id${index}-${idx}`
                    return (
                      <div className='flex items-center my-2 space-x-2' key={arrayItem}>
                        <RadioGroupItem value={arrayItem} id={itemID} />
                        <Label htmlFor={itemID}>
                          {arrayItem}
                        </Label>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard