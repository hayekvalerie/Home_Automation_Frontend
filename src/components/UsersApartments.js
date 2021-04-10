import React, { useEffect, useState } from 'react'
import { Card, CardImg, CardImgOverlay,CardTitle} from 'reactstrap';
import { Link} from 'react-router-dom';


 
function ApartmentCard(props) {
   return (
        <Link to={`/apartments/${props.apartmentId}`} >
            <Card>
                <CardImg width="100%" src={'/assets/' + props.apartmentImage} alt={props.apartmentName} />
                <CardImgOverlay>
                    <CardTitle color="black">{props.apartmentName}</CardTitle>
                </CardImgOverlay>
            </Card>
        </Link>
   )
}
function UsersApartment(props) {

    const [userId, setUserId] = useState();
    useEffect(() => {
        setUserId(props.auth._id);
        // setUserId(localStorage.getItem('userId'));
    });
    
    const findImageById = id => {
        let image = props.apartmentType.filter(t => t._id === id);
        return image[0].imagePath;
    }
      
    const findImageByApartId = apartmentId => {
      let apart = props.apartments.filter(apartment => apartment._id === apartmentId);
      let apartType = apart[0].apartmentTypeId;
      return findImageById(apartType)
    }

    const filterApartmentsByUserId = userId => {
        return props.apartments.filter(apartment => apartment.users.includes(userId));
    }
      

    return (
        <div>
            {filterApartmentsByUserId(userId).map(apartment => {
                return <ApartmentCard apartmentId={apartment._id} apartmentName={apartment.name} apartmentImage={findImageByApartId(apartment._id)}></ApartmentCard>
            })}
            
        </div>
    )
}

export default UsersApartment;