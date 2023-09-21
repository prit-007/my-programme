import { Box, Button, Card, CardContent, CardHeader, CardMedia, Divider, Grid, List, ListItem, ListItemText, Paper } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AadmiDetail = () => {
    const navigate = useNavigate()
    const param = useParams()
    const [data, setData] = React.useState({})
    const api = "https://64f62b512b07270f705e3d40.mockapi.io/Prit-v-007/Employee"

    const deleteItem = () => {
        fetch(api + "/" + param.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
          .then(res => res.json())
          .then(data => {
                navigate("/");
            })
    }
    
    React.useEffect(() => {
        fetch(api + "/" + param.id)
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    return (
        <>
            <Card elevation={2}>
                <CardHeader title={"AadmiDetail " + param.id} subheader="Employee" />
                <Grid container>
                    <Grid item>
                        <CardMedia
                            component="img"
                            height="400"
                            image={data.fbAvatar}
                            alt="Avatar"
                        />
                    </Grid>
                    <Grid item>
                        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                            <CardContent >
                                <List>
                                    <ListItem><ListItemText primary={"firstName : " + data.firstName} /></ListItem>
                                    <Divider />
                                    {/* ... other list items ... */}
                                </List>
                                <Button variant='outlined' onClick={()=>{navigate("/")}}>Back</Button>
                                <Button aria-label="Delete Component" variant="outlined" color="error" onClick={deleteItem}>
                                    DELETE
                                </Button>
                            </CardContent>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default AadmiDetail
