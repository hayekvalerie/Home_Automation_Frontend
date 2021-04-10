import React, { Component } from 'react';
import RoomList from './RoomsListComponent';
import EquipmentList from './RoomEquipmentComponent';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchRooms, fetchEquipment, fetchApartments, createEquipment, createApartment, createRoom, fetchApartmentType,fetchEquipmentType,fetchUsers,fetchRoomType,putEquipment, loginUser, logoutUser, createUser } from '../redux/ActionCreators';
import ApartmentsList from './ApartmentsList';
import ApartmentList from './ApartmentListComponent';
import LogIn from './LogIn';
import Admin from './AdminComponent';
import UsersList from './UsersList';
import UsersApartment from './UsersApartments';
import RoomEquipmentList from './EquipmentListComponent';


const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    equipment: state.equipment,
    apartments: state.apartments,
    users: state.user,
    apartmentType: state.apartmentType,
    roomType: state.roomType,
    equipmentType: state.equipmentType,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  /*postEquipment: (roomId, actual, turned) => dispatch(postEquipment(roomId, actual, turned)),*/
  fetchRooms: () => { dispatch(fetchRooms())},
  fetchRoomType: () => { dispatch(fetchRoomType())},
  fetchEquipment: () => {dispatch(fetchEquipment())},
  fetchEquipmentType: () => {dispatch(fetchEquipmentType())},
  fetchApartments: () => {dispatch(fetchApartments())},
  fetchUsers: () => {dispatch(fetchUsers())},
  fetchApartmentType: () => {dispatch(fetchApartmentType())},
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  createUser: (user) => dispatch(createUser(user)),
  createApartment: (apartment) => dispatch(createApartment(apartment)),
  createRoom: (room, apartmentId) => dispatch(createRoom(room, apartmentId)),
  createEquipment: (room, apartmentId, equipment) => dispatch(createEquipment(room, apartmentId, equipment)),
  putEquipment:(equipmentId,turnedOn,goal)=>dispatch(putEquipment(equipmentId,turnedOn,goal))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchRooms();
    this.props.fetchEquipment();
    this.props.fetchApartments();
    this.props.fetchUsers();
    this.props.fetchApartmentType();
    this.props.fetchEquipmentType();
    this.props.fetchRoomType();
  }

  render() {
    

    const ApartmentWithId = ({match}) => {
      return(
          <RoomList apartment={this.props.apartments.apartments.filter((apartment) => apartment._id === match.params.apartmentId)[0]}
          isLoading={this.props.apartments.isLoading}
          errMess={this.props.apartments.errMess}

          rooms={this.props.rooms.rooms.filter((room) => room.apartment === match.params.apartmentId)}
          roomsErrMess={this.props.rooms.errMess}

          // isLoading={this.props.apartments.isLoading}
          // errMess={this.props.apartments.errMess}
          

        />
      );
    };

   const RoomWithId = ({match}) => {
      return(
          <RoomEquipmentList room={this.props.rooms.rooms.filter((room) => room._id === match.params.roomId)[0]}
          isLoading={this.props.rooms.isLoading}
          errMess={this.props.rooms.errMess}

          equipment={this.props.equipment.equipment.filter((equipement) => equipement.room === match.params.roomId)}
          //equipmentErrMess={this.props.equipement.errMess}

        />
      );
   };
      const EquipmentWithId = ({match}) => {
        // console.log(match);
        return(
          <EquipmentList equipment={this.props.equipment.equipment}
          isLoading={this.props.equipment.isLoading}
          errMess={this.props.equipment.errMess}
          putEquipment={this.props.putEquipment}
          equipmentId={match.params.equipmentId}
            // <EquipmentList equipment={this.props.equipment.equipment.filter((equipment) => equipment._id === match.params.equipmentId)}
            // isLoading={this.props.equipment.isLoading}
            // errMess={this.props.equipment.errMess}
            // putEquipment={this.props.putEquipment}
            // equipmentId={match.params.equipmentId}
  
            //equipment={this.props.equipment.equipment.filter((equipement) => equipement.room === match.params.roomId)}
            //equipmentErrMess={this.props.equipement.errMess}
  
          />
        );
    };
  
      // const ApartmentRooms = ({match}) => {
      //   return(
      //       <ApartmentList room={this.props.rooms.rooms.filter((room) => room.id === parseInt(match.params.roomId,10))[0]}
      //       isLoading={this.props.rooms.isLoading}
      //       errMess={this.props.rooms.errMess}
      //       equipment={this.props.equipment.equipment.filter((equipment) => equipment.roomId === parseInt(match.params.roomId,10))}
      //       equipmentErrMess={this.props.equipment.errMess}
            
          
      
      //   const findImageById = id => {
      //     let image = props.apartmentTypes.filter(t => t._id === id);
      //     return image[0].imagePath;
      //   }
        
      //   const findImageByApartId = apartmentId => {
      //     let apart = props.apartments.apartments.filter(apartment => apartment._id === apartmentId);
      //     let apartType = apart[0].apartmentTypeId;
      //     return findImageById(apartType)
      //     };
      // };



    

    return (
      <div>
        
        <div>
          <Switch> 
            <Route exact path="/" component={() => <LogIn auth={this.props.auth} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser}></LogIn>}></Route> 
            <Route exact path="/admin" component={() => <Admin auth={this.props.auth} logoutUser={this.props.logoutUser} ></Admin>}></Route>
            <Route exact path='/apartments/:apartmentId' component={ApartmentWithId}/>
            <Route exact path='/apartments' component={()=> <ApartmentList apartments={this.props.apartments} ></ApartmentList>}></Route>
            <Route exact path="/admin/apartments" component={() => <ApartmentsList auth={this.props.auth} apartments={this.props.apartments.apartments} 
                    apartmentTypes={this.props.apartmentType.apartmentType} createApartment={this.props.createApartment}
                    roomTypes={this.props.roomType.roomType} equipmentTypes={this.props.equipmentType.equipmentType}
                    createRoom={this.props.createRoom}
                    createEquipment={this.props.createEquipment}></ApartmentsList>}></Route>
            <Route exact path='/rooms/:roomId' component={RoomWithId}/>
            <Route exact path='/equipment' component={() => <RoomEquipmentList equipment={this.props.equipment.equipment}></RoomEquipmentList>}></Route>
            <Route exact path='/equipment/:equipmentId' component={EquipmentWithId}/>
            <Route exact path="/users" component={() => <UsersList data={this.props.users.users} apartments={this.props.apartments.apartments} createUser={this.props.createUser}></UsersList>}></Route>
            <Route exact path='/usersApartment' component={()=> <UsersApartment  apartments={this.props.apartments.apartments} apartmentType={this.props.apartmentType.apartmentType} auth={this.props.auth}/>}/>
          </Switch>
        </div>
        
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));