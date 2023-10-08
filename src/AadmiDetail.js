import { Box, Button, Card, CardContent, CardHeader, CardMedia, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const AadmiDetail = () => {
    const navigate = useNavigate()
    const param = useParams()
    const [data, setData] = React.useState({})
    const api = "http://localhost:1969"

    const deleteItem = () => {
        fetch(
            api + "/" + param.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                  'success'
                ) 
                navigate("/");
            })
    }

    useEffect(() => {
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
                                    <ListItem ><ListItemText primary={<h2>firstName :  {data.firstName}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>lastName :  {data.lastName}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>mobileNumber :  {data.mobileNumber}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>address :  {data.address}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>fbAvatar :  {data.fbAvatar}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>accountBalance :  {data.accountBalance}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>age :  {data.age}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>expireince :  {data.expireince}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>image :  {data.image}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>Detail :  {data.Detail}</h2>} /></ListItem><Divider />
                                    <ListItem ><ListItemText primary={<h2>id :  {data.id}</h2>} /></ListItem><Divider />
                                </List>

                                <Stack direction="row" spacing={2}>
                                    <Button variant='outlined' onClick={() => { navigate("/") }}>Back</Button>
                                    <Button aria-label="Delete Component" variant="outlined" color="error" onClick={deleteItem}>
                                        DELETE
                                    </Button>
                                    <Link to={"/editPerson/" + data.id}><Button aria-label="Delete Component" variant="contained" color="secondary">
                                        EDIT
                                    </Button></Link>
                                </Stack>

                            </CardContent>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default AadmiDetail
