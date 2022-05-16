import { Container, Grid, Typography,CardMedia } from "@material-ui/core";
import React from "react";
import logo from '../logo.jpeg';
const Dashboard = ()=>{
return(
    <Container>
        <Grid container> 
            <CardMedia 
            component="img"
                    alt="Bioassay"
                    height="auto"
                    image={logo}
                />
        </Grid>
    </Container>
);
}
export default Dashboard;