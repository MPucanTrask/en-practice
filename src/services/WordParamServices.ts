const getWordParameters = async (word: string) => {
  const response = await fetch(
    `https://owlbot.info/api/v4/dictionary/${word}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token 9a8c5a1e38b197fc687eaf1344241fc5c26895c3",
      },
    }
  )

  try {
    if (response.status !== 200) {
      throw new Error('Cannot fetch data');
    }
    if (response.ok) {
      return await response.json();
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

export { getWordParameters }
