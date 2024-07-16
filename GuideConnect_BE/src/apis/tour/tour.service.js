import TourModel from "../../models/tour.model";

class TourService {
  createTour = async (userId, guideId, Tuorlocation, schedule, numberUser, startTime, endTime, tourType, price) => {
    try {
        const newTour = new TourModel({
            user_id: userId,
            guide_id: guideId,
            Tuorlocation: Tuorlocation, 
            schedule: schedule,
            numberUser: numberUser,
            startTime: startTime,
            endTime: endTime,
            tourType: tourType,
            price: price
        });
        const savedTour = await newTour.save();
        return savedTour;
    } catch (error) {
        throw new Error('Error creating tour: ' + error.message);
    }
  };

}

export default new TourService();
