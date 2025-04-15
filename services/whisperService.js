const axios = require('axios');
const FormData = require('form-data');
const dotenv = require('dotenv');
dotenv.config();
// console.log('🔑 API KEY:', process.env.OPENAI_API_KEY);

const transcribe = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const audioBuffer = response.data;

    const formData = new FormData();
    formData.append('file', Buffer.from(audioBuffer), 'audio.mp3');
    // formData.append('file', Buffer.from(audioBuffer), {
    //   filename: 'audio.mp3',
    //   contentType: 'audio/mpeg',
    // });
    formData.append('model', 'whisper-1');

    const result = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        ...formData.getHeaders(),
      },
    });

    return result.data.text;
  } catch (err) {
    console.error('Whisper API Error:', err.response?.data || err.message);
    throw err;
  }
};

module.exports = { transcribe };
