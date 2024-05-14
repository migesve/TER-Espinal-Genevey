//source: https://www.freecodecamp.org/news/how-to-validate-forms-in-react/

export const nomComplet_validation = {  // created by espinal/genevey (voir si on efface ou on garde)
  name: "nomComplet",
  label: "Nom Complet",
  type: "text",
  id: "nomComplet",
  placeholder: "Nom complet ...",
  validation: {
    required: {
      value: true,
      message: "Obligatoire",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const abbreviation_validation = {  // created by espinal/genevey (voir si on efface ou on garde)
  name: 'abbreviation',
  label: 'abbreviation',
  type: 'text',
  id: 'abbreviation',
  placeholder: 'Abbreviation ...',
  validation: {
    required: {
      value: true,
      message: 'Obligatoire',
    },
    minLength: {
      value: 6,
      message: 'min 6 characters',
    },
  },
};

export const angle_1_validation = {
  name: "angle_1",
  label: "Angle 1",
  type: "number",
  id: "angle_1",
  placeholder: "Angle 1 ...",
  validation: {
    required: {
      value: true,
      message: "Obligatoire",
    },
    maxLength: {
      value: 3,
      message: "3 characters max",
    },
  },
};

export const angle_2_validation = {
  name: "angle_2",
  label: "Angle 2",
  type: "number",
  id: "angle_2",
  placeholder: "Angle 2 ...",
  validation: {
    required: {
      value: true,
      message: "Obligatoire",
    },
    maxLength: {
      value: 3,
      message: "3 characters max",
    },
  },
};

export const inclinaison_tete_validation = {
  name: "inclinaison_tete",
  label: "Inclinaison tête",
  type: "number",
  id: "inclinaison_tete",
  placeholder: "Inclinaison de la tête ...",
  validation: {
    required: {
      value: true,
      message: "Obligatoire",
    },
    maxLength: {
      value: 3,
      message: "3 characters max",
    },
  },
};

export const desc_validation = {
    name: 'description',
    label: 'description',
    multiline: true,
    id: 'description',
    placeholder: 'Description et commentaires ...',
    validation: {
      required: {
        value: true,
        message: 'Obligatoire',
      },
      maxLength: {
        value: 200,
        message: '500 characters max',
      },
    },
  };

export const password_validation = {
    name: 'password',
    label: 'password',
    type: 'password',
    id: 'password',
    placeholder: 'ecrivez votre password ...',
    validation: {
      required: {
        value: true,
        message: 'Obligatoire',
      },
      minLength: {
        value: 6,
        message: 'min 6 characters',
      },
    },
  };
  
export const num_validation = {
    name: 'num',
    label: 'number',
    type: 'number',
    id: 'num',
    placeholder: 'write a random number',
    validation: {
      required: {
        value: true,
        message: 'Obligatoire',
      },
    },
  };
  
  export const email_validation = {
    name: "email",
    label: "adresse email",
    type: "email",
    id: "email",
    placeholder: "votre email ...",
    validation: {
      required: {
        value: true,
        message: "Obligatoire",
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "not valid",
      },
    },
  };