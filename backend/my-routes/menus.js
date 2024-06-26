const express = require('express');
const router = express.Router();
const createReview = require('../controllers/menuReview').createReview;
const menuModel = require('../models/menu_review');

router.post('/menuReview', createReview);
// router.get('/average',async(req,res)=>{
//     const avg=await menuModel.aggregate([{$group:{_id:null,average:{$avg:"$rating"}}}]);
//     res.json(avg);
// })
router.get('/ratingByDayAndMealType', async (req, res) => {
    
    const ratingByDayAndMealType = await menuModel.aggregate([
        {
            $group: {
                _id: {
                    day: "$day",
                    meal_type: "$meal_type"
                },
                averageRating: { $avg: "$rating" }
            }
        }
    ]);
    res.json(ratingByDayAndMealType);
});
module.exports = router;
// router.get('/ratingByDay', async (req, res) => {
//     const ratingByDay = await menuModel.aggregate([
//         {
//             $group: {
//                 _id: "$day",
//                 averageRating: { $avg: "$rating" }
//             }
//         }
//     ]);
//     res.json(ratingByDay);
// });
