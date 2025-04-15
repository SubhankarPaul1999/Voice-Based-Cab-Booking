const { transcribe } = require('./services/whisperService');

(async () => {
  const url = 'https://s5-9.ttsmaker-file.com/file/2025-04-14-182002_121302.mp3';
  try {
    const text = await transcribe(url);
    console.log('Transcription:', text);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();

