import React from 'react';
import FoodSelectorModal from './foodSelector';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import './foodCards.css';

export function FoodMenuComponent(){
    const [open, setOpen] = React.useState(false);

    const handleOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }
    return( 
    <div>
        <Button className="button" onClick={handleOpen}>
           <AddIcon/>
        </Button>
        <FoodSelectorModal open={open} handleClose={handleClose}/>
    </div>
    )
}