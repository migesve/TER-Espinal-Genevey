//source: https://www.freecodecamp.org/news/how-to-validate-forms-in-react/

export const isFormInvalid = err => {
    if (Object.keys(err).length > 0) return true
    return false
  }