import { User } from "./models/User";

const user = new User({ name: "WOti DOVVIIRO", age: 250 });

user.save();

user.on("saveSuccess", () => {
  console.log(user);
});
