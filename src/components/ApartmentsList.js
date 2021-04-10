import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { red, grey, blue } from '@material-ui/core/colors';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {deleteApartment} from '../services/apartmentService';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ApartmentIcon from '@material-ui/icons/Apartment';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
//   table: {
//     minWidth: 650,
//   },
//   tableWidth: {
//       width: 400,
//   },
    hover: {
        '&:hover': {
        backgroundColor: '#9e9e9e !important',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 450
    },
    customTextField: {
        width: 350,
        margin: 5
    }
}));

function ApartmentsList({apartments, auth, history, apartmentTypes, createApartment, equipmentTypes, createEquipment, roomTypes, createRoom}) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [drop, setDrop] = React.useState(false);

    const [openEdit, setOpenEdit] = React.useState(false);
    const [dropRoomType, setDropRoomType] = React.useState(false);
    const [dropRoom, setDropRoom] = React.useState(false);

    const [apartName, setApartName] = React.useState("");
    const [roomName, setRoomName] = React.useState("");
    const [nbOfRooms, setNbOfRooms] = React.useState(0);
    const [apartTypeId, setApartTypeId] = React.useState("");

    const [selected, setSelected] = React.useState("");
    const [selectedEdit, setSelectedEdit] = React.useState("");
    const [selectedRoomType, setSelectedRoomType] = React.useState("");

    const [rooms, setRooms] = React.useState([]);
    const [roomType, setRoomType] = React.useState("");
    const [apartToEdit, setApartToEdit] = React.useState("");
    const [equipment, setEquipment] = React.useState([]);

    // useEffect(() => {
    //     if(!auth.isAuthenticated){
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Authentication',
    //         text: 'You are not authenticated'
    //       });
    //       history.push('/');
    //     }
    //     else{
    //       if(!auth.admin){
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'Authorization',
    //           text: 'You are not autorized'
    //         });
    //         history.push('/');
    //       }
    //     }
    //   });

    const handleDelete = (apartmentId) => {
        deleteApartment(apartmentId);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseEdit = () => {
        setNbOfRooms(0);
        setRooms([]);
        setEquipment([]);
        setOpenEdit(false);
    };

    const handleClick = () => {
        setDrop(!drop);
    };

    const handleClickRoom = () => {
        setDropRoom(!dropRoom);
    };

    const handleClickRoomType = () => {
        setDropRoomType(!dropRoomType);
    };

    const handleApartNameChange = e => {
        setApartName(e.target.value);
    };

    const handleRoomNameChange = e => {
        setRoomName(e.target.value);
    };


    const handleNbRoomsChange = e => {
        if(e.target.value < nbOfRooms){
            rooms.pop();
        }
        else{
            rooms.push({name: 'Room ' + e.target.value});
        }
        setNbOfRooms(e.target.value);
        setRooms(rooms);
    };

    const handleSelect = (apartTypeId, apartTypeName) => {
      setApartTypeId(apartTypeId);
      setSelected(apartTypeName)
      setDrop(!drop);
    };

    const addApartment = () => {

        var apartment = {
            name: apartName,
            apartmentTypeId: apartTypeId,
            rooms: [],
            users: []
        }

        createApartment(apartment);
    };

    const addRoom = async () => {
        var newRoom = {
            name: roomName,
            roomTypeId: roomType,
        }

        var res = await createRoom(newRoom, apartToEdit);
        var roomId = res.payload._id;   
        var r = await createEquipment(roomId, apartToEdit, equipment);
        console.log(r);
    }

    const handleEdit = apartmentId => {
        setApartToEdit(apartmentId);
        setOpenEdit(true);
    }

    const handleRoomTypeSelect = (roomTypeId, roomTypeName) => {
        setRoomType(roomTypeId);
        setSelectedRoomType(roomTypeName);
        setDropRoomType(false);

        
    }

    const handleEquipmentChange = equipmentId => {
        equipment.push(equipmentId);
        setEquipment(equipment);
    }

    return (

        <TableContainer component={Paper} className={classes.tableWidth}>
        <div>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openEdit}
            onClose={handleCloseEdit}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
            <Fade in={openEdit}>
                <div className={classes.paper}>
                    <h4 id="transition-modal-title">Customize Apartment</h4>
                    <form className={classes.root} noValidate autoComplete="off">
                    <div style={{marginTop: 5, marginBottom: 10}}>
                    {/* <div>
                        <TextField id="nbOfRooms" label="Number of Rooms" type="number" InputProps={{ inputProps: { min: 0, max: 10 } }} value={nbOfRooms} className={classes.customTextField} onChange={handleNbRoomsChange}/>
                    </div> */}
                    {/* <ListItem button onClick={handleClickRoom}>
                        <ListItemIcon>
                            <ApartmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedEdit? selectedEdit : "Select Room"} />
                        {dropRoom ? 
                        <ExpandLess />
                        : 
                        <ExpandMore />
                        }
                    </ListItem>
                    <Collapse in={dropRoom} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {rooms.map((room) => (
                            <ListItem button className={classes.nested} >
                                <ListItemText primary={room.name} />
                            </ListItem>
                            ))}
                        </List>
                    </Collapse> */}

                    <div>
                        <TextField id="roomName" label="Room Name" type="text"  value={roomName} className={classes.customTextField} onChange={handleRoomNameChange}/>
                    </div>

                    <ListItem button onClick={handleClickRoomType}>
                        <ListItemIcon>
                            <ApartmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedRoomType? selectedRoomType : "Select Room Type"} />
                        {dropRoomType ? 
                        <ExpandLess />
                        : 
                        <ExpandMore />
                        }
                    </ListItem>
                    <Collapse in={dropRoomType} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {roomTypes.map((roomType) => (
                            <ListItem button className={classes.nested} onClick={() => {handleRoomTypeSelect(roomType._id, roomType.name)}} >
                                <ListItemText primary={roomType.name} />
                            </ListItem>
                            ))}
                        </List>
                    </Collapse>
                    <h4>Equipments</h4>
                {equipmentTypes.map(equipmentType => (
               
                <div>
                    <TextField id={equipmentType.name} label={equipmentType.name} type="number" onChange={() => handleEquipmentChange(equipmentType._id)} className={classes.customTextField}/>
                </div>
                ))}                               
                    
                </div>
                <Button color="primary" variant="contained" onClick={addRoom}>Submit</Button>
                </form>
        </div>
        </Fade>
        </Modal>
        </div>



        <div>
            <Button style={{fontSize: 8}}><AddCircleIcon style={{ color: blue[500], fontSize: 40 }} onClick={handleOpen}/>Create Apartment</Button>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
            <Fade in={open}>
                <div className={classes.paper}>
                    <h4 id="transition-modal-title">Create Apartment</h4>
                    <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField id="apartName" label="Apartment Name" value={apartName} className={classes.customTextField} onChange={handleApartNameChange}/>
                    </div>
                    <div style={{marginTop: 5, marginBottom: 10}}>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <ApartmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={selected? selected : "Apartment Type"} />
                        {drop ? 
                        <ExpandLess />
                        : 
                        <ExpandMore />
                        }
                    </ListItem>
                    <Collapse in={drop} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {apartmentTypes.map((apartType) => (
                            <ListItem button className={classes.nested} onClick={() =>
                                handleSelect(apartType._id, apartType.name)}>
                                <ListItemText primary={apartType.name} />
                            </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </div>
                <Button color="primary" variant="contained" onClick={addApartment}>Submit</Button>
                </form>
        </div>
        </Fade>
        </Modal>
        </div>
        {/* <Input  key="search" placeholder="Search" onChange={filterTable} style={{ width: 400}}></Input> */}
        <Table aria-label="simple table">
            <TableHead>
                <TableRow style={{backgroundColor: grey[900]}}>
                <TableCell style={{color: '#fff'}}><b>id</b></TableCell>
                <TableCell style={{color: '#fff'}}><b>Apartment</b></TableCell>
                <TableCell style={{color: '#fff'}}><b>Delete</b></TableCell>
                <TableCell style={{color: '#fff'}}><b>Edit</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {apartments.map((apartment) => (
                <TableRow hover className={classes.hover} style={{backgroundColor: grey[800]}}>
                <TableCell component="th" scope="row" style={{color: '#fff', fontSize: 10}}>
                {apartment._id}
                </TableCell>
                <TableCell style={{color: '#fff', fontSize: 10}}>{apartment.name}</TableCell>
                <TableCell><Button onClick={ () => handleDelete(apartment._id)}><DeleteForeverOutlinedIcon style={{ color: red[500] }}/></Button></TableCell>
                <TableCell><Button onClick={ () => handleEdit(apartment._id)}><EditIcon style={{ color: blue[500] }}/></Button></TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>


  );
}

export default withRouter(ApartmentsList);