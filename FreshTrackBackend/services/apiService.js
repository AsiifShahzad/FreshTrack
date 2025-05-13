const axios = require('axios');

exports.callGoogleVision = async (imageBase64) => {
    const response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`, {
        requests: [{
            image: { content: imageBase64 },
            features: [{ type: 'LABEL_DETECTION' }, { type: 'TEXT_DETECTION' }]
        }]
    });
    return response.data.responses;
};

exports.callChefAI = async (ingredients) => {
    const response = await axios.post(
        `https://api-inference.huggingface.co/models/YOUR_MODEL_NAME`,
        { inputs: `Suggest a recipe using: ${ingredients.join(', ')}` },
        { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );
    return response.data;
};
