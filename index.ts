import server from "./src/server";

server.listen('3333', () => {
    console.log("Listening on port => http://localhost:3333");
    console.log("Swagger setup on  => http://localhost:3333/swagger");
})