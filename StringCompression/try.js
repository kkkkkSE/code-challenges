
// => 문제에서 '문자열은 제일 앞부터 정해진 길이만큼 잘라야 합니다.' 라고 했다.
//     xabcabc -> 3개 단위로 자르는것 불가
//     xzvabcabc -> 3개 단위로 자르는 것 가능
//     xzvdabcabc -> xzv/d/abc/abc 가 아니라 xzv/dab/cab/c 로 잘라야 해서 압축 불가능
// 문제에 제대로 명시가 되지 않아 혼란을 야기했다 ,,,,,! 다시 풀어보자.

// ----------------------------------

// - 첫글자는 압축 대상에 무조건 포함되어야 한다.
// - 압축은 1부터 Math.floor(s.length / 2) 개 까지만 가능하다.

// 1. 문자열 자른 개수 단위 (s.length / 2) ~ 1 범위로 순회한다.
// 2. 해당 순회 내에서 s에 대해 순회를 새로 시작한다.
// 3. 첫글자를 포함한 n개의 문자를 잘라내 str 변수에 저장한다.
// 4. index가 n ~ 2n-1 인 문자열과 str을 비교하여 압축이 가능한지 확인한다. 
//    압축이 가능한지 확인 여부는 여러번일 수 있으므로 while문 작성
//      - 압축 불가능하다면 
//          s의 첫 요소일 때 : s에 대한 순회를 끝내고 바깥 for문 continue
//          s의 첫 요소가 아닐 때 :
//            - 압축을 한번이라도 했다면 압축된 index 바로 다음으로 이동
//            - 압축을 한번도 안했다면 바로 다음 index로 이동
//      - 가능하다면 압축, 압축 이후 index를 2n으로 이동시킨다.
// 5. 4번의 while문이 종료되면 압축 여부 확인하고 새로운 문자열 추가 or 기존 문자열 추가 
// 6. 2~5번 과정의 s 순회가 끝나면 압축하여 만들어진 문자열의 개수를 체크하여 그 전보다 적었으면 반환한다.

// function solution(s) {
//     let len = s.length;

//     outer : for(let n = Math.floor(len / 2); n >= 1; n--){
//         let compStr = '';

//         for(let i = 0; i < s.length; i++){
//             const str1 = s.slice(i, i + n);
//             let compNum = 0;

//             if(i > s.length - n){
//                 compStr += s.slice(i);
//                 break;
//             }

//             while(i <= s.length - n){
//                 const str2 = s.slice(i + n, i + n + n);
//                 if(str1 === str2) {
//                     compNum++;
//                     i += n;
//                 } else {
//                     break;
//                 }
//             }

//             if(!compNum){
//                 if(!i) {
//                     const s1 = s.slice(n, 2*n), s2 = s.slice(2*n, 3*n);
//                     if(s1 === s2){
//                         compStr += s.slice(0, n);
//                         i += n - 1;
//                     } else continue outer; 
//                 } else compStr += s[i];
//                 continue;
//             }else{
//                 i += n - 1;
//                 compStr += (compNum + 1) + str1;
//             }
//         }
//         len = Math.min(len, compStr.length);
//     }
//     return len;
// }

