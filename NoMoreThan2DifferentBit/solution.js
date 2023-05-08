function solution(numbers) {
    const answer = [];
    
    for(let i = 0; i < numbers.length; i++) {
        const n = numbers[i].toString(2);
        
        if(n.at(-1) === '0'){
            answer.push(numbers[i] + 1)
            continue;
        }
        
        // 0이 처음으로 나타난 자릿수 찾기
        const findZero = n.split("").reverse().indexOf('0');
        
        if(findZero < 0) {
            answer.push(numbers[i] + 2 ** (n.length - 1))
        } else {
            answer.push(numbers[i] + 2 ** (findZero - 1))
        }
    }
    
    return answer;
}

// 뒤에서부터 0이 처음 나온 자리 바로 뒤의 자리수에 1을 더해주면 된다.
// 101111 -> 101111 + 1000 = 110111
// 10011 -> 10011 + 10 = 10101


//// 7~11번 케이스 실패(원인 파악 실패, 숫자가 매우 커지면서 생기는 문제로 추측)
// 가장 뒤에서부터 1의 개수 세기, n개 카운트 후 0을 만나면 정지.
// 0 자리에 1을 올려주고, 그 바로 뒤에 0 채우고 나머지 n-1개는 1로 채우기.
// ex) 1001111 -> 뒤에서부터 1의 개수 4개 (카운트 후 지우기) -> 100XXXX
//     -> 마지막 0을 1로 바꾸기 -> 101XXXX 
//     -> 지웠던 1 자리에 0 하나 채우고 나머지 1로 다시 채우기 -> 1010111

// function solution(numbers) {
//     const answer = [];
    
//     for(let i = 0; i < numbers.length; i++){
//         let n = numbers[i];
//         let j;

//         if(n % 2 === 0) {
//             answer.push(n + 1);
//             continue;
//         }
        
//         for(j = 0; n & 1; j++) n = n >> 1; 
//         n += 1;
//         n = n << 1;
//         n = n.toString(2) + ('1'.repeat(j-1));

//         answer.push(parseInt(n, 2));
//     }
    
//     return answer;
// }
