axios({
  method: "POST",
  url: ``,
  data: {  },
  headers: { token: localStorage.token },
})
  .then(({ data }) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });