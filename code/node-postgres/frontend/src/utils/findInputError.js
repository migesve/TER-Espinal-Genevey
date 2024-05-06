//source: https://www.freecodecamp.org/news/how-to-validate-forms-in-react/

export function findInputError(errors, name) {
    const filtered = Object.keys(errors)
      .filter(key => key.includes(name))
      .reduce((cur, key) => {
        return Object.assign(cur, { error: errors[key] })
      }, {})
    return filtered
  }