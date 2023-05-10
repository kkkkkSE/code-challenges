function solution(numbers) {
    for(let i = 0; i < numbers.length; i++){
        numbers[i] = numbers[i].toString();
    }

    numbers.sort((a,b) => {
        return a+b < b+a ? 1 : -1;
    });

    const answer = numbers.join("").replace(/^(0)+/, '0');

    return answer;
}


// 기수 정렬 응용 => 반례에서 실패 ([978, 97] => "97978")

// function getDigit(num, i){
//     return Math.floor((num / (10 ** (i-1))) % 10);
// }

// function solution(numbers) {
//     let maxCount = 0;

//     // 숫자 중 최대 자릿수 찾기
//     for(let i = 0; i < numbers.length; i++){
//         const count = Math.floor(Math.log10(numbers[i])) + 1;
//         maxCount = Math.max(maxCount, count);
//     }

//     for(let i = maxCount; i > 0; i--){
//         let arr = Array.from({length:10}, ()=>[]);
//         for(let j = 0; j < numbers.length; j++){
//             const digit = getDigit(numbers[j], i);
//             arr[digit].push(numbers[j]);
//         }
//         numbers = [].concat(...arr);
//     }
// }