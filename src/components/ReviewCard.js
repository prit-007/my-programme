import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Paper, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom';

//code imported from mui site
//for changing string naqme into color
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
const darkTheme = createTheme({ palette: { mode: 'dark' } })


function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
//here ends the change color code

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

/////////////////////////////////////////////////
//Main Function ReviewCard
export default function ReviewCard({ object,deleteItem }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Paper elevation={6}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar {...stringAvatar(object.firstName + " " + object.lastName)} aria-label={object.id + " " + object.lastName} />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={object.id + " " + object.lastName}
                        subheader={object.expireince}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={object.fbAvatar}
                        alt="Avatar"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {object.firstName + " " + object.lastName}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Typography marginRight={3} marginLeft={2}>
                            <Button  onClick={()=>{deleteItem(object._id)}} aria-label="Delete Component" variant="outlined" color="error">
                                DELETE
                            </Button>
                        </Typography>
                        <IconButton aria-label="share">
                            <Link to={"/details/person/id/" + object._id} color="inherit"><FavoriteIcon /></Link>
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>{object.firstName + " " + object.lastName}</Typography>
                            <Typography paragraph>
                                <Typography paragraph>firstName : {object.firstName}</Typography>
                                <Typography paragraph>lastName : {object.lastName}</Typography>
                                <Typography paragraph>mobileNumber : {object.mobileNumber}</Typography>
                                <Typography paragraph>address : {object.address}</Typography>
                                <Typography paragraph>fbAvatar : {object.fbAvatar}</Typography>
                                <Typography paragraph>accountBalance : {object.accountBalance}</Typography>
                                <Typography paragraph>age : {object.age}</Typography>
                                <Typography paragraph>expireince : {object.expireince}</Typography>
                                <Typography paragraph>image : {object.image}</Typography>
                                <Typography paragraph>Detail : {object.Detail}</Typography>
                                <Typography paragraph>id : {object.id}</Typography>
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Paper>
        </ThemeProvider>
    );
}