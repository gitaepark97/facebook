export const filterArray = originArray => {
  let newArray = []
  let newObject = {}
  let i

  for (i in originArray) {
    newObject[originArray[i].id] = originArray[i]
  }
  for (i in newObject) {
    newArray.push(newObject[i])
  }

  return newArray
}
