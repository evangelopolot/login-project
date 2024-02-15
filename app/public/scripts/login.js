const login = async (email, password) => {
  console.log(email, password);
  console.log("HITTTT");
  try {
    const result = await axios
      .post("/api/v1/users/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data); // Handle successful response
      })
      .catch((error) => {
        console.error(error); // Handle errors
      });

    // Reload the page after 1.5 seconds
    window.setTimeout(() => {
      location.assign("/dashboard");
    }, 1500);

    // Alert and reload paid for updated template
    if (result.data.status === "success") {
      alert("Logged in successful");
    }
  } catch (error) {}
};

document.querySelector(".formm").addEventListener("submit", (e) => {
  e.preventDefault(); //? Not sure what this is

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("HITTTT");
  login(email, password);
});
