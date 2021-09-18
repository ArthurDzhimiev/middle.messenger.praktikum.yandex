import { InputProps } from "../components/input/input";

export const InputsRegex: Record<string, RegExp> = {
  name: /^[А-ЯA-Z][А-ЯA-Zа-яёa-z-]+$/,
  login: /^(?=.*[a-zA-Z])(?=.*[a-zA-Z0-9-_]+$).{3,20}$/,
  phone: /^\+?[0-9]{10,15}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password:
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!;@#\$%\^\&*\)\(+=._-]{8,40}$/,
  required: /.{1,}$/,
};
export const InputsProps: Record<string, InputProps> = {
  firstName: {
    placeholder: "First name",
    type: "text",
    name: "first_name",
    validation: "name",
    errorText: "Invalid first name",
    events: {
      blur: (e: Event) => {
        inputTouch(e);
      },
      focus: (e: Event) => {
        inputTouch(e);
      },
    },
  },
  secondName: {
    placeholder: "Second name",
    type: "text",
    name: "second_name",
    validation: "name",
    errorText: "Invalid second name",
    events: {
      blur: (e: Event) => {
        inputTouch(e);
      },
      focus: (e: Event) => {
        inputTouch(e);
      },
    },
  },
  login: {
    placeholder: "Login",
    type: "text",
    name: "login",
    validation: "login",
    errorText: "Invalid login",
    events: {
      blur: (e: Event) => {
        inputTouch(e);
      },
      focus: (e: Event) => {
        inputTouch(e);
      },
    },
  },
  displayName: {
    placeholder: "Display name",
    type: "text",
    name: "display_name",
    validation: "required",
    errorText: "Invalid name",
  },
  email: {
    placeholder: "Email",
    type: "email",
    name: "email",
    validation: "email",
    errorText: "Invalid email",
    events: {
      blur: (e: Event) => {
        inputTouch(e);
      },
      focus: (e: Event) => {
        inputTouch(e);
      },
    },
  },
  phone: {
    placeholder: "Phone",
    type: "phone",
    name: "phone",
    validation: "phone",
    errorText: "Invalid phone",
    events: {
      blur: (e: Event) => {
        inputTouch(e);
      },
      focus: (e: Event) => {
        inputTouch(e);
      },
    },
  },
  password: {
    placeholder: "Password",
    type: "password",
    name: "password",
    validation: "password",
    errorText:
      "Password must be from 8 to 40 characters, at least one capital letter and number is required",
    events: {
      blur: (e: Event) => {
        inputTouch(e);
      },
      focus: (e: Event) => {
        inputTouch(e);
      },
    },
  },
  search: {
    placeholder: "Search",
    type: "text",
    name: "search",
  },
  message: {
    placeholder: "Search",
    type: "text",
    name: "search",
    validation: "required",
    events: {
      blur: (e: Event) => {
        inputTouch(e);
      },
      focus: (e: Event) => {
        inputTouch(e);
      },
    },
  },
};

export function inputTouch(event: Event): boolean {
  const target = event.currentTarget as HTMLInputElement;
  return validateInput(target);
}

export function validateInput(input: HTMLInputElement) {
  if (input) {
    const validationType = input.getAttribute("data-validation");
    const inputValid = validationType
      ? InputsRegex[validationType].test(input.value)
      : true;
    updateValidationStatus(input, !!inputValid);
    return !!inputValid;
  }
  return true;
}

export function updateValidationStatus(el: HTMLElement, isValid: boolean) {
  const parent = el.parentElement;
  isValid ? el.classList.remove("input--err") : el.classList.add("input--err");
  if (parent) {
    const label: HTMLElement | null = parent.querySelector(".label-err");
    if (label) {
      isValid
        ? label.classList.remove("label-err--active")
        : label.classList.add("label-err--active");
    }
  }
}

export function validateForm(formSelector: string): boolean {
  const form = document.querySelector(formSelector);
  let errorsCount = 0;
  if (form) {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      if (!validateInput(input)) {
        errorsCount += 1;
      }
    });
  }
  return !errorsCount;
}

export function collectFormData(formSelector: string) {
  const form = document.querySelector(formSelector);
  const formData: Record<string, string> = {};
  if (form) {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      formData[input.name] = input.value;
    });
  }
  return formData;
}
