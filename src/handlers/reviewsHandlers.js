const { getReviewsDetailServices, getReviewsUserServices, postReviewServices } = require("../services/reviewsServices")

const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const getReviewsTemplate = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await getReviewsByTemplateIdServices(id)
        
        if (!reviews) {
            return res.status(404).json({ message: 'Template not found' });
          }
        
        res.status(200).send(reviews)

    } catch (error) {
        console.error(error);
        return res.json(error);
    }
}

const getReviewsUser = async (req, res) => {

  const  idUser  = req.userId
      

    try {
      
      if (!idUser) {
        return res.status(400).json({ message: 'userId is required' });
      }
  
      const reviews = await getReviewsUserServices(idUser);
  
     return res.status(200).json(reviews);
     

    } catch (error) {
      if (error.message === 'User ID is required') {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };





const postReview = async (req, res) => {
  const userId= req.userId
  const data= req.body
    try {
       
        let newReview = await postReviewServices(userId, data);
        res.status(200).json(newReview);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ error: error.message }); 
    }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
      const deleteReview = await deleteReviewUserServices(id);
      res.status(200).json(deleteReview);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(400).json({ error: error.message });
  }
};

const updateReview= async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
      const updatedReview = await updateReviewServices(id, data);
      res.status(200).json(updatedReview);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(400).json({ error: error.message });
  }
};

module.exports = {
    getReviewsUser,
    getReviewsTemplate,
    getReviewsUser,
    postReview,
    updateReview,
    deleteReview
}
