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
    onMenuSelect: (menuItem: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableRow: {
            '&:hover': {
                backgroundColor: '#c7c2bb',
            },
            cursor: 'pointer'
        }
    }),
);

const rows = menu;

export function AutoSearch(props: any) {
    return (
        <div style={{ width: 300 }}>
            <Autocomplete
                id="searcher"
                disableClearable
                options={menu.map((option) => option.name)}
                onChange={props.onSearchChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={props.onChange}
                        label="Enter the name of the meal"
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
    const [search, setSearch] = React.useState('');

    const onChange = (event: any) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    }

    const onSearchChange = (event: any) => {
        setSearch(event.target.textContent);
    }

    const onRowClick = (menuItem: any) => () => {
        props.handleClose()
        props.onMenuSelect(menuItem)
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}>
                <div style={{ paddingLeft: 15 }} >
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
                            {rows.filter(r => r.name.toUpperCase().includes(search.toUpperCase())).map(r =>
                                <TableRow className={classes.tableRow} onClick={onRowClick(r)}>
                                    <TableCell><img style={{ width: 100, height: 100 }} src={"http://mealty.ru" + r.image}></img></TableCell>
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