import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home'; 
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

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
  // {['Home', 'My Profile', 'Playlists', 'Logout']
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
          name: 'Logout',
          utility: props['handleLogout']
        },
        ].map((text, index) => (
          // console.log(text),
          <ListItem onClick={text.utility} button key={text.name} style={{marginTop: '25px'}}>
            <ListItemIcon>
            {(() => { 
                if (index === 0 ) { 
                return <HomeIcon style={{color: 'white'}} />
            } else if ( index === 1) { 
                return <PersonIcon style={{color: 'white'}}  />
            } else if (index === 2) { 
                return <QueueMusicIcon style={{color: 'white'}}  />
            } else { 
               return <ExitToAppIcon style={{color: 'white'}} />
        
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
          <Button onClick={toggleDrawer(anchor, true)} style={{color: 'white'}}>Menu</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}