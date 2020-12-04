const info = require('./constants/contacts')
const chalk = require('chalk');

const XLSX = require('xlsx');
const workbook = XLSX.readFile('test3.xlsx');
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
  // we know the MINUM amount of transaction is the the number of people that are positve ;
  let left = 0
  let right = data.length - 1
  let result = []
  //use two pointer approach, since i sorted the array, left pointer will always be loser, right will be winner
  while (left <= right) {
    let loserAbsAmount = Math.abs(data[left][3])
    let winnerAbsAmount = Math.abs(data[right][3])
    let loserName = data[left][0]

    let winnerName = data[right][0]
    let winnerEmail = info[winnerName]

    //loser lost more than winner, loser pays winner's stack. So the left pointer stays on left , while right pointer should now be 0
    if (loserAbsAmount > winnerAbsAmount) {

      data[left][3] += data[right][3]
      data[right][3] = 0;
      let statement = `${loserName} pays ${winnerName} ${winnerAbsAmount.toFixed(2)}`
      result.push(statement)
      right--

    } else if (loserAbsAmount < winnerAbsAmount) {

      data[right][3] += data[left][3]
      data[left][3] = 0;
      let statement = `${loserName} pays ${winnerName} ${loserAbsAmount.toFixed(2)}`
      result.push(statement)
      left++
    } else {
      let statement = `${loserName} pays ${winnerName} ${loserAbsAmount.toFixed(2)}`
      result.push(statement)
      left++
      right--
    }
  }
  for(let item of result){
    console.log(item)
  }
  return result
}

const lastRow = getLastRow(1)
let range = `A3:F${lastRow}`
const data = XLSX.utils.sheet_to_json(ws, { range, header: 1 });
formatData(data)





//starting row always 3 until blank