import axios from "axios";

export const searchWord = async (word: string) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
      headers: {
        "Accept": "application/json",
      },
    });
    return response.data;
  } catch {
    return false;
  }
};
