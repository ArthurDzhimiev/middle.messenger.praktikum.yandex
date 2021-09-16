export const InputsProps = {
  firstName: {
    placeholder: "First name",
    type: "text",
    name: "firstName",
    events: {
      blur: (e) => {
        blurInput("firstName");
      },
    },
  },
  secondName: {
    placeholder: "Second name",
    type: "text",
    name: "secondName",
    events: {
      blur: (e) => {
        blurInput("secondName");
      },
    },
  },
  login: {
    placeholder: "Login",
    type: "text",
    name: "login",
    events: {
      blur: (e) => {
        blurInput("login");
      },
    },
  },
  email:  {
    placeholder: "Email",
    type: "email",
    name: "email",
    events: {
      blur: (e) => {
        blurInput("email");
      },
    },
  },
  phone: {
    placeholder: "Phone",
    type: "phone",
    name: "phone",
    events: {
      blur: (e) => {
        blurInput("phone");
      },
    },
  },
  password: {
    placeholder: "Password",
    type: "password",
    name: "password",
    events: {
      blur: (e) => {
        blurInput("password");
      },
    },
  }
};

export function blurInput(type: string) {
  console.log(type);
}
