export const phoneConfig = {
  VN: {
    code: "+84",
    format: "#### ### ####",
    regex: /^\d{10,11}$/,
    placeholder: "xxxx xxx xxx"
  },
  JP: {
    code: "+81",
    format: "## #### ####",
    regex: /^\d{9,10}$/,
    placeholder: "xx xxxx xxxx"
  },
  US: {
    code: "+1",
    format: "(###) ###-####",
    regex: /^\d{10}$/,
    placeholder: "(xxx) xxx-xxxx"
  }
}  