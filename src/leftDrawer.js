import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home'; 
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import PostAddIcon from '@material-ui/icons/PostAdd';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';


const LEFT = 'left';

const useStyles = makeStyles({
  list: {
    width: 250,
    height: 1000,
    color:'white',
    backgroundColor: 'black',
    

  },
  fullList: {
    width: 'auto',
    backgroundColor: 'black'
  },

});

export function TemporaryDrawer( props ) {
  console.log(props);
  const classes = useStyles();
  
  // hooks! nice work!
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // nice work figuring out the keydown event!
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    // nice work figuring out that you need to spread state here
    setState({ ...state, [anchor]: open });
  };

  // might want to even move this into a separate file and import it in for readability
  const items = [{
    name: 'Home',
    utility: props['redirectHome']
  },
  {
    name: 'My Profile',
    utility: props['redirectMyProfile']
  },
  {
    name: 'Playlists',
    utility: props['redirectPlaylists']
  },
  {
    name: 'Sign Up',
    utility: props['redirectToSignUp']
  },
  {
    name: 'About Us',
    utility: props['redirectToAboutUs']
  },
  {
    name: 'Log Out',
    utility: props['handleLogout']
  },
  ];

  // this should do the trick
  const iconArray = [
    <HomeIcon style={{color: 'rgba(140,30,255)'}} />,
    <PersonIcon style={{color: 'rgba(242,34,255)'}}  />,
    <QueueMusicIcon style={{color: 'rgba(255,41,117)'}}  />,
    <PostAddIcon style={{ color: 'rgba(255,144,31)'}}  />,
    <InfoIcon style={{ color: 'rgba(242,12,155)'}}  />,
    <ExitToAppIcon style={{color: 'rgba(255,211,25)'}} />
  ]

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >,
      <List>
        {items.map(({ utility, name }, index) => (
          <ListItem onClick={utility} button key={name} style={{marginTop: '25px'}}>
            <ListItemIcon>
              {iconArray[index]}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    
    <div>
      {/* seems like you don't need the map, since it's an array of one */}
        <React.Fragment key={LEFT}>
          <Tooltip title="Menu">
           <Button onClick={toggleDrawer(LEFT, true)} style={{color: 'white'}}><MenuIcon/></Button>
          </Tooltip>
          <Drawer anchor={LEFT} open={state[LEFT]} onClose={toggleDrawer(LEFT, false)}>
            {list(LEFT)}
          </Drawer>
        </React.Fragment>
    </div>
  );
}