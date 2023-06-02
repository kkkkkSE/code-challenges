function solution(arrayA, arrayB) {
    let ansA = 0, ansB = 0;
    let minA = Infinity, minB = Infinity;

    for(let i = 0; i < arrayA.length; i++) minA = Math.min(minA, arrayA[i]);
    for(let i = 0; i < arrayB.length; i++) minB = Math.min(minB, arrayB[i]);

    for(let i = minA; i > 1; i--){
        if(arrayA.every(v => v % i === 0) && arrayB.every(v => v % i !== 0)){
            ansA = i;
            break;
        }
    }
    for(let i = minB; i > 1; i--){
        if(arrayB.every(v => v % i === 0) && arrayA.every(v => v % i !== 0)){
            ansB = i;
            break;
        }
    }

    return ansA || ansB ? Math.max(ansA, ansB) : 0;
}

// 한 배열에서 a로 나누어지려면, a는 그 배열의 최소값보다 더 클 수 없다.
// 따라서, 2 ~ o배열 최소값까지 모든 경우의 수를 체크한다.
// ex. A배열의 최소값 : minA 라고 하면, v = minA 부터 2까지 순차적으로 내려가며
//     v가 A배열 모든 원소에 나눠 떨어지는지 && v가 B배열 모든 원소에 나눠 떨어지지 않는지 체크

// function solution(arrA, arrB) {
//     const arrayA = [...new Set(arrA)];
//     const arrayB = [...new Set(arrB)];
//     const obj = {}, divisorArr = [];
//     const len = arrayA.length;

//     // A 배열 원소 약수 구하기
//     for(let i = 0; i < len; i++){
//         const el = arrayA[i];

//         for(let j = 2; j <= Math.sqrt(el); j++){
//             if(el % j === 0) {
//                 obj[j] = (obj[j] || 0) + 1;
//                 obj[el/j] = (obj[el/j] || 0) + 1;
//             }
//         }

//         obj[el] = obj[el] || 0 + 1;
//     }

//     // ...
// }

// 배열에 있는 모든 원소의 약수(1 제외)를 구한다. 
// 모든 원소의 약수는 각 객체에 담으며, 담을 때마다 +1씩 카운트한다.
// 해당 배열의 length와 일치하는 value를 가진 약수들만 추출한다. (내림차순)
// 반대쪽 배열의 원소들을 이 약수들과 나눠서 나머지가 0이 아닌지 체크한다.

// -> 첫번째 과정에서 이미 시간초과임. 유클리드 호제법을 사용하면 좋았을 것 같다.