import UsersModel from "../../models/user.model";
import tourService from "./tour.service";
import TourModel from "../../models/tour.model";
class tourController {
    getAllTour  = async (req, res, next) => {
        try {
            const allTour = await TourModel.find();
            res.status(201).json({ allTour });
        } catch (error) {
          res.status(500).send(error.message);
        }
    };
    createTour = async (req, res, next) => {
        try {
            const { userId, guideId, Tuorlocation, schedule, numberUser, startTime, endTime, tourType, price } = req.body;
            const start = new Date(startTime);
            const end = new Date(endTime);
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return res.status(400).send("Invalid date format for startTime or endTime");
            }
            const timeDifference = end.getTime() - start.getTime();
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);  
            console.log(daysDifference)
            const totalCost = daysDifference * price;
            const result = await tourService.createTour(userId, guideId, Tuorlocation, schedule, numberUser, startTime, endTime, tourType, totalCost);
            res.status(201).json({ tour: result, totalCost: totalCost });
          } catch (error) {
            res.status(500).send(error.message);
        }
    };
    deleteTour = async (req, res, next) => {
        try {
            const idTour = req.params.id;
            const result = await TourModel.findByIdAndDelete(idTour);
            if (!result) {
                return res.status(404).send("Tour not found");
            }
            res.status(200).json({ message: "Tour deleted successfully" });
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    updateTour = async (req, res, next) => {
        try {
            const { Tuorlocation, schedule, numberUser, startTime, endTime, tourType, price } = req.body;
            const idTour = req.params.id;
            const updateFields = {};

            if (Tuorlocation) updateFields.Tuorlocation = Tuorlocation;
            if (schedule) updateFields.schedule = schedule;
            if (numberUser) updateFields.numberUser = numberUser;
            if (startTime) {
                updateFields.startTime = startTime;
            }
            if (endTime) {
                updateFields.endTime = endTime;
            }
            if (tourType) updateFields.tourType = tourType;
            // const start = new Date(startTime);
            // const end = new Date(endTime);
            // const timeDifference = end.getTime() - start.getTime();
            const timeDifference = endTime - startTime;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);  
            console.log(daysDifference)
            const totalCost = daysDifference * price;
            if (totalCost) updateFields.price = totalCost;
            console.log(updateFields);
            const updatedTour = await TourModel.findByIdAndUpdate(idTour, updateFields, { new: true });
            if (!updatedTour) {
                return res.status(404).send("Tour not found");
            }
            res.status(200).json({ tour: updatedTour });
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
}


export default new tourController();