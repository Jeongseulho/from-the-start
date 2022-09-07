let Javascript, CSS, HTML;

const getRepoNameArray = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/Jeongseulho/repos",
      {
        method: "GET",
        headers: {
          Authorization: "token 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",
        },
      }
    );
    const data = await response.json();
    const result = data.map((repo) => repo.name);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getLangBytes = async (repoName) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/Jeongseulho/${repoName}/languages`,
      {
        method: "GET",
        headers: {
          Authorization: "token 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",
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const assignment = (langObj) => {};

const getAllLangBytes = async () => {
  const repoNameArray = await getRepoNameArray();
  console.log(repoNameArray);

  const langPromiseArray = repoNameArray.map(
    async (repoName) => await getLangBytes(repoName)
  );

  console.log(
    langPromiseArray.map((pr) => pr.then((langObj) => console.log(langObj)))
  );

  // console.log(AllLangBytes);
  // return AllLangBytes;
};

getAllLangBytes();

// (async () => {
//   console.log(await getAllLangBytes());
// })();

// const getAllLangBytes = async () => {
//   const repoNameArray = await getRepoNameArray();
//   console.log(repoNameArray);
//   const AllLangBytes =  repoNameArray.map((repoName) =>
//      getLangBytes(repoName)
//   );
//   console.log(AllLangBytes);
// };

// getAllLangBytes();

// getRepoNameArray().forEach((repoName) => console.log(repoName));

// (async () => {
//   console.log(await getLangBytes(repoNameArray[0]));
// })();
