import { collection, addDoc} from "firebase/firestore";
import { db } from './firebaseConfig'

export const addRestaurantDetailsToFirestore = async (restaurantDetails) => {
    try {
      const docRef = await addDoc(collection(db, 'restaurants'), restaurantDetails);
  
      console.log('Document written with ID: ', docRef.id);
  
      return true; 
    } catch (error) {
      console.error('Error adding document: ', error);
      return false; 
    }
  };
