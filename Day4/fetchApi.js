class HttpError extends Error {
  constructor(message) {
    super(message);
    this.name="HttpError"
  }
}
// console.log("Response status:",response.status);
//     console.log("Response header:",response.headers);
async function fetch1() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    console.log("Response status:", response.status);
    console.log("Response header:", response.headers);
  } catch (err) {
    console.error(err);
  }
}
fetch1();

async function fetchJSON(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new HttpError("http error");
    console.log("Called fetchjson");
    return await response.json();
  } catch (err) {
    if (err.name == "TimeoutError") {
      console.error("Timelimit exceeded");
    } else {
      console.error(err);
    }
    throw err;
  }
}
fetchJSON("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({ greetings: "Hello" }),
  signal: AbortSignal.timeout(5000),
}).then((val) => console.log(val),(err)=>console.error(err.message));
