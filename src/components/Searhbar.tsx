import {TextField } from "@mui/material"
import React from "react"

const Searhbar = ({
    onChange
}: {onChange?: React.ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <div className='w-full max-w-lg'>
        <TextField
            onChange={onChange}
            label="Search"
            variant="standard"
            fullWidth={true}
        />
    </div>
  )
}

export default Searhbar