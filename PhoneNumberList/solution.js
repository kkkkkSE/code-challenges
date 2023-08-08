function solution(phone_book) {
  phone_book.sort();
  
  for (let i = 0; i < phone_book.length - 1; i++) {
    if (phone_book[i + 1].startsWith(phone_book[i])) {
        return false;
    }
  } 

  return true;
}

// sort() 가 O(n^2)의 복잡도를 가져 비효율적이겠다 하였으나, 실제 자바스크립트 엔진에서
// 최적화를 통해 효율적으로 정렬하여 (Tim Sort 방식) O(n log n)의 시간복잡도를 가짐.
// sort()로 전화번호를 사전순으로 배열시키면, 
// 만약 i번째 요소를 접두어로 쓰고 있는 전화번호가 있다면 i+1 번째에 해당 전화번호가 오게 됨.


// 방식 1 : 요소에 순차적으로 접근해서 비교하는 방식, O(n^2)의 시간복잡도를 가져 효율성 테스트 실패

// function solution(phone_book) {
//   for(let i = 0; i < phone_book.length; i++){
//     const el1 = phone_book[i];
      
//     for(let j = i + 1; j < phone_book.length; j++){
//       const el2 = phone_book[j];

//       if(el1.startsWith(el2) || el2.startsWith(el1)){
//           return false;
//       }
//     }
//   }

//   return true;
// }




