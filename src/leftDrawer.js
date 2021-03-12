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
  
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >,
      <List>
        {[{
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
        ].map((text, index) => (
          // console.log(text),
          <ListItem onClick={text.utility} button key={text.name} style={{marginTop: '25px'}}>
            <ListItemIcon>
            {(() => { 
                if (index === 0 ) { 
                  return <HomeIcon style={{color: 'rgba(140,30,255)'}} />
              } else if ( index === 1) { 
                  return <PersonIcon style={{color: 'rgba(242,34,255)'}}  />
              } else if (index === 2) { 
                  return <QueueMusicIcon style={{color: 'rgba(255,41,117)'}}  />
              } else if ( index === 3 ) {
                  return <PostAddIcon style={{ color: 'rgba(255,144,31)'}}  />
              } else if ( index === 4 ) {
                  return <InfoIcon style={{ color: 'rgba(242,12,155)'}}  />
              } else { 
                 return <ExitToAppIcon style={{color: 'rgba(255,211,25)'}} />

            }}) ()}
            
            </ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Menu">
           <Button onClick={toggleDrawer(anchor, true)} style={{color: 'white'}}><MenuIcon/></Button>
          </Tooltip>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}