export const loginValidations = {
  email: {
    required: {
      value: true,
      message: 'Email is required',
    },
  },
  password: {
    required: {
      value: true,
      message: 'Password is required',
    },
  },
};

export const signupValidations = {
  firstName: {
    required: {
      value: true,
      message: 'First name is required',
    },
  },
  lastName: {
    required: {
      value: true,
      message: 'Last name is required',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Email is required',
    },
  },
  password: {
    required: {
      value: true,
      message: 'Password is required',
    },
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
    validate: {
      number: (pass: string) =>
        /\d+/.test(pass) || 'Password must contain 1 digit',
      lowerCase: (pass: string) =>
        /[a-z]+/.test(pass) || 'Password must contain 1 lowercase character',
      upperCase: (pass: string) =>
        /[A-Z]+/.test(pass) || 'Password must contain 1 uppercase character',
      symbol: (pass: string) =>
        /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+/.test(pass) ||
        'Password must contain 1 symbol',
    },
  },
};

export const addTeamValidation = {
  name: {
    required: {
      value: true,
      message: 'Team name is required',
    },
    minLength: {
      value: 3,
      message: 'Team name must be between 3 and 256 characters long',
    },
    maxLength: {
      value: 256,
      message: 'Team name must be between 3 and 256 characters long',
    },
  },
};

export const addMembershipValidations = {
  email: {
    required: {
      value: true,
      message: 'Email is required',
    },
  },
  role: {
    required: {
      value: true,
      message: 'Role is required',
    },
  },
};
