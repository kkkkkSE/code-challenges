function solution(numbers) {
    const answer = Array(numbers.length).fill(-1);
    const stack = []; // 아직 뒷 큰 수를 찾지 못한 요소 index

    for(let i = 0; i < numbers.length; i++){
        while(stack.length > 0 && numbers[stack.at(-1)] < numbers[i]){
            answer[stack.pop()] = numbers[i];
        }

        stack.push(i);
    }

    return answer;
}


// 20~23번 시간 초과
// function solution(numbers) {
//     const answer = [];

//     for(let i = 0; i < numbers.length; i++){
//         const n = numbers[i];
//         let j = i+1;
        
//         while(numbers[j] <= n) j++;
        
//         if(j < numbers.length) answer.push(numbers[j]);
//         else answer.push(-1);
//     }

//     return answer;
// }