import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import {AboutEnrouteSection} from "../pages/AboutEnrouteSection";
import Grow from '@mui/material/Grow';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Delivery from '../Assets/Delivery.jpg';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		backgroundImage: `url(${process.env.PUBLIC_URL + Delivery})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100% 100%',
	},
	container: {
		textAlign: 'center',
	},	
	alert: {
		p: 5,
	},
	title: {
		fontFamily: 'PT Serif',
		fontSize: '4rem',
		height: '90vh',
		color: 'black',
		display: 'flex', 
		justifyContent: 'center', 
		alignItems: 'center', 
	},
	colorText: {
		fontColor: 'white',
	},
}));

const Home = () => {

	const {user,useremail,userhome } = useContext(UserContext);
	const { usertype, setUsertype } = useContext(UserContext);
	console.log(user, usertype,useremail,userhome);
  const classes = useStyles();
	return (
		<div className={classes.root}>
			<CssBaseline />
			
			<Grow in>
			<div className={classes.container}>
				<div className={classes.alert}>
					<h1 className={classes.title}>
					{user && <span className="text-success">{user}:</span>}{" "}
						Welcome to Delivery Bees <span className={classes.colorText}> !</span>
					</h1>
				</div>
			</div>
			</Grow>

			
			
		</div>
	);
};

export default Home;
	