import React from 'react'

import { useEffect, useState } from 'react';
import ReviewCard from './components/ReviewCard';
import { Box, Grid, Paper, createTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom';

const darkTheme = createTheme({ palette: { mode: 'dark' } })

function Aadmi() {
  const [data, setData] = useState([])
  const api = "http://localhost:1969"

  useEffect(() => {
    fetch(api).then((res) => { return res.json() }).then((res) => { setData(res) });
  }, [])
  const deleteItem = (id) => {
    fetch(api + "/" + id, { method: "Delete" })
      .then((res) => { setData(data.filter((f)=>{return f.id !== id})) })
  }
  const formattedData = data.map(
    (t) => {
      return <Grid item xs={2} sm={4} md={2} lg="aut">
        <ReviewCard object={t} deleteItem={deleteItem} />
      </Grid>
    }
  )
  return (<>
    <Paper elevation={0}>
      <ThemeProvider theme={darkTheme}>
        <Grid container key={data.id} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          {formattedData}
        </Grid>
      </ThemeProvider>
    </Paper>
  </>
  )
}

export default Aadmi