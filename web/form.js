import { server } from './server.js';

const form = document.querySelector('#form');
const input = document.querySelector('#url');
const content = document.querySelector('#content');

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if(!videoURL.includes("shorts")) {
    return content.textContent = "Este vídeo não é um Short! Por favor selecione um vídeo do tipo Short e tente novamente."
  }

  // Split to divide text and setting params as video ID (last part)
  const [_, params] = videoURL.split("/shorts/")
  // Split to clean share youtube option
  const [videoID] = params.split("?si")

  // To extract audio from video
  content.textContent = "Obtendo o texto do áudio..."

  // request from backend
  const transcription = await server.get('/summary/' + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post('/summary', {
    text: transcription.data.result
  })

  content.textContent = transcription.data.result
  content.classList.remove("placeholder")
});