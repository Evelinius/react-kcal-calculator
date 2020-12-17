import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { menu } from './mealtymenu';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
function getModalStyle() {
    const top = 40;
    const left = 60;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

interface Props {
    open: boolean
    handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 500,
            height: 150,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);
const rows = menu;
export function AutoSearch(props: any) {
    return (
        <div style={{ width: 300 }}>

            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={menu.map((option) => option.name)}
                onChange={props.onSearchChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={props.onChange}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: "search" }}
                    />
                )}
            />
        </div>
    );
}

export default function FoodSelectorModal(props: Props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const onChange = (event:any) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    }
    
    const onSearchChange = (event:any) => {
        setSearch(event.target.textContent);
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}>
                    <div style={{paddingLeft: 15}} >
                    <AutoSearch onSearchChange={onSearchChange} onChange={onChange}></AutoSearch>
                    </div>
                
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Carbs</TableCell>
                                <TableCell>Prot</TableCell>
                                <TableCell>Fat</TableCell>
                                <TableCell>Calories</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.filter(r => r.name.toUpperCase().includes(search.toUpperCase())).map(r => <TableRow>
                                <TableCell><img style={{width: 100, height: 100}} src={"http://mealty.ru" + r.image}></img></TableCell>
                                <TableCell>{r.name}</TableCell>
                                <TableCell>{r.carbohydrates}</TableCell>
                                <TableCell>{r.proteins}</TableCell>
                                <TableCell>{r.fats}</TableCell>
                                <TableCell>{r.calories}</TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Dialog>
        </div>
    )
}
