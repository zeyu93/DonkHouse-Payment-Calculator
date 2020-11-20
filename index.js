const info = require('./constants/contacts')

const XLSX = require('xlsx');
const workbook = XLSX.readFile('test.xlsx');
const ws = workbook.Sheets[workbook.SheetNames[0]]

const getLastRow = (startingRow) => {

  let cell = ws[`A${startingRow}`]

  while (cell) {
    startingRow++
    cell = ws[`A${startingRow}`]
  }
  return startingRow - 1
}

const formatData = (data) => {
  data.sort((a, b) => a[3] - b[3])
  console.log('sorted', data)

  let left = 0
  let right = data.length - 1
  let result = []
  while (left <= right) {
    let loserAbsAmount = Math.abs(data[left][3])
    let winnerAbsAmount = Math.abs(data[right][3])
    let loserName = data[left][0]

    let winnerName = data[right][0]
    console.log(loserName, 'loserAbsAmount: ', loserAbsAmount, winnerName, 'winnerAbsAmount: ', winnerAbsAmount)
    let winnerEmail = info[winnerName]

    //loser lost more than winner, loser pays winner's stack and keep going 
    if (loserAbsAmount > winnerAbsAmount) {

      data[left][3] += data[right][3]
      data[right][3] = 0;
      let statement = `${loserName} pays ${winnerName} ${winnerAbsAmount}, his email is ${winnerEmail}!`
      result.push(statement)
      right--

    } else if (loserAbsAmount < winnerAbsAmount) {
      data[right][3] += data[left][3]
      data[left][3] = 0;
      let statement = `${loserName} pays ${winnerName} ${loserAbsAmount}, his email is ${winnerEmail}!`
      result.push(statement)
      left++
    } else {
      let statement = `${loserName} pays ${winnerName} ${loserAbsAmount}, his email is ${winnerEmail}!`
      result.push(statement)
      left++
      right--
    }


  }
  console.log(result)
  return result
}

const lastRow = getLastRow(1)
let range = `A3:F${lastRow}`
const data = XLSX.utils.sheet_to_json(ws, { range, header: 1 });
formatData(data)





//starting row always 3 until blank