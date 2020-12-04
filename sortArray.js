const sortedAArray = (arrayAsc, arrayDesc)=>{
  let result =[]
  let left = 0 // going up the ascedi g
  let right = arrayDesc.length - 1 
  //A [1,2,3,4] 
  //B [12,9,8] 
  while(left <=arrayAsc.length -1 || right >= 0 ){
    //conparing 1 , 8
    if(arrayAsc[left] < arrayDesc[right]){
      result.push(arrayAsc[left])
      left++
    } else if(arrayAsc[left] > arrayDesc[right]){
      result.push(arrayDesc[right]);
      right--
    } else {
      result.push(arrayAsc[left]);
      left++
      right--
    }
  }

  console.log(result)
  return result


}
