import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { display } from '@mui/system';

export default function CheckboxListSecondary({emails,defaultemails}) {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense sx={{backgroundColor:"grey", width: '415px', maxWidth: 360, bgcolor: 'background.paper' }}>
      {(emails.length === 0 ? defaultemails : emails).map((value,index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem
            key={index}
            disablePadding
            sx={{backgroundColor:"#d1caca",width: '415px'}}
          >
            <ListItemButton sx={{display:'flex',flexDirection:"column"}}>
              <ListItemText id={labelId} primary={`${value.role}`}/>
              <ListItemText id={labelId} primary={`${value.forename}`+` ${value.surname}`} />
              <ListItemText id={labelId} primary={`${value.email}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}